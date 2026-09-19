    // ==================== 10. SPATIAL CLEARANCE & HARD CONSTRAINT VALIDATION ENGINE ====================
    let latestClearanceReport = { status: 'valid', invalidCount: 0, warningCount: 0, items: [], summary: '100% Pass' };

    function toggleClearanceZones(forceState) {
      if (typeof forceState === 'boolean') {
        isClearanceVisible = forceState;
      } else {
        // When user clicks the subnav badge, open detailed report and ensure 3D zones are visible
        openClearanceModal();
        isClearanceVisible = true;
      }
      const chk = document.getElementById('toggle-clearance-chk');
      if (chk) chk.checked = isClearanceVisible;
      if (clearanceGroup) clearanceGroup.visible = isClearanceVisible;
    }

    function updateClearanceVisualizer() {
      evaluateHardConstraints();
    }

    function evaluateHardConstraints() {
      if (!clearanceGroup) return;
      while (clearanceGroup.children.length > 0) {
        const obj = clearanceGroup.children[0];
        clearanceGroup.remove(obj);
      }

      if (!placedProducts.length) {
        updateClearanceBadge('valid', 0, 'No fixtures placed');
        latestClearanceReport = { status: 'valid', invalidCount: 0, warningCount: 0, items: [], summary: 'No fixtures placed' };
        return;
      }

      let hasCollision = false;
      let hasWarning = false;
      let invalidCount = 0;
      let warningCount = 0;
      const reportItems = [];

      const halfRoomW = roomWidth / 2;
      const halfRoomD = roomDepth / 2;

      // Entry Door geometry on Left Wall
      // Hinge at (-roomWidth/2 + 0.04, -0.19), swinging inward 0.88m (32") radius
      const doorHingeX = -halfRoomW + 0.04;
      const doorHingeZ = -0.19;
      const doorRadius = 0.88;
      let anyDoorCollision = false;

      const floorFixtures = placedProducts.filter(p => p.userData && p.userData.category !== 'mirrors');

      floorFixtures.forEach((p, idx) => {
        const d = p.userData || {};
        const cat = d.category || 'fixture';
        const pos = p.position;
        const rotY = p.rotation.y;

        // Use real physical dimensions from metadata, fallback to category defaults
        let fw = d.width_m || (cat === 'toilets' ? 0.41 : cat === 'vanities' ? 1.15 : cat === 'showers' ? 1.12 : 1.70);
        let fd = d.depth_m || (cat === 'toilets' ? 0.71 : cat === 'vanities' ? 0.56 : cat === 'showers' ? 0.96 : 0.76);
        let minFrontClearanceM = (d.installation && d.installation.min_clearance_front_m) ? d.installation.min_clearance_front_m : 0.533;
        let warningThresholdM = 0.457; // 18" warning limit
        let standardName = cat === 'showers' ? 'NKBA 24" Unobstructed Entry' : 'NKBA 21" Front Clearance';

        // Effective rotated bounding box
        const cosR = Math.abs(Math.cos(rotY));
        const sinR = Math.abs(Math.sin(rotY));
        const effW = fw * cosR + fd * sinR;
        const effD = fw * sinR + fd * cosR;

        // For toilets, the tank rear is at -0.15m from origin, bowl extends forward
        let rearD = effD / 2;
        let frontD = effD / 2;
        if (cat === 'toilets' && Math.abs(rotY) < 0.1) {
          rearD = 0.15;
          frontD = fd - 0.15;
        }

        const fixMinX = pos.x - effW / 2;
        const fixMaxX = pos.x + effW / 2;
        const fixMinZ = pos.z - rearD;
        const fixMaxZ = pos.z + frontD;

        // 1. Boundary Overflow Check (Product dimensions vs room dimensions)
        const isOutOfBounds = (
          fixMinX < -halfRoomW - 0.03 ||
          fixMaxX > halfRoomW + 0.03 ||
          fixMinZ < -halfRoomD - 0.03 ||
          fixMaxZ > halfRoomD + 0.03
        );

        const closestX = Math.max(fixMinX, Math.min(doorHingeX, fixMaxX));
        const closestZ = Math.max(fixMinZ, Math.min(doorHingeZ, fixMaxZ));
        const distToHinge = Math.hypot(closestX - doorHingeX, closestZ - doorHingeZ);
        const inDoorSweepQuadrant = (fixMaxX > doorHingeX) && (fixMaxZ > doorHingeZ) && (fixMinX < doorHingeX + doorRadius) && (fixMinZ < doorHingeZ + doorRadius + 0.05);
        const isDoorCollision = inDoorSweepQuadrant && (distToHinge < doorRadius);
        if (isDoorCollision) anyDoorCollision = true;

        // 3. Plumbing Compatibility Check (Wet-wall alignment & max distance from soil stack)
        let isPlumbingViolation = false;
        let plumbingMessage = '';
        if (cat === 'toilets') {
          const distFromRearWall = pos.z - (-halfRoomD);
          const maxAllowed = (d.compatibility && d.compatibility.max_wet_wall_dist_m) || 0.85;
          if (distFromRearWall > maxAllowed + 0.08) {
            isPlumbingViolation = true;
            plumbingMessage = `Plumbing Conflict: Distance (${distFromRearWall.toFixed(2)}m) from rear wet-wall soil stack exceeds ${maxAllowed}m code limit`;
          }
        } else if (cat === 'showers') {
          const distFromRear = pos.z - (-halfRoomD);
          const distFromRight = Math.abs(pos.x - halfRoomW);
          const distFromLeft = Math.abs(pos.x - (-halfRoomW));
          const distToNearestWall = Math.min(distFromRear, distFromRight, distFromLeft);
          const maxAllowed = (d.compatibility && d.compatibility.max_wet_wall_dist_m) || 1.5;
          // Shower is compliant if within rear wet-wall zone or mounted along a side partition wall (within 0.85m)
          if (distToNearestWall > 0.85 && distFromRear > maxAllowed + 0.08) {
            isPlumbingViolation = true;
            plumbingMessage = `Plumbing Conflict: Shower must be within ${maxAllowed}m of wet-wall or mounted along partition wall`;
          }
        } else if (d.compatibility && d.compatibility.requires_wet_wall) {
          const distFromRearWall = pos.z - (-halfRoomD);
          const maxAllowed = d.compatibility.max_wet_wall_dist_m || 0.85;
          if (distFromRearWall > maxAllowed + 0.08) {
            isPlumbingViolation = true;
            plumbingMessage = `Plumbing Conflict: Distance (${distFromRearWall.toFixed(2)}m) from wet-wall plumbing exceeds ${maxAllowed}m code limit`;
          }
        }

        // 4. Inter-Fixture Collision Check (physical bounding box overlap)
        let hasFixtureCollision = false;
        let collidedWith = '';
        floorFixtures.forEach((other, oIdx) => {
          if (idx === oIdx) return;
          const od = other.userData || {};
          const ofw = od.width_m || 0.45;
          const ofd = od.depth_m || 0.65;
          const oCos = Math.abs(Math.cos(other.rotation.y));
          const oSin = Math.abs(Math.sin(other.rotation.y));
          const oEffW = ofw * oCos + ofd * oSin;
          const oEffD = ofw * oSin + ofd * oCos;

          const dx = Math.abs(pos.x - other.position.x);
          const dz = Math.abs(pos.z - other.position.z);
          const overlapX = (effW / 2 + oEffW / 2) - dx;
          const overlapZ = (effD / 2 + oEffD / 2) - dz;

          if (overlapX > 0.04 && overlapZ > 0.04) {
            hasFixtureCollision = true;
            collidedWith = od.name || 'Another Fixture';
          }
        });

        // 5. Forward Clearance Check
        const forwardVector = new THREE.Vector3(0, 0, fd / 2 + minFrontClearanceM / 2).applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
        const clearanceCenter = new THREE.Vector3().copy(pos).add(forwardVector);
        const frontEdgePos = new THREE.Vector3().copy(pos).add(new THREE.Vector3(0, 0, fd / 2).applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY));
        const distToFrontWall = halfRoomD - frontEdgePos.z;
        const observedFrontM = Math.max(0.15, distToFrontWall);

        // 6. Side Clearance Check (NKBA 15" from centerline)
        const distToLeftWall = pos.x - (-halfRoomW);
        const distToRightWall = halfRoomW - pos.x;
        const sideClearanceMin = (d.installation && d.installation.min_clearance_side_m) ? d.installation.min_clearance_side_m : 0.381;
        const hasTightSide = (cat === 'toilets') && (Math.min(distToLeftWall, distToRightWall) < sideClearanceMin - 0.02);

        let fixtureStatus = 'valid';
        let statusReason = `Compliant: ${(observedFrontM * 39.3701).toFixed(1)}" clearance meets NKBA code`;

        if (isOutOfBounds) {
          fixtureStatus = 'invalid';
          statusReason = 'Violation: Fixture extends beyond bathroom walls';
          hasCollision = true;
          invalidCount++;
        } else if (isDoorCollision) {
          fixtureStatus = 'invalid';
          statusReason = 'Door Collision: Intersects 32" inward door swing arc';
          hasCollision = true;
          invalidCount++;
        } else if (hasFixtureCollision) {
          fixtureStatus = 'invalid';
          statusReason = `Collision: Overlaps with ${collidedWith}`;
          hasCollision = true;
          invalidCount++;
        } else if (isPlumbingViolation) {
          fixtureStatus = 'invalid';
          statusReason = plumbingMessage;
          hasCollision = true;
          invalidCount++;
        } else if (observedFrontM < warningThresholdM) {
          fixtureStatus = 'invalid';
          statusReason = `Code Violation: Front clearance (${(observedFrontM * 39.3701).toFixed(1)}") is below minimum 18"`;
          hasCollision = true;
          invalidCount++;
        } else if (observedFrontM < minFrontClearanceM) {
          fixtureStatus = 'warning';
          statusReason = `Warning: Tight clearance (${(observedFrontM * 39.3701).toFixed(1)}"), recommend at least 21"`;
          hasWarning = true;
          warningCount++;
        } else if (hasTightSide) {
          fixtureStatus = 'warning';
          statusReason = `Warning: Side clearance (${(Math.min(distToLeftWall, distToRightWall) * 39.3701).toFixed(1)}") < 15" from centerline`;
          hasWarning = true;
          warningCount++;
        }

        reportItems.push({
          fixtureName: d.name || 'Kohler Fixture',
          category: cat,
          sku: d.art || '',
          status: fixtureStatus,
          standard: standardName,
          observedClearance: `${(observedFrontM * 39.3701).toFixed(1)}" (${observedFrontM.toFixed(2)}m)`,
          requiredClearance: `${(minFrontClearanceM * 39.3701).toFixed(0)}" (${minFrontClearanceM.toFixed(2)}m)`,
          reason: statusReason
        });

        // Render clearance plane on floor (y = 0.009)
        const planeGeo = new THREE.PlaneGeometry(fw * 1.2, minFrontClearanceM);
        const colorHex = fixtureStatus === 'invalid' ? 0xef4444 : (fixtureStatus === 'warning' ? 0xf59e0b : 0x10b981);
        const opacityVal = fixtureStatus === 'invalid' ? 0.48 : (fixtureStatus === 'warning' ? 0.35 : 0.22);

        const planeMat = new THREE.MeshBasicMaterial({
          color: colorHex,
          transparent: true,
          opacity: opacityVal,
          side: THREE.DoubleSide,
          depthWrite: false
        });
        const planeMesh = new THREE.Mesh(planeGeo, planeMat);
        planeMesh.rotation.x = -Math.PI / 2;
        planeMesh.rotation.z = rotY;
        planeMesh.position.set(clearanceCenter.x, 0.009, clearanceCenter.z);
        clearanceGroup.add(planeMesh);

        // Dashed border outline
        const edges = new THREE.EdgesGeometry(planeGeo);
        const lineMat = new THREE.LineBasicMaterial({
          color: colorHex,
          linewidth: 2,
          transparent: true,
          opacity: 0.85
        });
        const wireframe = new THREE.LineSegments(edges, lineMat);
        wireframe.rotation.x = -Math.PI / 2;
        wireframe.rotation.z = rotY;
        wireframe.position.set(clearanceCenter.x, 0.0095, clearanceCenter.z);
        clearanceGroup.add(wireframe);
      });

      // Render Architectural Door Swing Arc on floor
      const doorArcPoints = [];
      const segments = 24;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * (Math.PI / 2);
        doorArcPoints.push(new THREE.Vector3(
          doorHingeX + doorRadius * Math.sin(theta),
          0.008,
          doorHingeZ + doorRadius * Math.cos(theta)
        ));
      }
      const doorArcGeo = new THREE.BufferGeometry().setFromPoints(doorArcPoints);
      const doorArcMat = new THREE.LineBasicMaterial({
        color: anyDoorCollision ? 0xef4444 : 0xb45309,
        linewidth: 2,
        transparent: true,
        opacity: anyDoorCollision ? 0.95 : 0.45
      });
      const doorArcLine = new THREE.Line(doorArcGeo, doorArcMat);
      clearanceGroup.add(doorArcLine);

      const overallStatus = hasCollision ? 'invalid' : (hasWarning ? 'warning' : 'valid');
      latestClearanceReport = {
        status: overallStatus,
        invalidCount,
        warningCount,
        items: reportItems,
        summary: overallStatus === 'valid' 
          ? 'All Clearances 100% Compliant with NKBA Code'
          : (overallStatus === 'warning' ? `${warningCount} Tight Clearance Warning(s)` : `${invalidCount} Code Violation / Collision Detected`)
      };

      updateClearanceBadge(overallStatus, invalidCount || warningCount, latestClearanceReport.summary);
      if (currentViewMode === '2d' && floorplan2DGroup && floorplan2DGroup.visible) {
        update2DFloorplanAnnotations();
      }
    }

    function updateClearanceBadge(status, count, summaryText) {
      const badge = document.getElementById('btn-clearance-badge');
      const label = document.getElementById('label-clearance-status');
      const icon = document.getElementById('icon-clearance');
      if (!badge || !label || !icon) return;

      if (status === 'valid') {
        badge.className = 'px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center space-x-1.5 hover:bg-emerald-100 transition shadow-xs cursor-pointer';
        label.innerText = 'NKBA: 100% Pass';
        icon.className = 'fa-solid fa-circle-check text-emerald-600';
      } else if (status === 'warning') {
        badge.className = 'px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center space-x-1.5 hover:bg-amber-100 transition shadow-xs cursor-pointer';
        label.innerText = `NKBA: ${count} Tight Spacing`;
        icon.className = 'fa-solid fa-triangle-exclamation text-amber-600';
      } else {
        badge.className = 'px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-300 flex items-center space-x-1.5 hover:bg-rose-100 transition shadow-xs animate-pulse cursor-pointer';
        label.innerText = `NKBA Alert: ${count} Conflict${count > 1 ? 's' : ''}`;
        icon.className = 'fa-solid fa-circle-xmark text-rose-600';
      }
    }

    function openClearanceModal() {
      evaluateHardConstraints();
      const report = latestClearanceReport || { status: 'valid', items: [], summary: '100% Pass' };
      const container = document.getElementById('clearance-report-items-container');
      container.innerHTML = '';

      const headingEl = document.getElementById('clearance-summary-heading');
      const descEl = document.getElementById('clearance-summary-desc');
      const iconEl = document.getElementById('clearance-summary-icon');
      const bannerEl = document.getElementById('clearance-summary-banner');
      const mainIconContainer = document.getElementById('clearance-report-icon-container');

      if (report.status === 'valid') {
        headingEl.innerText = 'All Clearances 100% Compliant';
        descEl.innerText = 'Every fixture meets or exceeds NKBA building code clearances.';
        iconEl.className = 'fa-solid fa-circle-check text-2xl text-emerald-600';
        bannerEl.className = 'p-4 rounded-2xl border flex items-center space-x-3 bg-emerald-50 border-emerald-200 text-emerald-950';
        mainIconContainer.className = 'w-9 h-9 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-black text-base shadow-sm';
      } else if (report.status === 'warning') {
        headingEl.innerText = `${report.warningCount} Clearance Warning(s)`;
        descEl.innerText = 'One or more fixtures have marginal clearances (18"-21"). Usable but tight.';
        iconEl.className = 'fa-solid fa-triangle-exclamation text-2xl text-amber-600';
        bannerEl.className = 'p-4 rounded-2xl border flex items-center space-x-3 bg-amber-50 border-amber-200 text-amber-950';
        mainIconContainer.className = 'w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center font-black text-base shadow-sm';
      } else {
        headingEl.innerText = `${report.invalidCount} Code Violation / Collision Alert`;
        descEl.innerText = 'Fixtures are overlapping or violate minimum NKBA 18" clearance boundaries.';
        iconEl.className = 'fa-solid fa-circle-xmark text-2xl text-rose-600';
        bannerEl.className = 'p-4 rounded-2xl border flex items-center space-x-3 bg-rose-50 border-rose-200 text-rose-950';
        mainIconContainer.className = 'w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black text-base shadow-sm';
      }

      report.items.forEach(item => {
        const card = document.createElement('div');
        card.className = `p-3.5 rounded-2xl border flex justify-between items-start space-x-3 ${
          item.status === 'valid' ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950' :
          (item.status === 'warning' ? 'bg-amber-50/50 border-amber-200/80 text-amber-950' : 'bg-rose-50/50 border-rose-200/80 text-rose-950')
        }`;
        const statusPill = item.status === 'valid' 
          ? '<span class="text-[9px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full">🟢 Pass</span>'
          : (item.status === 'warning'
            ? '<span class="text-[9px] font-black bg-amber-600 text-white px-2 py-0.5 rounded-full">🟡 Warning</span>'
            : '<span class="text-[9px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full">🔴 Conflict</span>');

        card.innerHTML = `
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="font-extrabold text-xs text-gray-900">${item.fixtureName}</span>
                <span class="text-[10px] font-mono text-gray-500">${item.sku}</span>
              </div>
              ${statusPill}
            </div>
            <p class="text-[11px] font-medium mt-1 leading-snug">${item.reason}</p>
            <div class="text-[10px] font-mono text-gray-500 mt-1 flex items-center space-x-2">
              <span>Observed: <strong>${item.observedClearance}</strong></span>
              <span>•</span>
              <span>Required: <strong>${item.requiredClearance}</strong></span>
            </div>
          </div>
        `;
        container.appendChild(card);
      });

      document.getElementById('modal-clearance-details').classList.remove('hidden');
    }

    function closeClearanceModal() {
      document.getElementById('modal-clearance-details').classList.add('hidden');
    }
