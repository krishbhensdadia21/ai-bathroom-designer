    // ==================== 3. 3D PROCEDURAL BUILDER FUNCTIONS (15 OFFICIAL KOHLER FIXTURES) ====================

    // 1. KOHLER Veil™ Smart One-piece Toilet (K-5401IN-0)
    function buildVeilSmartToilet() {
      const g = new THREE.Group();
      
      // Monolithic sculpted organic bowl body
      const bowlGeom = new THREE.CylinderGeometry(0.20, 0.15, 0.44, 36);
      const bowl = new THREE.Mesh(bowlGeom, porcelainMat);
      bowl.position.set(0, 0.22, 0.20);
      bowl.scale.set(0.92, 1.0, 1.42);
      bowl.castShadow = true;
      g.add(bowl);

      // Ergonomic heated Quiet-Close seat & slim lid
      const seatGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.025, 36);
      const seat = new THREE.Mesh(seatGeom, porcelainMat);
      seat.position.set(0, 0.445, 0.20);
      seat.scale.set(0.92, 1.0, 1.42);
      seat.castShadow = true;
      g.add(seat);

      // Accent parting line between lid and body
      const accentRing = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.004, 8, 36), chromeMat);
      accentRing.rotation.x = Math.PI / 2;
      accentRing.position.set(0, 0.435, 0.20);
      accentRing.scale.set(0.92, 1.42, 1.0);
      accentRing.userData.role = 'flushPlate';
      g.add(accentRing);

      // Sleek rear console interface
      const consoleRear = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.18, 0.16), porcelainMat);
      consoleRear.position.set(0, 0.33, -0.06);
      consoleRear.castShadow = true;
      g.add(consoleRear);

      // Ambient LED nightlight glow strip at base
      const nightlight = new THREE.Mesh(
        new THREE.BoxGeometry(0.26, 0.015, 0.015),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      nightlight.name = 'toilet-nightlight';
      nightlight.position.set(0, 0.04, 0.35);
      g.add(nightlight);

      // Ambient Point Light for Kohler Nightlight
      const baseLight = new THREE.PointLight(0x38bdf8, 0.45, 0.9);
      baseLight.position.set(0, 0.08, 0.32);
      g.add(baseLight);

      // Wall-mounted touch remote actuator plate
      const remote = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.012), chromeMat);
      remote.position.set(0.38, 0.85, -0.01);
      remote.userData.role = 'flushPlate';
      g.add(remote);

      const remoteScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.10), new THREE.MeshBasicMaterial({ color: 0x0f172a }));
      remoteScreen.position.set(0.38, 0.85, 0.002);
      g.add(remoteScreen);

      return g;
    }

    // 2. KOHLER Reach™ One-piece Round-front Toilet with Skirted Trapway, Dual Flush (K-3983IN-S-0)
    function buildReachOnePieceToilet() {
      const g = new THREE.Group();

      // Clean skirted trapway base (smooth monolithic vertical flanks)
      const skirtBase = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.38, 0.50), porcelainMat);
      skirtBase.position.set(0, 0.19, 0.12);
      skirtBase.castShadow = true;
      g.add(skirtBase);

      // Compact round-front bowl contour
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.14, 0.26, 32), porcelainMat);
      bowl.position.set(0, 0.30, 0.22);
      bowl.scale.set(1.0, 1.0, 1.25);
      bowl.castShadow = true;
      g.add(bowl);

      // Quiet-close round-front seat & lid
      const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.025, 32), porcelainMat);
      seat.position.set(0, 0.43, 0.22);
      seat.scale.set(1.0, 1.0, 1.25);
      seat.castShadow = true;
      g.add(seat);

      // Low-profile integrated water tank
      const tank = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.38, 0.18), porcelainMat);
      tank.position.set(0, 0.54, -0.06);
      tank.castShadow = true;
      g.add(tank);

      // Flat tank lid with soft chamfered lip
      const tankLid = new THREE.Mesh(new THREE.BoxGeometry(0.37, 0.03, 0.19), porcelainMat);
      tankLid.position.set(0, 0.735, -0.06);
      tankLid.castShadow = true;
      g.add(tankLid);

      // Dual flush actuator button on top lid (chrome bezel + split buttons)
      const bezel = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.006, 24), chromeMat);
      bezel.position.set(0, 0.752, -0.06);
      bezel.userData.role = 'flushPlate';
      g.add(bezel);

      const buttonHalf1 = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.007, 16, 1, false, 0, Math.PI), chromeMat);
      buttonHalf1.position.set(0, 0.755, -0.06);
      buttonHalf1.userData.role = 'flushPlate';
      g.add(buttonHalf1);

      const buttonHalf2 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.007, 16, 1, false, Math.PI, Math.PI), chromeMat);
      buttonHalf2.position.set(0, 0.755, -0.06);
      buttonHalf2.userData.role = 'flushPlate';
      g.add(buttonHalf2);

      return g;
    }

    // 3. KOHLER Ove™ One-piece Round-front Toilet with Skirted Trapway, Dual Flush (K-17629T-NS-0)
    function buildOveToilet() {
      const g = new THREE.Group();

      // Distinctive Ove sculptural organic base with gentle outward flare at bottom
      const baseGeom = new THREE.CylinderGeometry(0.18, 0.21, 0.38, 32);
      const base = new THREE.Mesh(baseGeom, porcelainMat);
      base.position.set(0, 0.19, 0.14);
      base.scale.set(0.95, 1.0, 1.35);
      base.castShadow = true;
      g.add(base);

      // Organic egg-shaped bowl
      const bowlGeom = new THREE.CylinderGeometry(0.19, 0.15, 0.26, 32);
      const bowl = new THREE.Mesh(bowlGeom, porcelainMat);
      bowl.position.set(0, 0.32, 0.22);
      bowl.scale.set(0.94, 1.0, 1.36);
      bowl.castShadow = true;
      g.add(bowl);

      // Ergonomic rounded Ove seat and contoured lid
      const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.195, 0.195, 0.03, 32), porcelainMat);
      seat.position.set(0, 0.44, 0.22);
      seat.scale.set(0.94, 1.0, 1.36);
      seat.castShadow = true;
      g.add(seat);

      // Curvaceous seamless tank with rounded corners
      const tank = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.19), porcelainMat);
      tank.position.set(0, 0.55, -0.05);
      tank.castShadow = true;
      g.add(tank);

      const tankLid = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.03, 32), porcelainMat);
      tankLid.position.set(0, 0.74, -0.05);
      tankLid.scale.set(1.0, 1.0, 0.52);
      tankLid.castShadow = true;
      g.add(tankLid);

      // Polished chrome circular dual flush actuator on top
      const flushButton = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.008, 24), chromeMat);
      flushButton.position.set(0, 0.758, -0.05);
      flushButton.userData.role = 'flushPlate';
      g.add(flushButton);

      return g;
    }

    // 4. KOHLER Trace™ Integrated Top and Basin (K-30375IN-0) - 700 mm integrated vanity top + basin
    function buildTraceIntegratedVanity(finish = 'wood') {
      const g = new THREE.Group();
      const finishMat = (finish === 'white') ? whiteLaminateMat : scandinavianOakMat;

      // 700 mm (0.70m W x 0.48m D x 0.46m H) wall-hung floating cabinet body
      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.46, 0.46), finishMat);
      cabinet.position.set(0, 0.23, 0);
      cabinet.castShadow = true;
      cabinet.userData.role = 'vanity';
      g.add(cabinet);

      // Deep pull-out storage drawer with Trace minimalist recessed J-pull channel
      const drawerFront = new THREE.Mesh(new THREE.BoxGeometry(0.69, 0.42, 0.02), finishMat);
      drawerFront.position.set(0, 0.22, 0.235);
      drawerFront.userData.role = 'vanity';
      g.add(drawerFront);

      const jPullChannel = new THREE.Mesh(new THREE.BoxGeometry(0.69, 0.016, 0.02), matteBlackMat);
      jPullChannel.position.set(0, 0.435, 0.23);
      g.add(jPullChannel);

      // 700 mm seamless integrated vitreous china vanity top with built-in sculpted basin bowl
      const basinTop = new THREE.Mesh(new THREE.BoxGeometry(0.704, 0.042, 0.484), porcelainMat);
      basinTop.position.set(0, 0.48, 0.01);
      basinTop.castShadow = true;
      basinTop.userData.role = 'sink';
      g.add(basinTop);

      // Seamless sculpted inner washing bowl with gentle radiused contours (0.46m x 0.30m x 0.13m)
      const innerBasin = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.13, 0.30), porcelainMat);
      innerBasin.position.set(0, 0.415, 0.02);
      innerBasin.userData.role = 'sink';
      g.add(innerBasin);

      // Chrome umbrella clicker pop-up drain
      const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.005, 20), chromeMat);
      drain.position.set(0, 0.352, 0.02);
      g.add(drain);

      // Single-hole faucet mounting deck collar at rear
      const faucetDeck = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.005, 20), chromeMat);
      faucetDeck.position.set(0, 0.505, -0.14);
      g.add(faucetDeck);

      // Rear wall mounting suspension bracket
      const mountBracket = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.38, 0.02), industrialSteelMat);
      mountBracket.position.set(0, 0.23, -0.23);
      g.add(mountBracket);

      return g;
    }

    // 5. KOHLER Vive™ Integrated Top and Basin (K-28782IN-0) - 720 mm integrated vanity top + basin
    function buildViveIntegratedVanity(finish = 'wood') {
      const g = new THREE.Group();
      const finishMat = (finish === 'white') ? whiteLaminateMat : darkMahoganyMat;

      // 720 mm (0.72m W x 0.49m D x 0.48m H) contemporary wall-hung vanity cabinet with Vive fluid bevelled profile
      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.46, 0.47), finishMat);
      cabinet.position.set(0, 0.23, 0);
      cabinet.castShadow = true;
      cabinet.userData.role = 'vanity';
      g.add(cabinet);

      // Architectural bevelled trim and dual-drawer front panels
      const drawerUpper = new THREE.Mesh(new THREE.BoxGeometry(0.708, 0.20, 0.02), finishMat);
      drawerUpper.position.set(0, 0.33, 0.24);
      drawerUpper.userData.role = 'vanity';
      g.add(drawerUpper);

      const drawerLower = new THREE.Mesh(new THREE.BoxGeometry(0.708, 0.20, 0.02), finishMat);
      drawerLower.position.set(0, 0.11, 0.24);
      drawerLower.userData.role = 'vanity';
      g.add(drawerLower);

      // Refined slim horizontal architectural pull bar
      const pullBar = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.014, 0.016), brushedBrassMat);
      pullBar.position.set(0, 0.33, 0.255);
      pullBar.userData.role = 'vanity';
      g.add(pullBar);

      // 720 mm seamless integrated vitreous china vanity top with Vive bevelled perimeter edge
      const basinTop = new THREE.Mesh(new THREE.BoxGeometry(0.724, 0.045, 0.494), porcelainMat);
      basinTop.position.set(0, 0.482, 0.01);
      basinTop.castShadow = true;
      basinTop.userData.role = 'sink';
      g.add(basinTop);

      // Fluid contour sculpted washbasin bowl (0.48m x 0.31m x 0.14m)
      const innerBasin = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.14, 0.31), porcelainMat);
      innerBasin.position.set(0, 0.412, 0.02);
      innerBasin.userData.role = 'sink';
      g.add(innerBasin);

      // Center pop-up umbrella drain
      const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.033, 0.033, 0.006, 20), brushedBrassMat);
      drain.position.set(0, 0.344, 0.02);
      g.add(drain);

      // Rear single-hole faucet deck ring
      const faucetDeck = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.005, 20), brushedBrassMat);
      faucetDeck.position.set(0, 0.508, -0.14);
      g.add(faucetDeck);

      // Ambient downward under-vanity LED architectural light strip
      const underGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.66, 0.01, 0.01),
        new THREE.MeshBasicMaterial({ color: 0xfef08a })
      );
      underGlow.position.set(0, 0.01, 0.08);
      g.add(underGlow);

      const downLight = new THREE.PointLight(0xfef08a, 0.45, 1.1);
      downLight.position.set(0, 0.03, 0.08);
      g.add(downLight);

      return g;
    }

    // Helper: Construct authentic Kohler Brazn™ chamfered splayed vessel sink geometry
    function createBraznVesselGeometry() {
      if (typeof THREE.BufferGeometry !== 'function') {
        return new THREE.BoxGeometry(0.584, 0.125, 0.368);
      }

      const geom = new THREE.BufferGeometry();

      // Authentic Kohler Brazn K-21060IN-0 Dimensions (meters)
      const topW = 0.584, topD = 0.368, H = 0.125;
      const botW = 0.518, botD = 0.306;
      const rimT = 0.010; // 10mm ultra-thin knife-edge rim
      const inTopW = topW - rimT * 2, inTopD = topD - rimT * 2;
      const floorW = 0.436, floorD = 0.218, floorY = 0.018;

      // Corner chamfer bevels (45-degree facets)
      const topC = 0.030, botC = 0.024;
      const inTopC = 0.024, floorC = 0.020;

      function get8Points(w, d, c, y) {
        const hw = w / 2, hd = d / 2;
        return [
          [-hw + c, y, -hd],     // 0: rear-left
          [hw - c, y, -hd],      // 1: rear-right
          [hw, y, -hd + c],      // 2: right-rear
          [hw, y, hd - c],       // 3: right-front
          [hw - c, y, hd],       // 4: front-right
          [-hw + c, y, hd],      // 5: front-left
          [-hw, y, hd - c],      // 6: left-front
          [-hw, y, -hd + c]      // 7: left-rear
        ];
      }

      // 4 concentric 8-vertex loops
      const outerBot = get8Points(botW, botD, botC, 0);          // Loop 0: 0..7
      const outerTop = get8Points(topW, topD, topC, H);          // Loop 1: 8..15
      const innerTop = get8Points(inTopW, inTopD, inTopC, H);    // Loop 2: 16..23
      const innerFloor = get8Points(floorW, floorD, floorC, floorY); // Loop 3: 24..31
      const floorCenter = [0, floorY - 0.003, 0.010];             // Vertex 32
      const botCenter = [0, 0, 0];                               // Vertex 33

      const positions = [];
      const indices = [];

      [...outerBot, ...outerTop, ...innerTop, ...innerFloor, floorCenter, botCenter].forEach(p => {
        positions.push(...p);
      });

      function bridgeLoops(startA, startB, flip = false) {
        for (let i = 0; i < 8; i++) {
          const next = (i + 1) % 8;
          const a1 = startA + i, a2 = startA + next;
          const b1 = startB + i, b2 = startB + next;
          if (!flip) {
            indices.push(a1, b1, a2);
            indices.push(a2, b1, b2);
          } else {
            indices.push(a1, a2, b1);
            indices.push(a2, b2, b1);
          }
        }
      }

      // 1. Splayed outer walls (Loop 0 -> Loop 1)
      bridgeLoops(0, 8, false);

      // 2. Ultra-thin knife-edge rim top face (Loop 1 -> Loop 2)
      bridgeLoops(8, 16, false);

      // 3. Sloped inner basin cavity walls (Loop 2 -> Loop 3)
      bridgeLoops(16, 24, true);

      // 4. Sloping inner floor fan to center drain vertex 32
      for (let i = 0; i < 8; i++) {
        const next = (i + 1) % 8;
        indices.push(24 + i, 32, 24 + next);
      }

      // 5. Flat bottom base fan to center vertex 33
      for (let i = 0; i < 8; i++) {
        const next = (i + 1) % 8;
        indices.push(i, (i + 1) % 8, 33);
      }

      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geom.setIndex(indices);

      if (typeof geom.toNonIndexed === 'function') {
        const nonIndexed = geom.toNonIndexed();
        nonIndexed.computeVertexNormals();
        return nonIndexed;
      }

      geom.computeVertexNormals();
      return geom;
    }

    // 6. KOHLER Brazn™ 58.4 cm Rectangular Vessel Bathroom Sink (K-21060IN-0)
    // Matches authentic product photo: pristine white vitreous china, splayed chamfered walls, slotted overflow, and flush ceramic umbrella drain
    function buildBraznVesselSink(finish = 'white') {
      const g = new THREE.Group();
      const basinMat = (finish === 'black') ? matteBlackMat : porcelainMat;
      const counterMat = (finish === 'wood') ? teakMat : whiteQuartzMat;

      // 1. Architectural floating console countertop (0.76m W x 0.44m D x 0.042m H)
      const counterSlab = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.042, 0.44), counterMat);
      counterSlab.position.set(0, 0.72, 0);
      counterSlab.castShadow = true;
      counterSlab.receiveShadow = true;
      counterSlab.userData.role = 'vanityCounter';
      g.add(counterSlab);

      // Front horizontal minimalist chrome towel rail bar under countertop
      const towelRail = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.68, 16), chromeMat);
      towelRail.rotation.z = Math.PI / 2;
      towelRail.position.set(0, 0.665, 0.215);
      towelRail.userData.role = 'vanityHardware';
      g.add(towelRail);

      // Left & Right towel rail mounting standoff posts
      for (let rx of [-0.33, 0.33]) {
        const standoff = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.045, 16), chromeMat);
        standoff.rotation.x = Math.PI / 2;
        standoff.position.set(rx, 0.665, 0.19);
        standoff.userData.role = 'vanityHardware';
        g.add(standoff);
      }

      // Exposed European chrome designer bottle trap (P-trap)
      const trapVertical = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.020, 0.18, 20), chromeMat);
      trapVertical.position.set(0, 0.61, 0.025);
      trapVertical.userData.role = 'vanityHardware';
      g.add(trapVertical);

      const trapBody = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.030, 0.075, 20), chromeMat);
      trapBody.position.set(0, 0.50, 0.025);
      trapBody.userData.role = 'vanityHardware';
      g.add(trapBody);

      const trapCap = new THREE.Mesh(new THREE.CylinderGeometry(0.031, 0.031, 0.012, 20), chromeMat);
      trapCap.position.set(0, 0.458, 0.025);
      trapCap.userData.role = 'vanityHardware';
      g.add(trapCap);

      const wallWastePipe = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.22, 16), chromeMat);
      wallWastePipe.rotation.x = Math.PI / 2;
      wallWastePipe.position.set(0, 0.51, -0.08);
      wallWastePipe.userData.role = 'vanityHardware';
      g.add(wallWastePipe);

      // Rear wall suspension brackets
      for (let bx of [-0.28, 0.28]) {
        const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.12, 0.24), industrialSteelMat);
        bracket.position.set(bx, 0.64, -0.09);
        g.add(bracket);
      }

      // 2. Authentic Brazn 58.4 cm Chamfered Vessel Sink (sits on counter at y = 0.741m)
      const basinGeom = createBraznVesselGeometry();
      const basinMesh = new THREE.Mesh(basinGeom, basinMat);
      basinMesh.position.set(0, 0.741, 0.015);
      basinMesh.castShadow = true;
      basinMesh.receiveShadow = true;
      basinMesh.userData.role = 'basin';
      g.add(basinMesh);

      // 3. Rear Horizontal Slotted Overflow Opening (characteristic of Kohler Brazn)
      // Slanted slightly to match the 31-degree draft angle of the rear inner basin wall
      const wallSlopeAngle = Math.atan2(0.065, 0.107);
      const overflowSlot = new THREE.Mesh(
        new THREE.BoxGeometry(0.046, 0.007, 0.008),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9, metalness: 0.1 })
      );
      overflowSlot.rotation.x = -wallSlopeAngle;
      overflowSlot.position.set(0, 0.741 + 0.100, 0.015 - 0.158);
      overflowSlot.userData.role = 'sink';
      g.add(overflowSlot);

      // Subtle chrome interior overflow grill accent
      const overflowGrill = new THREE.Mesh(new THREE.BoxGeometry(0.040, 0.002, 0.004), chromeMat);
      overflowGrill.rotation.x = -wallSlopeAngle;
      overflowGrill.position.set(0, 0.741 + 0.100, 0.015 - 0.156);
      g.add(overflowGrill);

      // 4. Center Flush Circular Ceramic Umbrella Pop-up Drain Cover (matching white vitreous china)
      // Dark recessed perimeter shadow ring
      const drainWell = new THREE.Mesh(
        new THREE.CylinderGeometry(0.043, 0.043, 0.004, 32),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 })
      );
      drainWell.position.set(0, 0.741 + 0.021, 0.015 + 0.010);
      g.add(drainWell);

      // Matching white ceramic umbrella disc cover (exact match to photo!)
      const ceramicUmbrellaDrain = new THREE.Mesh(
        new THREE.CylinderGeometry(0.038, 0.038, 0.005, 32),
        basinMat
      );
      ceramicUmbrellaDrain.position.set(0, 0.741 + 0.024, 0.015 + 0.010);
      ceramicUmbrellaDrain.castShadow = true;
      ceramicUmbrellaDrain.userData.role = 'sink';
      g.add(ceramicUmbrellaDrain);

      // Subtle crown curve on ceramic drain cap
      const drainCrown = new THREE.Mesh(
        new THREE.CylinderGeometry(0.034, 0.038, 0.0025, 32),
        basinMat
      );
      drainCrown.position.set(0, 0.741 + 0.027, 0.015 + 0.010);
      drainCrown.userData.role = 'sink';
      g.add(drainCrown);

      // 5. Discreet "KOHLER" brand lettering mark on rear rim
      const brandMark = new THREE.Mesh(
        new THREE.BoxGeometry(0.026, 0.0006, 0.003),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.3, metalness: 0.8 })
      );
      brandMark.position.set(0, 0.741 + 0.1254, 0.015 - 0.178);
      g.add(brandMark);

      return g;
    }

    // 7. KOHLER Forefront™ Square Semi-Recessed Basin (K-11479IN-VC1-0) - Separate semi-recessed basin
    function buildForefrontSemiRecessedBasin(finish = 'white') {
      const g = new THREE.Group();
      const basinMat = (finish === 'black') ? matteBlackMat : porcelainMat;
      const counterMat = (finish === 'wood') ? darkMahoganyMat : scandinavianOakMat;

      // Floating vanity console shelf (0.70m W x 0.36m D x 0.06m H) - narrower depth creates the authentic semi-recessed overhang
      const consoleShelf = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.06, 0.36), counterMat);
      consoleShelf.position.set(0, 0.72, 0);
      consoleShelf.castShadow = true;
      consoleShelf.userData.role = 'vanity';
      g.add(consoleShelf);

      // Front horizontal matte black towel rail bar mounted under shelf
      const towelRail = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.64, 16), matteBlackMat);
      towelRail.rotation.z = Math.PI / 2;
      towelRail.position.set(0, 0.66, 0.18);
      towelRail.userData.role = 'vanity';
      g.add(towelRail);

      // Exposed decorative bottle trap and waste pipe underneath
      const bottleTrap = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.26, 16), chromeMat);
      bottleTrap.position.set(0, 0.55, 0.05);
      g.add(bottleTrap);

      const wallWastePipe = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.22, 16), chromeMat);
      wallWastePipe.rotation.x = Math.PI / 2;
      wallWastePipe.position.set(0, 0.50, -0.06);
      g.add(wallWastePipe);

      // Forefront 413 mm x 413 mm Square Basin outer body (0.413m W x 0.145m H x 0.413m D)
      // Positioned at z = 0.05 so the front portion projects forward past the console shelf front edge (z = 0.18)
      const basinBody = new THREE.Mesh(new THREE.BoxGeometry(0.413, 0.145, 0.413), basinMat);
      basinBody.position.set(0, 0.79, 0.05);
      basinBody.castShadow = true;
      basinBody.userData.role = 'sink';
      g.add(basinBody);

      // Sleek inner basin bowl cavity (0.375m x 0.13m x 0.28m) with smooth slope
      const innerCavity = new THREE.Mesh(new THREE.BoxGeometry(0.375, 0.13, 0.28), basinMat);
      innerCavity.position.set(0, 0.80, 0.08);
      innerCavity.userData.role = 'sink';
      g.add(innerCavity);

      // Center umbrella pop-up clicker drain
      const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.005, 20), chromeMat);
      drain.position.set(0, 0.738, 0.08);
      g.add(drain);

      // Rear single-hole faucet deck on basin with chrome collar
      const faucetDeck = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.005, 20), chromeMat);
      faucetDeck.position.set(0, 0.865, -0.10);
      g.add(faucetDeck);

      return g;
    }

    // 8. KOHLER New Trilogy™ 2000–2161 mm H Pivot Shower Door with 8 mm Thick Glass (K-704699IN-SHP)
    function buildNewTrilogyShowerDoor() {
      const g = new THREE.Group();

      // Ultra-clear 8 mm tempered glass pivot door (0.68m W x 2.02m H x 8mm)
      const doorGlass = new THREE.Mesh(new THREE.BoxGeometry(0.68, 2.02, 0.008), glassMat);
      doorGlass.position.set(0.14, 1.03, 0.45);
      doorGlass.userData.role = 'showerGlass';
      g.add(doorGlass);

      // Fixed inline glass return panel (0.30m W x 2.02m H x 8mm)
      const fixedGlass = new THREE.Mesh(new THREE.BoxGeometry(0.30, 2.02, 0.008), glassMat);
      fixedGlass.position.set(-0.34, 1.03, 0.45);
      fixedGlass.userData.role = 'showerGlass';
      g.add(fixedGlass);

      // Return glass wall (0.90m D x 2.02m H x 8mm)
      const sideGlass = new THREE.Mesh(new THREE.BoxGeometry(0.008, 2.02, 0.90), glassMat);
      sideGlass.position.set(0.48, 1.03, 0);
      sideGlass.userData.role = 'showerGlass';
      g.add(sideGlass);

      // Solid brass high-polish silver (SHP) top & bottom pivot hinges
      const topHinge = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.04), chromeMat);
      topHinge.position.set(-0.19, 2.03, 0.45);
      topHinge.userData.role = 'showerValve';
      g.add(topHinge);

      const bottomHinge = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.04), chromeMat);
      bottomHinge.position.set(-0.19, 0.04, 0.45);
      bottomHinge.userData.role = 'showerValve';
      g.add(bottomHinge);

      // Vertical tubular pull door handle (0.45m long, 22mm diameter)
      const handleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.45, 16), chromeMat);
      handleBar.position.set(0.42, 1.00, 0.48);
      handleBar.userData.role = 'showerValve';
      g.add(handleBar);

      // Standoff mounts for handle
      for (let yPos of [1.20, 0.80]) {
        const standoff = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.04, 12), chromeMat);
        standoff.rotation.x = Math.PI / 2;
        standoff.position.set(0.42, yPos, 0.46);
        g.add(standoff);
      }

      // Minimalist floor water sill threshold
      const sill = new THREE.Mesh(new THREE.BoxGeometry(1.00, 0.025, 0.035), chromeMat);
      sill.position.set(0, 0.012, 0.45);
      g.add(sill);

      // Clean shower receptor floor tray
      const showerTray = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.02, 0.92), porcelainMat);
      showerTray.position.set(0, 0.01, 0);
      g.add(showerTray);

      // Linear stainless floor drain
      const drain = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.005, 0.06), chromeMat);
      drain.position.set(0, 0.022, -0.30);
      g.add(drain);

      // Interior wall-mounted thermostatic column and mixer
      const thermoColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 1.10, 16), chromeMat);
      thermoColumn.position.set(-0.44, 1.35, -0.20);
      thermoColumn.userData.role = 'showerValve';
      g.add(thermoColumn);

      const mixerValve = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.06, 20), chromeMat);
      mixerValve.rotation.x = Math.PI / 2;
      mixerValve.position.set(-0.44, 1.05, -0.20);
      mixerValve.userData.role = 'showerValve';
      g.add(mixerValve);

      return g;
    }

    // 8. KOHLER Statement™ Three-function Showerhead (K-26290T-2MB)
    function buildStatementShowerhead() {
      const g = new THREE.Group();

      // Wall escutcheon flange plate
      const escutcheon = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.01, 24), matteBlackMat);
      escutcheon.rotation.x = Math.PI / 2;
      escutcheon.position.set(0, 2.15, -0.01);
      escutcheon.userData.role = 'showerValve';
      g.add(escutcheon);

      // Solid brass arched gooseneck shower arm (0.32m reach)
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.32, 16), matteBlackMat);
      arm.rotation.x = Math.PI / 2;
      arm.position.set(0, 2.15, 0.15);
      arm.userData.role = 'showerValve';
      g.add(arm);

      const armDrop = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.08, 16), matteBlackMat);
      armDrop.position.set(0, 2.11, 0.31);
      armDrop.userData.role = 'showerValve';
      g.add(armDrop);

      const ballJoint = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 16), matteBlackMat);
      ballJoint.position.set(0, 2.07, 0.31);
      ballJoint.userData.role = 'showerValve';
      g.add(ballJoint);

      // Statement™ round showerhead outer body (25 cm diameter)
      const head = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.03, 32), matteBlackMat);
      head.position.set(0, 2.03, 0.31);
      head.castShadow = true;
      head.userData.role = 'showerHead';
      g.add(head);

      // Multi-function sprayface plate
      const sprayFace = new THREE.Mesh(new THREE.CylinderGeometry(0.122, 0.122, 0.005, 32), matteBlackMat);
      sprayFace.position.set(0, 2.012, 0.31);
      sprayFace.userData.role = 'showerHead';
      g.add(sprayFace);

      // Concentric silicone nozzle rings
      for (let i = 0; i < 18; i++) {
        const theta = (i / 18) * Math.PI * 2;
        const nz = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.004, 8), chromeMat);
        nz.position.set(Math.cos(theta) * 0.095, 2.008, 0.31 + Math.sin(theta) * 0.095);
        g.add(nz);
      }
      for (let i = 0; i < 10; i++) {
        const theta = (i / 10) * Math.PI * 2;
        const nz = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 0.004, 8), chromeMat);
        nz.position.set(Math.cos(theta) * 0.055, 2.008, 0.31 + Math.sin(theta) * 0.055);
        g.add(nz);
      }

      // Tactile mode selector tab
      const selectorTab = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.012, 0.015), chromeMat);
      selectorTab.position.set(0, 2.03, 0.44);
      selectorTab.userData.role = 'showerValve';
      g.add(selectorTab);

      // Subtle Katalyst aerated water spray cone
      const waterCone = new THREE.Mesh(
        new THREE.ConeGeometry(0.32, 1.4, 24, 1, true),
        new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.16 })
      );
      waterCone.position.set(0, 1.30, 0.31);
      g.add(waterCone);

      return g;
    }

    // 9. KOHLER Evok 2.0™ 1.7M Seamless Rectangular Freestanding Bathtub (K-25164T-0)
    function buildEvok2Bathtub() {
      const g = new THREE.Group();

      // Contemporary seamless rectangular outer shell (1.70m L x 0.80m W x 0.60m H)
      const outerTub = new THREE.Mesh(new THREE.BoxGeometry(1.70, 0.58, 0.80), porcelainMat);
      outerTub.position.set(0, 0.29, 0);
      outerTub.castShadow = true;
      outerTub.userData.role = 'bathtub';
      g.add(outerTub);

      // Deep double-ended inner bathing well
      const innerWell = new THREE.Mesh(new THREE.BoxGeometry(1.54, 0.48, 0.64), porcelainMat);
      innerWell.position.set(0, 0.35, 0);
      innerWell.userData.role = 'bathtub';
      g.add(innerWell);

      // Left sloped lumbar backrest
      const leftSlope = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.46, 0.62), porcelainMat);
      leftSlope.rotation.z = Math.PI / 6;
      leftSlope.position.set(-0.62, 0.38, 0);
      g.add(leftSlope);

      // Right sloped lumbar backrest
      const rightSlope = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.46, 0.62), porcelainMat);
      rightSlope.rotation.z = -Math.PI / 6;
      rightSlope.position.set(0.62, 0.38, 0);
      g.add(rightSlope);

      // Integrated chrome linear slotted overflow
      const overflow = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.015, 0.006), chromeMat);
      overflow.position.set(0, 0.49, -0.315);
      overflow.userData.role = 'faucet';
      g.add(overflow);

      // Center push-button pop-up drain
      const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.008, 24), chromeMat);
      drain.position.set(0, 0.12, 0);
      g.add(drain);

      // Freestanding floor-mounted bath filler
      const fillerPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.88, 20), chromeMat);
      fillerPipe.position.set(0, 0.44, 0.48);
      fillerPipe.userData.role = 'faucet';
      g.add(fillerPipe);

      const fillerSpout = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.22, 16), chromeMat);
      fillerSpout.rotation.x = Math.PI / 2;
      fillerSpout.position.set(0, 0.86, 0.37);
      fillerSpout.userData.role = 'faucet';
      g.add(fillerSpout);

      return g;
    }

    // 10. KOHLER Ming™ 80 cm Lighted Mirror with Proximity Sensor (K-77115IN-NA)
    function buildMingLightedMirror() {
      const g = new THREE.Group();

      // Rear floating aluminum chassis (0.80m diameter)
      const chassis = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.03, 36), chromeMat);
      chassis.rotation.x = Math.PI / 2;
      chassis.position.set(0, 1.50, 0.015);
      g.add(chassis);

      // High-reflection central silver mirror face
      const mirrorFace = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.008, 36), mirrorMat);
      mirrorFace.rotation.x = Math.PI / 2;
      mirrorFace.position.set(0, 1.50, 0.034);
      mirrorFace.userData.role = 'mirror';
      g.add(mirrorFace);

      // Perimeter frosted glass halo diffuser ring
      const haloRing = new THREE.Mesh(new THREE.TorusGeometry(0.37, 0.03, 16, 48), frostedGlassMat);
      haloRing.position.set(0, 1.50, 0.03);
      haloRing.userData.role = 'mirror';
      g.add(haloRing);

      // Glowing LED halo backing
      const haloEmitter = new THREE.Mesh(
        new THREE.TorusGeometry(0.38, 0.015, 8, 48),
        new THREE.MeshBasicMaterial({ color: 0xffedd5 })
      );
      haloEmitter.position.set(0, 1.50, 0.018);
      g.add(haloEmitter);

      // Ambient warm PointLight for circadian task illumination
      const glowLight = new THREE.PointLight(0xffedd5, 0.65, 1.8);
      glowLight.position.set(0, 1.50, 0.08);
      g.add(glowLight);

      // Proximity sensor touch indicator dot at lower edge
      const sensorDot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.002, 16),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      sensorDot.rotation.x = Math.PI / 2;
      sensorDot.position.set(0, 1.22, 0.038);
      g.add(sensorDot);

      return g;
    }

    // 11. KOHLER Reve™ 1000 mm Lighted Mirror (K-23268IN-NA)
    function buildReveLightedMirror() {
      const g = new THREE.Group();

      // Rear aluminum chassis frame (1.00m W x 0.75m H)
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.99, 0.74, 0.025), chromeMat);
      frame.position.set(0, 1.50, 0.015);
      g.add(frame);

      // Main crystal-clear mirror glass
      const mirrorGlass = new THREE.Mesh(new THREE.BoxGeometry(1.00, 0.75, 0.008), mirrorMat);
      mirrorGlass.position.set(0, 1.50, 0.032);
      mirrorGlass.userData.role = 'mirror';
      g.add(mirrorGlass);

      // Twin vertical frosted LED task light bars (Left & Right)
      const leftLightBar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.70, 0.012), frostedGlassMat);
      leftLightBar.position.set(-0.44, 1.50, 0.036);
      leftLightBar.userData.role = 'mirror';
      g.add(leftLightBar);

      const rightLightBar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.70, 0.012), frostedGlassMat);
      rightLightBar.position.set(0.44, 1.50, 0.036);
      rightLightBar.userData.role = 'mirror';
      g.add(rightLightBar);

      // Daylight CRI 90+ LED strip emitters
      const leftEmitter = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.68, 0.005), new THREE.MeshBasicMaterial({ color: 0xf8fafc }));
      leftEmitter.position.set(-0.44, 1.50, 0.034);
      g.add(leftEmitter);

      const rightEmitter = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.68, 0.005), new THREE.MeshBasicMaterial({ color: 0xf8fafc }));
      rightEmitter.position.set(0.44, 1.50, 0.034);
      g.add(rightEmitter);

      // Dual task lights
      const leftLight = new THREE.PointLight(0xf8fafc, 0.45, 1.5);
      leftLight.position.set(-0.44, 1.50, 0.12);
      g.add(leftLight);

      const rightLight = new THREE.PointLight(0xf8fafc, 0.45, 1.5);
      rightLight.position.set(0.44, 1.50, 0.12);
      g.add(rightLight);

      // Capacitive touch dimmer button on lower glass bezel
      const touchButton = new THREE.Mesh(new THREE.CircleGeometry(0.009, 16), new THREE.MeshBasicMaterial({ color: 0x94a3b8 }));
      touchButton.position.set(0, 1.18, 0.038);
      g.add(touchButton);

      return g;
    }

    // 12. KOHLER Purist™ Single Control Lavatory Faucet (K-14402IN-4A-CP)
    function buildPuristSingleControlFaucet() {
      const g = new THREE.Group();

      // Circular escutcheon deck base
      const escutcheon = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.008, 24), chromeMat);
      escutcheon.position.set(0, 0.004, 0);
      escutcheon.userData.role = 'faucet';
      g.add(escutcheon);

      // Pure vertical cylindrical column body
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, 0.18, 24), chromeMat);
      body.position.set(0, 0.09, 0);
      body.castShadow = true;
      body.userData.role = 'faucet';
      g.add(body);

      // Straight cylindrical single lever handle on top
      const lever = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.075, 16), chromeMat);
      lever.rotation.x = Math.PI / 8;
      lever.position.set(0, 0.20, -0.015);
      lever.userData.role = 'faucet';
      g.add(lever);

      // Horizontal tubular spout extending forward
      const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.13, 20), chromeMat);
      spout.rotation.x = Math.PI / 2;
      spout.position.set(0, 0.16, 0.065);
      spout.castShadow = true;
      spout.userData.role = 'faucet';
      g.add(spout);

      // Downward 90° aerator tip
      const aerator = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.025, 16), chromeMat);
      aerator.position.set(0, 0.145, 0.125);
      aerator.userData.role = 'faucet';
      g.add(aerator);

      return g;
    }

    // 13. KOHLER Parallel™ Pillar Tap (K-23482IN-4-BV)
    function buildParallelPillarTap() {
      const g = new THREE.Group();

      // Faceted square base plate in Brushed Bronze
      const basePlate = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.01, 0.048), brushedBrassMat);
      basePlate.position.set(0, 0.005, 0);
      basePlate.userData.role = 'faucet';
      g.add(basePlate);

      // Geometric faceted pillar body
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.15, 0.038), brushedBrassMat);
      body.position.set(0, 0.08, 0);
      body.castShadow = true;
      body.userData.role = 'faucet';
      g.add(body);

      // Forward-leaning angular geometric spout
      const spout = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.028, 0.09), brushedBrassMat);
      spout.rotation.x = Math.PI / 10;
      spout.position.set(0, 0.14, 0.045);
      spout.castShadow = true;
      spout.userData.role = 'faucet';
      g.add(spout);

      // Laminar nozzle tip
      const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.015, 16), brushedBrassMat);
      nozzle.position.set(0, 0.12, 0.085);
      nozzle.userData.role = 'faucet';
      g.add(nozzle);

      // Top rotating quarter-turn pillar handle
      const topKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.035, 20), brushedBrassMat);
      topKnob.position.set(0, 0.175, 0);
      topKnob.userData.role = 'faucet';
      g.add(topKnob);

      return g;
    }

    // 14. KOHLER Artifacts™ Widespread Bathroom Sink Faucets (K-72760T-CP)
    function buildArtifactsWidespreadFaucet() {
      const g = new THREE.Group();

      // Center Edwardian column spout: flared decorative pedestal base
      const centerBase = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.038, 0.03, 24), chromeMat);
      centerBase.position.set(0, 0.015, 0);
      centerBase.userData.role = 'faucet';
      g.add(centerBase);

      const centerColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.025, 0.16, 24), chromeMat);
      centerColumn.position.set(0, 0.10, 0);
      centerColumn.userData.role = 'faucet';
      g.add(centerColumn);

      // Arched swan column neck
      const arch = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.015, 16, 32, Math.PI * 0.75), chromeMat);
      arch.rotation.y = Math.PI / 2;
      arch.position.set(0, 0.17, 0.05);
      arch.userData.role = 'faucet';
      g.add(arch);

      // Flared bell aerator tip
      const bellTip = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.012, 0.025, 20), chromeMat);
      bellTip.position.set(0, 0.12, 0.12);
      bellTip.userData.role = 'faucet';
      g.add(bellTip);

      // Left & Right widespread valves with authentic cross handles (with porcelain white caps)
      for (let hx of [-0.10, 0.10]) {
        const handleBase = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.032, 0.03, 20), chromeMat);
        handleBase.position.set(hx, 0.015, 0);
        handleBase.userData.role = 'faucet';
        g.add(handleBase);

        // 4-spoke cross handle
        const crossBar1 = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.012, 0.012), chromeMat);
        crossBar1.position.set(hx, 0.055, 0);
        crossBar1.userData.role = 'faucet';
        g.add(crossBar1);

        const crossBar2 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 0.055), chromeMat);
        crossBar2.position.set(hx, 0.055, 0);
        crossBar2.userData.role = 'faucet';
        g.add(crossBar2);

        // White porcelain center cap
        const porcelainCap = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.004, 16), porcelainMat);
        porcelainCap.position.set(hx, 0.063, 0);
        g.add(porcelainCap);
      }

      return g;
    }

    // 15. KOHLER Composed™ Tall Single-handle Bathroom Sink Faucet (K-73159IN-7-CP)
    function buildComposedTallFaucet() {
      const g = new THREE.Group();

      // Circular deck escutcheon
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.008, 24), chromeMat);
      base.position.set(0, 0.004, 0);
      base.userData.role = 'faucet';
      g.add(base);

      // Tall slender vessel tower column (0.31m height, clears Brazn vessel sink rim)
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.020, 0.022, 0.28, 24), chromeMat);
      tower.position.set(0, 0.14, 0);
      tower.castShadow = true;
      tower.userData.role = 'faucet';
      g.add(tower);

      // Side-mounted joystick control cylinder & lever
      const sidePivot = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.025, 16), chromeMat);
      sidePivot.rotation.z = Math.PI / 2;
      sidePivot.position.set(0.025, 0.24, 0);
      sidePivot.userData.role = 'faucet';
      g.add(sidePivot);

      const sideStick = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.065, 16), chromeMat);
      sideStick.position.set(0.035, 0.265, 0);
      sideStick.userData.role = 'faucet';
      g.add(sideStick);

      // Flat horizontal rectangular spout extending over basin
      const flatSpout = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.016, 0.16), chromeMat);
      flatSpout.position.set(0, 0.26, 0.08);
      flatSpout.castShadow = true;
      flatSpout.userData.role = 'faucet';
      g.add(flatSpout);

      // Concealed aerator outlet
      const aerator = new THREE.Mesh(new THREE.CylinderGeometry(0.010, 0.010, 0.006, 16), chromeMat);
      aerator.position.set(0, 0.248, 0.15);
      aerator.userData.role = 'faucet';
      g.add(aerator);

      return g;
    }

    
    // ==================== EXPANDED PROCEDURAL BUILDERS (PRODUCTS 17 - 60) ====================

    // 17. Leap™ Smart Toilet (K-28529IN-0)
    function buildLeapSmartToilet() {
      const g = new THREE.Group();
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.15, 0.42, 32), porcelainMat);
      bowl.position.set(0, 0.21, 0.18);
      bowl.scale.set(0.95, 1.0, 1.30);
      bowl.castShadow = true;
      g.add(bowl);

      const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.195, 0.195, 0.025, 32), porcelainMat);
      seat.position.set(0, 0.43, 0.18);
      seat.scale.set(0.95, 1.0, 1.30);
      g.add(seat);

      const consoleRear = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.19, 0.18), porcelainMat);
      consoleRear.position.set(0, 0.35, -0.06);
      g.add(consoleRear);

      const nightlight = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.015, 0.015), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
      nightlight.position.set(0, 0.04, 0.32);
      g.add(nightlight);

      const remote = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.13, 0.012), chromeMat);
      remote.position.set(0.36, 0.85, -0.01);
      g.add(remote);
      return g;
    }

    // 18. Innate™ Elongated Smart Toilet (K-29777IN-0)
    function buildInnateSmartToilet() {
      const g = new THREE.Group();
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.16, 0.44, 36), porcelainMat);
      bowl.position.set(0, 0.22, 0.22);
      bowl.scale.set(0.90, 1.0, 1.48);
      bowl.castShadow = true;
      g.add(bowl);

      const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.205, 0.205, 0.025, 36), porcelainMat);
      seat.position.set(0, 0.445, 0.22);
      seat.scale.set(0.90, 1.0, 1.48);
      g.add(seat);

      const trimRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.005, 8, 32), chromeMat);
      trimRing.rotation.x = Math.PI / 2;
      trimRing.position.set(0, 0.435, 0.22);
      trimRing.scale.set(0.90, 1.48, 1.0);
      g.add(trimRing);

      const consoleRear = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.22, 0.18), porcelainMat);
      consoleRear.position.set(0, 0.35, -0.06);
      g.add(consoleRear);

      const remote = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.15, 0.012), chromeMat);
      remote.position.set(0.38, 0.88, -0.01);
      g.add(remote);
      return g;
    }

    // 19 & 20. KOHLER VIVE® One-piece Toilet (K-33123IN-0 & K-33124IN-S-0)
    function buildViveRoundToilet() {
      const g = new THREE.Group();
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.14, 0.42, 32), porcelainMat);
      bowl.position.set(0, 0.21, 0.18);
      bowl.scale.set(0.96, 1.0, 1.34);
      bowl.castShadow = true;
      g.add(bowl);

      const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.34, 0.48), porcelainMat);
      skirt.position.set(0, 0.17, 0.08);
      g.add(skirt);

      const tank = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.34, 0.18), porcelainMat);
      tank.position.set(0, 0.56, -0.08);
      tank.castShadow = true;
      g.add(tank);

      const dualBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.008, 16), chromeMat);
      dualBtn.position.set(0, 0.734, -0.08);
      g.add(dualBtn);

      const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.024, 32), porcelainMat);
      seat.position.set(0, 0.43, 0.18);
      seat.scale.set(0.96, 1.0, 1.34);
      g.add(seat);
      return g;
    }

    // 21. Veil™ 16" Round Vessel Sink (K-20703-0)
    function buildVeilRoundVesselSink(finish = 'white') {
      const g = new THREE.Group();
      const mat = (finish === 'black') ? matteBlackMat : porcelainMat;
      const basin = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.15, 0.13, 32, 1, true), mat);
      basin.position.set(0, 0.065, 0);
      basin.castShadow = true;
      g.add(basin);

      const bottom = new THREE.Mesh(new THREE.CircleGeometry(0.15, 32), mat);
      bottom.rotation.x = -Math.PI / 2;
      bottom.position.set(0, 0.002, 0);
      g.add(bottom);

      const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.008, 24), chromeMat);
      drain.position.set(0, 0.006, 0);
      g.add(drain);
      return g;
    }

    // 22, 24, 27. Veil™ Oval Vessel Sinks (K-20705-0, K-20704-0, K-77171IN-0)
    function buildVeilOvalVesselSink(finish = 'white', widthScale = 1.0) {
      const g = new THREE.Group();
      const mat = (finish === 'black') ? matteBlackMat : porcelainMat;
      const basin = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.14, 36, 1, true), mat);
      basin.position.set(0, 0.07, 0);
      basin.scale.set(1.35 * widthScale, 1.0, 0.95);
      basin.castShadow = true;
      g.add(basin);

      const bottom = new THREE.Mesh(new THREE.CircleGeometry(0.16, 32), mat);
      bottom.rotation.x = -Math.PI / 2;
      bottom.scale.set(1.35 * widthScale, 0.95, 1.0);
      bottom.position.set(0, 0.003, 0);
      g.add(bottom);

      const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.008, 24), chromeMat);
      drain.position.set(0, 0.007, 0);
      g.add(drain);
      return g;
    }

    // 23. Veil™ Pedestal Basin (K-20702-0)
    function buildVeilPedestalSink(finish = 'white') {
      const g = new THREE.Group();
      const mat = (finish === 'black') ? matteBlackMat : porcelainMat;
      const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.72, 32), mat);
      pedestal.position.set(0, 0.36, 0.08);
      pedestal.castShadow = true;
      g.add(pedestal);

      const basin = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.15, 0.16, 36), mat);
      basin.position.set(0, 0.78, 0.08);
      basin.scale.set(0.96, 1.0, 1.15);
      basin.castShadow = true;
      g.add(basin);

      const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.008, 24), chromeMat);
      drain.position.set(0, 0.78, 0.08);
      g.add(drain);
      return g;
    }

    // 25. Ladena™ Semi-Recessed Basin (K-72907K-1-0)
    function buildLadenaSemiRecessedSink(finish = 'white') {
      const g = new THREE.Group();
      const mat = (finish === 'black') ? matteBlackMat : porcelainMat;
      const rim = new THREE.Mesh(new THREE.BoxGeometry(0.53, 0.04, 0.46), mat);
      rim.position.set(0, 0.02, 0.05);
      rim.castShadow = true;
      g.add(rim);

      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.15, 0.16, 28), mat);
      bowl.position.set(0, -0.06, 0.05);
      bowl.scale.set(1.15, 1.0, 0.90);
      g.add(bowl);

      const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.006, 20), chromeMat);
      drain.position.set(0, -0.13, 0.05);
      g.add(drain);
      return g;
    }

    // 28, 29, 34. Composed™ Wall-mount Faucets (K-73061T, K-73061IN, K-73067T)
    function buildComposedWallMountFaucet(finish = 'chrome') {
      const g = new THREE.Group();
      const mat = (finish === 'gold') ? brushedBrassMat : (finish === 'black' ? matteBlackMat : chromeMat);
      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.08, 0.015), mat);
      plate.position.set(0, 0.04, 0);
      plate.userData.role = 'faucet';
      g.add(plate);

      const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.19, 16), mat);
      spout.rotation.x = Math.PI / 2;
      spout.position.set(0, 0.04, 0.095);
      spout.userData.role = 'faucet';
      g.add(spout);

      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.045, 16), mat);
      handle.position.set(0.08, 0.04, 0.03);
      handle.userData.role = 'faucet';
      g.add(handle);
      return g;
    }

    // 30, 31, 32, 33. Composed™ Single-handle Faucets (Deck Mount)
    function buildComposedSingleFaucet(finish = 'chrome') {
      const g = new THREE.Group();
      const mat = (finish === 'gold') ? brushedBrassMat : (finish === 'black' ? matteBlackMat : chromeMat);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.01, 20), mat);
      base.position.set(0, 0.005, 0);
      base.userData.role = 'faucet';
      g.add(base);

      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.19, 0.038), mat);
      tower.position.set(0, 0.10, 0);
      tower.userData.role = 'faucet';
      g.add(tower);

      const spout = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.016, 0.14), mat);
      spout.position.set(0, 0.18, 0.06);
      spout.userData.role = 'faucet';
      g.add(spout);

      const lever = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.008, 0.075), mat);
      lever.position.set(0, 0.20, -0.01);
      lever.userData.role = 'faucet';
      g.add(lever);
      return g;
    }

    // 36, 37. Aleo™ Single-handle & Tall Faucets
    function buildAleoFaucet(finish = 'gold') {
      const g = new THREE.Group();
      const mat = (finish === 'chrome') ? chromeMat : brushedBrassMat;
      const column = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.026, 0.20, 20), mat);
      column.position.set(0, 0.10, 0);
      column.userData.role = 'faucet';
      g.add(column);

      const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.12, 16), mat);
      spout.rotation.x = Math.PI / 3;
      spout.position.set(0, 0.17, 0.06);
      spout.userData.role = 'faucet';
      g.add(spout);

      const lever = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.008, 0.07), mat);
      lever.position.set(0, 0.205, -0.01);
      lever.userData.role = 'faucet';
      g.add(lever);
      return g;
    }

    // 38. Hone™ Single Control Lav Faucet (K-22534IN-4-CP)
    function buildHoneFaucet(finish = 'chrome') {
      const g = new THREE.Group();
      const mat = chromeMat;
      const column = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.16, 20), mat);
      column.position.set(0, 0.08, 0);
      column.userData.role = 'faucet';
      g.add(column);

      const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.12, 16), mat);
      spout.rotation.x = Math.PI / 2.8;
      spout.position.set(0, 0.14, 0.05);
      spout.userData.role = 'faucet';
      g.add(spout);

      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.06, 16), mat);
      handle.position.set(0, 0.17, -0.01);
      handle.userData.role = 'faucet';
      g.add(handle);
      return g;
    }

    // 39. ModernLife Edge™ Tall Single-handle Faucet (K-25758IN-4ND-CP)
    function buildModernLifeEdgeFaucet(finish = 'chrome') {
      const g = new THREE.Group();
      const mat = chromeMat;
      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.29, 0.028), mat);
      tower.position.set(0, 0.145, 0);
      tower.userData.role = 'faucet';
      g.add(tower);

      const flatSpout = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.012, 0.16), mat);
      flatSpout.position.set(0, 0.28, 0.075);
      flatSpout.userData.role = 'faucet';
      g.add(flatSpout);

      const pinLever = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.05, 12), mat);
      pinLever.position.set(0, 0.30, 0);
      pinLever.userData.role = 'faucet';
      g.add(pinLever);
      return g;
    }

    // 40. Complementary™ Wall-mount Faucet Valve (K-5679IN-CP)
    function buildWallMountValve(finish = 'chrome') {
      const g = new THREE.Group();
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.012, 24), chromeMat);
      plate.rotation.x = Math.PI / 2;
      plate.position.set(0, 0.075, 0);
      plate.userData.role = 'faucet';
      g.add(plate);

      const lever = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.07, 0.035), chromeMat);
      lever.position.set(0, 0.075, 0.025);
      lever.userData.role = 'faucet';
      g.add(lever);
      return g;
    }

    // 41, 44, 46, 47, 48. Sliding Shower Doors (Elate, Contra, New Levity)
    function buildSlidingShowerDoor(finish = 'chrome') {
      const g = new THREE.Group();
      const mat = (finish === 'black') ? matteBlackMat : chromeMat;
      const topRail = new THREE.Mesh(new THREE.BoxGeometry(1.20, 0.05, 0.04), mat);
      topRail.position.set(0, 1.98, 0);
      g.add(topRail);

      const glass1 = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.94, 0.01), glassMat);
      glass1.position.set(-0.29, 0.98, -0.015);
      g.add(glass1);

      const glass2 = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.94, 0.01), glassMat);
      glass2.position.set(0.29, 0.98, 0.015);
      g.add(glass2);

      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.40, 16), mat);
      handle.position.set(0.10, 1.0, 0.035);
      g.add(handle);
      return g;
    }

    // 42, 43, 45, 49. Pivot Shower Doors (New Trilogy, Singulier)
    function buildPivotShowerDoor(finish = 'chrome') {
      const g = new THREE.Group();
      const mat = (finish === 'black') ? matteBlackMat : chromeMat;
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.92, 2.05, 0.04), mat);
      frame.position.set(0, 1.025, 0);
      g.add(frame);

      const glass = new THREE.Mesh(new THREE.BoxGeometry(0.84, 1.96, 0.01), glassMat);
      glass.position.set(0, 1.025, 0);
      g.add(glass);

      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.35, 16), mat);
      handle.position.set(0.35, 1.0, 0.03);
      g.add(handle);
      return g;
    }

    // 50 & 59. Archer™ & Embark™ Mirrored Cabinets
    function buildMirroredCabinet() {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.51, 0.79, 0.13), chromeMat);
      body.position.set(0, 0.395, -0.065);
      body.castShadow = true;
      g.add(body);

      const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.78, 0.01), mirrorMat);
      mirror.position.set(0, 0.395, 0.005);
      g.add(mirror);
      return g;
    }

    // 51, 52, 53. Forefront™ & Foreward™ Wall-hung Vanity Cabinets
    function buildWallHungVanityCabinet(finish = 'wood') {
      const g = new THREE.Group();
      const vanityMat = (finish === 'white') ? whiteLaminateMat : oakMat;
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.80, 0.52, 0.46), vanityMat);
      box.position.set(0, 0.58, 0);
      box.castShadow = true;
      g.add(box);

      const top = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.03, 0.47), porcelainMat);
      top.position.set(0, 0.855, 0);
      g.add(top);

      const seam = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.006, 0.01), matteBlackMat);
      seam.position.set(0, 0.58, 0.232);
      g.add(seam);
      return g;
    }

    // 54, 57. Capsule Lighted & Framed Mirrors (ModernLife, Essential)
    function buildCapsuleLightedMirror() {
      const g = new THREE.Group();
      const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.50, 1.00, 0.03), mirrorMat);
      mirror.position.set(0, 0.50, 0);
      g.add(mirror);

      const glow = new THREE.Mesh(new THREE.BoxGeometry(0.52, 1.02, 0.01), new THREE.MeshBasicMaterial({ color: 0xfff4e6 }));
      glow.position.set(0, 0.50, -0.01);
      g.add(glow);
      return g;
    }

    // 55, 56. Forefront™ Lite Lighted Mirrors (72cm, 90cm)
    function buildForefrontLiteMirror() {
      const g = new THREE.Group();
      const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.80, 0.65, 0.03), mirrorMat);
      mirror.position.set(0, 0.325, 0);
      g.add(mirror);

      const halo = new THREE.Mesh(new THREE.BoxGeometry(0.83, 0.68, 0.01), new THREE.MeshBasicMaterial({ color: 0xfafafa }));
      halo.position.set(0, 0.325, -0.01);
      g.add(halo);
      return g;
    }

    // 58. Essential Arched Framed Mirror (K-30637IN-BLL)
    function buildArchedFramedMirror() {
      const g = new THREE.Group();
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.92, 0.03), matteBlackMat);
      frame.position.set(0, 0.46, 0);
      g.add(frame);

      const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.88, 0.01), mirrorMat);
      mirror.position.set(0, 0.46, 0.015);
      g.add(mirror);
      return g;
    }

    // 60. Ove™ 170 × 75 cm Drop-in Whirlpool Bath (K-1709IN-K-0)
    function buildOveWhirlpoolBath() {
      const g = new THREE.Group();
      const shell = new THREE.Mesh(new THREE.BoxGeometry(1.70, 0.58, 0.75), porcelainMat);
      shell.position.set(0, 0.29, 0);
      shell.castShadow = true;
      g.add(shell);

      const interior = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.50, 24), porcelainMat);
      interior.scale.set(2.2, 1.0, 0.95);
      interior.position.set(0, 0.30, 0);
      g.add(interior);

      const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.01, 16), chromeMat);
      drain.position.set(0, 0.06, 0);
      g.add(drain);

      // 6 Chrome Whirlpool Jets
      for (let i = -1; i <= 1; i++) {
        const jetL = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.015, 12), chromeMat);
        jetL.rotation.z = Math.PI / 2;
        jetL.position.set(-0.70 + i * 0.45, 0.28, 0.34);
        g.add(jetL);

        const jetR = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.015, 12), chromeMat);
        jetR.rotation.z = Math.PI / 2;
        jetR.position.set(-0.70 + i * 0.45, 0.28, -0.34);
        g.add(jetR);
      }
      return g;
    }

// ==================== BACKWARD-COMPATIBILITY ALIASES ====================
    const buildReachToilet = buildReachOnePieceToilet;
    const buildMemoirsToilet = buildOveToilet;
    const buildTailoredVanity = buildViveIntegratedVanity;
    const buildJacquardVanity = buildTraceIntegratedVanity;
    const buildPrologueVanity = buildTraceIntegratedVanity;
    const buildLuxeVanity = buildViveIntegratedVanity;
    const buildForefrontBasin = buildForefrontSemiRecessedBasin;
    const buildBraznConsole = buildBraznVesselSink;
    const buildHydroRailShower = buildNewTrilogyShowerDoor;
    const buildStatementShower = buildStatementShowerhead;
    const buildEvokBathtub = buildEvok2Bathtub;
    const buildVerderaMirror = buildMingLightedMirror;
    const buildPuristFaucet = buildPuristSingleControlFaucet;
    const buildArtifactsFaucet = buildArtifactsWidespreadFaucet;
    const buildComposedFaucet = buildComposedTallFaucet;