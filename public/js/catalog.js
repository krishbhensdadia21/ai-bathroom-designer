    // ==================== 2. OFFICIAL KOHLER PRODUCT CATALOG (60 GENUINE PRODUCTS) ====================
    const KOHLER_CATALOG = [
      {
        id: 'veil-smart-toilet',
        series: 'Veil',
        art: 'K-5401IN-0',
        name: 'Veil™ Smart One-piece Toilet',
        dim: '16x28 in (41x71 cm)',
        desc: 'Sculptural smart one-piece toilet with remote control, heated seat, and automatic bidet cleansing.',
        price_inr: 85000,
        price_usd: 1150,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.41,
        depth_m: 0.71,
        height_m: 0.72,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: '120V/15A dedicated circuit',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 1.28,
          flow_gpm: 0,
          power_watts: 45,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildVeilSmartToilet(...args)
      },
      {
        id: 'reach-one-piece-toilet',
        series: 'Reach',
        art: 'K-3983IN-S-0',
        name: 'Reach™ One-piece Toilet',
        dim: '15x27 in (38x68 cm)',
        desc: 'One-piece round-front toilet with clean skirted trapway, dual flush top actuator, and quiet-close seat.',
        price_inr: 28000,
        price_usd: 375,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.38,
        depth_m: 0.68,
        height_m: 0.73,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 1.28,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildReachOnePieceToilet(...args)
      },
      {
        id: 'ove-one-piece-toilet',
        series: 'Ove',
        art: 'K-17688IN-SM-0',
        name: 'Ove™ One-Piece Toilet',
        dim: '14x28 in (36x71 cm)',
        desc: 'Compact elongated one-piece toilet with Class Five flushing technology and skirted bowl.',
        price_inr: 32000,
        price_usd: 420,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.36,
        depth_m: 0.71,
        height_m: 0.76,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 1.28,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildOveToilet(...args)
      },
      {
        id: 'trace-integrated-vanity',
        series: 'Trace',
        art: 'K-30375IN-0',
        name: 'Trace™ Integrated Top and Basin',
        dim: '28x18 in (70x46 cm)',
        desc: '700 mm integrated vitreous china vanity top and basin with moisture-resistant vanity cabinet.',
        price_inr: 45000,
        price_usd: 600,
        category: 'vanities',
        defaultFinish: 'wood',
        width_m: 0.7,
        depth_m: 0.46,
        height_m: 0.85,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildTraceIntegratedVanity(...args)
      },
      {
        id: 'vive-integrated-vanity',
        series: 'Vive',
        art: 'K-28782IN-0',
        name: 'Vive™ Integrated Top and Basin',
        dim: '28x18 in (72x46 cm)',
        desc: '720 mm contemporary integrated vanity top with seamless washbasin and soft-close storage drawer.',
        price_inr: 48000,
        price_usd: 640,
        category: 'vanities',
        defaultFinish: 'wood',
        width_m: 0.72,
        depth_m: 0.46,
        height_m: 0.85,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildViveIntegratedVanity(...args)
      },
      {
        id: 'brazn-vessel-sink',
        series: 'Brazn',
        art: 'K-21060IN-0',
        name: 'Brazn™ 58.4 cm Rectangular Vessel Sink',
        dim: '23x15 in (58x38 cm)',
        desc: 'Modernist architectural rectangular vessel sink inspired by Bauhaus geometry with razor-thin edges.',
        price_inr: 38000,
        price_usd: 510,
        category: 'vanities',
        defaultFinish: 'white',
        width_m: 0.58,
        depth_m: 0.38,
        height_m: 0.14,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildBraznVesselSink(...args)
      },
      {
        id: 'forefront-semi-recessed-basin',
        series: 'Forefront',
        art: 'K-11479IN-VC1-0',
        name: 'Forefront™ Square Semi-Recessed Basin',
        dim: '16x16 in (41x41 cm)',
        desc: 'Clean geometric semi-recessed basin projecting past the counter edge for effortless ergonomic wash reach.',
        price_inr: 22000,
        price_usd: 295,
        category: 'vanities',
        defaultFinish: 'white',
        width_m: 0.41,
        depth_m: 0.41,
        height_m: 0.18,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildForefrontSemiRecessedBasin(...args)
      },
      {
        id: 'new-trilogy-pivot-door',
        series: 'New Trilogy',
        art: 'K-704699IN-SHP',
        name: 'New Trilogy™ 2000–2161 mm H Pivot Door',
        dim: '35x35 in (90x90 cm)',
        desc: 'Architectural 2.05m tall pivot shower door with 8 mm CleanCoat tempered glass and solid brass pivot hinges.',
        price_inr: 82000,
        price_usd: 1100,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 0.9,
        depth_m: 0.9,
        height_m: 2.05,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildNewTrilogyShowerDoor(...args)
      },
      {
        id: 'statement-round-showerhead',
        series: 'Statement',
        art: 'K-26299IN-CP',
        name: 'Statement™ Round Multifunction Showerhead',
        dim: '12x18 in (30x45 cm)',
        desc: 'Statement round multifunction showerhead delivering Full Coverage with Katalyst air-induction technology.',
        price_inr: 35000,
        price_usd: 470,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 0.3,
        depth_m: 0.45,
        height_m: 1.1,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildStatementShowerhead(...args)
      },
      {
        id: 'evok-2-bathtub',
        series: 'Evok 2.0',
        art: 'K-20935IN-0',
        name: 'Evok 2.0™ 1600 mm Acrylic Bathtub',
        dim: '63x30 in (160x75 cm)',
        desc: 'Seamless rectangular freestanding acrylic bathtub with ergonomic lumbar backrest and center toe-tap drain.',
        price_inr: 125000,
        price_usd: 1680,
        category: 'bathtubs',
        defaultFinish: 'white',
        width_m: 1.6,
        depth_m: 0.75,
        height_m: 0.6,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildEvok2Bathtub(...args)
      },
      {
        id: 'ming-lighted-mirror',
        series: 'Ming',
        art: 'K-77115IN-NA',
        name: 'Ming™ 80 cm Lighted Mirror',
        dim: '31x2 in (80x5 cm)',
        desc: '80 cm circular lighted smart mirror with proximity sensor, perimeter frosted LED halo, and defogger.',
        price_inr: 42000,
        price_usd: 560,
        category: 'mirrors',
        defaultFinish: 'chrome',
        width_m: 0.8,
        depth_m: 0.05,
        height_m: 0.8,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: '120V/15A dedicated circuit',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 45,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildMingLightedMirror(...args)
      },
      {
        id: 'reve-lighted-mirror',
        series: 'Reve',
        art: 'K-23268IN-NA',
        name: 'Reve™ 1000 mm Lighted Mirror',
        dim: '39x2 in (100x5 cm)',
        desc: '1000 mm rectangular luxury lighted mirror with integrated LED lighting border and touch dimmer control.',
        price_inr: 56000,
        price_usd: 750,
        category: 'mirrors',
        defaultFinish: 'chrome',
        width_m: 1.0,
        depth_m: 0.05,
        height_m: 0.65,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: '120V/15A dedicated circuit',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 25,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildReveLightedMirror(...args)
      },
      {
        id: 'purist-single-control-faucet',
        series: 'Purist',
        art: 'K-14402IN-4A-CP',
        name: 'Purist™ Single Control Lavatory Faucet',
        dim: '6x7 in (15x18 cm)',
        desc: 'Iconic architectural single-lever lavatory faucet with straight ergonomic spout and ceramic disc cartridge.',
        price_inr: 22000,
        price_usd: 295,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.15,
        depth_m: 0.18,
        height_m: 0.22,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildPuristSingleControlFaucet(...args)
      },
      {
        id: 'parallel-pillar-tap',
        series: 'Parallel',
        art: 'K-23482IN-4-BV',
        name: 'Parallel™ Pillar Tap',
        dim: '5x6 in (13x15 cm)',
        desc: 'Precision-machined pillar tap with distinctive flat spout and knurled quarter-turn handle in Vibrant Brushed Bronze.',
        price_inr: 16000,
        price_usd: 215,
        category: 'faucets',
        defaultFinish: 'gold',
        width_m: 0.13,
        depth_m: 0.15,
        height_m: 0.18,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildParallelPillarTap(...args)
      },
      {
        id: 'artifacts-widespread-faucet',
        series: 'Artifacts',
        art: 'K-72760T-CP',
        name: 'Artifacts™ Widespread Sink Faucets',
        dim: '12x8 in (30x20 cm)',
        desc: 'Edwardian swan neck spout with dual porcelain-capped cross handles in polished chrome.',
        price_inr: 34000,
        price_usd: 450,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.3,
        depth_m: 0.2,
        height_m: 0.19,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildArtifactsWidespreadFaucet(...args)
      },
      {
        id: 'composed-tall-faucet',
        series: 'Composed',
        art: 'K-73159IN-7-CP',
        name: 'Composed™ Tall Single-handle Faucet',
        dim: '6x8 in (15x20 cm)',
        desc: 'Tower vessel column with side joystick lever and flat horizontal spout, 1.2 GPM WaterSense.',
        price_inr: 22000,
        price_usd: 295,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.15,
        depth_m: 0.2,
        height_m: 0.31,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildComposedTallFaucet(...args)
      },
      {
        id: 'eap-eap-ne-piece-ound-front-mart-oil-k28529in',
        series: 'Leap',
        art: 'K-28529IN-0',
        name: 'Leap™ One-piece Round-front Smart Toilet',
        dim: '16x26 in (40x67 cm)',
        desc: 'Intelligent one-piece compact round-front smart toilet with personalized bidet wand, warm-air dryer, and wireless remote.',
        price_inr: 78000,
        price_usd: 1040,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.4,
        depth_m: 0.67,
        height_m: 0.7,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: '120V/15A dedicated circuit',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 1.28,
          flow_gpm: 0,
          power_watts: 45,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildLeapSmartToilet(...args)
      },
      {
        id: 'nnate-nnate-ne-piece-longated-mart-o-k29777in',
        series: 'Innate',
        art: 'K-29777IN-0',
        name: 'Innate™ One-piece Elongated Smart Toilet',
        dim: '16x29 in (41x73 cm)',
        desc: 'Architectural elongated smart toilet featuring dual-flush power, stainless steel cleansing wand, and ambient LED bowl nightlight.',
        price_inr: 92000,
        price_usd: 1230,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.41,
        depth_m: 0.73,
        height_m: 0.71,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: '120V/15A dedicated circuit',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 1.28,
          flow_gpm: 0,
          power_watts: 45,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildInnateSmartToilet(...args)
      },
      {
        id: 'ive-ne-piece-ound-front-oilet-k33123in',
        series: 'Vive',
        art: 'K-33123IN-0',
        name: 'KOHLER VIVE® One-piece Round-front Toilet',
        dim: '15x27 in (38x68 cm)',
        desc: 'Modern round-front one-piece toilet with smooth contoured bowl and high-efficiency 3.8/4.8L dual flush.',
        price_inr: 31000,
        price_usd: 415,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.38,
        depth_m: 0.68,
        height_m: 0.74,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 1.28,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildViveRoundToilet(...args)
      },
      {
        id: 'ive-ne-piece-ound-front-oilet-k33124in',
        series: 'Vive',
        art: 'K-33124IN-S-0',
        name: 'KOHLER VIVE® One-piece Round-front Toilet',
        dim: '15x27 in (38x68 cm)',
        desc: 'One-piece round-front toilet with skirted trapway design for effortless wiping and quiet-close slim seat.',
        price_inr: 33500,
        price_usd: 445,
        category: 'toilets',
        defaultFinish: 'white',
        width_m: 0.38,
        depth_m: 0.68,
        height_m: 0.74,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 1.28,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildViveRoundToilet(...args)
      },
      {
        id: 'eil-eil-16-ound-essel-athroom-ink-k207030',
        series: 'Veil',
        art: 'K-20703-0',
        name: 'Veil™ 16" Round Vessel Bathroom Sink',
        dim: '16x16 in (41x41 cm)',
        desc: 'Sensuous 16-inch circular vessel sink with flowing Supramic ceramic curves and ultra-thin 4mm rim profile.',
        price_inr: 32000,
        price_usd: 425,
        category: 'vanities',
        defaultFinish: 'white',
        width_m: 0.41,
        depth_m: 0.41,
        height_m: 0.13,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildVeilRoundVesselSink(...args)
      },
      {
        id: 'eil-eil-38-1-2-val-essel-athroom-ink-k207050',
        series: 'Veil',
        art: 'K-20705-0',
        name: 'Veil™ 38-1/2" Oval Vessel Bathroom Sink',
        dim: '39x18 in (98x46 cm)',
        desc: 'Extra-wide 38.5-inch organic oval statement vessel sink creating a striking luxury centerpiece in master suites.',
        price_inr: 58000,
        price_usd: 775,
        category: 'vanities',
        defaultFinish: 'white',
        width_m: 0.98,
        depth_m: 0.46,
        height_m: 0.14,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildVeilOvalVesselSink(...args)
      },
      {
        id: 'eil-eil-12-1-4-edestal-athroom-ink-k207020',
        series: 'Veil',
        art: 'K-20702-0',
        name: 'Veil™ 12-1/4" Pedestal Bathroom Sink',
        dim: '18x20 in (46x51 cm)',
        desc: 'Sculptural monolithic pedestal sink tapering organically from floor to basin with concealed floor waste coupling.',
        price_inr: 68000,
        price_usd: 910,
        category: 'vanities',
        defaultFinish: 'white',
        width_m: 0.46,
        depth_m: 0.51,
        height_m: 0.86,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildVeilPedestalSink(...args)
      },
      {
        id: 'eil-eil-21-val-essel-athroom-ink-k207040',
        series: 'Veil',
        art: 'K-20704-0',
        name: 'Veil™ 21" Oval Vessel Bathroom Sink',
        dim: '21x15 in (53x38 cm)',
        desc: '21-inch balanced oval vessel bathroom sink with flowing organic contours and stain-resistant glaze.',
        price_inr: 36000,
        price_usd: 480,
        category: 'vanities',
        defaultFinish: 'white',
        width_m: 0.53,
        depth_m: 0.38,
        height_m: 0.13,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildVeilOvalVesselSink(...args)
      },
      {
        id: 'adena-adena-emi-ecessed-athroom-ink-k72907k1',
        series: 'Ladena',
        art: 'K-72907K-1-0',
        name: 'Ladena™ Semi-Recessed Bathroom Sink',
        dim: '21x18 in (53x46 cm)',
        desc: 'Gracefully contoured rectangular semi-recessed sink with deep basin geometry and overflow channel.',
        price_inr: 24000,
        price_usd: 320,
        category: 'vanities',
        defaultFinish: 'white',
        width_m: 0.53,
        depth_m: 0.46,
        height_m: 0.17,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildLadenaSemiRecessedSink(...args)
      },
      {
        id: 'orefront-orefront-emi-ecessed-athroo-k98930x1',
        series: 'Forefront',
        art: 'K-98930X-1-0',
        name: 'Forefront™ Semi-Recessed Bathroom Sink',
        dim: '22x18 in (56x46 cm)',
        desc: 'Architectural semi-recessed basin featuring crisp parallel lines, wide rear deck for faucet, and rounded basin interior.',
        price_inr: 26000,
        price_usd: 345,
        category: 'vanities',
        defaultFinish: 'white',
        width_m: 0.56,
        depth_m: 0.46,
        height_m: 0.17,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildForefrontSemiRecessedBasin(...args)
      },
      {
        id: 'eil-eil-59-9-cm-val-essel-athroom-in-k77171in',
        series: 'Veil',
        art: 'K-77171IN-0',
        name: 'Veil™ 59.9 cm Oval Vessel Bathroom Sink',
        dim: '24x16 in (60x40 cm)',
        desc: '60 cm asymmetric organic vessel sink crafted in high-performance Supramic material with concealed overflow.',
        price_inr: 39000,
        price_usd: 520,
        category: 'vanities',
        defaultFinish: 'white',
        width_m: 0.6,
        depth_m: 0.4,
        height_m: 0.14,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildVeilOvalVesselSink(...args)
      },
      {
        id: 'omposed-omposed-all-mount-avatory-au-k73061t7',
        series: 'Composed',
        art: 'K-73061T-7-BV',
        name: 'Composed™ Wall-mount Lavatory Faucet',
        dim: '9x8 in (23x20 cm)',
        desc: 'Wall-mount single-control lavatory faucet with 200 mm reach spout in Vibrant Brushed Bronze.',
        price_inr: 31000,
        price_usd: 415,
        category: 'faucets',
        defaultFinish: 'gold',
        width_m: 0.23,
        depth_m: 0.2,
        height_m: 0.1,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildComposedWallMountFaucet(...args)
      },
      {
        id: 'omposed-omposed-all-mount-athroom-in-k73061in',
        series: 'Composed',
        art: 'K-73061IN-4ND-CP',
        name: 'Composed™ Wall-mount Bathroom Sink Faucet',
        dim: '9x8 in (23x20 cm)',
        desc: 'Clean geometric wall-mounted faucet in Polished Chrome with minimal wall plate and aerated laminar stream.',
        price_inr: 28000,
        price_usd: 375,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.23,
        depth_m: 0.2,
        height_m: 0.1,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildComposedWallMountFaucet(...args)
      },
      {
        id: 'omposed-omposed-ingle-handle-athroom-k73050tb',
        series: 'Composed',
        art: 'K-73050T-B7-BL',
        name: 'Composed™ Single-handle Bathroom Sink Faucet',
        dim: '6x7 in (15x18 cm)',
        desc: 'Matte Black single-handle deck-mount faucet with pure geometric proportions and top lever control.',
        price_inr: 26000,
        price_usd: 345,
        category: 'faucets',
        defaultFinish: 'black',
        width_m: 0.15,
        depth_m: 0.18,
        height_m: 0.21,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildComposedSingleFaucet(...args)
      },
      {
        id: 'omposed-omposed-ingle-handle-aucet-w-k73158t4',
        series: 'Composed',
        art: 'K-73158T-4-RGD',
        name: 'Composed™ Single-handle Faucet with Joystick Handle',
        dim: '6x7 in (15x18 cm)',
        desc: 'Rose Gold luxury single-control faucet featuring a precision side-joystick actuator for feather-touch regulation.',
        price_inr: 29000,
        price_usd: 390,
        category: 'faucets',
        defaultFinish: 'gold',
        width_m: 0.15,
        depth_m: 0.18,
        height_m: 0.22,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildComposedSingleFaucet(...args)
      },
      {
        id: 'omposed-omposed-ingle-handle-aucet-k7305072',
        series: 'Composed',
        art: 'K-73050-7-2MB',
        name: 'Composed™ Single-handle Faucet',
        dim: '6x7 in (15x18 cm)',
        desc: 'Vibrant Brushed Moderne Brass single-control lavatory faucet with solid brass body and ceramic disc valve.',
        price_inr: 27500,
        price_usd: 365,
        category: 'faucets',
        defaultFinish: 'gold',
        width_m: 0.15,
        depth_m: 0.18,
        height_m: 0.21,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildComposedSingleFaucet(...args)
      },
      {
        id: 'omposed-omposed-ingle-handle-aucet-4-k73050t7',
        series: 'Composed',
        art: 'K-73050T-7GCH-TT',
        name: 'Composed™ Single-handle Faucet, 4.5 LPM',
        dim: '6x7 in (15x18 cm)',
        desc: 'Titanium finish ultra-efficient 4.5 LPM water-saving single-handle faucet engineered for LEED-certified green suites.',
        price_inr: 28500,
        price_usd: 380,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.15,
        depth_m: 0.18,
        height_m: 0.21,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildComposedSingleFaucet(...args)
      },
      {
        id: 'omposed-omposed-2-handle-all-mounted-k73067t9',
        series: 'Composed',
        art: 'K-73067T-9ACH-BV',
        name: 'Composed™ 2-handle Wall-mounted Lavatory Faucet',
        dim: '10x9 in (25x23 cm)',
        desc: 'Dual-handle three-hole wall-mount lavatory faucet with independent hot and cold cross valves in Brushed Bronze.',
        price_inr: 36000,
        price_usd: 480,
        category: 'faucets',
        defaultFinish: 'gold',
        width_m: 0.25,
        depth_m: 0.23,
        height_m: 0.11,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildComposedWallMountFaucet(...args)
      },
      {
        id: 'omposed-omposed-all-ingle-handle-auc-k73159tb',
        series: 'Composed',
        art: 'K-73159T-B7-AF',
        name: 'Composed™ Tall Single-handle Faucet',
        dim: '6x8 in (15x20 cm)',
        desc: 'Vibrant French Gold tall tower faucet designed to provide generous clearance above elevated vessel basins.',
        price_inr: 27000,
        price_usd: 360,
        category: 'faucets',
        defaultFinish: 'gold',
        width_m: 0.15,
        depth_m: 0.2,
        height_m: 0.31,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildComposedTallFaucet(...args)
      },
      {
        id: 'leo-leo-ingle-handle-athroom-ink-auc-k72275in',
        series: 'Aleo',
        art: 'K-72275IN-4ND-RGD',
        name: 'Aleo™ Single-handle Bathroom Sink Faucet',
        dim: '6x7 in (15x17 cm)',
        desc: 'Rose Gold sleek single-handle faucet with forward-angled spout and integrated coin-slot aerator.',
        price_inr: 18500,
        price_usd: 245,
        category: 'faucets',
        defaultFinish: 'gold',
        width_m: 0.15,
        depth_m: 0.17,
        height_m: 0.19,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildAleoFaucet(...args)
      },
      {
        id: 'leo-leo-all-ingle-handle-athroom-ink-k72298in',
        series: 'Aleo',
        art: 'K-72298IN-4ND-RGD',
        name: 'Aleo™ Tall Single-handle Bathroom Sink Faucet',
        dim: '6x8 in (15x20 cm)',
        desc: 'Extended tower vessel faucet in Rose Gold with sculpted ergonomic handle and smooth water delivery.',
        price_inr: 23000,
        price_usd: 310,
        category: 'faucets',
        defaultFinish: 'gold',
        width_m: 0.15,
        depth_m: 0.2,
        height_m: 0.3,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildAleoFaucet(...args)
      },
      {
        id: 'one-one-ingle-ontrol-av-aucet-with-r-k22534in',
        series: 'Hone',
        art: 'K-22534IN-4-CP',
        name: 'Hone™ Single Control Lav Faucet with Drain',
        dim: '6x7 in (15x18 cm)',
        desc: 'Polished Chrome cylindrical single-control faucet with pop-up clicker drain and durable brass waterway.',
        price_inr: 15500,
        price_usd: 210,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.15,
        depth_m: 0.18,
        height_m: 0.18,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildHoneFaucet(...args)
      },
      {
        id: 'odern-ife-odern-ife-dge-all-ingle-ha-k25758in',
        series: 'ModernLife',
        art: 'K-25758IN-4ND-CP',
        name: 'ModernLife Edge™ Tall Single-handle Faucet',
        dim: '6x8 in (15x20 cm)',
        desc: 'Ultra-slim architectural tall vessel faucet with razor-thin lever and crisp planar surfaces.',
        price_inr: 24500,
        price_usd: 325,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.15,
        depth_m: 0.2,
        height_m: 0.32,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildModernLifeEdgeFaucet(...args)
      },
      {
        id: 'omplementary-omplementary-ingle-hand-k5679inc',
        series: 'Complementary',
        art: 'K-5679IN-CP',
        name: 'Complementary™ Single-handle Wall-mount Faucet Valve',
        dim: '6x3 in (15x8 cm)',
        desc: 'Solid brass concealed wall-mount rough-in valve with polished chrome decorative faceplate.',
        price_inr: 12000,
        price_usd: 160,
        category: 'faucets',
        defaultFinish: 'chrome',
        width_m: 0.15,
        depth_m: 0.08,
        height_m: 0.15,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.20,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildWallMountValve(...args)
      },
      {
        id: 'late-late-200-cm-liding-hower-oor-k39061in',
        series: 'Elate',
        art: 'K-39061IN-SHP',
        name: 'Elate™ 200 cm H Sliding Shower Door',
        dim: '47x35 in (120x90 cm)',
        desc: '120 cm wide 2-meter tall sliding glass shower door with oversized top rollers and Bright Polished Silver header.',
        price_inr: 74000,
        price_usd: 990,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 1.2,
        depth_m: 0.9,
        height_m: 2.0,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildSlidingShowerDoor(...args)
      },
      {
        id: 'ew-rilogy-ew-rilogy-206-1-cm-ivot-ho-k704796i',
        series: 'New Trilogy',
        art: 'K-704796IN-2BL',
        name: 'New Trilogy™ 206.1 cm H Pivot Shower Door',
        dim: '35x35 in (90x90 cm)',
        desc: 'Matte Black framed pivot shower door standing 2.06m tall with heavy-duty 8mm tempered glass.',
        price_inr: 86000,
        price_usd: 1150,
        category: 'showers',
        defaultFinish: 'black',
        width_m: 0.9,
        depth_m: 0.9,
        height_m: 2.06,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildPivotShowerDoor(...args)
      },
      {
        id: 'ew-rilogy-ew-rilogy-2000-mm-ivot-how-k704702i',
        series: 'New Trilogy',
        art: 'K-704702IN-SHP',
        name: 'New Trilogy™ 2000 mm H Pivot Shower Door',
        dim: '35x35 in (90x90 cm)',
        desc: 'High-gloss silver pivot shower door with continuous magnetic catch and outward-opening clearance.',
        price_inr: 79000,
        price_usd: 1050,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 0.9,
        depth_m: 0.9,
        height_m: 2.0,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildPivotShowerDoor(...args)
      },
      {
        id: 'ontra-ontra-200-cm-liding-hower-oor-k705116i',
        series: 'Contra',
        art: 'K-705116IN-SHP',
        name: 'Contra™ 200 cm H Sliding Shower Door',
        dim: '47x35 in (120x90 cm)',
        desc: 'Frameless sliding shower enclosure with exposed stainless steel dual roller wheels and soft-cushion stops.',
        price_inr: 76000,
        price_usd: 1015,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 1.2,
        depth_m: 0.9,
        height_m: 2.0,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildSlidingShowerDoor(...args)
      },
      {
        id: 'ew-rilogy-ew-rilogy-200-216-1-cm-ivo-k704699i',
        series: 'New Trilogy',
        art: 'K-704699IN-SHP',
        name: 'New Trilogy™ 200–216.1 cm H Pivot Shower Door',
        dim: '39x35 in (100x90 cm)',
        desc: '100 cm wide adjustable pivot shower door with full-length clear water seals and ergonomic towel bar handle.',
        price_inr: 84000,
        price_usd: 1120,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 1.0,
        depth_m: 0.9,
        height_m: 2.05,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildPivotShowerDoor(...args)
      },
      {
        id: 'late-late-200-cm-liding-hower-oor-k39060in',
        series: 'Elate',
        art: 'K-39060IN-SHP',
        name: 'Elate™ 200 cm H Sliding Shower Door',
        dim: '41x35 in (105x90 cm)',
        desc: '105 cm compact sliding shower door with smooth bypass action and low threshold for easy walk-in entry.',
        price_inr: 71000,
        price_usd: 950,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 1.05,
        depth_m: 0.9,
        height_m: 2.0,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildSlidingShowerDoor(...args)
      },
      {
        id: 'ontra-ontra-200-210-cm-liding-hower-k705115i',
        series: 'Contra',
        art: 'K-705115IN-SHP',
        name: 'Contra™ 200–210 cm H Sliding Shower Door',
        dim: '45x35 in (115x90 cm)',
        desc: 'Adjustable height 200-210cm sliding shower door with CleanCoat hydrophobic surface protection.',
        price_inr: 77000,
        price_usd: 1030,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 1.15,
        depth_m: 0.9,
        height_m: 2.05,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildSlidingShowerDoor(...args)
      },
      {
        id: 'ew-evity-ew-evity-200-cm-liding-howe-k709076i',
        series: 'New Levity',
        art: 'K-709076IN-CP',
        name: 'New Levity™ 200 cm H Sliding Shower Door',
        dim: '47x35 in (120x90 cm)',
        desc: 'Dual-sliding bypass glass shower door system with cushioned center guide and minimalist top track.',
        price_inr: 79000,
        price_usd: 1055,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 1.2,
        depth_m: 0.9,
        height_m: 2.0,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildSlidingShowerDoor(...args)
      },
      {
        id: 'ingulier-ingulier-200-212-1-cm-ivot-k708066i',
        series: 'Singulier',
        art: 'K-708066IN-CP',
        name: 'Singulier™ 200–212.1 cm H Pivot Shower Door',
        dim: '35x35 in (90x90 cm)',
        desc: 'French architectural pivot shower door with integrated rise-and-fall hinge mechanism preventing seal drag.',
        price_inr: 81000,
        price_usd: 1080,
        category: 'showers',
        defaultFinish: 'chrome',
        width_m: 0.9,
        depth_m: 0.9,
        height_m: 2.05,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 1.75,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildPivotShowerDoor(...args)
      },
      {
        id: 'rcher-rcher-51-78-7-cm-irrored-abine-k3073inn',
        series: 'Archer',
        art: 'K-3073IN-NA',
        name: 'Archer™ 51 × 78.7 cm Mirrored Cabinet',
        dim: '20x5 in (51x13 cm)',
        desc: '51x79 cm reversible mirrored cabinet with beveled glass door, 3 adjustable glass shelves, and rust-free aluminum body.',
        price_inr: 29000,
        price_usd: 390,
        category: 'mirrors',
        defaultFinish: 'chrome',
        width_m: 0.51,
        depth_m: 0.13,
        height_m: 0.79,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 25,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildMirroredCabinet(...args)
      },
      {
        id: 'orefront-orefront-90-cm-all-hung-ani-k31601in',
        series: 'Forefront',
        art: 'K-31601IN-E64',
        name: 'Forefront™ 90 cm Wall-hung Vanity Cabinet',
        dim: '35x18 in (90x46 cm)',
        desc: '90 cm wall-hung floating vanity cabinet in Nordic Oak finish with full-extension soft-close dual drawers.',
        price_inr: 52000,
        price_usd: 695,
        category: 'vanities',
        defaultFinish: 'wood',
        width_m: 0.9,
        depth_m: 0.46,
        height_m: 0.55,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildWallHungVanityCabinet(...args)
      },
      {
        id: 'oreward-oreward-75-cm-all-hung-anity-k28741in',
        series: 'Foreward',
        art: 'K-28741IN-RWP',
        name: 'Foreward™ 75 cm Wall-hung Vanity Cabinet',
        dim: '30x18 in (75x46 cm)',
        desc: '75 cm contemporary timber wall-hung vanity with integrated finger-pull drawer fronts and plumbing cutout.',
        price_inr: 44000,
        price_usd: 590,
        category: 'vanities',
        defaultFinish: 'wood',
        width_m: 0.75,
        depth_m: 0.46,
        height_m: 0.55,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildWallHungVanityCabinet(...args)
      },
      {
        id: 'orefront-orefront-60-cm-all-hung-ani-k31602in',
        series: 'Forefront',
        art: 'K-31602IN-E64',
        name: 'Forefront™ 60 cm Wall-hung Vanity Cabinet',
        dim: '24x18 in (60x46 cm)',
        desc: '60 cm compact powder room floating vanity cabinet with deep bottom storage and moisture-resistant lacquer.',
        price_inr: 38000,
        price_usd: 510,
        category: 'vanities',
        defaultFinish: 'wood',
        width_m: 0.6,
        depth_m: 0.46,
        height_m: 0.55,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildWallHungVanityCabinet(...args)
      },
      {
        id: 'odern-ife-odern-ife-51-101-8-cm-apsu-k37876in',
        series: 'ModernLife',
        art: 'K-37876IN-NA',
        name: 'ModernLife™ 51 × 101.8 cm Capsule Lighted Mirror',
        dim: '20x2 in (51x5 cm)',
        desc: '51x102 cm pill-capsule vertical lighted mirror with diffuse perimeter glow, touch sensor, and anti-fog heating pad.',
        price_inr: 48000,
        price_usd: 640,
        category: 'mirrors',
        defaultFinish: 'chrome',
        width_m: 0.51,
        depth_m: 0.05,
        height_m: 1.02,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: '120V/15A dedicated circuit',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 25,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildCapsuleLightedMirror(...args)
      },
      {
        id: 'orefront-ite-orefront-ite-72-65-cm-i-k29155in',
        series: 'Forefront Lite',
        art: 'K-29155IN-NA',
        name: 'Forefront™ Lite 72 × 65 cm Lighted Mirror',
        dim: '28x2 in (72x5 cm)',
        desc: '72x65 cm rectangular backlit LED mirror providing uniform indirect task lighting for grooming.',
        price_inr: 36000,
        price_usd: 480,
        category: 'mirrors',
        defaultFinish: 'chrome',
        width_m: 0.72,
        depth_m: 0.05,
        height_m: 0.65,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: '120V/15A dedicated circuit',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 25,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildForefrontLiteMirror(...args)
      },
      {
        id: 'orefront-ite-orefront-ite-90-65-cm-i-k29156in',
        series: 'Forefront Lite',
        art: 'K-29156IN-NA',
        name: 'Forefront™ Lite 90 × 65 cm Lighted Mirror',
        dim: '35x2 in (90x5 cm)',
        desc: '90x65 cm wide lighted mirror ideal for double vanities with 3000K/4000K dual-color circadian toggle.',
        price_inr: 42000,
        price_usd: 560,
        category: 'mirrors',
        defaultFinish: 'chrome',
        width_m: 0.9,
        depth_m: 0.05,
        height_m: 0.65,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: '120V/15A dedicated circuit',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 25,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildForefrontLiteMirror(...args)
      },
      {
        id: 'ssential-ssential-60-120-cm-apsule-r-k38367in',
        series: 'Essential',
        art: 'K-38367IN-BLL',
        name: 'Essential 60 × 120 cm Capsule Framed Mirror',
        dim: '24x2 in (60x4 cm)',
        desc: '60x120 cm elongated capsule mirror enclosed in a clean Matte Black anodized aluminum metal rim.',
        price_inr: 34000,
        price_usd: 450,
        category: 'mirrors',
        defaultFinish: 'black',
        width_m: 0.6,
        depth_m: 0.04,
        height_m: 1.2,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 25,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildCapsuleLightedMirror(...args)
      },
      {
        id: 'ssential-ssential-61-6-92-1-cm-rched-k30637in',
        series: 'Essential',
        art: 'K-30637IN-BLL',
        name: 'Essential 61.6 × 92.1 cm Arched Framed Mirror',
        dim: '24x2 in (62x4 cm)',
        desc: '62x92 cm classic Roman arch framed mirror with slender black profile and distortion-free copper-free backing.',
        price_inr: 32000,
        price_usd: 425,
        category: 'mirrors',
        defaultFinish: 'black',
        width_m: 0.62,
        depth_m: 0.04,
        height_m: 0.92,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 25,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildArchedFramedMirror(...args)
      },
      {
        id: 'mbark-mbark-remium-rched-irrored-abi-k56151in',
        series: 'Embark',
        art: 'K-56151IN-NA',
        name: 'Embark™ Premium XL Arched Mirrored Cabinet',
        dim: '24x6 in (60x14 cm)',
        desc: 'Architectural arched mirrored medicine cabinet featuring internal LED lighting, magnetic organizer bar, and double-sided mirror door.',
        price_inr: 54000,
        price_usd: 720,
        category: 'mirrors',
        defaultFinish: 'chrome',
        width_m: 0.6,
        depth_m: 0.14,
        height_m: 0.96,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: false,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 25,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildMirroredCabinet(...args)
      },
      {
        id: 've-ve-170-75-cm-rop-in-hirlpool-ath-k1709ink',
        series: 'Ove',
        art: 'K-1709IN-K-0',
        name: 'Ove™ 170 × 75 cm Drop-in Whirlpool Bath',
        dim: '67x30 in (170x75 cm)',
        desc: '170 cm drop-in hydrotherapy whirlpool bathtub with 6 adjustable hydromassage body jets and quiet-flow pump.',
        price_inr: 165000,
        price_usd: 2200,
        category: 'bathtubs',
        defaultFinish: 'white',
        width_m: 1.7,
        depth_m: 0.75,
        height_m: 0.58,
        styles: ['minimalist', 'zen', 'modern', 'luxury', 'classic'],
        installation: {
          rough_in_in: 12,
          drain_type: 'Standard rough-in coupling',
          electrical_req: 'None',
          water_supply: '1/2" NPT angle stop',
          min_clearance_front_m: 0.533,
          min_clearance_side_m: 0.381
        },
        compatibility: {
          requires_wet_wall: true,
          max_wet_wall_dist_m: 0.95,
          compatible_with: ['toilets', 'vanities', 'faucets', 'showers', 'mirrors', 'bathtubs']
        },
        sustainability: {
          flush_gpf: 0,
          flow_gpm: 0,
          power_watts: 0,
          recycled_content_pct: 25,
          epa_watersense: true,
          annual_water_savings_l: 12000
        },
        builder: (...args) => buildOveWhirlpoolBath(...args)
      }
    ];

    // ==================== 3. KOHLER CURATED RECOMMENDATION SUITES ====================
    const KOHLER_CURATED_SUITES = {
      essential: {
        id: 'essential',
        name: 'Essential Value Suite',
        tagline: 'Max Cost Savings & Complete NKBA Compliance',
        description: 'Engineered for budget-conscious renovations without compromising on authentic Kohler quality, skirted easy-clean ceramics, and WaterSense efficiency.',
        target_budget_inr: 150000,
        target_budget_usd: 1990,
        primary_skus: ['reach-one-piece-toilet', 'trace-integrated-vanity', 'artifact-widespread-faucet', 'evok-freestanding-bath'],
        ideal_for: 'High-ROI modern renovations, rental upgrades, and compact guest baths'
      },
      signature: {
        id: 'signature',
        name: 'Signature Balanced Suite',
        tagline: 'Best Multi-Objective Pareto Optimal',
        description: 'The algorithmic sweet spot balancing spatial clearances, budget allocation, aesthetic theme cohesion, and wet-wall MEP alignment with peak composite fitness.',
        target_budget_inr: 300000,
        target_budget_usd: 3990,
        primary_skus: ['veil-smart-toilet', 'vive-integrated-vanity', 'parallel-single-handle-faucet', 'statement-shower-package'],
        ideal_for: 'Contemporary master en-suites seeking smart hygiene and sculptural minimalism'
      },
      luxury: {
        id: 'luxury',
        name: 'Masterpiece Luxury Suite',
        tagline: 'Flagship Kohler Innovation & Smart Living',
        description: 'Uncompromising luxury featuring sculptured smart sanitaryware, thermostatic multi-spray hydrotherapy, and premium PBR finishes for an authentic 5-star spa retreat.',
        target_budget_inr: 600000,
        target_budget_usd: 7990,
        primary_skus: ['veil-smart-toilet', 'brazn-vessel-sink', 'composed-tall-vessel-faucet', 'statement-shower-package', 'evok-freestanding-bath'],
        ideal_for: 'Grand luxury architectural residences and private wellness retreats'
      }
    };

    if (typeof window !== 'undefined') {
      window.KOHLER_CURATED_SUITES = KOHLER_CURATED_SUITES;
    }
