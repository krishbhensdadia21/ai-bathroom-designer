    // ==================== KOHLER-MITWPU AI RESEARCH LAB ABOUT MODAL HANDLERS ====================
    function openAboutModal() {
      const modal = document.getElementById('modal-about-program');
      if (modal) modal.classList.remove('hidden');
    }

    function closeAboutModal() {
      const modal = document.getElementById('modal-about-program');
      if (modal) modal.classList.add('hidden');
    }

    // ==================== STUDIO KOHLER ARCHITECTURAL SPECIFIER HANDLERS ====================

    function openStudioKohlerModal() {
      const tbody = document.getElementById('studio-kohler-tbody');
      tbody.innerHTML = '';

      const wFt = (roomWidth * 3.28084).toFixed(1);
      const dFt = (roomDepth * 3.28084).toFixed(1);
      const hFt = (roomHeight * 3.28084).toFixed(1);
      const sqFt = (roomWidth * roomDepth * 10.7639).toFixed(1);
      document.getElementById('specifier-room-meta').innerText = `${wFt} ft × ${dFt} ft (${sqFt} sq ft) | Ceiling: ${hFt} ft | Wet-Wall: North Stack`;

      if (!placedProducts.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-gray-400 font-bold">No Kohler fixtures currently placed in room.</td></tr>`;
      } else {
        placedProducts.forEach(p => {
          const d = p.userData || {};
          const cat = d.category || 'toilets';

          let roughIn = '12" (305mm) rough-in from wall';
          let conduits = 'Cold: 1/2" PEX | Drain: 4" PVC';
          let flow = '1.28 GPF (4.8 LPF)';
          let standard = 'ASME A112.19.2 / EPA WaterSense';

          if (cat === 'toilets') {
            roughIn = '12" rough-in from finished wall, 5-1/2" bolt centers';
            conduits = 'Supply: 1/2" PEX cold stop | Soil: 4" PVC flange';
            flow = '1.28 GPF (4.8 LPF) Revolution 360™';
            standard = 'ASME A112.19.2 / CSA B45.1 / ADA';
          } else if (cat === 'vanities') {
            roughIn = 'Waste outlet 19" AFF | Hot/Cold supplies 21" AFF, 4" spread';
            conduits = 'Hot/Cold: 1/2" PEX stub-outs | Waste: 1-1/4" brass P-trap';
            flow = '1.2 GPM (4.5 LPM) WaterSense aerator';
            standard = 'IAPMO / cUPC / ASME A112.18.1';
          } else if (cat === 'showers') {
            roughIn = 'Valve rough-in 48" AFF | Rainhead drop ear 84" AFF';
            conduits = 'Supply: 1/2" NPT Hot/Cold | Drain: 2" PVC shower drain';
            flow = '1.75 GPM Katalyst™ Air-Induction';
            standard = 'ASSE 1016 / EPA WaterSense / Title 24';
          } else if (cat === 'bathtubs') {
            roughIn = 'Center toe-tap drain with overflow waste kit';
            conduits = 'Supplies: 1/2" PEX | Drain: 1-1/2" PVC trap';
            flow = '72 Gallons ergonomic capacity';
            standard = 'CSA B45.5 / IAPMO Z124';
          } else if (cat === 'mirrors') {
            roughIn = 'Recessed or surface mount at 60" AFF center';
            conduits = 'Electrical: Dedicated 120V 15A GFCI junction box';
            flow = '90+ CRI LED, 2700K–5000K tunable';
            standard = 'UL 962 / FCC Part 15 / Title 24';
          }

          const tr = document.createElement('tr');
          tr.className = 'hover:bg-gray-50/80 transition text-xs';
          tr.innerHTML = `
            <td class="p-3">
              <div class="font-bold text-gray-900">${d.name || 'Fixture'}</div>
              <div class="text-[10px] text-amber-700 font-mono font-semibold uppercase">${d.series || 'Kohler'}</div>
            </td>
            <td class="p-3 font-mono font-bold text-gray-800">${d.art || 'K-5401IN-0'}</td>
            <td class="p-3 text-gray-600">${roughIn}</td>
            <td class="p-3 text-gray-600 font-mono text-[11px]">${conduits}</td>
            <td class="p-3 text-emerald-800 font-semibold">${flow}</td>
            <td class="p-3 text-[10px] text-gray-500">${standard}</td>
          `;
          tbody.appendChild(tr);
        });
      }

      document.getElementById('modal-studio-kohler').classList.remove('hidden');
    }

    function closeStudioKohlerModal() {
      document.getElementById('modal-studio-kohler').classList.add('hidden');
    }

    function copySpecifierTable() {
      let text = "STUDIO KOHLER ARCHITECTURAL SPECIFICATION PACKET\n";
      text += "Project: KOHLER-AI-9021\n";
      text += "=".repeat(60) + "\n\n";
      placedProducts.forEach((p, i) => {
        const d = p.userData || {};
        text += `${i+1}. ${d.name} (${d.series}) — SKU: ${d.art}\n`;
        text += `   Category: ${d.category} | Dimensions: ${d.dim}\n\n`;
      });
      navigator.clipboard.writeText(text).then(() => showToast('Architectural Spec copied to clipboard!'));
    }

    // ==================== 11. PLUMBING WET-WALL & SUB-FLOOR CONDUIT SYSTEM ====================
    function buildPlumbingConduits() {
      if (!wetWallGroup) return;
      while (wetWallGroup.children.length > 0) {
        const obj = wetWallGroup.children[0];
        wetWallGroup.remove(obj);
      }

      const wetWallZ = -roomDepth / 2 + 0.12;
      const subFloorY = -0.045;

      // 1. Main 4" PVC Drainage Stack running along the back wet-wall
      const mainDrainGeo = new THREE.CylinderGeometry(0.045, 0.045, roomWidth * 0.95, 16);
      const mainDrainMat = new THREE.MeshStandardMaterial({
        color: 0xebedf0,
        roughness: 0.35,
        metalness: 0.1
      });
      const mainDrain = new THREE.Mesh(mainDrainGeo, mainDrainMat);
      mainDrain.rotation.z = Math.PI / 2;
      mainDrain.position.set(0, subFloorY, wetWallZ);
      wetWallGroup.add(mainDrain);

      // Cleanout plug on left end
      const cleanoutGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.04, 16);
      const brassMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.7 });
      const cleanout = new THREE.Mesh(cleanoutGeo, brassMat);
      cleanout.rotation.z = Math.PI / 2;
      cleanout.position.set(-roomWidth * 0.47, subFloorY, wetWallZ);
      wetWallGroup.add(cleanout);

      // 2. Hot (Red) and Cold (Blue) PEX Supply Conduits running parallel
      const pexRadius = 0.012;
      const hotMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.25, metalness: 0.2 });
      const coldMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.25, metalness: 0.2 });

      const hotPipeGeo = new THREE.CylinderGeometry(pexRadius, pexRadius, roomWidth * 0.92, 12);
      const hotPipe = new THREE.Mesh(hotPipeGeo, hotMat);
      hotPipe.rotation.z = Math.PI / 2;
      hotPipe.position.set(0, subFloorY + 0.035, wetWallZ - 0.03);
      wetWallGroup.add(hotPipe);

      const coldPipeGeo = new THREE.CylinderGeometry(pexRadius, pexRadius, roomWidth * 0.92, 12);
      const coldPipe = new THREE.Mesh(coldPipeGeo, coldMat);
      coldPipe.rotation.z = Math.PI / 2;
      coldPipe.position.set(0, subFloorY + 0.035, wetWallZ + 0.03);
      wetWallGroup.add(coldPipe);

      // 3. Dynamic branch connections for placed plumbing fixtures
      placedProducts.forEach(p => {
        const cat = p.userData ? p.userData.category : '';
        if (['toilets', 'vanities', 'showers', 'bathtubs'].includes(cat)) {
          const fx = p.position.x;
          const fz = p.position.z;

          // Branch drain from fixture to main wet-wall drain stack
          const branchLen = Math.max(0.1, Math.abs(fz - wetWallZ));
          const branchGeo = new THREE.CylinderGeometry(0.028, 0.028, branchLen, 12);
          const branch = new THREE.Mesh(branchGeo, mainDrainMat);
          branch.rotation.x = Math.PI / 2;
          branch.position.set(fx, subFloorY - 0.005, (fz + wetWallZ) / 2);
          wetWallGroup.add(branch);

          // Vertical stub-outs for water supply and soil stack
          const stubGeo = new THREE.CylinderGeometry(pexRadius * 0.9, pexRadius * 0.9, 0.35, 12);
          const hotStub = new THREE.Mesh(stubGeo, hotMat);
          hotStub.position.set(fx - 0.05, subFloorY + 0.17, wetWallZ);
          wetWallGroup.add(hotStub);

          const coldStub = new THREE.Mesh(stubGeo, coldMat);
          coldStub.position.set(fx + 0.05, subFloorY + 0.17, wetWallZ);
          wetWallGroup.add(coldStub);
        }
      });
    }

    function updateWetWallScore() {
      const plumbingFixtures = placedProducts.filter(p => {
        const cat = p.userData ? p.userData.category : '';
        return ['toilets', 'vanities', 'showers', 'bathtubs'].includes(cat);
      });

      if (!plumbingFixtures.length) {
        const label = document.getElementById('label-wetwall-status');
        if (label) label.innerText = 'Wet-Wall: N/A';
        return;
      }

      const wetWallZ = -roomDepth / 2;
      let onWetWallCount = 0;

      plumbingFixtures.forEach(p => {
        if (Math.abs(p.position.z - wetWallZ) < 0.65) {
          onWetWallCount++;
        }
      });

      const score = Math.round((onWetWallCount / plumbingFixtures.length) * 100);
      const estSavings = Math.round((score / 100) * 45000);

      const label = document.getElementById('label-wetwall-status');
      if (label) {
        label.innerText = `Wet-Wall: ${score}%`;
      }
      const aiScore = document.getElementById('ai-wetwall-score');
      if (aiScore) {
        aiScore.innerText = `${score}% (Save ₹${(estSavings / 1000).toFixed(0)}K)`;
      }
    }

    function toggleWetWallInspection(forceState) {
      if (typeof forceState === 'boolean') {
        isWetWallActive = forceState;
      } else {
        isWetWallActive = !isWetWallActive;
      }

      if (wetWallGroup) wetWallGroup.visible = isWetWallActive;
      const chk = document.getElementById('toggle-plumbing');
      if (chk) chk.checked = isWetWallActive;

      // X-Ray Floor View: makes floor translucent so sub-floor conduits are clearly visible!
      if (floorMesh && floorMesh.material) {
        if (isWetWallActive) {
          floorMesh.material.transparent = true;
          floorMesh.material.opacity = 0.52;
          floorMesh.material.needsUpdate = true;
          showToast('Wet-Wall X-Ray Mode: Active');
        } else {
          floorMesh.material.transparent = false;
          floorMesh.material.opacity = 1.0;
          floorMesh.material.needsUpdate = true;
          showToast('Wet-Wall Conduits: Hidden');
        }
      }
    }

    // ==================== 12. INTERACTIVE LIGHTING & AMBIANCE CONTROLS ====================
    function setLightingAmbiance(mode) {
      currentLightingMode = mode;
      document.querySelectorAll('.light-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'text-black', 'shadow-xs');
        btn.classList.add('text-gray-600');
      });
      const activeBtn = document.getElementById(`btn-light-${mode}`);
      if (activeBtn) {
        activeBtn.classList.add('bg-white', 'text-black', 'shadow-xs');
        activeBtn.classList.remove('text-gray-600');
      }

      const kelvinColor = getKelvinColor(currentKelvin);

      if (mode === 'day') {
        scene.background = new THREE.Color(0xe6e1da);
        if (roomAmbLight) {
          roomAmbLight.color.set(0xfff7ec);
          roomAmbLight.intensity = 0.42;
        }
        if (roomKeySun) {
          roomKeySun.color.set(kelvinColor);
          roomKeySun.intensity = 0.85;
          roomKeySun.position.set(3.0, 5.0, 3.4);
        }
        if (roomFillLight) {
          roomFillLight.intensity = 0.25;
        }
        if (roomBackWallSpot) {
          roomBackWallSpot.intensity = 1.35;
        }
        setFixtureNightEmissives(false);
        showToast('Ambiance: Daylight Showroom (5000K)');
      } else if (mode === 'dusk') {
        scene.background = new THREE.Color(0x3a3028);
        if (roomAmbLight) {
          roomAmbLight.color.set(0xff9944);
          roomAmbLight.intensity = 0.28;
        }
        if (roomKeySun) {
          roomKeySun.color.set(0xff8833);
          roomKeySun.intensity = 0.55;
          roomKeySun.position.set(4.5, 2.2, 4.0);
        }
        if (roomFillLight) {
          roomFillLight.intensity = 0.15;
        }
        if (roomBackWallSpot) {
          roomBackWallSpot.intensity = 1.8;
          roomBackWallSpot.color.set(0xffcc88);
        }
        setFixtureNightEmissives(true, 1.2);
        showToast('Ambiance: Sunset Dusk (2700K Warm)');
      } else if (mode === 'night') {
        scene.background = new THREE.Color(0x0a0d14);
        if (roomAmbLight) {
          roomAmbLight.color.set(0x1e293b);
          roomAmbLight.intensity = 0.14;
        }
        if (roomKeySun) {
          roomKeySun.color.set(0x38bdf8);
          roomKeySun.intensity = 0.18;
        }
        if (roomFillLight) {
          roomFillLight.intensity = 0.08;
        }
        if (roomBackWallSpot) {
          roomBackWallSpot.intensity = 2.4;
          roomBackWallSpot.color.set(0xffe4b5);
        }
        setFixtureNightEmissives(true, 3.0);
        showToast('Ambiance: Night Mode (Smart Mirror & Under-Vanity Glow)');
      }
    }

    function setLightingKelvin(k) {
      currentKelvin = k;
      document.querySelectorAll('.kelvin-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'text-black', 'shadow-xs');
        btn.classList.add('text-gray-600');
      });
      const activeBtn = document.getElementById(`btn-kelvin-${k}`);
      if (activeBtn) {
        activeBtn.classList.add('bg-white', 'text-black', 'shadow-xs');
        activeBtn.classList.remove('text-gray-600');
      }

      const col = getKelvinColor(k);
      if (roomKeySun && currentLightingMode !== 'night') {
        roomKeySun.color.set(col);
      }
      if (roomBackWallSpot) {
        roomBackWallSpot.color.set(col);
      }
      showToast(`Color Temperature: ${k}K`);
    }

    function getKelvinColor(k) {
      if (k <= 2700) return 0xffa953;
      if (k <= 3500) return 0xffd199;
      if (k <= 4000) return 0xfff4e5;
      if (k <= 5000) return 0xffffff;
      return 0xd6e8ff;
    }

    function setFixtureNightEmissives(enable, intensity = 2.5) {
      placedProducts.forEach(p => {
        p.traverse(child => {
          if (child.isMesh && child.material) {
            if (child.name === 'mirror-glow' || (child.material.emissive && child.material.emissive.b > 0.4)) {
              child.material.emissive = new THREE.Color(enable ? 0x06b6d4 : 0x000000);
              child.material.emissiveIntensity = enable ? intensity : 0.0;
            }
            if (child.name === 'vanity-underglow') {
              child.material.emissive = new THREE.Color(enable ? 0xf59e0b : 0x000000);
              child.material.emissiveIntensity = enable ? intensity * 0.8 : 0.0;
            }
            if (child.name === 'toilet-nightlight') {
              child.material.emissive = new THREE.Color(enable ? 0x38bdf8 : 0x000000);
              child.material.emissiveIntensity = enable ? intensity : 0.0;
            }
          }
        });
      });
    }

    // ==================== 13. STANDARD BATHROOM PRESETS ====================
    function applyLayoutPreset(presetKey) {
      placedProducts.forEach(p => scene.remove(p));
      placedProducts.length = 0;
      deselectActiveObject();

      if (presetKey === 'powder') {
        roomWidth = 1.52; // 5.0 ft
        roomDepth = 2.13; // 7.0 ft
        roomHeight = 2.60;
        buildRoomArchitecture();
        spawnProductById('veil-smart-toilet', -0.32, -roomDepth / 2 + 0.38, 0);
        spawnProductById('brazn-console', 0.32, -roomDepth / 2 + 0.34, 0);
        spawnProductById('verdera-mirror', 0.32, -roomDepth / 2 + 0.08, 0);
        applyAestheticTheme('Minimalist Modern');
        showToast('Loaded: Powder Room Preset (5.0 × 7.0 ft)');
      } else if (presetKey === 'family') {
        roomWidth = 2.44; // 8.0 ft
        roomDepth = 2.44; // 8.0 ft
        roomHeight = 2.60;
        buildRoomArchitecture();
        spawnProductById('veil-smart-toilet', -0.65, -roomDepth / 2 + 0.38, 0);
        spawnProductById('tailored-dual-vanity', 0.20, -roomDepth / 2 + 0.36, 0);
        spawnProductById('verdera-mirror', 0.20, -roomDepth / 2 + 0.08, 0);
        spawnProductById('hydrorail-shower', roomWidth / 2 - 0.50, -roomDepth / 2 + 0.52, 0);
        applyAestheticTheme('Minimalist Modern');
        showToast('Loaded: Family Bathroom Preset (8.0 × 8.0 ft)');
      } else if (presetKey === 'master') {
        roomWidth = 3.20; // 10.5 ft
        roomDepth = 3.65; // 12.0 ft
        roomHeight = 2.74;
        buildRoomArchitecture();
        spawnProductById('veil-smart-toilet', -0.95, -roomDepth / 2 + 0.38, 0);
        spawnProductById('tailored-dual-vanity', 0.35, -roomDepth / 2 + 0.36, 0);
        spawnProductById('verdera-mirror', 0.35, -roomDepth / 2 + 0.08, 0);
        spawnProductById('revel-glass-box', 1.05, -roomDepth / 2 + 0.60, 0);
        spawnProductById('hydrorail-shower', 1.05, -roomDepth / 2 + 0.60, 0);
        spawnProductById('evok-freestanding-tub', -0.75, 0.75, Math.PI / 2);
        applyAestheticTheme('Classic Luxury');
        showToast('Loaded: Luxury Master Spa Suite (10.5 × 12.0 ft)');
      } else if (presetKey === 'zen') {
        roomWidth = 2.74; // 9.0 ft
        roomDepth = 3.05; // 10.0 ft
        roomHeight = 2.60;
        buildRoomArchitecture();
        spawnProductById('veil-smart-toilet', -0.72, -roomDepth / 2 + 0.38, 0);
        spawnProductById('brazn-console', 0.25, -roomDepth / 2 + 0.34, 0);
        spawnProductById('verdera-mirror', 0.25, -roomDepth / 2 + 0.08, 0);
        spawnProductById('evok-freestanding-tub', 0.65, 0.45, 0);
        spawnProductById('hydrorail-shower', 0.65, -roomDepth / 2 + 0.52, 0);
        applyAestheticTheme('Japanese Zen');
        showToast('Loaded: Japanese Zen Wet-Room (9.0 × 10.0 ft)');
      }

      deselectActiveObject();
      updateTotalBOM();
      updateClearanceVisualizer();
      updateWetWallScore();
    }

    // ==================== 18. SHOWROOM LOCATOR & DEALER RFQ ====================
    function openShowroomModal() {
      document.getElementById('modal-showroom-locator').classList.remove('hidden');
      let totalVal = 0;
      placedProducts.forEach(p => totalVal += (currentCurrency === 'INR' ? p.userData.price_inr : p.userData.price_usd));
      document.getElementById('rfq-total-amount').innerText = formatCurrency(totalVal);
      const note = document.getElementById('rfq-items-summary-note');
      if (note) {
        const uniqueSkus = new Set(placedProducts.map(p => p.userData.art)).size;
        note.innerText = `Includes ${placedProducts.length} Kohler luxury fixtures (${uniqueSkus} unique SKUs), rough-in cut sheets, LEED water specs & formal quotation docket.`;
      }
    }

    function closeShowroomModal() {
      document.getElementById('modal-showroom-locator').classList.add('hidden');
    }

    function submitShowroomRfq() {
      const name = document.getElementById('rfq-name').value || 'Authorized Architect';
      const phone = document.getElementById('rfq-phone').value || '+91 98200 12345';
      const email = document.getElementById('rfq-email').value || 'client@architects.in';
      const city = document.getElementById('showroom-select').selectedOptions[0].text;
      const rfqId = `RFQ-KHLR-${Math.floor(1000 + Math.random() * 9000)}`;

      closeShowroomModal();
      showToast(`RFQ Transmitted: ${rfqId} dispatched to Kohler Experience Center (${city}) for ${name}!`);
    }

    function updateDynamicWallVisibility() {
      if (!camera || roomWallDefinitions.length === 0) return;

      if (currentViewMode === '2d') {
        roomWallDefinitions.forEach(w => {
          if (w.mesh) w.mesh.visible = true;
          if (w.caps) w.caps.forEach(c => { if (c) c.visible = true; });
          if (w.door) w.door.visible = true;
        });
        return;
      }

      // Check if camera is inside room (e.g. walk-in view)
      const insideX = Math.abs(camera.position.x) < (roomWidth / 2 - 0.05);
      const insideZ = Math.abs(camera.position.z) < (roomDepth / 2 - 0.05);
      const isInside = insideX && insideZ;

      if (isInside) {
        roomWallDefinitions.forEach(w => {
          if (w.mesh) w.mesh.visible = true;
          if (w.caps) w.caps.forEach(c => { if (c) c.visible = true; });
          if (w.door) w.door.visible = true;
        });
        placedProducts.forEach(p => {
          if (p.userData && p.userData.category === 'mirrors') p.visible = true;
        });
        return;
      }

      // Exterior viewing ray from camera to each wall center
      const camPos = camera.position;
      const ray = new THREE.Vector3();

      roomWallDefinitions.forEach(w => {
        ray.subVectors(w.center, camPos).normalize();
        // Dot product between camera-to-wall ray and wall outward normal:
        // When dot < -0.05, viewing ray opposes outward normal (camera is outside looking through this wall towards interior)
        // -> Wall is in front of the interior and obstructs the user's view -> hide it!
        const dot = ray.dot(w.normal);
        const shouldHide = (dot < -0.05);
        const isVisible = !shouldHide;

        if (w.mesh) w.mesh.visible = isVisible;
        if (w.caps) w.caps.forEach(c => { if (c) c.visible = isVisible; });
        if (w.door) w.door.visible = isVisible;

        // Synchronize wall-mounted fixtures (mirrors) attached to this wall
        placedProducts.forEach(p => {
          if (p.userData && p.userData.category === 'mirrors') {
            const attachedWall = p.userData.attachedWall || getFixtureAttachedWall(p);
            if (attachedWall === w.id) {
              p.visible = isVisible;
            }
          }
        });
      });
    }

    function getFixtureAttachedWall(p) {
      if (!p) return null;
      if (p.userData && p.userData.attachedWall) return p.userData.attachedWall;
      const snapDist = 0.25;
      if (Math.abs(p.position.z - (-roomDepth / 2)) < snapDist) return 'back';
      if (Math.abs(p.position.z - (roomDepth / 2)) < snapDist) return 'front';
      if (Math.abs(p.position.x - (-roomWidth / 2)) < snapDist) return 'left';
      if (Math.abs(p.position.x - (roomWidth / 2)) < snapDist) return 'right';
      return null;
    }

    // ==================== 19. ANIMATION LOOP ====================
    function animate() {
      requestAnimationFrame(animate);
      if (controls && currentViewMode !== '2d') controls.update();
      updateDynamicWallVisibility();
      renderer.render(scene, camera);
    }

    window.onload = initApp;