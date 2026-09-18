    // ==================== 4. APPLICATION INITIALIZATION & 3D ARCHITECTURE ====================
    function initApp() {
      const container = document.getElementById('canvas-container');

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xe6e1da);

      const aspect = (container.clientWidth && container.clientHeight) ? (container.clientWidth / container.clientHeight) : (window.innerWidth / window.innerHeight);
      camera = new THREE.PerspectiveCamera(28, aspect, 0.1, 100);
      camera.position.set(3.8, 2.3, 4.4);

      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.92;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.target.set(0.1, 1.15, 0.1);
      controls.maxPolarAngle = Math.PI / 2 - 0.02;

      setupRoomLighting();
      buildRoomArchitecture();

      // Default initial state: Clean empty bathroom (no pre-filled products, theme: None)
      resetThemeToDefault();
      resetAiEngineAndConstraints();
      updateClearanceVisualizer();
      updateWetWallScore();

      deselectActiveObject();
      bindInteractionEvents();
      closeCatalogDrawer();
      updateTotalBOM();

      animate();
    }

    function setupRoomLighting() {
      roomAmbLight = new THREE.AmbientLight(0xfff7ec, 0.50);
      scene.add(roomAmbLight);

      roomKeySun = new THREE.DirectionalLight(0xfff8ee, 0.75);
      roomKeySun.position.set(3.0, 5.0, 3.4);
      roomKeySun.castShadow = true;
      roomKeySun.shadow.mapSize.width = 2048; roomKeySun.shadow.mapSize.height = 2048;
      roomKeySun.shadow.camera.near = 0.5; roomKeySun.shadow.camera.far = 16;
      roomKeySun.shadow.camera.left = -3.5; roomKeySun.shadow.camera.right = 3.5;
      roomKeySun.shadow.camera.top = 3.5; roomKeySun.shadow.camera.bottom = -3.5;
      roomKeySun.shadow.bias = -0.00008;
      scene.add(roomKeySun);

      roomFillLight = new THREE.DirectionalLight(0xdce5ed, 0.30);
      roomFillLight.position.set(-3.0, 3.0, 1.8);
      scene.add(roomFillLight);

      // Back wall spotlight removed per user request for smooth, realistic studio wall illumination
      roomBackWallSpot = null;

      if (!themeAccentsGroup) {
        themeAccentsGroup = new THREE.Group();
        themeAccentsGroup.name = 'theme-accents-group';
        scene.add(themeAccentsGroup);
      }
      if (!clearanceGroup) {
        clearanceGroup = new THREE.Group();
        clearanceGroup.name = 'clearance-group';
        scene.add(clearanceGroup);
      }
      if (!wetWallGroup) {
        wetWallGroup = new THREE.Group();
        wetWallGroup.name = 'wetwall-group';
        wetWallGroup.visible = false;
        scene.add(wetWallGroup);
      }
      if (!floorplan2DGroup) {
        floorplan2DGroup = new THREE.Group();
        floorplan2DGroup.name = 'floorplan-2d-group';
        floorplan2DGroup.visible = false;
        scene.add(floorplan2DGroup);
      }
    }

    function buildRoomArchitecture() {
      if (floorMesh) scene.remove(floorMesh);
      if (backWallMesh) scene.remove(backWallMesh);
      if (leftWallMesh) scene.remove(leftWallMesh);
      if (rightWallMesh) scene.remove(rightWallMesh);
      if (frontWallMesh) scene.remove(frontWallMesh);
      if (doorGroup) scene.remove(doorGroup);
      if (gridHelper) scene.remove(gridHelper);

      scene.children.filter(c => c.userData && c.userData.isRoomStructure).forEach(c => scene.remove(c));

      let curWallType = 'square';
      let curFloorType = 'slate';
      let curWallRough = 0.45, curFloorRough = 0.70;
      if (typeof currentSelectedTheme === 'string') {
        if (currentSelectedTheme === 'Minimalist Modern') {
          curWallType = 'minimalist-modern'; curFloorType = 'minimalist-sand'; curWallRough = 0.50; curFloorRough = 0.65;
        } else if (currentSelectedTheme === 'Classic Luxury') {
          curWallType = 'calacatta-gold'; curFloorType = 'calacatta-gold'; curWallRough = 0.12; curFloorRough = 0.10;
        } else if (currentSelectedTheme === 'Japanese Zen') {
          curWallType = 'japanese-zen'; curFloorType = 'japanese-limestone'; curWallRough = 0.65; curFloorRough = 0.75;
        } else if (currentSelectedTheme === 'Industrial Chic' || currentSelectedTheme === 'Industrial Contemporary') {
          curWallType = 'industrial-chic'; curFloorType = 'industrial-slate'; curWallRough = 0.80; curFloorRough = 0.85;
        } else if (currentSelectedTheme.includes('WasteLAB') || currentSelectedTheme.includes('Eco')) {
          curWallType = 'wastelab'; curFloorType = 'wastelab-terrazzo'; curWallRough = 0.35; curFloorRough = 0.45;
        }
      }

      const wallTexX = generateWallTileTexture(curWallType, roomWidth, roomHeight);
      const wallTexZ = generateWallTileTexture(curWallType, roomDepth, roomHeight);
      const floorTex = generateFloorTileTexture(curFloorType, roomWidth, roomDepth);

      const wallMatX = new THREE.MeshStandardMaterial({ map: wallTexX, roughness: curWallRough, metalness: 0.02 });
      const wallMatZ = new THREE.MeshStandardMaterial({ map: wallTexZ, roughness: curWallRough, metalness: 0.02 });
      const floorMat = new THREE.MeshStandardMaterial({ map: floorTex, roughness: curFloorRough, metalness: 0.02 });
      const cutawayMat = new THREE.MeshStandardMaterial({ color: 0xd8d4cb, roughness: 0.7 });
      const floorBorderMat = new THREE.MeshStandardMaterial({ color: 0xe8e4dc, roughness: 0.5 });

      const borderMargin = 0.09;
      const slabHeight = 0.08;

      // Cutaway base slab underneath
      const slab = new THREE.Mesh(new THREE.BoxGeometry(roomWidth + borderMargin * 2, slabHeight, roomDepth + borderMargin * 2), cutawayMat);
      slab.position.set(0, -slabHeight / 2, 0); slab.receiveShadow = true; slab.userData = { isRoomStructure: true };
      scene.add(slab);

      // White perimeter margin border around tiles
      const border = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth + borderMargin * 2, roomDepth + borderMargin * 2), floorBorderMat);
      border.rotation.x = -Math.PI / 2; border.position.y = 0.0004; border.receiveShadow = true; border.userData = { isRoomStructure: true };
      scene.add(border);

      // Floor
      floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomDepth), floorMat);
      floorMesh.rotation.x = -Math.PI / 2; floorMesh.position.y = 0.0008; floorMesh.receiveShadow = true;
      scene.add(floorMesh);

      // 1. Back Wall (North: z = -roomDepth / 2)
      backWallMesh = new THREE.Mesh(new THREE.BoxGeometry(roomWidth, roomHeight, 0.08), wallMatX);
      backWallMesh.position.set(0, roomHeight / 2, -roomDepth / 2); backWallMesh.receiveShadow = true;
      scene.add(backWallMesh);

      const backTopCap = new THREE.Mesh(new THREE.BoxGeometry(roomWidth, 0.005, 0.08), cutawayMat);
      backTopCap.position.set(0, roomHeight + 0.002, -roomDepth / 2); backTopCap.userData = { isRoomStructure: true };
      scene.add(backTopCap);

      // 2. Left Wall (West: x = -roomWidth / 2)
      leftWallMesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, roomHeight, roomDepth), wallMatZ);
      leftWallMesh.position.set(-roomWidth / 2, roomHeight / 2, 0); leftWallMesh.receiveShadow = true;
      scene.add(leftWallMesh);

      const leftTopCap = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.005, roomDepth), cutawayMat);
      leftTopCap.position.set(-roomWidth / 2, roomHeight + 0.002, 0); leftTopCap.userData = { isRoomStructure: true };
      scene.add(leftTopCap);

      // 3. Right Wall (East: x = +roomWidth / 2)
      rightWallMesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, roomHeight, roomDepth), wallMatZ.clone());
      rightWallMesh.position.set(roomWidth / 2, roomHeight / 2, 0); rightWallMesh.receiveShadow = true;
      scene.add(rightWallMesh);

      const rightTopCap = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.005, roomDepth), cutawayMat);
      rightTopCap.position.set(roomWidth / 2, roomHeight + 0.002, 0); rightTopCap.userData = { isRoomStructure: true };
      scene.add(rightTopCap);

      // 4. Front Wall (South: z = +roomDepth / 2)
      frontWallMesh = new THREE.Mesh(new THREE.BoxGeometry(roomWidth, roomHeight, 0.08), wallMatX.clone());
      frontWallMesh.position.set(0, roomHeight / 2, roomDepth / 2); frontWallMesh.receiveShadow = true;
      scene.add(frontWallMesh);

      const frontTopCap = new THREE.Mesh(new THREE.BoxGeometry(roomWidth, 0.005, 0.08), cutawayMat);
      frontTopCap.position.set(0, roomHeight + 0.002, roomDepth / 2); frontTopCap.userData = { isRoomStructure: true };
      scene.add(frontTopCap);

      // Entry Door on Left Wall
      doorGroup = buildDoorMesh();
      doorGroup.position.set(-roomWidth / 2 + 0.04, 0, 0.25);
      doorGroup.rotation.y = Math.PI / 2;
      scene.add(doorGroup);

      // Register wall definitions for dynamic view-angle occlusion culling
      roomWallDefinitions = [
        {
          id: 'back',
          mesh: backWallMesh,
          caps: [backTopCap],
          normal: new THREE.Vector3(0, 0, -1),
          center: new THREE.Vector3(0, roomHeight / 2, -roomDepth / 2),
          door: null
        },
        {
          id: 'left',
          mesh: leftWallMesh,
          caps: [leftTopCap],
          normal: new THREE.Vector3(-1, 0, 0),
          center: new THREE.Vector3(-roomWidth / 2, roomHeight / 2, 0),
          door: doorGroup
        },
        {
          id: 'right',
          mesh: rightWallMesh,
          caps: [rightTopCap],
          normal: new THREE.Vector3(1, 0, 0),
          center: new THREE.Vector3(roomWidth / 2, roomHeight / 2, 0),
          door: null
        },
        {
          id: 'front',
          mesh: frontWallMesh,
          caps: [frontTopCap],
          normal: new THREE.Vector3(0, 0, 1),
          center: new THREE.Vector3(0, roomHeight / 2, roomDepth / 2),
          door: null
        }
      ];

      updateDynamicWallVisibility();

      // Grid Helper (Hidden by default)
      gridHelper = new THREE.GridHelper(Math.max(roomWidth, roomDepth) * 1.1, Math.round(Math.max(roomWidth, roomDepth) / 0.1), 0x9ca3af, 0xd1d5db);
      gridHelper.position.y = 0.002; gridHelper.visible = false;
      scene.add(gridHelper);

      if (!dragPlane) {
        dragPlane = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshBasicMaterial({ visible: false }));
        dragPlane.rotation.x = -Math.PI / 2; scene.add(dragPlane);
      }

      updateDimensionLabels();
      buildPlumbingConduits();
      updateClearanceVisualizer();
      updateWetWallScore();
      if (typeof applyAestheticTheme === 'function') {
        applyAestheticTheme(currentSelectedTheme);
      }
    }
