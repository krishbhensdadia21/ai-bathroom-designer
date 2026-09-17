    // ==================== PROCEDURAL TEXTURES & PBR MATERIALS ====================
    let themeAccentsGroup = null;
    let currentSelectedTheme = 'None';

    function generateWallTileTexture(type = 'square', widthM = 3.2, heightM = 2.6) {
      const canvas = document.createElement('canvas');
      canvas.width = 1024; canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      if (type === 'minimalist-modern') {
        // Warm Travertine Sand Microcement Wall Panels
        ctx.fillStyle = '#e8ded2'; ctx.fillRect(0, 0, 1024, 1024);
        // Subtle micro mineral stipple
        for (let i = 0; i < 4000; i++) {
          ctx.fillStyle = Math.random() > 0.5 ? '#ded3c3' : '#f2e8dd';
          ctx.globalAlpha = 0.22;
          ctx.fillRect(Math.random() * 1024, Math.random() * 1024, Math.random() * 4 + 1, Math.random() * 3 + 1);
        }
        ctx.globalAlpha = 1.0;
        // Large minimal panel joints
        ctx.strokeStyle = '#d5cab8'; ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(512, 0); ctx.lineTo(512, 1024);
        ctx.moveTo(0, 512); ctx.lineTo(1024, 512);
        ctx.stroke();

      } else if (type === 'calacatta-gold' || type === 'calacatta' || type === 'classic-luxury') {
        // Polished Calacatta Gold Italian Marble Slab
        ctx.fillStyle = '#fbfbfa'; ctx.fillRect(0, 0, 1024, 1024);
        // Soft smoky undertone veining
        ctx.strokeStyle = '#dedad2'; ctx.lineWidth = 14; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 150); ctx.bezierCurveTo(280, 220, 580, 80, 1024, 450);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(180, 1024); ctx.bezierCurveTo(450, 750, 720, 820, 1024, 880);
        ctx.stroke();

        // Elegant flowing golden-amber primary veining
        ctx.strokeStyle = '#c5a059'; ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 160); ctx.bezierCurveTo(300, 240, 600, 90, 1024, 460);
        ctx.stroke();
        ctx.strokeStyle = '#b8924b'; ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(350, 200); ctx.bezierCurveTo(460, 320, 650, 260, 850, 410);
        ctx.stroke();
        // Lower golden branch
        ctx.strokeStyle = '#c9a45e'; ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(190, 1024); ctx.bezierCurveTo(460, 760, 730, 830, 1024, 890);
        ctx.stroke();

      } else if (type === 'japanese-zen') {
        // Natural Earthy Sandstone with Subtle Horizontal Grain
        ctx.fillStyle = '#dfd6c8'; ctx.fillRect(0, 0, 1024, 1024);
        ctx.fillStyle = '#cfc5b3';
        for (let y = 0; y < 1024; y += 12) {
          ctx.globalAlpha = 0.18;
          ctx.fillRect(0, y + (Math.random() - 0.5) * 6, 1024, Math.random() * 6 + 2);
        }
        ctx.globalAlpha = 1.0;
        // Clean minimal stone panel joints
        ctx.strokeStyle = '#b8ad9a'; ctx.lineWidth = 2.5;
        for (let y = 0; y < 1024; y += 256) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
        }
        for (let x = 0; x < 1024; x += 512) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
        }

      } else if (type === 'industrial-chic') {
        // Raw Architectural Formwork Concrete Panels with Tie-Holes
        ctx.fillStyle = '#494d53'; ctx.fillRect(0, 0, 1024, 1024);
        // Mottled concrete texture
        for (let i = 0; i < 6000; i++) {
          ctx.fillStyle = Math.random() > 0.5 ? '#3e4147' : '#575b63';
          ctx.globalAlpha = 0.18;
          ctx.fillRect(Math.random() * 1024, Math.random() * 1024, Math.random() * 6 + 2, Math.random() * 6 + 2);
        }
        ctx.globalAlpha = 1.0;

        // Formwork panel seams (2x2 grid)
        ctx.strokeStyle = '#32353a'; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(512, 0); ctx.lineTo(512, 1024);
        ctx.moveTo(0, 512); ctx.lineTo(1024, 512);
        ctx.stroke();

        // Architectural concrete tie-holes (circular cast-in bolt indents)
        const tiePoints = [
          [80, 80], [432, 80], [80, 432], [432, 432],
          [592, 80], [944, 80], [592, 432], [944, 432],
          [80, 592], [432, 592], [80, 944], [432, 944],
          [592, 592], [944, 592], [592, 944], [944, 944]
        ];
        tiePoints.forEach(([tx, ty]) => {
          // Dark recessed ring
          ctx.fillStyle = '#222428';
          ctx.beginPath(); ctx.arc(tx, ty, 10, 0, Math.PI * 2); ctx.fill();
          // Inner bolt head
          ctx.fillStyle = '#17181a';
          ctx.beginPath(); ctx.arc(tx, ty, 5, 0, Math.PI * 2); ctx.fill();
          // Subtle highlight rim
          ctx.strokeStyle = '#62676f'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(tx, ty, 10, Math.PI * 0.75, Math.PI * 1.75); ctx.stroke();
        });

      } else if (type === 'wastelab') {
        // Kohler WasteLAB Closed-Loop Glazed Relief Tiles
        ctx.fillStyle = '#d4ded8'; ctx.fillRect(0, 0, 1024, 1024);
        const sz = 128;
        for (let y = 0; y < 1024; y += sz) {
          for (let x = 0; x < 1024; x += sz) {
            ctx.fillStyle = ((x / sz + y / sz) % 2 === 0) ? '#c2cfc7' : '#cad6cf';
            ctx.fillRect(x + 3, y + 3, sz - 6, sz - 6);
          }
        }

      } else if (type === 'marquina') {
        ctx.fillStyle = '#181b1f'; ctx.fillRect(0, 0, 1024, 1024);
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(100, 0); ctx.bezierCurveTo(300, 500, 700, 400, 900, 1024);
        ctx.stroke();

      } else {
        // Classic square white ceramic grid
        ctx.fillStyle = '#969ca2'; ctx.fillRect(0, 0, 1024, 1024);
        const tileSize = 85, grout = 2.5;
        for (let y = 0; y < 1024; y += tileSize) {
          for (let x = 0; x < 1024; x += tileSize) {
            const g = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
            g.addColorStop(0, '#ebedf0');
            g.addColorStop(0.65, '#dfdfe3');
            g.addColorStop(1, '#d5d7db');
            ctx.fillStyle = g;
            ctx.fillRect(x + grout, y + grout, tileSize - grout * 2, tileSize - grout * 2);
          }
        }
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
      const repeatX = widthM / 0.26;
      const repeatY = heightM / 0.26;
      tex.repeat.set(repeatX / 12, repeatY / 12);
      tex.anisotropy = 16;
      return tex;
    }

    function generateFloorTileTexture(type = 'slate', widthM = 3.2, depthM = 2.8) {
      const canvas = document.createElement('canvas');
      canvas.width = 1024; canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      if (type === 'minimalist-sand') {
        // Honed Sand Limestone Floor Tiles
        ctx.fillStyle = '#c7bca9'; ctx.fillRect(0, 0, 1024, 1024);
        const tileSize = 256, grout = 3.0;
        for (let y = 0; y < 1024; y += tileSize) {
          for (let x = 0; x < 1024; x += tileSize) {
            ctx.fillStyle = ((x + y) % 512 === 0) ? '#ded4c4' : '#d8cebe';
            ctx.fillRect(x + grout, y + grout, tileSize - grout * 2, tileSize - grout * 2);
          }
        }

      } else if (type === 'calacatta-gold' || type === 'calacatta') {
        // Large Format Polished Calacatta Gold Marble Floor Slabs
        ctx.fillStyle = '#f8f8f6'; ctx.fillRect(0, 0, 1024, 1024);
        ctx.strokeStyle = '#c5a059'; ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 300); ctx.bezierCurveTo(350, 450, 650, 200, 1024, 600);
        ctx.stroke();
        ctx.strokeStyle = '#dedad2'; ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.moveTo(100, 0); ctx.bezierCurveTo(400, 600, 600, 400, 950, 1024);
        ctx.stroke();
        // Thin brass inlay grout line
        ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 2.0;
        ctx.strokeRect(4, 4, 1016, 1016);

      } else if (type === 'japanese-limestone') {
        // Earthy Limestone Floor
        ctx.fillStyle = '#beaf9a'; ctx.fillRect(0, 0, 1024, 1024);
        const tileSize = 256, grout = 3.0;
        for (let y = 0; y < 1024; y += tileSize) {
          for (let x = 0; x < 1024; x += tileSize) {
            ctx.fillStyle = ((x + y) % 512 === 0) ? '#d3c5b1' : '#cbbda9';
            ctx.fillRect(x + grout, y + grout, tileSize - grout * 2, tileSize - grout * 2);
          }
        }

      } else if (type === 'industrial-slate') {
        // Anthracite Charcoal Honed Slate Floor
        ctx.fillStyle = '#1a1c1f'; ctx.fillRect(0, 0, 1024, 1024);
        const tileSize = 256, grout = 3.5;
        for (let y = 0; y < 1024; y += tileSize) {
          for (let x = 0; x < 1024; x += tileSize) {
            const g = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
            g.addColorStop(0, '#2b2d31');
            g.addColorStop(0.5, '#242629');
            g.addColorStop(1, '#1e2023');
            ctx.fillStyle = g;
            ctx.fillRect(x + grout, y + grout, tileSize - grout * 2, tileSize - grout * 2);
          }
        }

      } else if (type === 'wastelab-terrazzo') {
        // Closed-Loop Recycled Terrazzo Floor
        ctx.fillStyle = '#8f969e'; ctx.fillRect(0, 0, 1024, 1024);
        for (let i = 0; i < 3000; i++) {
          ctx.fillStyle = ['#ffffff', '#222428', '#c2b280', '#5a7a6c'][i % 4];
          ctx.globalAlpha = 0.35;
          ctx.fillRect(Math.random() * 1024, Math.random() * 1024, Math.random() * 5 + 2, Math.random() * 5 + 2);
        }
        ctx.globalAlpha = 1.0;

      } else if (type === 'teak') {
        ctx.fillStyle = '#8e623a'; ctx.fillRect(0, 0, 1024, 1024);
        for (let y = 0; y < 1024; y += 40) {
          ctx.fillStyle = '#6b4825'; ctx.fillRect(0, y, 1024, 3);
        }

      } else if (type === 'carrara') {
        ctx.fillStyle = '#f0f2f5'; ctx.fillRect(0, 0, 1024, 1024);
        ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 400); ctx.bezierCurveTo(300, 200, 700, 800, 1024, 500);
        ctx.stroke();

      } else {
        // Slate fallback
        ctx.fillStyle = '#5a5e62'; ctx.fillRect(0, 0, 1024, 1024);
        const tileSize = 146, grout = 3.5;
        for (let y = 0; y < 1024; y += tileSize) {
          for (let x = 0; x < 1024; x += tileSize) {
            const g = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
            g.addColorStop(0, '#222527');
            g.addColorStop(0.5, '#1b1d1f');
            g.addColorStop(1, '#151718');
            ctx.fillStyle = g;
            ctx.fillRect(x + grout, y + grout, tileSize - grout * 2, tileSize - grout * 2);
          }
        }
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
      const repeatX = widthM / 0.457;
      const repeatZ = depthM / 0.40;
      tex.repeat.set(repeatX / 7, repeatZ / 7);
      tex.anisotropy = 16;
      return tex;
    }

    function generateWoodTexture(baseColor = '#cca06c', grainColor = '#9b7445') {
      const canvas = document.createElement('canvas');
      canvas.width = 512; canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = baseColor; ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = grainColor;
      for (let i = 0; i < 800; i++) {
        ctx.globalAlpha = Math.random() * 0.16;
        ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 3 + 1, Math.random() * 90 + 20);
      }
      ctx.globalAlpha = 1.0;
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
      return tex;
    }

    // High-Fidelity Kohler PBR Materials
    const porcelainMat = new THREE.MeshPhysicalMaterial({ color: 0xfbfcfe, roughness: 0.10, metalness: 0.0, clearcoat: 0.85, clearcoatRoughness: 0.03 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe0e6eb, metalness: 0.65, roughness: 0.20 });
    const matteBlackMat = new THREE.MeshStandardMaterial({ color: 0x181a1d, roughness: 0.42, metalness: 0.15 });
    const brushedBrassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.80, roughness: 0.25 });
    const polishedBrassMat = brushedBrassMat;
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.28, roughness: 0.04, transmission: 0.92, ior: 1.52 });
    const frostedGlassMat = new THREE.MeshPhysicalMaterial({ color: 0xedf3f8, transparent: true, opacity: 0.65, roughness: 0.55 });
    
    // Crystal Clear Silver Mirror Glass
    const mirrorMat = new THREE.MeshStandardMaterial({
      color: 0xecf2f7,
      metalness: 0.15,
      roughness: 0.08,
      emissive: 0xd4e2ed,
      emissiveIntensity: 0.38
    });

    // Authentic Wood & Architectural Material Finishes
    const oakWoodTex = generateWoodTexture('#d8b88d', '#a47c52');
    const scandinavianOakMat = new THREE.MeshStandardMaterial({ map: oakWoodTex, roughness: 0.55 });
    const oakMat = scandinavianOakMat;

    const mahoganyWoodTex = generateWoodTexture('#382013', '#23120a');
    const darkMahoganyMat = new THREE.MeshStandardMaterial({ map: mahoganyWoodTex, roughness: 0.45 });

    const teakWoodTex = generateWoodTexture('#996535', '#6e4420');
    const teakMat = new THREE.MeshStandardMaterial({ map: teakWoodTex, roughness: 0.52 });

    const industrialSteelMat = new THREE.MeshStandardMaterial({ color: 0x1a1c1e, roughness: 0.52, metalness: 0.65 });
    const concreteTroughMat = new THREE.MeshStandardMaterial({ color: 0x767c85, roughness: 0.82, metalness: 0.05 });
    const calacattaMarbleMat = new THREE.MeshPhysicalMaterial({ color: 0xfbfbfa, roughness: 0.14, metalness: 0.05, clearcoat: 0.90 });
    const whiteQuartzMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.22 });
    const wasteLabTerrazzoMat = new THREE.MeshStandardMaterial({ color: 0x949ba3, roughness: 0.42 });
    const whiteLaminateMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.32 });

    function getFinishMaterial(finish) {
      if (finish === 'brass') return brushedBrassMat;
      if (finish === 'black') return matteBlackMat;
      if (finish === 'oak') return scandinavianOakMat;
      if (finish === 'mahogany') return darkMahoganyMat;
      if (finish === 'teak') return teakMat;
      return whiteLaminateMat;
    }
