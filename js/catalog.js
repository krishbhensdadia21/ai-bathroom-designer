    // ==================== 2. OFFICIAL KOHLER PRODUCT CATALOG ====================
    const KOHLER_CATALOG = [
      // TOILETS & SMART SANITARY
      {
        id: 'veil-smart-toilet',
        series: 'VEIL',
        art: 'K-5401IN-0',
        name: 'Veil Smart One-Piece Toilet',
        dim: '16x28 in (41x71 cm)',
        desc: 'Sculptural smart one-piece toilet with remote control, heated Quiet-Close seat, and automatic bidet cleansing.',
        price_inr: 85000,
        price_usd: 1150,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.41,
        depth_m: 0.71,
        height_m: 0.72,
        styles: ['minimalist', 'zen', 'modern', 'wastelab', 'classic', 'industrial'],
        installation: {
          rough_in_in: 12,
          drain_type: '4-inch floor flange',
          electrical_req: '120V/15A dedicated GFCI circuit',
          water_supply: '1/2" NPT cold angle stop',
          min_clearance_front_m: 0.533, // 21" NKBA code
          min_clearance_side_m: 0.381   // 15" from centerline
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.85,
          compatible_with: ['faucets', 'vanities', 'mirrors']
        },
        sustainability: {
          flush_gpf: 1.28,
          baseline_flush_gpf: 1.60,
          flow_gpm: 0,
          power_watts: 45,
          recycled_content_pct: 18,
          epa_watersense: true,
          annual_water_savings_l: 8840 // (1.6 - 1.28) * 7300 flushes * 3.78541
        },
        builder: buildVeilSmartToilet
      },
      {
        id: 'leap-smart-toilet',
        series: 'LEAP',
        art: 'K-28529IN-0',
        name: 'Leap Smart Toilet',
        dim: '16x29 in (41x74 cm)',
        desc: 'Elongated smart toilet featuring touchless UV sanitization, auto-open lid, and warm air drying.',
        price_inr: 47000,
        price_usd: 640,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.41,
        depth_m: 0.74,
        height_m: 0.70,
        styles: ['minimalist', 'modern'],
        installation: {
          rough_in_in: 12,
          drain_type: '4-inch floor flange',
          electrical_req: '120V/15A GFCI outlet',
          water_supply: '1/2" cold angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.85,
          compatible_with: ['faucets', 'vanities', 'mirrors']
        },
        sustainability: {
          flush_gpf: 1.28,
          baseline_flush_gpf: 1.60,
          flow_gpm: 0,
          power_watts: 40,
          recycled_content_pct: 12,
          epa_watersense: true,
          annual_water_savings_l: 8840
        },
        builder: buildLeapSmartToilet
      },
      {
        id: 'memoirs-stately-toilet',
        series: 'MEMOIRS',
        art: 'K-3983IN-0',
        name: 'Memoirs Stately Toilet',
        dim: '18x30 in (46x76 cm)',
        desc: 'Traditional stately one-piece toilet with architectural crown molding details and AquaPiston flush engine.',
        price_inr: 35000,
        price_usd: 480,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.46,
        depth_m: 0.76,
        height_m: 0.78,
        styles: ['classic', 'traditional'],
        installation: {
          rough_in_in: 12,
          drain_type: '4-inch floor flange',
          electrical_req: 'None (Gravity AquaPiston)',
          water_supply: '3/8" compression angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.85,
          compatible_with: ['jacquard-vanity', 'artifacts-faucet']
        },
        sustainability: {
          flush_gpf: 1.28,
          baseline_flush_gpf: 1.60,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 10,
          epa_watersense: true,
          annual_water_savings_l: 8840
        },
        builder: buildMemoirsToilet
      },
      {
        id: 'reach-wall-hung',
        series: 'REACH',
        art: 'K-77701IN-0',
        name: 'Reach Wall-Hung Toilet',
        dim: '14x21 in (36x53 cm)',
        desc: 'Space-saving cantilevered toilet with concealed in-wall cistern and dual-flush actuator plate.',
        price_inr: 24000,
        price_usd: 320,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.36,
        depth_m: 0.53,
        height_m: 0.40,
        styles: ['minimalist', 'modern', 'zen', 'wastelab'],
        installation: {
          rough_in_in: 'Concealed in-wall carrier 4"',
          drain_type: 'In-wall P-trap 4"',
          electrical_req: 'None (Mechanical pneumatic actuator)',
          water_supply: '1/2" supply inside in-wall tank',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.50, // Must mount directly on wet wall
          compatible_with: ['faucets', 'vanities', 'mirrors']
        },
        sustainability: {
          flush_gpf: 1.04, // Dual flush average (0.8 / 1.28 GPF)
          baseline_flush_gpf: 1.60,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 20,
          epa_watersense: true,
          annual_water_savings_l: 15480 // Saves (1.60 - 1.04) * 7300 * 3.78541
        },
        builder: buildReachToilet
      },

      // VANITIES & CONSOLES
      {
        id: 'tailored-dual-vanity',
        series: 'TAILORED',
        art: 'K-99539-LG',
        name: 'Tailored 60" Dual Vanity',
        dim: '60x22x34 in (152x56x86 cm)',
        desc: 'Master double vanity with Silestone quartz countertop, twin Ladena undermount sinks, and slow-close drawers.',
        price_inr: 145000,
        price_usd: 1950,
        category: 'vanities',
        defaultFinish: 'white',
        width_m: 1.52,
        depth_m: 0.56,
        height_m: 0.86,
        styles: ['minimalist', 'modern'],
        installation: {
          rough_in_in: 'Dual 19" AFF wall rough-ins',
          drain_type: 'Dual 1-1/4" wall P-traps',
          electrical_req: 'Optional under-cabinet LED circuit',
          water_supply: 'Dual pairs hot & cold 1/2" angle stops',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.100
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.65,
          compatible_with: ['purist-faucet', 'composed-faucet', 'verdera-mirror']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25, // FSC certified hardwood & recycled quartz
          epa_watersense: false,
          annual_water_savings_l: 0
        },
        builder: buildTailoredVanity
      },
      {
        id: 'jacquard-vanity',
        series: 'JACQUARD',
        art: 'K-99507IN-0',
        name: 'Jacquard 36" Vanity Cabinet',
        dim: '36x22x34 in (91x56x86 cm)',
        desc: 'Traditional solid wood bathroom vanity with classic shaker panels, slow-close drawers, and marble top.',
        price_inr: 58000,
        price_usd: 790,
        category: 'vanities',
        defaultFinish: 'white',
        width_m: 0.91,
        depth_m: 0.56,
        height_m: 0.86,
        styles: ['classic', 'traditional'],
        installation: {
          rough_in_in: '19" AFF center wall rough-in',
          drain_type: '1-1/4" wall P-trap',
          electrical_req: 'None',
          water_supply: '1 pair hot & cold 1/2" angle stops',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.100
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.65,
          compatible_with: ['artifacts-faucet', 'memoirs-stately-toilet']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 15,
          epa_watersense: false,
          annual_water_savings_l: 0
        },
        builder: buildJacquardVanity
      },
      {
        id: 'brazn-console',
        series: 'BRAZN',
        art: 'K-21057-0',
        name: 'Brazn Zen Minimalist Console',
        dim: '32x19x33 in (81x48x84 cm)',
        desc: 'Japanese Zen-inspired asymmetric matte black console with integrated thin-edge Chalice vessel basin.',
        price_inr: 72000,
        price_usd: 980,
        category: 'vanities',
        defaultFinish: 'black',
        width_m: 0.81,
        depth_m: 0.48,
        height_m: 0.84,
        styles: ['zen', 'minimalist', 'wastelab', 'industrial'],
        installation: {
          rough_in_in: '20" AFF decorative bottle trap',
          drain_type: '1-1/4" exposed matte black bottle trap',
          electrical_req: 'None',
          water_supply: '1 pair hot & cold 1/2" stops',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.100
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.60,
          compatible_with: ['composed-faucet', 'purist-faucet', 'veil-smart-toilet']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 35, // WasteLAB sustainable recycled vitreous china
          epa_watersense: false,
          annual_water_savings_l: 0
        },
        builder: buildBraznConsole
      },

      // FAUCETS & BRASSWARE
      {
        id: 'purist-faucet',
        series: 'PURIST',
        art: 'K-99856IN-4',
        name: 'Purist Tall Basin Faucet',
        dim: '6x8x12 in (15x20x30 cm)',
        desc: 'Architectural cylindrical single-handle faucet in Polished Chrome with Laminar water stream.',
        price_inr: 19800,
        price_usd: 270,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.15,
        depth_m: 0.20,
        height_m: 0.30,
        styles: ['minimalist', 'modern', 'zen'],
        installation: {
          rough_in_in: 'Single-hole 1-3/8" deck mount',
          drain_type: 'Clicker drain assembly included',
          electrical_req: 'None',
          water_supply: '3/8" flexible braided supply hoses',
          min_clearance_front_m: 0.300,
          min_clearance_side_m: 0.150
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 1.20,
          compatible_with: ['tailored-dual-vanity', 'brazn-console']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          baseline_flow_gpm: 2.20,
          power_watts: 0,
          recycled_content_pct: 40, // Solid lead-free recycled brass
          epa_watersense: true,
          annual_water_savings_l: 16580 // (2.2 - 1.2) * 12 min/day * 365 * 3.78541
        },
        builder: buildPuristFaucet
      },
      {
        id: 'artifacts-faucet',
        series: 'ARTIFACTS',
        art: 'K-10129IN-4',
        name: 'Artifacts Column Spout Faucet',
        dim: '9x10x11 in (23x25x28 cm)',
        desc: 'Classic widespread basin faucet with Edwardian column spout and porcelain cross handles.',
        price_inr: 32000,
        price_usd: 430,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.23,
        depth_m: 0.25,
        height_m: 0.28,
        styles: ['classic', 'traditional'],
        installation: {
          rough_in_in: '8" to 16" widespread 3-hole deck mount',
          drain_type: 'Pop-up lift rod brass drain',
          electrical_req: 'None',
          water_supply: 'Dual 1/2" NPSM supply nuts',
          min_clearance_front_m: 0.300,
          min_clearance_side_m: 0.150
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 1.20,
          compatible_with: ['jacquard-vanity']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.50,
          baseline_flow_gpm: 2.20,
          power_watts: 0,
          recycled_content_pct: 30,
          epa_watersense: true,
          annual_water_savings_l: 11600 // (2.2 - 1.5) * 12 min/day * 365 * 3.78541
        },
        builder: buildArtifactsFaucet
      },
      {
        id: 'composed-faucet',
        series: 'COMPOSED',
        art: 'K-73159IN-4',
        name: 'Composed Single-Handle Faucet',
        dim: '6x7x10 in (15x18x25 cm)',
        desc: 'Minimalist side-control mixer with balanced pure proportions and ceramic disc valving.',
        price_inr: 14500,
        price_usd: 195,
        category: 'faucets',
        defaultFinish: 'black',
        width_m: 0.15,
        depth_m: 0.18,
        height_m: 0.25,
        styles: ['minimalist', 'zen', 'modern', 'wastelab', 'industrial'],
        installation: {
          rough_in_in: 'Single-hole 1-3/8" deck mount',
          drain_type: 'Push-button touch drain',
          electrical_req: 'None',
          water_supply: 'Flexible braided PEX supplies',
          min_clearance_front_m: 0.300,
          min_clearance_side_m: 0.150
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 1.20,
          compatible_with: ['brazn-console', 'tailored-dual-vanity']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          baseline_flow_gpm: 2.20,
          power_watts: 0,
          recycled_content_pct: 35,
          epa_watersense: true,
          annual_water_savings_l: 16580
        },
        builder: buildComposedFaucet
      },
      {
        id: 'parallel-faucet',
        series: 'PARALLEL',
        art: 'K-22536IN-4',
        name: 'Parallel Single-Control Monoblock Faucet',
        dim: '6x7x8 in (15x18x20 cm)',
        desc: 'Sleek single-lever brass faucet engineered for high durability and ease of cleaning.',
        price_inr: 11200,
        price_usd: 150,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.15,
        depth_m: 0.18,
        height_m: 0.22,
        styles: ['minimalist', 'modern', 'zen', 'classic', 'wastelab'],
        installation: {
          rough_in_in: 'Single-hole 1-3/8" deck mount',
          drain_type: 'Clicker drain assembly included',
          electrical_req: 'None',
          water_supply: 'Flexible braided supply hoses',
          min_clearance_front_m: 0.300,
          min_clearance_side_m: 0.150
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 1.20,
          compatible_with: ['jacquard-vanity', 'brazn-console', 'tailored-dual-vanity']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          baseline_flow_gpm: 2.20,
          power_watts: 0,
          recycled_content_pct: 35,
          epa_watersense: true,
          annual_water_savings_l: 16580
        },
        builder: buildPuristFaucet
      },

      // THERMOSTATIC SHOWERS
      {
        id: 'hydrorail-shower',
        series: 'REVEL & HYDRORAIL',
        art: 'K-706015 / K-76465',
        name: 'Revel Frameless Glass Box Enclosure with HydroRail System',
        dim: '44x38x84 in (112x96x213 cm)',
        desc: 'Official Kohler full transparent corner glass enclosure with Revel frameless pivot door, CleanCoat 10mm glass, tubular handle, and HydroRail thermostatic column with Statement 12" rainhead.',
        price_inr: 118000,
        price_usd: 1580,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 1.12,
        depth_m: 0.96,
        height_m: 2.13,
        styles: ['minimalist', 'modern', 'classic', 'zen', 'wastelab', 'industrial'],
        installation: {
          rough_in_in: '1/2" NPT hot & cold supply inlets at 36" AFF',
          drain_type: '2-inch high-capacity corner shower drain',
          electrical_req: 'None',
          water_supply: 'Dual 1/2" copper or PEX lines (45-60 PSI recommended)',
          min_clearance_front_m: 0.610, // 24" NKBA unobstructed entry
          min_clearance_side_m: 0.200
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 1.15,
          compatible_with: ['toilets', 'vanities']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75, // Katalyst air induction eco-luxury stream
          baseline_flow_gpm: 2.50,
          power_watts: 0,
          recycled_content_pct: 22,
          epa_watersense: true,
          annual_water_savings_l: 33160 // (2.5 - 1.75) * 32 min/day * 365 * 3.78541
        },
        builder: buildHydroRailShower
      },
      {
        id: 'statement-shower',
        series: 'STATEMENT',
        art: 'K-26292IN-CP',
        name: 'Statement Multifunction Rainhead',
        dim: '12x12 in (30x30 cm)',
        desc: 'Contemporary round rainhead with Katalyst air-induction technology for complete, enveloping coverage.',
        price_inr: 28500,
        price_usd: 380,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 0.30,
        depth_m: 0.30,
        height_m: 0.15,
        styles: ['minimalist', 'modern', 'zen'],
        installation: {
          rough_in_in: '1/2" NPT ceiling or wall arm drop',
          drain_type: 'Standard 2-inch floor shower drain',
          electrical_req: 'None',
          water_supply: '1/2" NPT thermostatic supply line',
          min_clearance_front_m: 0.610,
          min_clearance_side_m: 0.200
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 1.50,
          compatible_with: ['faucets', 'toilets']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75,
          baseline_flow_gpm: 2.50,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 33160
        },
        builder: buildStatementShower
      },

      // BATHTUBS
      {
        id: 'evok-bathtub',
        series: 'EVOK',
        art: 'K-1130IN-0',
        name: 'Evok Oval Freestanding Bathtub',
        dim: '67x30x24 in (170x76x61 cm)',
        desc: 'Seamless acrylic freestanding soaking tub with center toe-tap drain and ergonomic back support.',
        price_inr: 115000,
        price_usd: 1550,
        category: 'bathtubs',
        defaultFinish: 'white',
        width_m: 1.70,
        depth_m: 0.76,
        height_m: 0.61,
        styles: ['zen', 'modern', 'minimalist', 'classic'],
        installation: {
          rough_in_in: 'Floor rough-in 1-1/2" center drain with P-trap',
          drain_type: '1-1/2" brass slotted overflow toe-tap drain',
          electrical_req: 'None',
          water_supply: 'Freestanding floor-mount bath filler supply lines',
          min_clearance_front_m: 0.533, // 21" NKBA side access
          min_clearance_side_m: 0.150
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 2.00,
          compatible_with: ['purist-faucet', 'artifacts-faucet']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 15,
          epa_watersense: false,
          annual_water_savings_l: 0
        },
        builder: buildEvokBathtub
      },

      // SMART MIRRORS
      {
        id: 'verdera-mirror',
        series: 'VERDERA',
        art: 'K-99009IN-NA',
        name: 'Verdera Voice Lighted Smart Mirror',
        dim: '34x30 in (86x76 cm)',
        desc: 'Smart LED lighted mirror with built-in Amazon Alexa voice control, optimal daylight CRI 90+, and stereo sound.',
        price_inr: 38000,
        price_usd: 520,
        category: 'mirrors',
        defaultFinish: 'chrome',
        width_m: 0.86,
        depth_m: 0.10,
        height_m: 0.76,
        styles: ['minimalist', 'modern', 'zen', 'classic', 'industrial', 'wastelab'],
        installation: {
          rough_in_in: 'Direct 120V hardwired junction box centered behind mirror',
          drain_type: 'None',
          electrical_req: '120V/60Hz 25W LED + voice module hardwire',
          water_supply: 'None',
          min_clearance_front_m: 0.300,
          min_clearance_side_m: 0.100
        },
        compatibility: {
          requires_wet_wall: true, // Wall mounted above vanity
          max_wet_wall_dist_m: 0.65,
          compatible_with: ['tailored-dual-vanity', 'jacquard-vanity', 'brazn-console']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 25, // High-efficiency CRI 90+ LED illumination
          recycled_content_pct: 20,
          epa_watersense: false,
          annual_water_savings_l: 0
        },
        builder: buildVerderaMirror
      },
      {
        id: 'verdera-30-mirror',
        series: 'VERDERA',
        art: 'K-99009IN-NA',
        name: 'Verdera 30" Lighted LED Mirror',
        dim: '30x30 in (76x76 cm)',
        desc: 'Perimeter LED strip lighting with high CRI (90+) for accurate natural task lighting.',
        price_inr: 26000,
        price_usd: 350,
        category: 'mirrors',
        defaultFinish: 'chrome',
        width_m: 0.76,
        depth_m: 0.08,
        height_m: 0.76,
        styles: ['minimalist', 'modern', 'zen', 'classic', 'industrial', 'wastelab'],
        installation: {
          rough_in_in: 'Standard 120V hardwire junction box',
          drain_type: 'None',
          electrical_req: '120V hardwire outlet',
          water_supply: 'None',
          min_clearance_front_m: 0.300,
          min_clearance_side_m: 0.100
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.65,
          compatible_with: ['jacquard-vanity', 'brazn-console', 'tailored-dual-vanity']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 20,
          recycled_content_pct: 20,
          epa_watersense: false,
          annual_water_savings_l: 0
        },
        builder: buildVerderaMirror
      }
    ];
