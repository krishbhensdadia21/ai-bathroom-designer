    // ==================== 7. VIEW MODES (3D, 2D FLOORPLAN, WALK-IN) & 2D CAD LAYER ====================
    function make2DTextSprite(text, bgColor = 'rgba(13, 15, 18, 0.90)', textColor = '#b45309', fontSize = 26, width = 512, height = 128) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.font = `bold ${fontSize}px "Inter", -apple-system, sans-serif`;

      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      const padX = 20;
      const padY = 12;
      const boxW = Math.min(width - 10, textWidth + padX * 2);
      const boxH = fontSize + padY * 2;
      const boxX = (width - boxW) / 2;
      const boxY = (height - boxH) / 2;

      ctx.fillStyle = bgColor;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(boxX, boxY, boxW, boxH, 8);
      } else {
        ctx.rect(boxX, boxY, boxW, boxH);
      }
      ctx.fill();

      ctx.strokeStyle = textColor;
      ctx.lineWidth = 1.5;
      if (ctx.roundRect) {
        ctx.roundRect(boxX, boxY, boxW, boxH, 8);
      } else {
        ctx.rect(boxX, boxY, boxW, boxH);
      }
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(boxW / 360, boxH / 360, 1);
      return sprite;
    }

    function update2DFloorplanAnnotations() {
      if (!floorplan2DGroup) return;
      while (floorplan2DGroup.children.length > 0) {
        const obj = floorplan2DGroup.children[0];
        floorplan2DGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      }

      const dimY = 0.04;
      const wFt = (roomWidth * 3.28084).toFixed(1);
      const dFt = (roomDepth * 3.28084).toFixed(1);

      // 1. Width Dimension Line (Top of Room)
      const topDimZ = -roomDepth / 2 - 0.28;
      const widthPts = [
        new THREE.Vector3(-roomWidth / 2, dimY, topDimZ),
        new THREE.Vector3(roomWidth / 2, dimY, topDimZ),
        // Left tick
        new THREE.Vector3(-roomWidth / 2, dimY, topDimZ - 0.10),
        new THREE.Vector3(-roomWidth / 2, dimY, topDimZ + 0.10),
        // Right tick
        new THREE.Vector3(roomWidth / 2, dimY, topDimZ - 0.10),
        new THREE.Vector3(roomWidth / 2, dimY, topDimZ + 0.10)
      ];
      const widthGeo = new THREE.BufferGeometry().setFromPoints(widthPts);
      const dimMat = new THREE.LineBasicMaterial({ color: 0xb45309, linewidth: 2 });
      const widthLine = new THREE.LineSegments(widthGeo, dimMat);
      floorplan2DGroup.add(widthLine);

      const widthSprite = make2DTextSprite(`WIDTH: ${wFt} FT (${roomWidth.toFixed(2)}m)`, '#0d0f12', '#b45309', 24);
      widthSprite.position.set(0, dimY + 0.02, topDimZ - 0.18);
      floorplan2DGroup.add(widthSprite);

      // 2. Depth Dimension Line (Left of Room)
      const leftDimX = -roomWidth / 2 - 0.28;
      const depthPts = [
        new THREE.Vector3(leftDimX, dimY, -roomDepth / 2),
        new THREE.Vector3(leftDimX, dimY, roomDepth / 2),
        // Top tick
        new THREE.Vector3(leftDimX - 0.10, dimY, -roomDepth / 2),
        new THREE.Vector3(leftDimX + 0.10, dimY, -roomDepth / 2),
        // Bottom tick
        new THREE.Vector3(leftDimX - 0.10, dimY, roomDepth / 2),
        new THREE.Vector3(leftDimX + 0.10, dimY, roomDepth / 2)
      ];
      const depthGeo = new THREE.BufferGeometry().setFromPoints(depthPts);
      const depthLine = new THREE.LineSegments(depthGeo, dimMat);
      floorplan2DGroup.add(depthLine);

      const depthSprite = make2DTextSprite(`DEPTH: ${dFt} FT (${roomDepth.toFixed(2)}m)`, '#0d0f12', '#b45309', 24);
      depthSprite.position.set(leftDimX - 0.20, dimY + 0.02, 0);
      floorplan2DGroup.add(depthSprite);

      // 3. Primary Wet-Wall Annotation along Rear Wall
      const wetWallZ = -roomDepth / 2 + 0.04;
      const wetPts = [
        new THREE.Vector3(-roomWidth / 2 + 0.1, dimY, wetWallZ),
        new THREE.Vector3(roomWidth / 2 - 0.1, dimY, wetWallZ)
      ];
      const wetGeo = new THREE.BufferGeometry().setFromPoints(wetPts);
      const wetMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 3 });
      const wetLine = new THREE.Line(wetGeo, wetMat);
      floorplan2DGroup.add(wetLine);

      const wetSprite = make2DTextSprite('PRIMARY 4" SOIL & WET-WALL PLUMBING STACK', '#082f49', '#38bdf8', 20, 580, 100);
      wetSprite.position.set(0, dimY + 0.02, wetWallZ + 0.15);
      floorplan2DGroup.add(wetSprite);

      // 4. Entry Door Clearance Annotation
      const doorHingeX = -roomWidth / 2 + 0.04;
      const doorHingeZ = -0.19;
      const doorRadius = 0.88;
      const doorLabelSprite = make2DTextSprite('ENTRY DOOR 32" (0.88m) INWARD SWING', '#1e293b', '#e2e8f0', 18, 520, 90);
      doorLabelSprite.position.set(doorHingeX + doorRadius * 0.5, dimY + 0.02, doorHingeZ + doorRadius * 0.45);
      floorplan2DGroup.add(doorLabelSprite);

      // 5. Fixture CAD Footprints and Name Labels
      placedProducts.forEach(item => {
        const d = item.userData;
        const w = d.width_m || 0.6;
        const dep = d.depth_m || 0.6;
        const rotY = item.rotation ? item.rotation.y : 0;

        // Bounding Footprint Rectangle
        const rectPts = [
          new THREE.Vector3(-w / 2, dimY, -dep / 2),
          new THREE.Vector3(w / 2, dimY, -dep / 2),
          new THREE.Vector3(w / 2, dimY, dep / 2),
          new THREE.Vector3(-w / 2, dimY, dep / 2),
          new THREE.Vector3(-w / 2, dimY, -dep / 2)
        ];
        const rectGeo = new THREE.BufferGeometry().setFromPoints(rectPts);
        const rectMat = new THREE.LineBasicMaterial({ color: 0xb45309, linewidth: 1.5 });
        const rectLine = new THREE.Line(rectGeo, rectMat);
        rectLine.position.set(item.position.x, 0, item.position.z);
        rectLine.rotation.y = rotY;
        floorplan2DGroup.add(rectLine);

        // Fixture Label Sprite
        const shortName = d.name ? d.name.split(' ').slice(0, 2).join(' ') : 'Fixture';
        const labelText = `${shortName} (${d.dim ? d.dim.split(' ')[0] : (w * 39.37).toFixed(0) + 'in'})`;
        const fixSprite = make2DTextSprite(labelText, 'rgba(15, 23, 42, 0.88)', '#ffffff', 20, 420, 80);
        fixSprite.position.set(item.position.x, dimY + 0.06, item.position.z);
        floorplan2DGroup.add(fixSprite);
      });
    }

    function setViewMode(mode) {
      currentViewMode = mode;
      document.querySelectorAll('.view-btn').forEach(b => {
        b.classList.remove('bg-black', 'text-white');
        b.classList.add('text-gray-700');
      });
      const activeBtn = document.getElementById('view-mode-' + mode);
      if (activeBtn) {
        activeBtn.classList.add('bg-black', 'text-white');
        activeBtn.classList.remove('text-gray-700');
      }

      if (mode === '3d') {
        controls.enabled = true;
        controls.maxPolarAngle = Math.PI / 2 - 0.02;
        camera.position.set(3.8, 2.3, 4.4);
        controls.target.set(0.1, 1.15, 0.1);
        camera.fov = 28;
        camera.updateProjectionMatrix();
        if (floorplan2DGroup) floorplan2DGroup.visible = false;
      } else if (mode === '2d') {
        controls.enabled = true;
        controls.maxPolarAngle = 0.01;
        camera.position.set(0, 5.5, 0.001);
        controls.target.set(0, 0, 0);
        camera.fov = 40;
        camera.updateProjectionMatrix();
        if (floorplan2DGroup) {
          floorplan2DGroup.visible = true;
          update2DFloorplanAnnotations();
        }
      } else if (mode === 'walkin') {
        controls.enabled = true;
        controls.maxPolarAngle = Math.PI / 2 + 0.1;
        camera.position.set(0.2, 1.65, 0.8);
        controls.target.set(0, 1.4, -1.0);
        camera.fov = 65;
        camera.updateProjectionMatrix();
        if (floorplan2DGroup) floorplan2DGroup.visible = false;
      }
    }

    function zoomCamera(direction) {
      if (camera) {
        const factor = direction > 0 ? 0.88 : 1.14;
        camera.position.multiplyScalar(factor);
      }
    }

    function resetToInitialView() {
      setViewMode('3d');
    }
