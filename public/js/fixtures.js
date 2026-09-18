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

    // 4. KOHLER Prologue™ 75 cm Wall-hung Bathroom Vanity Cabinet (K-30457IN-MWF)
    function buildPrologueVanity(finish = 'wood') {
      const g = new THREE.Group();
      const finishMat = (finish === 'white') ? whiteLaminateMat : scandinavianOakMat;

      // Wall-hung floating cabinet body (cantilevered 75 cm W x 48 cm D x 48 cm H)
      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.48, 0.48), finishMat);
      cabinet.position.set(0, 0.24, 0);
      cabinet.castShadow = true;
      cabinet.userData.role = 'vanity';
      g.add(cabinet);

      // Two horizontal soft-close drawers with 45-degree J-pull channel
      const drawerUpper = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.21, 0.02), finishMat);
      drawerUpper.position.set(0, 0.35, 0.245);
      drawerUpper.userData.role = 'vanity';
      g.add(drawerUpper);

      const drawerLower = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.21, 0.02), finishMat);
      drawerLower.position.set(0, 0.12, 0.245);
      drawerLower.userData.role = 'vanity';
      g.add(drawerLower);

      // Subtle recessed shadow line handle channel
      const handleChannel = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.018, 0.02), matteBlackMat);
      handleChannel.position.set(0, 0.235, 0.24);
      g.add(handleChannel);

      // Integrated white vitreous china countertop washbasin (0.754m x 0.484m)
      const basinTop = new THREE.Mesh(new THREE.BoxGeometry(0.754, 0.04, 0.484), porcelainMat);
      basinTop.position.set(0, 0.49, 0);
      basinTop.castShadow = true;
      basinTop.userData.role = 'sink';
      g.add(basinTop);

      // Recessed inner washing basin
      const innerBasin = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.14, 0.32), porcelainMat);
      innerBasin.position.set(0, 0.42, 0.02);
      innerBasin.userData.role = 'sink';
      g.add(innerBasin);

      // Chrome umbrella clicker drain
      const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.005, 20), chromeMat);
      drain.position.set(0, 0.352, 0.02);
      g.add(drain);

      // Rear single-hole faucet deck ring
      const faucetDeck = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.005, 20), chromeMat);
      faucetDeck.position.set(0, 0.512, -0.14);
      g.add(faucetDeck);

      // Wall-mount rear shadow gap bracket
      const mountBracket = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.40, 0.02), industrialSteelMat);
      mountBracket.position.set(0, 0.24, -0.24);
      g.add(mountBracket);

      return g;
    }

    // 5. KOHLER Luxe™ 90 cm Wall-hung Bathroom Vanity Cabinet (K-30460IN-MWF)
    function buildLuxeVanity(finish = 'wood') {
      const g = new THREE.Group();
      const finishMat = (finish === 'white') ? whiteLaminateMat : darkMahoganyMat;

      // Wide luxury 90 cm floating cabinet body (0.90m W x 0.50m D x 0.48m H)
      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.90, 0.48, 0.50), finishMat);
      cabinet.position.set(0, 0.24, 0);
      cabinet.castShadow = true;
      cabinet.userData.role = 'vanity';
      g.add(cabinet);

      // Architectural brushed brass accent border trim
      const trimTop = new THREE.Mesh(new THREE.BoxGeometry(0.904, 0.012, 0.015), brushedBrassMat);
      trimTop.position.set(0, 0.475, 0.252);
      trimTop.userData.role = 'vanity';
      g.add(trimTop);

      // Deep wide storage drawer panel
      const drawerFront = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.44, 0.02), finishMat);
      drawerFront.position.set(0, 0.23, 0.252);
      drawerFront.userData.role = 'vanity';
      g.add(drawerFront);

      // Slim horizontal brass architectural drawer pull
      const pullBar = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.015, 0.018), brushedBrassMat);
      pullBar.position.set(0, 0.38, 0.265);
      pullBar.userData.role = 'vanity';
      g.add(pullBar);

      // Seamless luxury countertop with wide landing areas on left and right
      const counterTop = new THREE.Mesh(new THREE.BoxGeometry(0.906, 0.045, 0.506), calacattaMarbleMat);
      counterTop.position.set(0, 0.49, 0);
      counterTop.castShadow = true;
      counterTop.userData.role = 'sink';
      g.add(counterTop);

      // Deep centered rectangular wash basin
      const innerBasin = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.15, 0.33), porcelainMat);
      innerBasin.position.set(0, 0.41, 0.02);
      innerBasin.userData.role = 'sink';
      g.add(innerBasin);

      // Pop-up umbrella drain
      const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.006, 24), brushedBrassMat);
      drain.position.set(0, 0.34, 0.02);
      g.add(drain);

      // Ambient downward under-vanity LED light strip casting warm architectural glow
      const underGlow = new THREE.Mesh(
        new THREE.BoxGeometry(0.80, 0.012, 0.012),
        new THREE.MeshBasicMaterial({ color: 0xfef08a })
      );
      underGlow.position.set(0, 0.01, 0.10);
      g.add(underGlow);

      const downLight = new THREE.PointLight(0xfef08a, 0.55, 1.2);
      downLight.position.set(0, 0.03, 0.10);
      g.add(downLight);

      return g;
    }

    // 6. KOHLER Brazn™ 58.4 cm Rectangular Vessel Bathroom Sink (K-21060IN-0)
    function buildBraznVesselSink(finish = 'black') {
      const g = new THREE.Group();
      const basinMat = (finish === 'white') ? porcelainMat : matteBlackMat;

      // Architectural floating console shelf (0.82m W x 0.46m D)
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.06, 0.46), teakMat);
      shelf.position.set(0, 0.72, 0);
      shelf.castShadow = true;
      shelf.userData.role = 'vanity';
      g.add(shelf);

      // Front horizontal towel rail bar
      const towelRail = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.74, 16), matteBlackMat);
      towelRail.rotation.z = Math.PI / 2;
      towelRail.position.set(0, 0.66, 0.23);
      towelRail.userData.role = 'vanity';
      g.add(towelRail);

      // Exposed decorative bottle trap underneath
      const bottleTrap = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.28, 16), matteBlackMat);
      bottleTrap.position.set(0, 0.54, 0.02);
      g.add(bottleTrap);

      const wallWastePipe = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.24, 16), matteBlackMat);
      wallWastePipe.rotation.x = Math.PI / 2;
      wallWastePipe.position.set(0, 0.48, -0.10);
      g.add(wallWastePipe);

      // Authentic Brazn 58.4 cm Rectangular Vessel Sink (58.4 cm x 36.8 cm x 11.5 cm)
      const vesselBody = new THREE.Mesh(new THREE.BoxGeometry(0.584, 0.115, 0.368), basinMat);
      vesselBody.position.set(0, 0.81, 0.02);
      vesselBody.castShadow = true;
      vesselBody.userData.role = 'sink';
      g.add(vesselBody);

      // Thin chamfered inner basin cavity (only 12mm thin rim walls)
      const innerCavity = new THREE.Mesh(new THREE.BoxGeometry(0.558, 0.105, 0.342), basinMat);
      innerCavity.position.set(0, 0.82, 0.02);
      innerCavity.userData.role = 'sink';
      g.add(innerCavity);

      // Center clicker umbrella pop-up drain
      const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.006, 24), matteBlackMat);
      drain.position.set(0, 0.768, 0.02);
      g.add(drain);

      return g;
    }

    // 7. KOHLER New Trilogy™ 2000–2161 mm H Pivot Shower Door with 8 mm Thick Glass (K-704699IN-SHP)
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

    // ==================== BACKWARD-COMPATIBILITY ALIASES ====================
    const buildReachToilet = buildReachOnePieceToilet;
    const buildLeapSmartToilet = buildReachOnePieceToilet;
    const buildMemoirsToilet = buildOveToilet;
    const buildTailoredVanity = buildLuxeVanity;
    const buildJacquardVanity = buildPrologueVanity;
    const buildBraznConsole = buildBraznVesselSink;
    const buildHydroRailShower = buildNewTrilogyShowerDoor;
    const buildStatementShower = buildStatementShowerhead;
    const buildEvokBathtub = buildEvok2Bathtub;
    const buildVerderaMirror = buildMingLightedMirror;
    const buildPuristFaucet = buildPuristSingleControlFaucet;
    const buildArtifactsFaucet = buildArtifactsWidespreadFaucet;
    const buildComposedFaucet = buildComposedTallFaucet;