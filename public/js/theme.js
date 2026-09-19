    // ==================== DYNAMIC THEME TRANSFORMATION ENGINE ====================
    function applyThemeMaterialsToProduct(group, themeName = currentSelectedTheme) {
      if (!group) return;
      const isMinimalist = themeName.toLowerCase().includes('minimalist');
      const isClassic = themeName.toLowerCase().includes('classic');
      const isZen = themeName.toLowerCase().includes('zen');
      const isIndustrial = themeName.toLowerCase().includes('industrial');
      const isWasteLab = themeName.toLowerCase().includes('waste') || themeName.toLowerCase().includes('eco');

      group.traverse(child => {
        const role = child.userData ? child.userData.role : null;
        if (!role) return;

        if (role === 'faucet') {
          if (isClassic) child.material = polishedBrassMat;
          else if (isIndustrial || isZen || isMinimalist || isWasteLab) child.material = matteBlackMat;
        } else if (role === 'showerMetal' || role === 'showerValve' || role === 'showerHead') {
          if (isClassic) child.material = polishedBrassMat;
          else if (isIndustrial || isZen) child.material = matteBlackMat;
          else if (isMinimalist) child.material = chromeMat;
          else child.material = chromeMat;
        } else if (role === 'crittallMullions') {
          child.visible = isIndustrial;
        } else if (role === 'vanityCarcass') {
          if (isClassic) child.material = darkMahoganyMat;
          else if (isZen || isWasteLab) child.material = teakMat;
          else if (isIndustrial) child.material = industrialSteelMat;
          else if (isMinimalist) child.material = scandinavianOakMat;
        } else if (role === 'vanityCounter') {
          if (isClassic) child.material = calacattaMarbleMat;
          else if (isZen) child.material = teakMat;
          else if (isIndustrial) child.material = concreteTroughMat;
          else if (isMinimalist) child.material = whiteQuartzMat;
          else if (isWasteLab) child.material = wasteLabTerrazzoMat;
        } else if (role === 'vanityHardware') {
          if (isClassic) child.material = polishedBrassMat;
          else if (isIndustrial || isZen || isMinimalist) child.material = matteBlackMat;
        } else if (role === 'basin') {
          if (isIndustrial) child.material = concreteTroughMat;
          else child.material = porcelainMat;
        } else if (role === 'mirrorFrame') {
          if (isClassic) child.material = polishedBrassMat;
          else if (isZen) child.material = teakMat;
          else if (isIndustrial) child.material = industrialSteelMat;
          else child.material = matteBlackMat;
        } else if (role === 'mirrorHalo') {
          if (isClassic && child.material) child.material.color.set(0xffe4b5);
          else if (isMinimalist && child.material) child.material.color.set(0xfff8ed);
          else if (isZen && child.material) child.material.color.set(0xfff3db);
          else if (isIndustrial && child.material) child.material.color.set(0xe2e8f0);
        } else if (role === 'flushPlate') {
          if (isClassic) child.material = polishedBrassMat;
          else if (isIndustrial || isMinimalist || isZen) child.material = matteBlackMat;
        }
      });
    }

    // Generic Spatial Collision Detector: checks if a coordinate is occupied by any placed fixture
    function isSpatialZoneOccupied(x, z, safetyRadius = 0.45) {
      if (!placedProducts || !placedProducts.length) return false;
      return placedProducts.some(p => {
        const pw = (p.userData && p.userData.width_m) || 0.80;
        const pd = (p.userData && p.userData.depth_m) || 0.80;
        const threshold = Math.max(pw, pd) / 2 + safetyRadius;
        return Math.hypot(p.position.x - x, p.position.z - z) < threshold;
      });
    }

    function updateThemeArchitecturalAccents(themeName = currentSelectedTheme) {
      if (!themeAccentsGroup) return;
      while (themeAccentsGroup.children.length > 0) {
        themeAccentsGroup.remove(themeAccentsGroup.children[0]);
      }
      if (!themeName || themeName === 'None' || themeName === 'none') return;

      const isMinimalist = themeName.toLowerCase().includes('minimalist');
      const isClassic = themeName.toLowerCase().includes('classic');
      const isZen = themeName.toLowerCase().includes('zen');
      const isIndustrial = themeName.toLowerCase().includes('industrial');

      const vanityObj = placedProducts.find(p => p.userData && p.userData.category === 'vanities');
      const vanityX = vanityObj ? vanityObj.position.x : 0.20;

      if (isMinimalist) {
        // Soft textured sand/grey floor runner rug in front of vanity
        const rugGeo = new THREE.PlaneGeometry(1.45, 0.65);
        const rugMat = new THREE.MeshStandardMaterial({ color: 0x9399a3, roughness: 0.95 });
        const rug = new THREE.Mesh(rugGeo, rugMat);
        rug.rotation.x = -Math.PI / 2;
        rug.position.set(vanityX, 0.0012, -roomDepth / 2 + 0.92);
        rug.receiveShadow = true;
        themeAccentsGroup.add(rug);
      } else if (isClassic) {
        // Dual polished brass luxury wall sconces flanking the mirror
        for (let sx of [-0.74, 0.74]) {
          const sconceG = new THREE.Group();
          sconceG.position.set(vanityX + sx, 1.72, -roomDepth / 2 + 0.035);

          const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.015, 24), polishedBrassMat);
          plate.rotation.x = Math.PI / 2;
          sconceG.add(plate);

          const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.08, 16), polishedBrassMat);
          arm.position.set(0, 0, 0.04);
          arm.rotation.x = Math.PI / 2;
          sconceG.add(arm);

          const shade = new THREE.Mesh(
            new THREE.ConeGeometry(0.045, 0.12, 24, 1, true),
            new THREE.MeshStandardMaterial({
              color: 0xfffaed,
              emissive: 0xffd580,
              emissiveIntensity: 1.2,
              roughness: 0.3
            })
          );
          shade.position.set(0, 0.04, 0.075);
          sconceG.add(shade);

          const sconceLight = new THREE.PointLight(0xffe8c2, 0.45, 2.0);
          sconceLight.position.set(0, 0.05, 0.09);
          sconceG.add(sconceLight);

          themeAccentsGroup.add(sconceG);
        }

        // Brass towel ring on side wall (generic collision-aware)
        const ringG = new THREE.Group();
        let ringX = roomWidth / 2 - 0.03;
        let ringZ = -roomDepth / 2 + 0.85;
        if (isSpatialZoneOccupied(ringX, ringZ, 0.45)) {
          ringX = -roomWidth / 2 + 0.03;
        }
        ringG.position.set(ringX, 1.45, ringZ);
        const ringBase = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.02, 20), polishedBrassMat);
        ringBase.rotation.z = Math.PI / 2;
        ringG.add(ringBase);
        const towelRing = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.008, 16, 32), polishedBrassMat);
        towelRing.position.set(-0.015, -0.06, 0);
        ringG.add(towelRing);
        const foldedTowel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.28, 0.035), new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.9 }));
        foldedTowel.position.set(-0.015, -0.16, 0);
        ringG.add(foldedTowel);
        themeAccentsGroup.add(ringG);

      } else if (isZen) {
        // Vertical Hinoki / Teak wood slatted feature wall along back wall behind/around vanity
        const slatW = 0.038, slatD = 0.024, slatH = roomHeight;
        const panelWidth = 1.80;
        const numSlats = Math.floor(panelWidth / 0.07);
        const slatsG = new THREE.Group();
        // Thin dark shadow backing panel mounted flush to front of back wall (wall front is -roomDepth/2 + 0.04)
        const backPanel = new THREE.Mesh(
          new THREE.BoxGeometry(panelWidth + 0.1, slatH - 0.02, 0.012),
          new THREE.MeshStandardMaterial({ color: 0x2b1e15, roughness: 0.9 })
        );
        backPanel.position.set(vanityX, slatH / 2, -roomDepth / 2 + 0.046);
        slatsG.add(backPanel);

        for (let i = 0; i < numSlats; i++) {
          const sx = vanityX - panelWidth / 2 + 0.04 + i * 0.07;
          const slat = new THREE.Mesh(new THREE.BoxGeometry(slatW, slatH - 0.04, slatD), teakMat);
          slat.position.set(sx, slatH / 2, -roomDepth / 2 + 0.064);
          slat.castShadow = true;
          slat.receiveShadow = true;
          slatsG.add(slat);
        }
        themeAccentsGroup.add(slatsG);

        // Natural woven tatami / jute runner mat in front of console
        const matGeo = new THREE.PlaneGeometry(1.40, 0.65);
        const matMat = new THREE.MeshStandardMaterial({ color: 0xc4a47c, roughness: 0.95 });
        const mat = new THREE.Mesh(matGeo, matMat);
        mat.rotation.x = -Math.PI / 2;
        mat.position.set(vanityX, 0.0022, -roomDepth / 2 + 0.92);
        mat.receiveShadow = true;
        themeAccentsGroup.add(mat);

        // Potted Japanese Bamboo plant in ceramic vase (dynamic collision-free corner selection)
        const plantG = new THREE.Group();
        const candidateSpots = [
          { x: roomWidth / 2 - 0.38, z: -roomDepth / 2 + 0.45 }, // default: back right
          { x: roomWidth / 2 - 0.38, z: roomDepth / 2 - 0.55 },  // front right
          { x: -roomWidth / 2 + 0.38, z: roomDepth / 2 - 0.55 }, // front left
          { x: vanityX + 0.70, z: -roomDepth / 2 + 0.45 }         // alongside vanity
        ];

        let chosenSpot = candidateSpots[0];
        for (const spot of candidateSpots) {
          if (!isSpatialZoneOccupied(spot.x, spot.z, 0.30)) {
            chosenSpot = spot;
            break;
          }
        }
        plantG.position.set(chosenSpot.x, 0, chosenSpot.z);
        const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.42, 24), new THREE.MeshStandardMaterial({ color: 0x22252a, roughness: 0.85 }));
        pot.position.y = 0.21;
        pot.castShadow = true;
        plantG.add(pot);
        const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.02, 24), new THREE.MeshStandardMaterial({ color: 0x2b1e15, roughness: 0.95 }));
        soil.position.y = 0.41;
        plantG.add(soil);
        const bambooMat = new THREE.MeshStandardMaterial({ color: 0x5a7a40, roughness: 0.5 });
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x6e964b, roughness: 0.4, side: THREE.DoubleSide });
        for (let b = 0; b < 6; b++) {
          const bx = (Math.random() - 0.5) * 0.16;
          const bz = (Math.random() - 0.5) * 0.16;
          const bh = 1.45 + Math.random() * 0.45;
          const culm = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, bh, 12), bambooMat);
          culm.position.set(bx, 0.40 + bh / 2, bz);
          culm.castShadow = true;
          plantG.add(culm);
          for (let l = 0; l < 5; l++) {
            const ly = 0.70 + l * 0.25;
            const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.035), leafMat);
            leaf.position.set(bx + 0.05, ly, bz);
            leaf.rotation.z = (Math.random() - 0.5) * 0.7;
            leaf.rotation.y = Math.random() * Math.PI * 2;
            plantG.add(leaf);
          }
        }
        themeAccentsGroup.add(plantG);

      } else if (isIndustrial) {
        // Suspended vintage industrial black cord pendant lights over vanity
        for (let px of [-0.42, 0.42]) {
          const pendantG = new THREE.Group();
          const pz = -roomDepth / 2 + 0.38;
          pendantG.position.set(vanityX + px, 0, pz);

          const canopy = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.015, 16), industrialSteelMat);
          canopy.position.y = roomHeight - 0.008;
          pendantG.add(canopy);

          const cordLen = 0.75;
          const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, cordLen, 8), industrialSteelMat);
          cord.position.y = roomHeight - cordLen / 2;
          pendantG.add(cord);

          const socketY = roomHeight - cordLen;
          const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, 0.065, 16), industrialSteelMat);
          socket.position.y = socketY;
          pendantG.add(socket);

          const bulb = new THREE.Mesh(
            new THREE.SphereGeometry(0.038, 16, 16),
            new THREE.MeshPhysicalMaterial({
              color: 0xffdfaa,
              emissive: 0xffaa33,
              emissiveIntensity: 1.5,
              roughness: 0.1,
              transparent: true,
              opacity: 0.85
            })
          );
          bulb.position.y = socketY - 0.045;
          bulb.scale.set(1.0, 1.35, 1.0);
          pendantG.add(bulb);

          const edisonLight = new THREE.PointLight(0xffb84d, 0.60, 2.5);
          edisonLight.position.y = socketY - 0.05;
          pendantG.add(edisonLight);

          themeAccentsGroup.add(pendantG);
        }

        // Industrial matte black towel bar on wall (generic collision-aware)
        const barG = new THREE.Group();
        let barX = roomWidth / 2 - 0.025;
        let barZ = -roomDepth / 2 + 0.85;
        if (isSpatialZoneOccupied(barX, barZ, 0.45)) {
          barX = -roomWidth / 2 + 0.025;
        }
        barG.position.set(barX, 1.20, barZ);
        const barRail = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.55), industrialSteelMat);
        barG.add(barRail);
        const barPost1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.02), industrialSteelMat);
        barPost1.position.set(0.02, 0, -0.25);
        barG.add(barPost1);
        const barPost2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.02), industrialSteelMat);
        barPost2.position.set(0.02, 0, 0.25);
        barG.add(barPost2);
        const darkTowel = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.35, 0.38), new THREE.MeshStandardMaterial({ color: 0x222428, roughness: 0.95 }));
        darkTowel.position.set(-0.01, -0.15, 0);
        barG.add(darkTowel);
        themeAccentsGroup.add(barG);
      }
    }

    function applyAestheticTheme(themeName) {
      if (!themeName || themeName === 'None' || themeName === 'none') {
        resetThemeToDefault();
        return;
      }
      currentSelectedTheme = themeName;

      // 1. Update walls & floor procedural textures and physical parameters
      let wallType = 'square';
      let floorType = 'slate';
      let wallRoughness = 0.45, wallMetalness = 0.02;
      let floorRoughness = 0.70, floorMetalness = 0.02;

      if (themeName === 'Minimalist Modern') {
        wallType = 'minimalist-modern';
        floorType = 'minimalist-sand';
        wallRoughness = 0.50;
        floorRoughness = 0.65;
      } else if (themeName === 'Classic Luxury') {
        wallType = 'calacatta-gold';
        floorType = 'calacatta-gold';
        wallRoughness = 0.12;
        wallMetalness = 0.04;
        floorRoughness = 0.10;
        floorMetalness = 0.04;
      } else if (themeName === 'Japanese Zen') {
        wallType = 'japanese-zen';
        floorType = 'japanese-limestone';
        wallRoughness = 0.65;
        floorRoughness = 0.75;
      } else if (themeName === 'Industrial Chic' || themeName === 'Industrial Contemporary') {
        wallType = 'industrial-chic';
        floorType = 'industrial-slate';
        wallRoughness = 0.80;
        floorRoughness = 0.85;
      } else if (themeName.includes('WasteLAB') || themeName.includes('Eco')) {
        wallType = 'wastelab';
        floorType = 'wastelab-terrazzo';
        wallRoughness = 0.35;
        floorRoughness = 0.45;
      }

      const wTexX = generateWallTileTexture(wallType, roomWidth, roomHeight);
      const wTexZ = generateWallTileTexture(wallType, roomDepth, roomHeight);
      [backWallMesh, frontWallMesh].forEach(mesh => {
        if (mesh && mesh.material) {
          mesh.material.map = wTexX;
          mesh.material.roughness = wallRoughness;
          mesh.material.metalness = wallMetalness;
          mesh.material.needsUpdate = true;
        }
      });
      [leftWallMesh, rightWallMesh].forEach(mesh => {
        if (mesh && mesh.material) {
          mesh.material.map = wTexZ;
          mesh.material.roughness = wallRoughness;
          mesh.material.metalness = wallMetalness;
          mesh.material.needsUpdate = true;
        }
      });
      if (floorMesh && floorMesh.material) {
        const fTex = generateFloorTileTexture(floorType, roomWidth, roomDepth);
        floorMesh.material.map = fTex;
        floorMesh.material.roughness = floorRoughness;
        floorMesh.material.metalness = floorMetalness;
        floorMesh.material.needsUpdate = true;
      }

      // 2. Adjust lighting tone for mood
      if (themeName === 'Classic Luxury') {
        if (roomAmbLight) roomAmbLight.color.set(0xffeedd);
        if (roomKeySun) roomKeySun.color.set(0xfff5ea);
      } else if (themeName === 'Industrial Chic' || themeName === 'Industrial Contemporary') {
        if (roomAmbLight) roomAmbLight.color.set(0xe8edf2);
        if (roomKeySun) roomKeySun.color.set(0xf1f5f9);
      } else if (themeName === 'Japanese Zen') {
        if (roomAmbLight) roomAmbLight.color.set(0xfff2df);
        if (roomKeySun) roomKeySun.color.set(0xffeed6);
      } else {
        if (roomAmbLight) roomAmbLight.color.set(0xfff7ec);
        if (roomKeySun) roomKeySun.color.set(0xfff8ee);
      }

      // 3. Update theme-specific architectural accents (sconces, slats, plants, pendants, rug)
      updateThemeArchitecturalAccents(themeName);

      // 4. Update all currently placed products to match the new theme finishes
      placedProducts.forEach(p => applyThemeMaterialsToProduct(p, themeName));

      // 5. Update UI theme indicator in subnav and modal buttons
      const subnavLabel = document.getElementById('subnav-theme-label');
      if (subnavLabel) subnavLabel.innerText = themeName;

      document.querySelectorAll('.ai-theme-btn').forEach(btn => {
        if (btn.dataset.theme === themeName) {
          btn.classList.add('active', 'border-black', 'bg-gray-50', 'border-2');
          btn.classList.remove('border-gray-200', 'bg-white', 'border-emerald-200', 'bg-emerald-50/40');
        } else {
          btn.classList.remove('active', 'border-black', 'bg-gray-50', 'border-2');
          if (btn.dataset.theme === 'Kohler WasteLAB Eco-Luxury') {
            btn.classList.add('border-emerald-200', 'bg-emerald-50/40');
          } else {
            btn.classList.add('border-gray-200', 'bg-white');
          }
        }
      });

      showToast(`Aesthetic Theme Applied: ${themeName}`);
    }

    function buildDoorMesh() {
      const g = new THREE.Group();
      const dw = 0.88, dh = 2.12, trimW = 0.07, trimD = 0.045;

      const topTrim = new THREE.Mesh(new THREE.BoxGeometry(dw + trimW * 2, trimW, trimD), whiteLaminateMat);
      topTrim.position.set(0, dh + trimW / 2, 0.015); topTrim.castShadow = true; g.add(topTrim);

      const leftTrim = new THREE.Mesh(new THREE.BoxGeometry(trimW, dh + trimW, trimD), whiteLaminateMat);
      leftTrim.position.set(-dw / 2 - trimW / 2, (dh + trimW) / 2, 0.015); leftTrim.castShadow = true; g.add(leftTrim);

      const rightTrim = new THREE.Mesh(new THREE.BoxGeometry(trimW, dh + trimW, trimD), whiteLaminateMat);
      rightTrim.position.set(dw / 2 + trimW / 2, (dh + trimW) / 2, 0.015); rightTrim.castShadow = true; g.add(rightTrim);

      const leaf = new THREE.Mesh(new THREE.BoxGeometry(dw, dh, 0.035), whiteLaminateMat);
      leaf.position.set(0, dh / 2, -0.005); leaf.castShadow = true; leaf.receiveShadow = true; g.add(leaf);

      const escutcheon = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.16, 0.008), chromeMat);
      escutcheon.position.set(dw / 2 - 0.10, 1.04, 0.018); g.add(escutcheon);

      const lever = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.12, 16), chromeMat);
      lever.rotation.z = Math.PI / 2; lever.position.set(dw / 2 - 0.15, 1.07, 0.032); g.add(lever);

      return g;
    }
