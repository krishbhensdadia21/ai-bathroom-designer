    // ==================== 11. LOCALSTORAGE, EXPORT & FINISHES ====================
    function savePlanToStorage() {
      const planNameEl = document.getElementById('plan-name-display');
      const saveStatusEl = document.getElementById('save-status-label');
      const planData = {
        name: planNameEl ? planNameEl.innerText : 'Kohler Luxury Master Suite',
        code: 'KOHLER-AI-9021',
        dimensions: { width: roomWidth, depth: roomDepth, height: roomHeight },
        products: placedProducts.map(p => ({
          id: p.userData.id,
          pos: { x: p.position.x, y: p.position.y, z: p.position.z },
          rotY: p.rotation.y,
          finish: p.userData.currentFinish
        }))
      };
      localStorage.setItem('kohler_ai_plan', JSON.stringify(planData));
      if (saveStatusEl) saveStatusEl.innerText = 'Saved just now';
      showToast('Plan KOHLER-AI-9021 saved to browser storage!');
    }

    function exportPlanJSON() {
      const planNameEl = document.getElementById('plan-name-display');
      const planData = {
        name: planNameEl ? planNameEl.innerText : 'Kohler Luxury Master Suite',
        code: 'KOHLER-AI-9021',
        exportedAt: new Date().toISOString(),
        room: { widthM: roomWidth, depthM: roomDepth, heightM: roomHeight, widthFt: (roomWidth * 3.28084).toFixed(1), depthFt: (roomDepth * 3.28084).toFixed(1) },
        items: placedProducts.map(p => ({
          name: p.userData.name,
          sku: p.userData.art,
          series: p.userData.series,
          priceINR: p.userData.price_inr,
          priceUSD: p.userData.price_usd,
          position: [p.position.x, p.position.y, p.position.z],
          rotationY: p.rotation.y
        }))
      };
      const blob = new Blob([JSON.stringify(planData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'KOHLER-Bathroom-Plan-9021.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Plan exported as JSON!');
    }

    function copyPlanCode() {
      navigator.clipboard.writeText('KOHLER-AI-9021').then(() => showToast('Planning code copied: KOHLER-AI-9021'));
    }

    function promptRenamePlan() {
      const planNameEl = document.getElementById('plan-name-display');
      const current = planNameEl ? planNameEl.innerText : 'Kohler Luxury Master Suite';
      const val = prompt('Rename your Kohler bathroom project:', current);
      if (val && val.trim()) {
        if (planNameEl) planNameEl.innerText = val.trim();
        showToast('Project renamed');
      }
    }

    function toggleImmersiveView(isImmersive) {
      const header = document.getElementById('main-header');
      const subnav = document.getElementById('workspace-subnav');
      const catalog = document.getElementById('catalog-sidebar');
      const rightTools = document.getElementById('bottom-right-tools');
      const inspector = document.getElementById('inspector-card');

      if (isImmersive) {
        if (header) header.classList.add('hidden');
        if (subnav) subnav.classList.add('hidden');
        if (catalog) catalog.classList.add('hidden');
        if (rightTools) rightTools.classList.add('hidden');
        if (inspector) inspector.classList.add('hidden');
        if (typeof closeCatalogDrawer === 'function') closeCatalogDrawer();
        showToast('Clean 3D View: Active');
      } else {
        if (header) header.classList.remove('hidden');
        if (subnav) subnav.classList.remove('hidden');
        if (catalog) catalog.classList.remove('hidden');
        if (rightTools) rightTools.classList.remove('hidden');
        showToast('3D View: Controls Restored');
      }

      // Smoothly resize 3D viewport canvas to fit viewport
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        if (typeof onWindowResize === 'function') onWindowResize();
      }, 50);
    }

    function toggleGridVisibility(visible) {
      if (gridHelper) gridHelper.visible = visible;
    }

    function togglePlumbingMarkers(visible) {
      toggleWetWallInspection(visible);
    }

    function resetThemeToDefault() {
      currentSelectedTheme = 'None';

      // 1. Clear theme architectural accents (rugs, sconces, plants, slats, etc.)
      if (themeAccentsGroup) {
        while (themeAccentsGroup.children.length > 0) {
          themeAccentsGroup.remove(themeAccentsGroup.children[0]);
        }
      }

      // 2. Reset 4 walls to neutral standard off-white ceramic architectural tile
      const neutralWallTexX = generateWallTileTexture('square', roomWidth, roomHeight);
      const neutralWallTexZ = generateWallTileTexture('square', roomDepth, roomHeight);
      [backWallMesh, frontWallMesh].forEach(mesh => {
        if (mesh && mesh.material) {
          mesh.material.map = neutralWallTexX;
          mesh.material.roughness = 0.45;
          mesh.material.metalness = 0.02;
          mesh.material.needsUpdate = true;
        }
      });
      [leftWallMesh, rightWallMesh].forEach(mesh => {
        if (mesh && mesh.material) {
          mesh.material.map = neutralWallTexZ;
          mesh.material.roughness = 0.45;
          mesh.material.metalness = 0.02;
          mesh.material.needsUpdate = true;
        }
      });

      // 3. Reset floor to neutral architectural slate
      if (floorMesh && floorMesh.material) {
        const neutralFloorTex = generateFloorTileTexture('slate', roomWidth, roomDepth);
        floorMesh.material.map = neutralFloorTex;
        floorMesh.material.roughness = 0.70;
        floorMesh.material.metalness = 0.02;
        floorMesh.material.needsUpdate = true;
      }

      // 4. Reset lighting to clean neutral daylight
      if (roomAmbLight) {
        roomAmbLight.color.set(0xfff7ec);
        roomAmbLight.intensity = 0.38;
      }
      if (roomKeySun) {
        roomKeySun.color.set(0xfff8ee);
        roomKeySun.intensity = 0.78;
      }
      if (roomFillLight) {
        roomFillLight.color.set(0xdce5ed);
        roomFillLight.intensity = 0.22;
      }
      if (roomBackWallSpot) {
        roomBackWallSpot.color.set(0xfffaee);
        roomBackWallSpot.intensity = 1.35;
      }

      // 5. Reset UI labels and modal theme buttons
      const subnavTheme = document.getElementById('subnav-theme-label');
      if (subnavTheme) subnavTheme.innerText = 'None';

      document.querySelectorAll('.ai-theme-btn').forEach(btn => {
        btn.classList.remove('active', 'border-black', 'bg-gray-50', 'border-2');
        if (btn.dataset.theme === 'Kohler WasteLAB Eco-Luxury') {
          btn.classList.add('border-emerald-200', 'bg-emerald-50/40');
        } else {
          btn.classList.add('border-gray-200', 'bg-white');
        }
      });
    }

    function resetRoomDimensionsToDefault() {
      roomWidth = 3.2;  // 10.5 ft
      roomDepth = 2.8;  // 9.2 ft
      roomHeight = 2.6; // 8.5 ft

      // Reset dimensions modal sliders
      const sliderW = document.getElementById('input-dim-width');
      if (sliderW) sliderW.value = 3.2;
      const sliderD = document.getElementById('input-dim-depth');
      if (sliderD) sliderD.value = 2.8;
      const sliderH = document.getElementById('input-dim-height');
      if (sliderH) sliderH.value = 2.6;

      // Reset modal labels
      const lblW = document.getElementById('modal-label-width');
      if (lblW) lblW.innerText = '10.5 ft (3.2 m)';
      const lblD = document.getElementById('modal-label-depth');
      if (lblD) lblD.innerText = '9.2 ft (2.8 m)';
      const lblH = document.getElementById('modal-label-height');
      if (lblH) lblH.innerText = '8.5 ft (2.6 m)';
      const lblArea = document.getElementById('modal-calc-area');
      if (lblArea) lblArea.innerText = '96.6 sq ft / 8.96 m²';

      // Reset AI Assistant modal dimension inputs
      const aiW = document.getElementById('ai-input-width');
      if (aiW) aiW.value = '10.5';
      const aiD = document.getElementById('ai-input-depth');
      if (aiD) aiD.value = '9.2';
      const aiH = document.getElementById('ai-input-height');
      if (aiH) aiH.value = '8.5';
      const aiArea = document.getElementById('ai-calculated-area');
      if (aiArea) aiArea.innerText = '96.6 sq ft (8.96 m²)';

      updateDimensionLabels();
      buildRoomArchitecture();
    }

    function confirmClearRoom() {
      if (confirm('Clear all placed products and reset Kohler suite?')) {
        placedProducts.forEach(p => scene.remove(p));
        placedProducts.length = 0;
        deselectActiveObject();
        setPlannerConfigurationState('reset');
        resetRoomDimensionsToDefault();
        updateTotalBOM();
        updateClearanceVisualizer();
        updateWetWallScore();
        buildPlumbingConduits();
        resetThemeToDefault();
        resetAiEngineAndConstraints();
        showToast('Room, Dimensions & Theme Reset to Default');
      }
    }

    function resetAiEngineAndConstraints() {
      // 1. Mark AI Engine as reset and clear recommendation cache
      currentAiRecommendation = null;
      isAiEngineReset = true;

      // 2. Reset Predefined Constraints
      const chkToilet = document.getElementById('prio-smart-toilet');
      if (chkToilet) chkToilet.checked = false;
      const chkShower = document.getElementById('prio-thermo-shower');
      if (chkShower) chkShower.checked = false;
      const chkVanity = document.getElementById('prio-dual-vanity');
      if (chkVanity) chkVanity.checked = false;
      const chkMirror = document.getElementById('prio-smart-mirror');
      if (chkMirror) chkMirror.checked = false;

      // Reset Dimensions inputs in AI modal
      const aiW = document.getElementById('ai-input-width');
      if (aiW) { aiW.value = ''; aiW.placeholder = 'e.g. 10.5'; }
      const aiD = document.getElementById('ai-input-depth');
      if (aiD) { aiD.value = ''; aiD.placeholder = 'e.g. 9.2'; }
      const aiH = document.getElementById('ai-input-height');
      if (aiH) { aiH.value = ''; aiH.placeholder = 'e.g. 8.5'; }
      const aiArea = document.getElementById('ai-calculated-area');
      if (aiArea) aiArea.innerText = '—';

      // Reset Theme selection highlight in AI modal
      document.querySelectorAll('.ai-theme-btn').forEach(btn => {
        btn.classList.remove('active', 'border-black', 'bg-gray-50', 'border-2');
        btn.classList.add('border-gray-200', 'bg-white');
      });

      // 3. Reset Custom AI Prompt (Tab 2)
      const customNotes = document.getElementById('ai-custom-notes');
      if (customNotes) customNotes.value = '';
      const charCount = document.getElementById('ai-custom-char-count');
      if (charCount) charCount.innerText = '0 / 500';

      const autoRoomBadge = document.getElementById('ai-auto-room-badge');
      if (autoRoomBadge) autoRoomBadge.classList.add('hidden');
      lastAutoDetectedDim = null;

      const understoodContainer = document.getElementById('ai-understood-container');
      if (understoodContainer) understoodContainer.classList.add('hidden');
      const understoodTagsEl = document.getElementById('ai-understood-tags');
      if (understoodTagsEl) understoodTagsEl.innerHTML = '';

      // 4. Reset AI Engine Output in Right Column (Show Empty State, Hide All Computed Bundles)
      const emptyContainer = document.getElementById('ai-empty-container');
      if (emptyContainer) emptyContainer.classList.remove('hidden');

      const feasibleContainer = document.getElementById('ai-feasible-container');
      if (feasibleContainer) feasibleContainer.classList.add('hidden');

      const impossibleContainer = document.getElementById('ai-impossible-container');
      if (impossibleContainer) impossibleContainer.classList.add('hidden');

      const applySection = document.getElementById('ai-apply-section');
      if (applySection) applySection.classList.add('hidden');

      const bundleItemsContainer = document.getElementById('ai-bundle-items-container');
      if (bundleItemsContainer) bundleItemsContainer.innerHTML = '';

      // Reset subnav theme label
      const subnavTheme = document.getElementById('subnav-theme-label');
      if (subnavTheme) subnavTheme.innerText = 'None';
    }

    // Finishes Modal
    function openFinishesModal() {
      document.getElementById('modal-finishes').classList.remove('hidden');
    }
    function closeFinishesModal() {
      document.getElementById('modal-finishes').classList.add('hidden');
    }
    function setWallFinish(type) {
      const texX = generateWallTileTexture(type, roomWidth, roomHeight);
      const texZ = generateWallTileTexture(type, roomDepth, roomHeight);
      if (backWallMesh && backWallMesh.material) { backWallMesh.material.map = texX; backWallMesh.material.needsUpdate = true; }
      if (frontWallMesh && frontWallMesh.material) { frontWallMesh.material.map = texX; frontWallMesh.material.needsUpdate = true; }
      if (leftWallMesh && leftWallMesh.material) { leftWallMesh.material.map = texZ; leftWallMesh.material.needsUpdate = true; }
      if (rightWallMesh && rightWallMesh.material) { rightWallMesh.material.map = texZ; rightWallMesh.material.needsUpdate = true; }
      closeFinishesModal();
      showToast('Wall surface updated');
    }
    function setFloorFinish(type) {
      const tex = generateFloorTileTexture(type, roomWidth, roomDepth);
      floorMesh.material.map = tex; floorMesh.material.needsUpdate = true;
      closeFinishesModal();
      showToast('Floor surface updated');
    }

    // Dimensions Modal
    function openDimensionsModal() {
      document.getElementById('modal-dimensions').classList.remove('hidden');
    }
    function closeDimensionsModal() {
      document.getElementById('modal-dimensions').classList.add('hidden');
    }
    function onDimensionSliderChange() {
      roomWidth = parseFloat(document.getElementById('input-dim-width').value);
      roomDepth = parseFloat(document.getElementById('input-dim-depth').value);
      roomHeight = parseFloat(document.getElementById('input-dim-height').value);

      const wFt = (roomWidth * 3.28084).toFixed(1);
      const dFt = (roomDepth * 3.28084).toFixed(1);
      const hFt = (roomHeight * 3.28084).toFixed(1);

      document.getElementById('modal-label-width').innerText = `${wFt} ft (${roomWidth.toFixed(1)} m)`;
      document.getElementById('modal-label-depth').innerText = `${dFt} ft (${roomDepth.toFixed(1)} m)`;
      document.getElementById('modal-label-height').innerText = `${hFt} ft (${roomHeight.toFixed(1)} m)`;

      const areaSqFt = (roomWidth * roomDepth * 10.7639).toFixed(1);
      const areaSqM = (roomWidth * roomDepth).toFixed(2);
      document.getElementById('modal-calc-area').innerText = `${areaSqFt} sq ft / ${areaSqM} m²`;

      buildRoomArchitecture();
    }

    function updateDimensionLabels() {
      const wFt = (roomWidth * 3.28084).toFixed(1);
      const dFt = (roomDepth * 3.28084).toFixed(1);
      const hFt = (roomHeight * 3.28084).toFixed(1);
      const areaSqFt = (roomWidth * roomDepth * 10.7639).toFixed(1);
      const areaSqM = (roomWidth * roomDepth).toFixed(2);

      const elSize = document.getElementById('badge-room-size');
      if (elSize) elSize.innerText = `${wFt} ft × ${dFt} ft`;
      const elArea = document.getElementById('badge-room-area');
      if (elArea) elArea.innerText = `${areaSqFt} sq ft`;
      const elHeight = document.getElementById('badge-room-height');
      if (elHeight) elHeight.innerText = `${hFt} ft (${roomHeight.toFixed(2)} m)`;
      const elBtn = document.getElementById('btn-size-preview');
      if (elBtn) elBtn.innerText = `${wFt}×${dFt} ft`;
    }

    function showToast(msg) {
      const container = document.getElementById('toast-shelf');
      const toast = document.createElement('div');
      toast.className = 'glass-card px-5 py-2.5 rounded-full shadow-2xl text-xs font-bold text-gray-900 border border-white/80 toast-anim flex items-center space-x-2';
      toast.innerHTML = `<i class="fa-solid fa-circle-check text-amber-600 text-sm"></i><span>${msg}</span>`;
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 2600);
    }
