    // ==================== 2. OFFICIAL KOHLER PRODUCT CATALOG (15 GENUINE PRODUCTS) ====================
    const KOHLER_CATALOG = [
      // 1. SMART TOILETS
      {
        id: 'veil-smart-toilet',
        series: 'VEIL',
        art: 'K-5401IN-0',
        name: 'Veil™ Smart One-piece Toilet',
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
          annual_water_savings_l: 8840
        },
        builder: (...args) => buildVeilSmartToilet(...args)
      },

      // 2. TOILETS
      {
        id: 'reach-one-piece-toilet',
        series: 'REACH',
        art: 'K-3983IN-S-0',
        name: 'Reach™ One-piece Round-front Toilet with Skirted Trapway, Dual Flush',
        dim: '15x27 in (38x68 cm)',
        desc: 'One-piece round-front toilet with clean skirted trapway, dual flush top actuator, and quiet-close seat.',
        price_inr: 28000,
        price_usd: 375,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.38,
        depth_m: 0.68,
        height_m: 0.73,
        styles: ['minimalist', 'modern', 'zen', 'compact', 'wastelab'],
        installation: {
          rough_in_in: 12,
          drain_type: '4-inch floor flange',
          electrical_req: 'None (Mechanical Dual Flush)',
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
          flush_gpf: 1.06, // Dual flush average 2.6/4L
          baseline_flush_gpf: 1.60,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 20,
          epa_watersense: true,
          annual_water_savings_l: 14920
        },
        builder: (...args) => buildReachOnePieceToilet(...args)
      },

      // 3. TOILETS
      {
        id: 'ove-one-piece-toilet',
        series: 'OVE',
        art: 'K-17629T-NS-0',
        name: 'Ove™ One-piece Round-front Toilet with Skirted Trapway, Dual Flush',
        dim: '16x28 in (40x70 cm)',
        desc: 'Sculptural organic egg-shaped one-piece toilet with skirted trapway, dual flush 2.6/4L, and soft-close ergonomic seat.',
        price_inr: 34000,
        price_usd: 450,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.40,
        depth_m: 0.70,
        height_m: 0.74,
        styles: ['classic', 'modern', 'zen', 'minimalist'],
        installation: {
          rough_in_in: 12,
          drain_type: '4-inch floor flange',
          electrical_req: 'None',
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
          flush_gpf: 1.06,
          baseline_flush_gpf: 1.60,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 16,
          epa_watersense: true,
          annual_water_savings_l: 14920
        },
        builder: (...args) => buildOveToilet(...args)
      },

      // 4. VANITIES
      {
        id: 'prologue-vanity',
        series: 'PROLOGUE',
        art: 'K-30457IN-MWF',
        name: 'Prologue™ 75 cm Wall-hung Bathroom Vanity Cabinet',
        dim: '30x19x20 in (75x48x50 cm)',
        desc: 'Wall-hung floating vanity cabinet with dual soft-close drawers, integrated bevelled J-pulls, and vitreous china basin.',
        price_inr: 46000,
        price_usd: 620,
        category: 'vanities',
        defaultFinish: 'wood',
        width_m: 0.75,
        depth_m: 0.48,
        height_m: 0.50,
        styles: ['minimalist', 'modern', 'zen'],
        installation: {
          rough_in_in: '19" AFF wall rough-in',
          drain_type: '1-1/4" wall P-trap',
          electrical_req: 'None',
          water_supply: '1 pair hot & cold 1/2" angle stops',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.100
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.65,
          compatible_with: ['purist-faucet', 'parallel-faucet', 'composed-tall-faucet', 'reve-mirror', 'ming-smart-mirror']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 22,
          epa_watersense: false,
          annual_water_savings_l: 0
        },
        builder: (...args) => buildPrologueVanity(...args)
      },

      // 5. VANITIES
      {
        id: 'luxe-vanity',
        series: 'LUXE',
        art: 'K-30460IN-MWF',
        name: 'Luxe™ 90 cm Wall-hung Bathroom Vanity Cabinet',
        dim: '36x20x20 in (90x50x50 cm)',
        desc: 'Luxury 90 cm floating vanity with deep soft-close storage drawers, premium architectural trim, and seamless ceramic basin deck.',
        price_inr: 68000,
        price_usd: 910,
        category: 'vanities',
        defaultFinish: 'wood',
        width_m: 0.90,
        depth_m: 0.50,
        height_m: 0.50,
        styles: ['classic', 'modern', 'minimalist', 'luxury'],
        installation: {
          rough_in_in: '19" AFF center wall rough-in',
          drain_type: '1-1/4" wall P-trap',
          electrical_req: 'Optional 12V under-cabinet LED circuit',
          water_supply: '1 pair hot & cold 1/2" angle stops',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.100
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.65,
          compatible_with: ['artifacts-faucet', 'purist-faucet', 'reve-mirror', 'ming-smart-mirror']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 10,
          recycled_content_pct: 25,
          epa_watersense: false,
          annual_water_savings_l: 0
        },
        builder: (...args) => buildLuxeVanity(...args)
      },

      // 6. BASIN
      {
        id: 'brazn-vessel-sink',
        series: 'BRAZN',
        art: 'K-21060IN-0',
        name: 'Brazn™ 58.4 cm Rectangular Vessel Bathroom Sink',
        dim: '23x15x5 in (58.4x36.8x12 cm)',
        desc: 'Architectural modernist vessel sink in vitreous china with sharp rectangular rim, chamfered edges, and umbrella drain.',
        price_inr: 32000,
        price_usd: 430,
        category: 'vanities',
        defaultFinish: 'black',
        width_m: 0.584,
        depth_m: 0.368,
        height_m: 0.84, // Mounted on architectural console shelf
        styles: ['zen', 'minimalist', 'wastelab', 'industrial', 'modern'],
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
          compatible_with: ['composed-tall-faucet', 'purist-faucet', 'ming-smart-mirror', 'reve-mirror']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 35,
          epa_watersense: false,
          annual_water_savings_l: 0
        },
        builder: (...args) => buildBraznVesselSink(...args)
      },

      // 7. SHOWER DOOR
      {
        id: 'new-trilogy-shower-door',
        series: 'NEW TRILOGY',
        art: 'K-704699IN-SHP',
        name: 'New Trilogy™ 2000–2161 mm H Pivot Shower Door with 8 mm Thick Glass',
        dim: '40x36x81 in (100x90x205 cm)',
        desc: 'Architectural 2.05m tall pivot shower door with 8 mm CleanCoat tempered glass, solid brass pivot hinges, and high-polish tubular handle.',
        price_inr: 82000,
        price_usd: 1100,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 1.00,
        depth_m: 0.90,
        height_m: 2.05,
        styles: ['minimalist', 'modern', 'classic', 'zen', 'wastelab', 'industrial'],
        installation: {
          rough_in_in: '1/2" NPT hot & cold supply inlets at 36" AFF',
          drain_type: '2-inch high-capacity corner shower drain',
          electrical_req: 'None',
          water_supply: 'Dual 1/2" copper or PEX lines',
          min_clearance_front_m: 0.610,
          min_clearance_side_m: 0.200
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 1.15,
          compatible_with: ['toilets', 'vanities']
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
        builder: (...args) => buildNewTrilogyShowerDoor(...args)
      },

      // 8. SHOWER
      {
        id: 'statement-showerhead',
        series: 'STATEMENT',
        art: 'K-26290T-2MB',
        name: 'Statement™ Three-function Showerhead',
        dim: '10x10 in (25x25 cm)',
        desc: 'Contemporary multifunction showerhead with Full Coverage, Cloud spray, Deep Massage, and Katalyst air-induction.',
        price_inr: 28500,
        price_usd: 380,
        category: 'showers',
        defaultFinish: 'black',
        width_m: 0.25,
        depth_m: 0.35,
        height_m: 0.25,
        styles: ['minimalist', 'modern', 'zen', 'industrial'],
        installation: {
          rough_in_in: '1/2" NPT wall arm connection at 84" AFF',
          drain_type: 'Standard 2-inch floor shower drain',
          electrical_req: 'None',
          water_supply: '1/2" NPT thermostatic supply line',
          min_clearance_front_m: 0.610,
          min_clearance_side_m: 0.200
        },
        compatibility: {
          requires_wet_wall: true,
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
        builder: (...args) => buildStatementShowerhead(...args)
      },

      // 9. BATHTUB
      {
        id: 'evok-bathtub',
        series: 'EVOK 2.0',
        art: 'K-25164T-0',
        name: 'Evok 2.0™ 1.7M Seamless Rectangular Freestanding Bathtub',
        dim: '67x32x24 in (170x80x60 cm)',
        desc: 'Seamless rectangular freestanding soaking tub with softened modern corners, double-ended lumbar support, and slotted overflow.',
        price_inr: 125000,
        price_usd: 1680,
        category: 'bathtubs',
        defaultFinish: 'white',
        width_m: 1.70,
        depth_m: 0.80,
        height_m: 0.60,
        styles: ['zen', 'modern', 'minimalist', 'classic'],
        installation: {
          rough_in_in: 'Floor rough-in 1-1/2" center drain with P-trap',
          drain_type: '1-1/2" brass slotted overflow toe-tap drain',
          electrical_req: 'None',
          water_supply: 'Freestanding floor-mount bath filler supply lines',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.150
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 2.00,
          compatible_with: ['purist-faucet', 'artifacts-faucet', 'composed-tall-faucet']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 18,
          epa_watersense: false,
          annual_water_savings_l: 0
        },
        builder: (...args) => buildEvok2Bathtub(...args)
      },

      // 10. SMART MIRROR
      {
        id: 'ming-smart-mirror',
        series: 'MING',
        art: 'K-77115IN-NA',
        name: 'Ming™ 80 cm Lighted Mirror with Proximity Sensor',
        dim: '32x32 in (80x80 cm)',
        desc: 'Circular lighted smart mirror with proximity sensor, perimeter frosted LED halo, circadian light control, and defogger.',
        price_inr: 42000,
        price_usd: 560,
        category: 'mirrors',
        defaultFinish: 'chrome',
        width_m: 0.80,
        depth_m: 0.05,
        height_m: 0.80,
        styles: ['minimalist', 'modern', 'zen', 'classic', 'wastelab'],
        installation: {
          rough_in_in: '120V hardwired junction box behind mirror center',
          drain_type: 'None',
          electrical_req: '120V/60Hz 25W LED + proximity sensor module',
          water_supply: 'None',
          min_clearance_front_m: 0.300,
          min_clearance_side_m: 0.100
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.65,
          compatible_with: ['prologue-vanity', 'luxe-vanity', 'brazn-vessel-sink']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 25,
          recycled_content_pct: 20,
          epa_watersense: false,
          annual_water_savings_l: 0
        },
        builder: (...args) => buildMingLightedMirror(...args)
      },

      // 11. MIRROR
      {
        id: 'reve-mirror',
        series: 'REVE',
        art: 'K-23268IN-NA',
        name: 'Reve™ 1000 mm Lighted Mirror',
        dim: '40x30 in (100x75 cm)',
        desc: 'Wide 100 cm rectangular mirror with dual vertical lateral LED light bars, touch sensor dimmer, 90+ CRI task lighting, and anti-fog pad.',
        price_inr: 36000,
        price_usd: 480,
        category: 'mirrors',
        defaultFinish: 'chrome',
        width_m: 1.00,
        depth_m: 0.05,
        height_m: 0.75,
        styles: ['minimalist', 'modern', 'zen', 'classic', 'industrial'],
        installation: {
          rough_in_in: 'Standard 120V hardwire junction box',
          drain_type: 'None',
          electrical_req: '120V hardwire outlet 22W',
          water_supply: 'None',
          min_clearance_front_m: 0.300,
          min_clearance_side_m: 0.100
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.65,
          compatible_with: ['prologue-vanity', 'luxe-vanity', 'brazn-vessel-sink']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 22,
          recycled_content_pct: 22,
          epa_watersense: false,
          annual_water_savings_l: 0
        },
        builder: (...args) => buildReveLightedMirror(...args)
      },

      // 12. FAUCET
      {
        id: 'purist-faucet',
        series: 'PURIST',
        art: 'K-14402IN-4A-CP',
        name: 'Purist™ Single Control Lavatory Faucet',
        dim: '6x7x8 in (15x18x20 cm)',
        desc: 'Pure architectural cylindrical single-lever faucet in Polished Chrome with laminar flow and ceramic disc valve.',
        price_inr: 19800,
        price_usd: 270,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.15,
        depth_m: 0.18,
        height_m: 0.20,
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
          compatible_with: ['prologue-vanity', 'luxe-vanity']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          baseline_flow_gpm: 2.20,
          power_watts: 0,
          recycled_content_pct: 40,
          epa_watersense: true,
          annual_water_savings_l: 16580
        },
        builder: (...args) => buildPuristSingleControlFaucet(...args)
      },

      // 13. FAUCET
      {
        id: 'parallel-faucet',
        series: 'PARALLEL',
        art: 'K-23482IN-4-BV',
        name: 'Parallel™ Pillar Tap',
        dim: '5x6x7 in (13x16x18 cm)',
        desc: 'Faceted geometric pillar tap in Brushed Bronze with precise angular contours and quarter-turn ceramic cartridge.',
        price_inr: 12500,
        price_usd: 168,
        category: 'faucets',
        defaultFinish: 'bronze',
        width_m: 0.13,
        depth_m: 0.16,
        height_m: 0.18,
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
          compatible_with: ['prologue-vanity', 'luxe-vanity']
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
        builder: (...args) => buildParallelPillarTap(...args)
      },

      // 14. FAUCET
      {
        id: 'artifacts-faucet',
        series: 'ARTIFACTS',
        art: 'K-72760T-CP',
        name: 'Artifacts™ Widespread Bathroom Sink Faucets',
        dim: '10x9x8 in (25x23x20 cm)',
        desc: 'Widespread 3-hole bathroom sink faucet with classical Edwardian column spout and authentic dual cross handles.',
        price_inr: 34000,
        price_usd: 460,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.25,
        depth_m: 0.23,
        height_m: 0.20,
        styles: ['classic', 'traditional', 'luxury'],
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
          compatible_with: ['luxe-vanity', 'prologue-vanity']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.50,
          baseline_flow_gpm: 2.20,
          power_watts: 0,
          recycled_content_pct: 30,
          epa_watersense: true,
          annual_water_savings_l: 11600
        },
        builder: (...args) => buildArtifactsWidespreadFaucet(...args)
      },

      // 15. FAUCET
      {
        id: 'composed-tall-faucet',
        series: 'COMPOSED',
        art: 'K-73159IN-7-CP',
        name: 'Composed™ Tall Single-handle Bathroom Sink Faucet',
        dim: '6x8x12 in (15x20x31 cm)',
        desc: 'Tall architectural single-handle faucet designed specifically for vessel basins with side joystick control and sleek flat spout.',
        price_inr: 22000,
        price_usd: 295,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.15,
        depth_m: 0.20,
        height_m: 0.31,
        styles: ['minimalist', 'zen', 'modern', 'wastelab', 'industrial'],
        installation: {
          rough_in_in: 'Single-hole 1-3/8" vessel deck mount',
          drain_type: 'Push-button touch drain',
          electrical_req: 'None',
          water_supply: 'Flexible braided PEX supplies',
          min_clearance_front_m: 0.300,
          min_clearance_side_m: 0.150
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 1.20,
          compatible_with: ['brazn-vessel-sink', 'prologue-vanity', 'luxe-vanity']
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
        builder: (...args) => buildComposedTallFaucet(...args)
      }
    ];