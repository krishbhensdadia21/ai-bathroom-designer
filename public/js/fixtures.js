    // ==================== 3. 3D PROCEDURAL BUILDER FUNCTIONS (AUTHENTIC KOHLER) ====================
    // 1. KOHLER Veil Intelligent Wall-Hung / One-Piece Smart Toilet (K-5401IN-0)
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

    // 2. KOHLER Leap Smart Toilet (K-28529IN-0)
    function buildLeapSmartToilet() {
      const g = new THREE.Group();
      const tank = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.44, 0.18), porcelainMat);
      tank.position.set(0, 0.54, -0.04);
      tank.castShadow = true;
      g.add(tank);

      const tankLid = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.03, 0.19), porcelainMat);
      tankLid.position.set(0, 0.77, -0.04);
      g.add(tankLid);

      const sensorRing = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.008, 24), new THREE.MeshBasicMaterial({ color: 0x60a5fa }));
      sensorRing.position.set(0, 0.785, -0.04);
      sensorRing.userData.role = 'flushPlate';
      g.add(sensorRing);

      const base = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.36, 0.44), porcelainMat);
      base.position.set(0, 0.18, 0.16);
      base.castShadow = true;
      g.add(base);

      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.14, 0.24, 32), porcelainMat);
      bowl.position.set(0, 0.30, 0.28);
      bowl.scale.set(1.0, 1.0, 1.30);
      bowl.castShadow = true;
      g.add(bowl);

      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.025, 32), porcelainMat);
      lid.position.set(0, 0.43, 0.28);
      lid.scale.set(1.0, 1.0, 1.30);
      g.add(lid);

      return g;
    }

    // 3. KOHLER Memoirs Stately Toilet (K-3983IN-0)
    function buildMemoirsToilet() {
      const g = new THREE.Group();
      const tank = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.44, 0.20), porcelainMat);
      tank.position.set(0, 0.58, -0.04);
      tank.castShadow = true;
      g.add(tank);

      const crownMolding = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.05, 0.23), porcelainMat);
      crownMolding.position.set(0, 0.81, -0.04);
      crownMolding.castShadow = true;
      g.add(crownMolding);

      const base = new THREE.Mesh(new THREE.BoxGeometry(0.29, 0.38, 0.46), porcelainMat);
      base.position.set(0, 0.19, 0.15);
      base.castShadow = true;
      g.add(base);

      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.14, 0.24, 32), porcelainMat);
      bowl.position.set(0, 0.31, 0.28);
      bowl.scale.set(1.0, 1.0, 1.32);
      bowl.castShadow = true;
      g.add(bowl);

      const lever = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.018, 0.018), chromeMat);
      lever.position.set(-0.23, 0.74, 0.02);
      lever.userData.role = 'flushPlate';
      g.add(lever);

      return g;
    }

    // 4. KOHLER Reach Wall-Hung Toilet (K-77701IN-0)
    function buildReachToilet() {
      const g = new THREE.Group();
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.13, 0.34, 32), porcelainMat);
      bowl.position.set(0, 0.38, 0.24);
      bowl.scale.set(1.0, 1.0, 1.32);
      bowl.castShadow = true;
      g.add(bowl);

      const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.185, 0.022, 32), porcelainMat);
      seat.position.set(0, 0.555, 0.24);
      seat.scale.set(1.0, 1.0, 1.32);
      g.add(seat);

      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 0.015), chromeMat);
      plate.position.set(0, 0.95, -0.01);
      plate.userData.role = 'flushPlate';
      g.add(plate);

      for (let bx of [-0.04, 0.04]) {
        const btn = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.008), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 }));
        btn.position.set(bx, 0.95, 0.003);
        g.add(btn);
      }

      return g;
    }

    // 5. KOHLER Tailored 60" Floating Master Dual Vanity (K-99539-LG)
    function buildTailoredVanity(finish = 'white') {
      const g = new THREE.Group();
      const mainMat = getFinishMaterial(finish);
      const w = 1.54, h = 0.52, d = 0.54;
      const elevY = 0.30;
      const cy = elevY + h / 2;

      // Sleek Floating Carcass Body
      const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mainMat);
      body.position.set(0, cy, 0);
      body.castShadow = true;
      body.receiveShadow = true;
      body.userData.role = 'vanityCarcass';
      g.add(body);

      // Under-cabinet soft warm LED mood wash
      const underGlow = new THREE.Mesh(
        new THREE.BoxGeometry(w - 0.10, 0.01, d - 0.10),
        new THREE.MeshBasicMaterial({ color: 0xfff0d6 })
      );
      underGlow.name = 'vanity-underglow';
      underGlow.position.set(0, elevY + 0.005, 0);
      g.add(underGlow);

      const underLight = new THREE.PointLight(0xffedd5, 0.55, 1.2);
      underLight.position.set(0, elevY - 0.05, 0);
      g.add(underLight);

      // 4 Precision Soft-Close Slab Drawer Fronts
      const colW = (w - 0.06) / 2;
      const rowH = (h - 0.06) / 2;
      for (let c of [-1, 1]) {
        const cx = c * (colW / 2 + 0.015);
        for (let r = 0; r < 2; r++) {
          const ry = elevY + 0.02 + r * (rowH + 0.02) + rowH / 2;
          const front = new THREE.Mesh(new THREE.BoxGeometry(colW - 0.01, rowH - 0.01, 0.02), mainMat);
          front.position.set(cx, ry, d / 2 + 0.01);
          front.castShadow = true;
          front.userData.role = 'vanityCarcass';
          g.add(front);

          // Purist architectural horizontal edge pull handle
          const handle = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.016, 0.022), matteBlackMat);
          handle.position.set(cx, ry + (r === 1 ? rowH / 2 - 0.03 : rowH / 2 - 0.02), d / 2 + 0.025);
          handle.castShadow = true;
          handle.userData.role = 'vanityHardware';
          g.add(handle);
        }
      }

      // Countertop
      const counterH = 0.038;
      const counterTopY = elevY + h + counterH / 2;
      const counter = new THREE.Mesh(new THREE.BoxGeometry(w + 0.04, counterH, d + 0.04), porcelainMat);
      counter.position.set(0, counterTopY, 0);
      counter.castShadow = true;
      counter.receiveShadow = true;
      counter.userData.role = 'vanityCounter';
      g.add(counter);

      // Twin Kohler Ladena Undermount Sinks & Tall Faucets
      const sinkSurfaceY = elevY + h + counterH;
      for (let sx of [-0.42, 0.42]) {
        const basinRim = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.015, 0.38), porcelainMat);
        basinRim.position.set(sx, sinkSurfaceY + 0.005, 0.02);
        basinRim.userData.role = 'basin';
        g.add(basinRim);

        const basinCavity = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.08, 0.34), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.1 }));
        basinCavity.position.set(sx, sinkSurfaceY - 0.035, 0.02);
        basinCavity.userData.role = 'basin';
        g.add(basinCavity);

        const drain = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.006, 16), chromeMat);
        drain.position.set(sx, sinkSurfaceY - 0.07, 0.02);
        drain.userData.role = 'faucet';
        g.add(drain);

        // Faucet base, stem, spout, joystick lever
        const faucetBase = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.026, 0.02, 20), matteBlackMat);
        faucetBase.position.set(sx, sinkSurfaceY + 0.01, -0.15);
        faucetBase.castShadow = true;
        faucetBase.userData.role = 'faucet';
        g.add(faucetBase);

        const faucetStem = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.24, 20), matteBlackMat);
        faucetStem.position.set(sx, sinkSurfaceY + 0.13, -0.15);
        faucetStem.castShadow = true;
        faucetStem.userData.role = 'faucet';
        g.add(faucetStem);

        const spout = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.014, 0.13), matteBlackMat);
        spout.position.set(sx, sinkSurfaceY + 0.23, -0.09);
        spout.castShadow = true;
        spout.userData.role = 'faucet';
        g.add(spout);

        const lever = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.07, 16), matteBlackMat);
        lever.rotation.z = Math.PI / 4;
        lever.position.set(sx + 0.04, sinkSurfaceY + 0.22, -0.15);
        lever.userData.role = 'faucet';
        g.add(lever);
      }

      return g;
    }

    // 6. KOHLER Jacquard 36" Vanity Cabinet (K-99507IN-0)
    function buildJacquardVanity(finish = 'white') {
      const g = new THREE.Group();
      const mainMat = getFinishMaterial(finish);
      const w = 0.94, h = 0.82, d = 0.54;

      const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mainMat);
      body.position.set(0, h / 2, 0);
      body.castShadow = true;
      body.userData.role = 'vanityCarcass';
      g.add(body);

      const top = new THREE.Mesh(new THREE.BoxGeometry(w + 0.04, 0.04, d + 0.04), porcelainMat);
      top.position.set(0, h + 0.02, 0);
      top.castShadow = true;
      top.userData.role = 'vanityCounter';
      g.add(top);

      const basin = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.08, 0.36), porcelainMat);
      basin.position.set(0, h + 0.03, 0.02);
      basin.userData.role = 'basin';
      g.add(basin);

      const tap = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.018, 0.24, 16), chromeMat);
      tap.position.set(0, h + 0.14, -0.14);
      tap.castShadow = true;
      tap.userData.role = 'faucet';
      g.add(tap);

      const spout = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.014, 0.12), chromeMat);
      spout.position.set(0, h + 0.24, -0.09);
      spout.userData.role = 'faucet';
      g.add(spout);

      for (let ky of [h * 0.35, h * 0.65]) {
        const pull = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.014, 0.02), chromeMat);
        pull.position.set(0, ky, d / 2 + 0.015);
        pull.userData.role = 'vanityHardware';
        g.add(pull);
      }

      return g;
    }

    // 7. KOHLER Brazn Japanese Zen Minimalist Console (K-21057-0)
    function buildBraznConsole() {
      const g = new THREE.Group();
      const w = 0.86, d = 0.50, h = 0.82;

      const frameTop = new THREE.Mesh(new THREE.BoxGeometry(w, 0.035, d), industrialSteelMat);
      frameTop.position.set(0, h - 0.018, 0);
      frameTop.castShadow = true;
      frameTop.userData.role = 'vanityCarcass';
      g.add(frameTop);

      const woodTop = new THREE.Mesh(new THREE.BoxGeometry(w - 0.04, 0.02, d - 0.04), teakMat);
      woodTop.position.set(0, h, 0);
      woodTop.userData.role = 'vanityCounter';
      g.add(woodTop);

      const legSize = 0.025;
      for (let x of [-w / 2 + legSize, w / 2 - legSize]) {
        for (let z of [-d / 2 + legSize, d / 2 - legSize]) {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(legSize, h, legSize), industrialSteelMat);
          leg.position.set(x, h / 2, z);
          leg.castShadow = true;
          leg.userData.role = 'vanityCarcass';
          g.add(leg);
        }
      }

      const shelf = new THREE.Mesh(new THREE.BoxGeometry(w - 0.06, 0.015, d - 0.06), teakMat);
      shelf.position.set(0, 0.22, 0);
      shelf.userData.role = 'vanityCounter';
      g.add(shelf);

      const vesselBasin = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.16, 0.13, 36), porcelainMat);
      vesselBasin.position.set(0, h + 0.075, 0.02);
      vesselBasin.castShadow = true;
      vesselBasin.userData.role = 'basin';
      g.add(vesselBasin);

      const faucet = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.32, 0.024), matteBlackMat);
      faucet.position.set(0, h + 0.16, -0.16);
      faucet.userData.role = 'faucet';
      g.add(faucet);

      const spout = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.018, 0.14), matteBlackMat);
      spout.position.set(0, h + 0.30, -0.10);
      spout.userData.role = 'faucet';
      g.add(spout);

      return g;
    }

    // 8. KOHLER Verdera Voice Lighted Smart Mirror with Amazon Alexa (K-99009IN-NA)
    function buildVerderaMirror() {
      const g = new THREE.Group();
      const w = 1.25, h = 0.88, d = 0.028;
      const cy = 1.62;

      // Anodized chassis / outer architectural frame
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5, metalness: 0.8 }));
      chassis.position.set(0, cy, -d / 2);
      chassis.userData.role = 'mirrorFrame';
      g.add(chassis);

      // Crystal Clear Mirror Surface
      const mirrorGlass = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.08, h - 0.08), mirrorMat);
      mirrorGlass.position.set(0, cy, 0.001);
      g.add(mirrorGlass);

      // Frosted LED Perimeter Halo Frame
      const borderThick = 0.04;
      const ledHaloMat = new THREE.MeshBasicMaterial({ color: 0xfffbea });

      const topLed = new THREE.Mesh(new THREE.BoxGeometry(w, borderThick, 0.006), ledHaloMat);
      topLed.position.set(0, cy + h / 2 - borderThick / 2, 0.002);
      topLed.userData.role = 'mirrorHalo';
      g.add(topLed);

      const botLed = new THREE.Mesh(new THREE.BoxGeometry(w, borderThick, 0.006), ledHaloMat);
      botLed.position.set(0, cy - h / 2 + borderThick / 2, 0.002);
      botLed.userData.role = 'mirrorHalo';
      g.add(botLed);

      const leftLed = new THREE.Mesh(new THREE.BoxGeometry(borderThick, h - borderThick * 2, 0.006), ledHaloMat);
      leftLed.position.set(-w / 2 + borderThick / 2, cy, 0.002);
      leftLed.userData.role = 'mirrorHalo';
      g.add(leftLed);

      const rightLed = new THREE.Mesh(new THREE.BoxGeometry(borderThick, h - borderThick * 2, 0.006), ledHaloMat);
      rightLed.position.set(w / 2 - borderThick / 2, cy, 0.002);
      rightLed.userData.role = 'mirrorHalo';
      g.add(rightLed);

      const alexaRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.016, 0.003, 16, 32),
        new THREE.MeshBasicMaterial({ color: 0x00d2ff })
      );
      alexaRing.position.set(0, cy - h / 2 + borderThick / 2, 0.006);
      g.add(alexaRing);

      const taskLight = new THREE.PointLight(0xfffaea, 0.75, 2.4, 1.2);
      taskLight.position.set(0, cy - 0.10, 0.18);
      g.add(taskLight);

      return g;
    }

    // 9. KOHLER HydroRail-R Thermostatic Shower System (K-76465IN-CP)
    function buildHydroRailShower() {
      const g = new THREE.Group();
      const trayW = 1.12, trayD = 0.96, trayH = 0.045;
      
      const trayMat = new THREE.MeshStandardMaterial({ color: 0x1c1f24, roughness: 0.82, metalness: 0.08 });
      const tray = new THREE.Mesh(new THREE.BoxGeometry(trayW, trayH, trayD), trayMat);
      tray.position.set(0, trayH / 2, 0);
      tray.receiveShadow = true;
      g.add(tray);

      const basinFloor = new THREE.Mesh(new THREE.BoxGeometry(trayW - 0.06, 0.012, trayD - 0.06), new THREE.MeshStandardMaterial({ color: 0x24282f, roughness: 0.75 }));
      basinFloor.position.set(0, trayH + 0.002, 0);
      basinFloor.receiveShadow = true;
      g.add(basinFloor);

      const drainTrench = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.008, 0.075), chromeMat);
      drainTrench.position.set(0, trayH + 0.008, -trayD / 2 + 0.12);
      drainTrench.userData.role = 'showerMetal';
      g.add(drainTrench);

      for (let dx = -0.30; dx <= 0.30; dx += 0.04) {
        const slot = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.009, 0.035), new THREE.MeshBasicMaterial({ color: 0x090a0c }));
        slot.position.set(dx, trayH + 0.009, -trayD / 2 + 0.12);
        g.add(slot);
      }

      // 2. KOHLER Revel Glass Box Enclosure
      const boxH = 2.10;
      const glassThick = 0.01;
      const glassMatCleanCoat = new THREE.MeshPhysicalMaterial({
        color: 0xf8fafc,
        transparent: true,
        opacity: 0.22,
        roughness: 0.04,
        transmission: 0.94,
        ior: 1.52,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02
      });

      const returnW = trayD - 0.04;
      const returnX = trayW / 2 - 0.02;
      const returnPanel = new THREE.Mesh(new THREE.BoxGeometry(glassThick, boxH, returnW), glassMatCleanCoat);
      returnPanel.position.set(returnX, trayH + boxH / 2, 0);
      returnPanel.castShadow = true;
      g.add(returnPanel);

      const returnWallJamb = new THREE.Mesh(new THREE.BoxGeometry(0.028, boxH, 0.028), chromeMat);
      returnWallJamb.position.set(returnX, trayH + boxH / 2, -trayD / 2 + 0.014);
      returnWallJamb.userData.role = 'showerMetal';
      g.add(returnWallJamb);

      const returnBottomU = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.018, returnW), chromeMat);
      returnBottomU.position.set(returnX, trayH + 0.009, 0);
      returnBottomU.userData.role = 'showerMetal';
      g.add(returnBottomU);

      const cornerClampTop = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.035, 0.04), chromeMat);
      cornerClampTop.position.set(returnX, trayH + boxH - 0.02, trayD / 2 - 0.02);
      cornerClampTop.userData.role = 'showerMetal';
      g.add(cornerClampTop);

      const fixedFrontW = 0.38;
      const frontZ = trayD / 2 - 0.02;
      const fixedX = returnX - fixedFrontW / 2;
      const fixedFrontPanel = new THREE.Mesh(new THREE.BoxGeometry(fixedFrontW, boxH, glassThick), glassMatCleanCoat);
      fixedFrontPanel.position.set(fixedX, trayH + boxH / 2, frontZ);
      fixedFrontPanel.castShadow = true;
      g.add(fixedFrontPanel);

      const fixedBottomU = new THREE.Mesh(new THREE.BoxGeometry(fixedFrontW, 0.018, 0.024), chromeMat);
      fixedBottomU.position.set(fixedX, trayH + 0.009, frontZ);
      fixedBottomU.userData.role = 'showerMetal';
      g.add(fixedBottomU);

      const topTieBar = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, returnW, 16), chromeMat);
      topTieBar.rotation.x = Math.PI / 2;
      topTieBar.position.set(returnX - 0.02, trayH + boxH - 0.03, 0);
      topTieBar.userData.role = 'showerMetal';
      g.add(topTieBar);

      // Glass door
      const doorW = 0.68, doorH = 2.02;
      const doorPivotX = fixedX - fixedFrontW / 2;
      const doorGroup = new THREE.Group();
      doorGroup.position.set(doorPivotX, trayH + 0.02, frontZ);
      doorGroup.rotation.y = -Math.PI / 11;

      const doorPane = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorH, glassThick), glassMatCleanCoat);
      doorPane.position.set(-doorW / 2, doorH / 2, 0);
      doorPane.castShadow = true;
      doorGroup.add(doorPane);

      for (let hy of [0.04, doorH - 0.04]) {
        const hinge = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.055, 0.032), chromeMat);
        hinge.position.set(0, hy, 0);
        hinge.castShadow = true;
        hinge.userData.role = 'showerMetal';
        doorGroup.add(hinge);
      }

      const handleH = 0.42;
      const handleX = -doorW + 0.08;
      const handleY = doorH / 2;

      const extHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, handleH, 20), chromeMat);
      extHandle.position.set(handleX, handleY, 0.035);
      extHandle.castShadow = true;
      extHandle.userData.role = 'showerMetal';
      doorGroup.add(extHandle);

      const intHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, handleH, 20), chromeMat);
      intHandle.position.set(handleX, handleY, -0.035);
      intHandle.userData.role = 'showerMetal';
      doorGroup.add(intHandle);

      for (let sy of [handleY - handleH / 2 + 0.03, handleY + handleH / 2 - 0.03]) {
        const standoff = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.075, 16), chromeMat);
        standoff.rotation.x = Math.PI / 2;
        standoff.position.set(handleX, sy, 0);
        standoff.userData.role = 'showerMetal';
        doorGroup.add(standoff);
      }

      const sweep = new THREE.Mesh(new THREE.BoxGeometry(doorW, 0.02, 0.014), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, roughness: 0.2 }));
      sweep.position.set(-doorW / 2, 0.01, 0);
      doorGroup.add(sweep);

      // --- CRITTALL GRID MULLIONS SUBGROUP (For Industrial Chic Theme) ---
      const crittallGroup = new THREE.Group();
      crittallGroup.userData.role = 'crittallMullions';
      crittallGroup.visible = false;

      // Mullions on return glass panel (3 horizontal bars, 1 vertical bar)
      for (let my of [0.55, 1.08, 1.62]) {
        const mBar = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.018, returnW), matteBlackMat);
        mBar.position.set(returnX, trayH + my, 0);
        mBar.userData.role = 'crittallMullions';
        crittallGroup.add(mBar);
      }
      const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.016, boxH, 0.018), matteBlackMat);
      vBar.position.set(returnX, trayH + boxH / 2, 0);
      vBar.userData.role = 'crittallMullions';
      crittallGroup.add(vBar);

      // Mullions on pivoting glass door
      for (let my of [0.55, 1.08, 1.62]) {
        const dHBar = new THREE.Mesh(new THREE.BoxGeometry(doorW, 0.018, 0.014), matteBlackMat);
        dHBar.position.set(-doorW / 2, my, 0.007);
        dHBar.userData.role = 'crittallMullions';
        dHBar.visible = false;
        doorGroup.add(dHBar);
      }
      const dVBar = new THREE.Mesh(new THREE.BoxGeometry(0.018, doorH, 0.014), matteBlackMat);
      dVBar.position.set(-doorW / 2, doorH / 2, 0.007);
      dVBar.userData.role = 'crittallMullions';
      dVBar.visible = false;
      doorGroup.add(dVBar);

      g.add(crittallGroup);
      g.add(doorGroup);

      const leftJambX = -trayW / 2 + 0.02;
      const leftWallJamb = new THREE.Mesh(new THREE.BoxGeometry(0.025, boxH, 0.028), chromeMat);
      leftWallJamb.position.set(leftJambX, trayH + boxH / 2, frontZ);
      leftWallJamb.userData.role = 'showerMetal';
      g.add(leftWallJamb);

      // 3. HydroRail-R Solid Brass Column System
      const railZ = -trayD / 2 + 0.04;
      const railX = -0.05;

      for (let ey of [0.95, 2.05]) {
        const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.025, 24), chromeMat);
        flange.rotation.x = Math.PI / 2;
        flange.position.set(railX, ey, railZ - 0.012);
        flange.castShadow = true;
        flange.userData.role = 'showerMetal';
        g.add(flange);
      }

      const colHeight = 1.15;
      const columnRail = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, colHeight, 24), chromeMat);
      columnRail.position.set(railX, 0.95 + colHeight / 2, railZ);
      columnRail.castShadow = true;
      columnRail.userData.role = 'showerMetal';
      g.add(columnRail);

      const diverterBody = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.08, 24), chromeMat);
      diverterBody.position.set(railX, 0.95, railZ);
      diverterBody.userData.role = 'showerMetal';
      g.add(diverterBody);

      const diverterKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.035, 16), chromeMat);
      diverterKnob.rotation.x = Math.PI / 2;
      diverterKnob.position.set(railX, 0.95, railZ + 0.025);
      diverterKnob.userData.role = 'showerMetal';
      g.add(diverterKnob);

      const archPipe1 = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.14, 20), chromeMat);
      archPipe1.position.set(railX, 1.98, railZ);
      archPipe1.userData.role = 'showerMetal';
      g.add(archPipe1);

      const archCorner = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.013, 16, 24, Math.PI / 2), chromeMat);
      archCorner.position.set(railX, 2.02, railZ + 0.09);
      archCorner.userData.role = 'showerMetal';
      g.add(archCorner);

      const archPipe2 = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.32, 20), chromeMat);
      archPipe2.rotation.x = Math.PI / 2;
      archPipe2.position.set(railX, 2.11, railZ + 0.25);
      archPipe2.castShadow = true;
      archPipe2.userData.role = 'showerMetal';
      g.add(archPipe2);

      // Statement 12" Round Rainhead
      const headZ = railZ + 0.41;
      const headY = 2.08;

      const swivel = new THREE.Mesh(new THREE.SphereGeometry(0.018, 16, 16), chromeMat);
      swivel.position.set(railX, headY + 0.02, headZ);
      swivel.userData.role = 'showerMetal';
      g.add(swivel);

      const rainheadShell = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.015, 48), chromeMat);
      rainheadShell.position.set(railX, headY, headZ);
      rainheadShell.castShadow = true;
      rainheadShell.userData.role = 'showerMetal';
      g.add(rainheadShell);

      const sprayFace = new THREE.Mesh(new THREE.CylinderGeometry(0.152, 0.152, 0.004, 48), new THREE.MeshStandardMaterial({ color: 0x1a1e24, roughness: 0.35 }));
      sprayFace.position.set(railX, headY - 0.009, headZ);
      g.add(sprayFace);

      for (let r of [0.04, 0.08, 0.12]) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.002, 8, 32), new THREE.MeshBasicMaterial({ color: 0x94a3b8 }));
        ring.rotation.x = Math.PI / 2;
        ring.position.set(railX, headY - 0.011, headZ);
        g.add(ring);
      }

      // Cascading water stream
      const waterMat = new THREE.MeshPhysicalMaterial({ color: 0xdbeafe, transparent: true, opacity: 0.35, roughness: 0.05, transmission: 0.94, ior: 1.33 });
      const waterColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.24, 1.95, 32, 1, true), waterMat);
      waterColumn.position.set(railX, headY - 0.98, headZ);
      g.add(waterColumn);

      // Thermostatic Valve Plate
      const valvePlate = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.24, 0.015), chromeMat);
      valvePlate.position.set(railX, 1.05, railZ - 0.015);
      valvePlate.userData.role = 'showerMetal';
      g.add(valvePlate);

      const volDial = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.03, 24), chromeMat);
      volDial.rotation.x = Math.PI / 2;
      volDial.position.set(railX, 1.11, railZ + 0.01);
      volDial.userData.role = 'showerMetal';
      g.add(volDial);

      const tempDial = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.03, 24), chromeMat);
      tempDial.rotation.x = Math.PI / 2;
      tempDial.position.set(railX, 0.99, railZ + 0.01);
      tempDial.userData.role = 'showerMetal';
      g.add(tempDial);

      const redIndicator = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.008, 0.032), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      redIndicator.position.set(railX, 1.015, railZ + 0.012);
      g.add(redIndicator);

      const sliderY = 1.38;
      const slider = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.05, 0.045), chromeMat);
      slider.position.set(railX, sliderY, railZ + 0.01);
      slider.userData.role = 'showerMetal';
      g.add(slider);

      const sliderLever = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.04, 12), chromeMat);
      sliderLever.position.set(railX - 0.025, sliderY, railZ + 0.01);
      sliderLever.userData.role = 'showerMetal';
      g.add(sliderLever);

      const wandG = new THREE.Group();
      wandG.position.set(railX + 0.06, sliderY, railZ + 0.04);
      wandG.rotation.z = -Math.PI / 12;

      const wandHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.011, 0.16, 16), chromeMat);
      wandHandle.castShadow = true;
      wandHandle.userData.role = 'showerMetal';
      wandG.add(wandHandle);

      const wandHead = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.013, 0.09, 16), chromeMat);
      wandHead.position.set(0, 0.11, 0);
      wandHead.userData.role = 'showerMetal';
      wandG.add(wandHead);

      const wandSpray = new THREE.Mesh(new THREE.PlaneGeometry(0.018, 0.08), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 }));
      wandSpray.position.set(0, 0.11, 0.013);
      wandG.add(wandSpray);
      g.add(wandG);

      const hoseCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(railX + 0.03, 0.95, railZ + 0.02),
        new THREE.Vector3(railX + 0.08, 0.76, railZ + 0.05),
        new THREE.Vector3(railX + 0.12, 0.92, railZ + 0.06),
        new THREE.Vector3(railX + 0.06, sliderY - 0.08, railZ + 0.04)
      ]);
      const hoseGeom = new THREE.TubeGeometry(hoseCurve, 24, 0.007, 10, false);
      const hoseMesh = new THREE.Mesh(hoseGeom, chromeMat);
      hoseMesh.castShadow = true;
      hoseMesh.userData.role = 'showerMetal';
      g.add(hoseMesh);

      const caddy = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.10), chromeMat);
      caddy.position.set(-trayW / 2 + 0.12, 1.25, railZ + 0.05);
      caddy.userData.role = 'showerMetal';
      g.add(caddy);

      const bottle1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.08, 16), new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.2 }));
      bottle1.position.set(-trayW / 2 + 0.08, 1.30, railZ + 0.05);
      g.add(bottle1);

      const pump1 = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.02, 0.02), chromeMat);
      pump1.position.set(-trayW / 2 + 0.08, 1.35, railZ + 0.05);
      pump1.userData.role = 'showerMetal';
      g.add(pump1);

      const bottle2 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.075, 16), frostedGlassMat);
      bottle2.position.set(-trayW / 2 + 0.14, 1.295, railZ + 0.05);
      g.add(bottle2);

      return g;
    }

    // 10. KOHLER Statement Multifunction Rainhead (K-26292IN-CP)
    function buildStatementShower() {
      const g = new THREE.Group();
      
      const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.015, 24), chromeMat);
      flange.rotation.x = Math.PI / 2;
      flange.position.set(0, 2.20, -0.01);
      flange.castShadow = true;
      flange.userData.role = 'showerMetal';
      g.add(flange);

      const armHoriz = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.42, 20), chromeMat);
      armHoriz.rotation.x = Math.PI / 2;
      armHoriz.position.set(0, 2.20, 0.20);
      armHoriz.castShadow = true;
      armHoriz.userData.role = 'showerMetal';
      g.add(armHoriz);

      const armDrop = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.08, 20), chromeMat);
      armDrop.position.set(0, 2.16, 0.41);
      armDrop.userData.role = 'showerMetal';
      g.add(armDrop);

      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.018, 16, 16), chromeMat);
      ball.position.set(0, 2.12, 0.41);
      ball.userData.role = 'showerMetal';
      g.add(ball);

      const headDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.155, 0.155, 0.012, 48), chromeMat);
      headDisc.position.set(0, 2.10, 0.41);
      headDisc.castShadow = true;
      headDisc.userData.role = 'showerMetal';
      g.add(headDisc);

      const face = new THREE.Mesh(new THREE.CylinderGeometry(0.148, 0.148, 0.003, 48), new THREE.MeshStandardMaterial({ color: 0x1e2229, roughness: 0.35 }));
      face.position.set(0, 2.093, 0.41);
      g.add(face);

      for (let r of [0.04, 0.08, 0.12]) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.002, 8, 32), new THREE.MeshBasicMaterial({ color: 0x94a3b8 }));
        ring.rotation.x = Math.PI / 2;
        ring.position.set(0, 2.091, 0.41);
        g.add(ring);
      }

      const waterMat = new THREE.MeshPhysicalMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.28, roughness: 0.05, transmission: 0.92, ior: 1.33 });
      const waterStream = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.24, 2.0, 32, 1, true), waterMat);
      waterStream.position.set(0, 1.05, 0.41);
      g.add(waterStream);

      const valve = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 0.015), chromeMat);
      valve.position.set(0, 1.10, -0.01);
      valve.userData.role = 'showerMetal';
      g.add(valve);

      for (let ky of [1.16, 1.04]) {
        const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.028, 20), chromeMat);
        knob.rotation.x = Math.PI / 2;
        knob.position.set(0, ky, 0.015);
        knob.userData.role = 'showerMetal';
        g.add(knob);
      }

      return g;
    }

    // 11. KOHLER Evok Oval Freestanding Bathtub (K-1130IN-0)
    function buildEvokBathtub() {
      const g = new THREE.Group();
      const tubGeom = new THREE.CylinderGeometry(0.54, 0.40, 0.62, 40);
      const tub = new THREE.Mesh(tubGeom, porcelainMat);
      tub.scale.set(1.68, 1.0, 0.94);
      tub.position.set(0, 0.31, 0);
      tub.castShadow = true;
      g.add(tub);

      const fillerPole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.96, 20), chromeMat);
      fillerPole.position.set(0, 0.48, 0.54);
      fillerPole.castShadow = true;
      fillerPole.userData.role = 'faucet';
      g.add(fillerPole);

      const fillerSpout = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.016, 0.22), chromeMat);
      fillerSpout.position.set(0, 0.94, 0.44);
      fillerSpout.userData.role = 'faucet';
      g.add(fillerSpout);

      const fillerWand = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.20, 16), chromeMat);
      fillerWand.position.set(0.05, 0.88, 0.54);
      fillerWand.userData.role = 'faucet';
      g.add(fillerWand);

      return g;
    }

    // 12. KOHLER Purist Tall Basin Faucet (K-99856IN-4)
    function buildPuristFaucet() {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.28, 20), matteBlackMat);
      body.position.set(0, 0.14, 0);
      body.castShadow = true;
      body.userData.role = 'faucet';
      g.add(body);

      const spout = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.014, 0.15), matteBlackMat);
      spout.position.set(0, 0.26, 0.07);
      spout.castShadow = true;
      spout.userData.role = 'faucet';
      g.add(spout);

      const lever = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.08, 16), matteBlackMat);
      lever.rotation.z = Math.PI / 4;
      lever.position.set(0.035, 0.25, 0);
      lever.userData.role = 'faucet';
      g.add(lever);

      return g;
    }

    // 13. KOHLER Artifacts Column Spout Faucet (K-10129IN-4)
    function buildArtifactsFaucet() {
      const g = new THREE.Group();
      const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.026, 0.24, 20), polishedBrassMat);
      spout.position.set(0, 0.12, 0);
      spout.userData.role = 'faucet';
      g.add(spout);

      const arch = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.014, 12, 24, Math.PI), polishedBrassMat);
      arch.rotation.y = Math.PI / 2;
      arch.position.set(0, 0.22, 0.06);
      arch.userData.role = 'faucet';
      g.add(arch);

      for (let hx of [-0.12, 0.12]) {
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.06, 16), polishedBrassMat);
        handle.position.set(hx, 0.03, 0);
        handle.userData.role = 'faucet';
        g.add(handle);
      }

      return g;
    }

    // 14. KOHLER Composed Single-Handle Faucet (K-73159IN-4)
    function buildComposedFaucet() {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.24, 0.026), matteBlackMat);
      body.position.set(0, 0.12, 0);
      body.castShadow = true;
      body.userData.role = 'faucet';
      g.add(body);

      const spout = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.016, 0.13), matteBlackMat);
      spout.position.set(0, 0.23, 0.06);
      spout.userData.role = 'faucet';
      g.add(spout);

      return g;
    }
