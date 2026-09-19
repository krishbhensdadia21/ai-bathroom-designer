    // ==================== 5. PRODUCT SPAWNING & OBJECT MANIPULATION ====================
    let currentPlannerConfigState = {
      isAiBundle: false,
      tierName: '',
      isModified: false
    };

    function setPlannerConfigurationState(type, tierName = '') {
      const badge = document.getElementById('planner-config-status');
      if (type === 'ai_bundle') {
        currentPlannerConfigState = {
          isAiBundle: true,
          tierName: tierName || (currentAiRecommendation && currentAiRecommendation.active_tier) || 'Signature',
          isModified: false
        };
        if (badge) {
          badge.className = 'hidden';
          badge.classList.add('hidden');
          badge.innerHTML = '';
        }
      } else if (type === 'modified') {
        currentPlannerConfigState.isModified = true;
        if (badge) {
          // Customized box completely removed per user request
          badge.className = 'hidden';
          badge.classList.add('hidden');
          badge.innerHTML = '';
        }
      } else if (type === 'reset') {
        currentPlannerConfigState = {
          isAiBundle: false,
          tierName: '',
          isModified: false
        };
        if (badge) {
          badge.className = 'hidden';
          badge.classList.add('hidden');
          badge.innerHTML = '';
        }
      }
    }

    function spawnProductById(id, x = 0, z = 0, rotY = 0, customData = null) {
      const p = KOHLER_CATALOG.find(item => item.id === id);
      if (!p) return;

      const finishToUse = (customData && customData.currentFinish) || p.defaultFinish;
      const group = p.builder(finishToUse);
      const elevation = (customData && (customData.elevation !== undefined ? customData.elevation : customData.y)) || 0;
      group.position.set(x, elevation, z);
      group.rotation.y = rotY;

      group.userData = {
        ...p,
        ...(customData || {}),
        instanceId: (customData && customData.instanceId) || (Date.now() + Math.random()),
        currentFinish: finishToUse,
        elevation: elevation
      };

      if (typeof applyThemeMaterialsToProduct === 'function') {
        applyThemeMaterialsToProduct(group, currentSelectedTheme);
      }

      scene.add(group);
      placedProducts.push(group);
      if (typeof updateThemeArchitecturalAccents === 'function') {
        updateThemeArchitecturalAccents(currentSelectedTheme);
      }
      selectActiveObject(group);
      updateTotalBOM();
      updateClearanceVisualizer();
      updateWetWallScore();
      buildPlumbingConduits();
      showToast(`Added ${group.userData.name || p.name} to room`);
      return group;
    }

    function selectActiveObject(obj) {
      if (activeSelectedObject) deselectActiveObject();
      activeSelectedObject = obj;

      const d = obj.userData;
      document.getElementById('insp-series').innerText = d.series;
      document.getElementById('insp-name').innerText = d.name;
      document.getElementById('insp-art').innerText = d.art;
      document.getElementById('inspector-card').classList.remove('hidden');

      // Highlight with glowing bounding box
      const box = new THREE.BoxHelper(obj, 0xb45309);
      box.name = 'selection-helper';
      scene.add(box);
    }

    function deselectActiveObject() {
      const helper = scene.getObjectByName('selection-helper');
      if (helper) scene.remove(helper);
      activeSelectedObject = null;
      document.getElementById('inspector-card').classList.add('hidden');
    }

    function deleteActiveObject() {
      if (!activeSelectedObject) return;
      const idx = placedProducts.indexOf(activeSelectedObject);
      if (idx > -1) placedProducts.splice(idx, 1);
      scene.remove(activeSelectedObject);
      deselectActiveObject();
      if (typeof updateThemeArchitecturalAccents === 'function') {
        updateThemeArchitecturalAccents(currentSelectedTheme);
      }
      setPlannerConfigurationState('modified');
      updateTotalBOM();
      updateClearanceVisualizer();
      updateWetWallScore();
      buildPlumbingConduits();
      showToast('Fixture removed from bathroom');
    }

    function duplicateActiveObject() {
      if (!activeSelectedObject) return;
      const d = activeSelectedObject.userData;
      setPlannerConfigurationState('modified');
      spawnProductById(d.id, activeSelectedObject.position.x + 0.2, activeSelectedObject.position.z + 0.2, activeSelectedObject.rotation.y, {
        name: d.name,
        art: d.art,
        sku_code: d.sku_code || d.art,
        price_inr: d.price_inr,
        price_usd: d.price_usd,
        category: d.category,
        elevation: activeSelectedObject.position.y
      });
    }

    function rotateActiveObject(angleRad) {
      if (!activeSelectedObject) return;
      activeSelectedObject.rotation.y += angleRad;
      const helper = scene.getObjectByName('selection-helper');
      if (helper) helper.update();
      updateClearanceVisualizer();
      updateWetWallScore();
      buildPlumbingConduits();
    }

    function adjustSelectedElevation(val) {
      if (!activeSelectedObject) return;
      const y = parseFloat(val);
      activeSelectedObject.position.y = y;
      document.getElementById('insp-elevation-label').innerText = y.toFixed(2) + ' m';
      const helper = scene.getObjectByName('selection-helper');
      if (helper) helper.update();
    }

    // ==================== 6. INTERACTIVE DRAG & AUTO WALL SNAPPING ====================
    function bindInteractionEvents() {
      const dom = renderer.domElement;
      dom.addEventListener('pointerdown', onPointerDown);
      dom.addEventListener('pointermove', onPointerMove);
      dom.addEventListener('pointerup', onPointerUp);
      window.addEventListener('resize', onWindowResize);
    }

    function onPointerDown(e) {
      if (e.button !== 0) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(placedProducts, true);

      if (intersects.length > 0) {
        let topGroup = intersects[0].object;
        while (topGroup.parent && topGroup.parent !== scene) {
          topGroup = topGroup.parent;
        }
        selectActiveObject(topGroup);

        const dragIntersects = raycaster.intersectObject(dragPlane);
        if (dragIntersects.length > 0) {
          isDragging = true;
          controls.enabled = false;
          dragOffset.copy(dragIntersects[0].point).sub(topGroup.position);
        }
      } else {
        const floorHit = raycaster.intersectObject(floorMesh);
        if (floorHit.length === 0 && activeSelectedObject) {
          deselectActiveObject();
        }
      }
    }

    function onPointerMove(e) {
      if (!isDragging || !activeSelectedObject) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(dragPlane);
      if (intersects.length > 0) {
        let targetPos = intersects[0].point.sub(dragOffset);

        // Grid Snap (5cm / 0.05m)
        if (document.getElementById('toggle-grid').checked) {
          targetPos.x = Math.round(targetPos.x / 0.05) * 0.05;
          targetPos.z = Math.round(targetPos.z / 0.05) * 0.05;
        }

        // Auto Wall Snapping (all 4 walls: Back, Left, Right, Front)
        if (document.getElementById('toggle-wall-snap').checked) {
          const snapThreshold = 0.45;
          const backWallZ = -roomDepth / 2;
          const frontWallZ = roomDepth / 2;
          const leftWallX = -roomWidth / 2;
          const rightWallX = roomWidth / 2;

          const distBack = Math.abs(targetPos.z - backWallZ);
          const distFront = Math.abs(targetPos.z - frontWallZ);
          const distLeft = Math.abs(targetPos.x - leftWallX);
          const distRight = Math.abs(targetPos.x - rightWallX);

          const minDist = Math.min(distBack, distFront, distLeft, distRight);

          if (minDist < snapThreshold) {
            const cat = (activeSelectedObject.userData && activeSelectedObject.userData.category) || '';
            const depth = (activeSelectedObject.userData && activeSelectedObject.userData.depth_m) || 0.6;
            const width = (activeSelectedObject.userData && activeSelectedObject.userData.width_m) || 0.8;
            const isTub = (cat === 'bathtubs');

            // Exact architectural offsets to eliminate floating wall gaps
            let offset = depth / 2 + 0.015;
            if (cat === 'mirrors') offset = 0.035;
            else if (cat === 'toilets') offset = 0.165;
            else if (cat === 'vanities') offset = 0.245;
            else if (cat === 'showers') offset = Math.min(width, depth) / 2 + 0.02;
            else if (cat === 'bathtubs') offset = 0.42;

            if (minDist === distBack) {
              targetPos.z = backWallZ + offset;
              activeSelectedObject.rotation.y = isTub ? Math.PI : 0;
              activeSelectedObject.userData.attachedWall = 'back';
            } else if (minDist === distLeft) {
              targetPos.x = leftWallX + offset;
              activeSelectedObject.rotation.y = isTub ? -Math.PI / 2 : Math.PI / 2;
              activeSelectedObject.userData.attachedWall = 'left';
            } else if (minDist === distRight) {
              targetPos.x = rightWallX - offset;
              activeSelectedObject.rotation.y = isTub ? Math.PI / 2 : -Math.PI / 2;
              activeSelectedObject.userData.attachedWall = 'right';
            } else if (minDist === distFront) {
              targetPos.z = frontWallZ - offset;
              activeSelectedObject.rotation.y = isTub ? 0 : Math.PI;
              activeSelectedObject.userData.attachedWall = 'front';
            }
          } else {
            if (activeSelectedObject.userData) activeSelectedObject.userData.attachedWall = null;
          }
        }

        // Bounds Clamp inside bathroom
        const isMirrorObj = activeSelectedObject.userData && activeSelectedObject.userData.category === 'mirrors';
        const margin = isMirrorObj ? 0.05 : 0.22;
        targetPos.x = Math.max(-roomWidth / 2 + margin, Math.min(roomWidth / 2 - margin, targetPos.x));
        targetPos.z = Math.max(-roomDepth / 2 + margin, Math.min(roomDepth / 2 - margin, targetPos.z));

        const prevX = activeSelectedObject.position.x;
        const prevZ = activeSelectedObject.position.z;
        const dx = targetPos.x - prevX;
        const dz = targetPos.z - prevZ;

        activeSelectedObject.position.x = targetPos.x;
        activeSelectedObject.position.z = targetPos.z;

        // Synchronously move hosted faucet and mirror when vanity is dragged
        if (activeSelectedObject.userData && activeSelectedObject.userData.category === 'vanities') {
          placedProducts.forEach(p => {
            if (p !== activeSelectedObject && p.userData) {
              const isChild = (p.userData.category === 'faucets' || p.userData.category === 'mirrors') &&
                              Math.hypot(p.position.x - prevX, p.position.z - prevZ) < 0.60;
              if (isChild) {
                p.position.x += dx;
                p.position.z += dz;
              }
            }
          });
        }

        const helper = scene.getObjectByName('selection-helper');
        if (helper) helper.update();

        // Real-time continuous clearance and collision evaluation during 2D & 3D dragging
        evaluateHardConstraints();
      }
    }

    function onPointerUp() {
      if (isDragging) {
        isDragging = false;
        controls.enabled = true;
        updateClearanceVisualizer();
        updateWetWallScore();
        buildPlumbingConduits();
        if (currentViewMode === '2d') update2DFloorplanAnnotations();
      }
    }

    function onWindowResize() {
      const container = document.getElementById('canvas-container');
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
