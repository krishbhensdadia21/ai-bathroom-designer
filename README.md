# KOHLER AI Bathroom Designer & Planner 


### 🏛️ Program & Challenge Overview
##
This project is submitted as an individual case study solution for the selection process of the **KOHLER-MITWPU AI Research Lab Program**.

* **Challenge Track**: **Track 1: KOHLER AI Bathroom Designer & Planner**
* **Core Objective**: Build an interactive AI design assistant that takes a customer's constraints (dimensions, budget limits, aesthetic themes, and device catalog specifications) and automates personalized product bundle recommendations.
* **Expected Outcome**: An intelligent recommendation engine that outputs optimized product combinations (smart toilets, vanities, thermostatic showers, mirrors, bathtubs) fitting exact physical space and budget parameters, accompanied by an interactive 3D WebGL representation
##
### 📑 Official Deliverables & Submission Assets
##

| Deliverable | Description | File / Access Link |
|---|---|---|
| **1. Working Model** | Live interactive 3D WebGL space planner & AI assistant deployed to production | 🔗 **[Live Vercel Application](https://kohler-ai-bathroom-designer.vercel.app/)** |
| **2. Prompts & Workflows** | Complete documentation of AI prompts, system instructions, Llama Guard rules, and multi-objective workflows | 📖 **[System Architecture & Prompts](assets/Prompts%20Documentation/KOHLER_AI_Prompts_System_Instructions_Workflows.pdf)** |
| **3. Video Walkthrough** | Demonstration of the 3D space planner and generative AI recommendation engine | 🎥 **[Video Walkthrough Documentation](https://drive.google.com/file/d/1vVP5rxCmPCvOuHhnpTg0Nj-afXY2-TSL/view?usp=sharing)** |
| **4. Presentation Deck** | Structured presentation deck on system approach, architecture, innovation, and business impact | 📊 **[Presentation Deck Summary](assets/Presentation%20Deck/KOHLER_AI_Bathroom_Designer.pptx)** |
##
### 📁 Repository Structure
##
```text
kohler-ai-bathroom-designer/
├── assets/                       # Official Submission Deliverables & Media
│   ├── Prompts Documentation/    # Comprehensive AI system prompts & Pareto workflows PDF
│   │   ├── KOHLER_AI_Prompts_System_Instructions_Workflows.pdf
│   │   └── README.md
│   ├── Video Demonstration/      # Direct walkthrough video link & demonstration summary
│   │   ├── VIDEO_LINK.txt        # Direct Google Drive video URL
│   │   └── README.md
│   └── Presentation Deck/        # Pitch & architecture presentation deck (PPTX)
│       ├── KOHLER_AI_Bathroom_Designer.pptx
│       └── README.md
├── components/                   # Modular HTML Component Partials (12 files)
│   ├── header.html               # Platform header, logo, currency selector, and investment counter
│   ├── workspace_nav.html        # Viewport switcher (3D/2D/Walk-in), clear room, dimensions, finishes
│   ├── canvas_container.html     # Three.js 3D WebGL canvas, HUD, dimension badges, compass
│   ├── catalog_drawer.html       # Categorized fixture dock & product drawer
│   ├── ai_modal.html             # Groq AI Assistant modal (Dual-mode, XAI explainability cards)
│   ├── dimensions_modal.html     # Parametric room envelope customizer (Width, Depth, Ceiling)
│   ├── finishes_modal.html       # Luxury stone, wood, and tile procedural surface selector
│   ├── bom_modal.html            # Consolidated quote & Bill of Materials (BOM) modal
│   ├── experience_center_modal.html # Kohler Experience Center locator & dealer RFQ modal
│   ├── studio_specifier_modal.html  # Studio Kohler B2B MEP architectural specifier sheet
│   ├── clearance_report_modal.html  # Detailed NKBA / ADA building code clearance report
│   └── about_modal.html          # KOHLER-MITWPU AI Research Lab challenge overview modal
├── public/                       # Static assets & client runtime
│   ├── css/styles.css            # Custom Kohler typography, glassmorphism, animations, scrollbars
│   ├── js/                       # Modular Client-Side JavaScript Engine (15 files)
│   │   ├── state.js              # Global application state, currency multipliers, raycaster
│   │   ├── materials.js          # Procedural PBR materials & texture canvas generators
│   │   ├── catalog.js            # Authentic Kohler product catalog specification database
│   │   ├── fixtures.js           # 3D procedural fixture geometry builders (Veil, Trace, Vive, Brazn, etc.)
│   │   ├── theme.js              # Dynamic theme transformation engine & palette coordinator
│   │   ├── room.js               # 3D architectural envelope builder (walls, floor, door, trim)
│   │   ├── interaction.js        # Fixture dragging, 3D selection, deletion, wall-snapping
│   │   ├── viewports.js          # 3D Orbit, 2D Floorplan, Walk-In camera perspectives & 2D CAD
│   │   ├── ui.js                 # Workflow controller, catalog drawer filters, and toasts
│   │   ├── ai_assistant.js       # Groq AI assistant controller, NLP parser, tier switching
│   │   ├── optimizer.js          # Client-side multi-objective combinatorial Pareto optimizer
│   │   ├── bom.js                # Multi-currency BOM table, Studio Kohler toggle, RFQ export
│   │   ├── storage_export.js     # Room presets, clear room, localStorage, layout export
│   │   ├── clearance.js          # NKBA / ADA clearance validation engine & 3D visualizer rings
│   │   └── app.js                # Circadian lighting, wet-wall system, animation loop & bootstrapper
│   ├── favicon.svg               # Title logo: crisp vector black 'K' favicon
│   ├── favicon.png               # High-resolution raster black 'K' favicon
│   ├── favicon.ico               # Legacy browser root favicon
│   ├── ai-bot-icon.png           # AI Assistant brand icon
│   ├── logo.png                  # Kohler AI Designer brand logo
│   └── index.html                # Assembled production SPA
├── index_template.html           # Master HTML template with component include directives
├── build.js                      # Automated component assembler compiling template into public/index.html
├── test_modular.js               # Comprehensive modular architecture & syntax verification test
├── server.js                     # Node.js Server (auto-builds components, Groq API, static serving)
├── ai_engine/                    # Modular Python AI Spatial Intelligence Engine
│   ├── __init__.py               # Package entry point & high-level exports
│   ├── catalog.py                # Authentic Kohler specs, dimensions & WaterSense metrics
│   ├── nlp_parser.py             # Regex & heuristic NLP intent extractor (dimensions, budget, theme)
│   ├── guardrails.py             # Meta Llama Prompt Guard 22M & safety sanitization
│   ├── clearance_validator.py    # NKBA / ADA building code clearance validator (21", 24", 15")
│   ├── optimizer.py              # Multi-objective Pareto bundle optimizer (O(1) auxiliary space)
│   └── groq_client.py            # Zero-dependency Groq Cloud LLM client (Llama 3.3 70B)
├── tests/                        # Automated Python unit test suite (9 test cases)
│   └── test_ai_engine.py         # Catalog, NLP, clearance & Pareto mathematical verification
├── main.py                       # Python CLI runner & HTTP API microservice
├── requirements.txt              # Zero-dependency Python specification (Standard Library only)
├── vercel.json                   # Vercel deployment routing & edge cache headers
├── package.json                  # Dependencies, test scripts & build lifecycle
├── package-lock.json             # Dependency lockfile
├── .env.example                  # Environment variable template for GROQ_API_KEY
├── .gitignore                    # Git exclusion rules
└── README.md                     # Comprehensive case study documentation
```
##
### 🔄 Basic Workflow
##

The end-to-end design lifecycle operates across 5 intuitive stages:

1. **Define Spatial Boundaries**:
   * Set room dimensions (Width, Depth, Ceiling Height) in metric or imperial units, or start with the default clean CAD room (10.5 ft × 9.2 ft / 3.2m × 2.8m).
   * Real-time parametric rebuilding automatically updates floor area, perimeter walls, baseboards, and entrance door.

2. **Specify AI Design Constraints**:
   * **Predefined Constraints Mode**: Adjust the budget slider (₹1.0L to ₹12.0L+), select a design theme (*Modern Minimalist*, *Classic Elegance*, *Architectural Zen*, *Luxury Spa*), and pick desired fixture priorities (*Toilet*, *Shower*, *Vanity*, *Mirror*).
   * **Natural-Language Prompt Mode**: Enter a freeform text or voice wishlist (e.g., *"Design a 12x9 ft luxury master bathroom with freestanding tub and black finishes under 6 lakhs"*).
   * Real-time NLP extracts dimensional and budget limits, validated against Meta Llama Prompt Guard 22M.

3. **Generate & Optimize Bundle (Groq AI & Pareto Engine)**:
   * Click **`⚡ Generate Optimized Kohler Bundle (Groq AI)`** to trigger spatial reasoning.
   * Multi-objective combinatorial Pareto optimizer ranks authentic Kohler fixtures by spatial clearance, budget allocation, theme synergy, and MEP wet-wall alignment.
   * Transparent Explainable AI (XAI) decision cards show exact fit metrics and rationale for each recommended product.

4. **Interactive 3D WebGL Space Planning**:
   * Fixtures are rendered with authentic geometric contours and procedural PBR materials.
   * Switch between **3D Orbit**, **2D Orthographic CAD Floorplan**, and **First-Person Walk-In** perspectives.
   * Drag, snap to walls, rotate 90°, or add/delete items directly from the categorized Kohler catalog dock.
   * Real-time NKBA / ADA clearance indicators and live MEP wet-wall alignment score update instantly without intrusive banners.
   * Customize ambiance with Circadian lighting (Day 5000K, Dusk 2700K, Night) and surface finishes (Calacatta, Marquina, Slate, Carrara, Teak).

5. **Consolidated Quote, BOM & Specification Export**:
   * Open the unified Bill of Materials (BOM) with real-time multi-currency pricing (**INR ₹**, **USD $**, **CAD $**).
   * Inspect the **Studio KOHLER Specifier Data Sheet** for MEP plumbing rough-in dimensions, supply lines, and electrical conduit specs.
   * Export the layout summary or request dealer RFQs for nearest Kohler Experience Centers.
##
### 💎 3 Multi-Tier Recommendation Suites (Pareto Frontiers)
##

Rather than forcing a single rigid layout, the multi-objective Pareto solver synthesizes 3 distinct design suites for every room envelope and budget:

| Design Suite | Target Archetype | Algorithmic Optimization Strategy | Primary Kohler Anchors |
|---|---|---|---|
| **1. Essential Value** | Budget-Conscious / High-ROI Renovations | **Max Cost Savings**: Allocates the lowest budget fraction while strictly enforcing 100% NKBA clearance compliance, skirted easy-clean ceramics, and WaterSense efficiency. | Reach™ Round-Front Skirted Toilet, Trace™ Integrated Vanity, Artifacts™ Faucets |
| **2. Signature Balanced** *(Default)* | Harmonious Space & Style Optimization | **Best Multi-Objective Pareto Optimal**: Achieves the peak composite fitness score (96–98/100) balancing spatial legroom, theme cohesion, and wet-wall MEP alignment. | Veil™ Intelligent Smart Toilet, Vive™ Integrated Vanity, Parallel™ Faucet, Statement™ Shower |
| **3. Masterpiece Luxury** | Grand Master Suites & Spa Sanctuaries | **Flagship Innovation & Luxury Tech**: Curates top-of-the-line Kohler smart innovations, sculpted vessel basins, and thermostatic multi-spray hydrotherapy without spatial compromise. | Veil™ Smart Toilet, Brazn™ Rectangular Vessel Sink, Composed™ Tall Faucet, Evok™ Freestanding Bath |
##
### 📊 Evaluation Criteria Alignment (100% Total Weightage)
##
| Evaluation Criteria | Weight | Implementation in this Solution |
|---|:---:|---|
| **Approach & Innovation** | **45%** | Dual-mode AI (Predefined & Natural-Language), NLP dimension & budget extraction, Meta Llama Prompt Guard 22M, multi-objective Pareto-scoring engine, and Explainable AI (XAI) transparent cards. |
| **Technical Execution** | **25%** | Client-side Three.js WebGL rendering, dynamic architectural envelope rebuilding, zero pricing discrepancy, real-time collision detection, and Vercel edge deployment with offline fallbacks. |
| **User Experience & Feasibility** | **20%** | Clean default empty room on load, 1-click Clear Room with automated dimension reset, manual generate trigger, unified quote BOM with multi-currency (INR, USD, CAD), and Studio Kohler specifier data sheet. |
| **Business & Sustainability Impact** | **10%** | Alignment with Kohler's water conservation initiatives (WaterSense annual savings, carbon offset tracking) and MEP plumbing wet-wall alignment optimization reducing labor costs. |

##
### 🚀 Architectural Breakdown & Key Innovations
##
### 1. Approach & Innovation (45% Weight)
* **Dual-Pathway AI Architecture**:
  * **Tab 1: Predefined Constraints**: Interactive dimension inputs (Width, Depth, Ceiling Height with live area calculation), budget slider (₹1.0L to ₹12.0L+), 4 curated themes, and 4 priority checkboxes (*Toilet*, *Shower*, *Vanity*, *Mirror*).
  * **Tab 2: Custom AI Prompt (Natural-Language)**: Freeform wishlist prompt supporting voice or text requests (e.g., *"Design a 14x10 ft master spa with a freestanding tub and teak vanity under 5 lakhs"*).
* **Real-Time NLP Intent Extraction**: Automatically detects room size dimensions, room types (*Powder Room*, *Master Spa*), and budget ceilings from raw natural text, generating dynamic preview badges before execution.
* **Enterprise Security (Meta Llama Prompt Guard 22M)**: Every customer prompt passes through `meta-llama/llama-prompt-guard-2-22m` on Groq Cloud to sanitize prompt injection, jailbreaks, and out-of-domain requests before entering the spatial reasoning model.
* **Multi-Objective Weighted Optimization**:
  Scores candidate configurations across physical and economic dimensions:
  $$\text{Composite Fitness} = 0.25 \cdot \text{SpatialFit} + 0.20 \cdot \text{BudgetFit} + 0.20 \cdot \text{ThemeFit} + 0.15 \cdot \text{Functionality} + 0.10 \cdot \text{Sustainability} + 0.10 \cdot \text{WetWallFit}$$
* **Explainable AI (XAI)**: Every recommended fixture displays transparent decision cards detailing **Spatial Fit** (clearance vs. NKBA minimum), **Budget Efficiency** (percentage allocation), **Theme Synergy**, and **Plumbing Rough-In**.
##
### 2. Technical Execution (25% Weight)
* **High-Performance 3D WebGL Engine (Three.js r128)**: Complete client-side rendering pipeline featuring procedural PBR textures, soft directional shadows, and responsive canvas resizing.
* **Dynamic Architectural Rebuilding**: Changing room width, depth, or ceiling height dynamically triggers `buildRoomArchitecture()`, reconstructing wall meshes, baseboards, floor tiles, and door geometry in real time.
* **Interactive Fixture Manipulation**: Drag fixtures along wall planes, rotate 90°, duplicate, or delete with instant bounding-box collision detection.
* **Single Source of Truth (Zero Pricing Discrepancy)**: The AI candidate bundle total and the 3D planner's live Investment counter strictly reference the same underlying catalog data (`customData`), guaranteeing $0 discrepancy.
* **Resilient Multi-Platform Hosting**: Configured for instant deployment on **Vercel** (`vercel.json` + `/public`), **GitHub Pages**, or a local **Node.js** HTTP server (`server.js`) with fail-safe offline fallbacks.
##
### 3. User Experience & Feasibility (20% Weight)
* **Default Clean Architectural Canvas**: Upon initial visit, users start with a clean, empty room (`placedProducts = []`, `Investment: ₹0`, `Theme: None`, `Wet-Wall: N/A`, `NKBA: 100% Pass`), mirroring professional CAD design workflows.
* **1-Click Reset to Default**: Clicking **`Clear Room`** clears all fixtures and **automatically restores room dimensions to the default 10.5 ft × 9.2 ft (3.2m × 2.8m)**.
* **Controlled Generation UX**: Selecting themes or typing prompts does not prematurely dump products onto the screen; recommendations appear **only upon clicking `⚡ Generate Optimized Kohler Bundle (Groq AI)`**.
* **Clean Typographic Branding & Favicon**: Features the authentic **THE BOLD LOOK OF KOHLER** brand lockup in the header and a crisp black 'K' title logo favicon.
* **Uninterrupted Pricing Readout**: Clean live investment pricing display with zero intrusive customized status boxes during fixture dragging and dropping.
* **Three Camera Perspectives**:
  * 🧊 **3D Orbit**: Smooth orbit controls, zoom in/out, and view reset.
  * 📐 **2D Floorplan**: Top-down orthographic architectural floorplan with dimensional grid.
  * 🚶 **First-Person Walk-In**: Human eye-level perspective inside the room.
* **Circadian Lighting & Surface Finishes**: Day (5000K), Dusk (2700K), and Night Ambiance with glowing smart mirrors, plus procedural wall finishes (Calacatta, Marquina, Square) and floors (Slate, Carrara, Teak).
* **Consolidated KOHLER Design & Quote (BOM)**:
  * Multi-currency support (**INR ₹**, **USD $**, **CAD $**).
  * Bill of Materials table with SKU part numbers, quantities, and individual prices.
  * **Studio KOHLER Specifier Data Sheet**: Professional B2B architectural tables detailing rough-in dimensions (12" toilet rough-in, 1-1/4" P-trap, 1/2" NPT valves), conduit requirements, and certifications.
* **In-App Studio Specifier Modal**: Dedicated modal accessible from the top header summarizing challenge guidelines, criteria, and engineering specifications.
##
### 4. Business & Sustainability Impact (10% Weight)
* **Kohler Environmental Stewardship**: Integrated calculations based on Kohler WaterSense® and Katalyst® air-induction technologies (2.2M air bubbles/minute), displaying annual water savings in liters and equivalent carbon offset (kg CO₂e).
* **Plumbing Wet-Wall (MEP) Optimization**: Evaluates fixture alignment along the primary wet-wall stack, calculating a live alignment score (up to 94%) and projecting reduced plumbing labor and material costs.
* **Direct Commercial Feasibility**: Enables Kohler showrooms and B2B trade partners to accelerate customer consultation cycles from days to minutes.
##
### 🛁 Authentic Kohler Catalog Specifications (60 Genuine Products)
##
Every product model in the planner corresponds to an authentic, production Kohler catalog item across 6 showroom categories:

| # | Category | Product | SKU | Architectural & Design Specifications |
|:---:|---|---|---|---|
| **1** | Smart Toilet | Veil™ Smart One-piece Toilet | `K-5401IN-0` | Sculptural smart one-piece toilet with remote control, heated seat, and automatic bidet cleansing. |
| **2** | One-Piece Toilet | Reach™ One-piece Toilet | `K-3983IN-S-0` | One-piece round-front toilet with clean skirted trapway, dual flush top actuator, and quiet-close seat. |
| **3** | One-Piece Toilet | Ove™ One-Piece Toilet | `K-17688IN-SM-0` | Compact elongated one-piece toilet with Class Five flushing technology and skirted bowl. |
| **4** | Integrated Vanity | Trace™ Integrated Top and Basin | `K-30375IN-0` | 700 mm integrated vitreous china vanity top and basin with moisture-resistant vanity cabinet. |
| **5** | Integrated Vanity | Vive™ Integrated Top and Basin | `K-28782IN-0` | 720 mm contemporary integrated vanity top with seamless washbasin and soft-close storage drawer. |
| **6** | Vessel Basin | Brazn™ 58.4 cm Rectangular Vessel Sink | `K-21060IN-0` | Modernist architectural rectangular vessel sink inspired by Bauhaus geometry with razor-thin edges. |
| **7** | Semi-Recessed Basin | Forefront™ Square Semi-Recessed Basin | `K-11479IN-VC1-0` | Clean geometric semi-recessed basin projecting past the counter edge for effortless ergonomic wash reach. |
| **8** | Shower Door | New Trilogy™ 2000–2161 mm H Pivot Door | `K-704699IN-SHP` | Architectural 2.05m tall pivot shower door with 8 mm CleanCoat tempered glass and solid brass pivot hinges. |
| **9** | Showerhead | Statement™ Round Multifunction Showerhead | `K-26299IN-CP` | Statement round multifunction showerhead delivering Full Coverage with Katalyst air-induction technology. |
| **10** | Freestanding Bath | Evok 2.0™ 1600 mm Acrylic Bathtub | `K-20935IN-0` | Seamless rectangular freestanding acrylic bathtub with ergonomic lumbar backrest and center toe-tap drain. |
| **11** | Smart Mirror | Ming™ 80 cm Lighted Mirror | `K-77115IN-NA` | 80 cm circular lighted smart mirror with proximity sensor, perimeter frosted LED halo, and defogger. |
| **12** | Lighted Mirror | Reve™ 1000 mm Lighted Mirror | `K-23268IN-NA` | 1000 mm rectangular luxury lighted mirror with integrated LED lighting border and touch dimmer control. |
| **13** | Single Faucet | Purist™ Single Control Lavatory Faucet | `K-14402IN-4A-CP` | Iconic architectural single-lever lavatory faucet with straight ergonomic spout and ceramic disc cartridge. |
| **14** | Pillar Tap | Parallel™ Pillar Tap | `K-23482IN-4-BV` | Precision-machined pillar tap with distinctive flat spout and knurled quarter-turn handle in Vibrant Brushed Bronze. |
| **15** | Widespread Faucet | Artifacts™ Widespread Sink Faucets | `K-72760T-CP` | Edwardian swan neck spout with dual porcelain-capped cross handles in polished chrome. |
| **16** | Tall Vessel Faucet | Composed™ Tall Single-handle Faucet | `K-73159IN-7-CP` | Tower vessel column with side joystick lever and flat horizontal spout, 1.2 GPM WaterSense. |
| **17** | Smart Toilet | Leap™ One-piece Round-front Smart Toilet | `K-28529IN-0` | Intelligent one-piece compact round-front smart toilet with personalized bidet wand, warm-air dryer, and wireless remote. |
| **18** | Smart Toilet | Innate™ One-piece Elongated Smart Toilet | `K-29777IN-0` | Architectural elongated smart toilet featuring dual-flush power, stainless steel cleansing wand, and ambient LED bowl nightlight. |
| **19** | One-Piece Toilet | KOHLER VIVE® One-piece Round-front Toilet | `K-33123IN-0` | Modern round-front one-piece toilet with smooth contoured bowl and high-efficiency 3.8/4.8L dual flush. |
| **20** | One-Piece Toilet | KOHLER VIVE® One-piece Round-front Toilet | `K-33124IN-S-0` | One-piece round-front toilet with skirted trapway design for effortless wiping and quiet-close slim seat. |
| **21** | Vessel Basin | Veil™ 16" Round Vessel Bathroom Sink | `K-20703-0` | Sensuous 16-inch circular vessel sink with flowing Supramic ceramic curves and ultra-thin 4mm rim profile. |
| **22** | Vessel Basin | Veil™ 38-1/2" Oval Vessel Bathroom Sink | `K-20705-0` | Extra-wide 38.5-inch organic oval statement vessel sink creating a striking luxury centerpiece in master suites. |
| **23** | Pedestal Basin | Veil™ 12-1/4" Pedestal Bathroom Sink | `K-20702-0` | Sculptural monolithic pedestal sink tapering organically from floor to basin with concealed floor waste coupling. |
| **24** | Vessel Basin | Veil™ 21" Oval Vessel Bathroom Sink | `K-20704-0` | 21-inch balanced oval vessel bathroom sink with flowing organic contours and stain-resistant glaze. |
| **25** | Semi-Recessed Basin | Ladena™ Semi-Recessed Bathroom Sink | `K-72907K-1-0` | Gracefully contoured rectangular semi-recessed sink with deep basin geometry and overflow channel. |
| **26** | Semi-Recessed Basin | Forefront™ Semi-Recessed Bathroom Sink | `K-98930X-1-0` | Architectural semi-recessed basin featuring crisp parallel lines, wide rear deck for faucet, and rounded basin interior. |
| **27** | Vessel Basin | Veil™ 59.9 cm Oval Vessel Bathroom Sink | `K-77171IN-0` | 60 cm asymmetric organic vessel sink crafted in high-performance Supramic material with concealed overflow. |
| **28** | Wall-Mount Faucet | Composed™ Wall-mount Lavatory Faucet | `K-73061T-7-BV` | Wall-mount single-control lavatory faucet with 200 mm reach spout in Vibrant Brushed Bronze. |
| **29** | Wall-Mount Faucet | Composed™ Wall-mount Bathroom Sink Faucet | `K-73061IN-4ND-CP` | Clean geometric wall-mounted faucet in Polished Chrome with minimal wall plate and aerated laminar stream. |
| **30** | Single Faucet | Composed™ Single-handle Bathroom Sink Faucet | `K-73050T-B7-BL` | Matte Black single-handle deck-mount faucet with pure geometric proportions and top lever control. |
| **31** | Single Faucet | Composed™ Single-handle Faucet with Joystick Handle | `K-73158T-4-RGD` | Rose Gold luxury single-control faucet featuring a precision side-joystick actuator for feather-touch regulation. |
| **32** | Single Faucet | Composed™ Single-handle Faucet | `K-73050-7-2MB` | Vibrant Brushed Moderne Brass single-control lavatory faucet with solid brass body and ceramic disc valve. |
| **33** | Single Faucet | Composed™ Single-handle Faucet, 4.5 LPM | `K-73050T-7GCH-TT` | Titanium finish ultra-efficient 4.5 LPM water-saving single-handle faucet engineered for LEED-certified green suites. |
| **34** | Wall-Mount Faucet | Composed™ 2-handle Wall-mounted Lavatory Faucet | `K-73067T-9ACH-BV` | Dual-handle three-hole wall-mount lavatory faucet with independent hot and cold cross valves in Brushed Bronze. |
| **35** | Tall Faucet | Composed™ Tall Single-handle Faucet | `K-73159T-B7-AF` | Vibrant French Gold tall tower faucet designed to provide generous clearance above elevated vessel basins. |
| **36** | Single Faucet | Aleo™ Single-handle Bathroom Sink Faucet | `K-72275IN-4ND-RGD` | Rose Gold sleek single-handle faucet with forward-angled spout and integrated coin-slot aerator. |
| **37** | Tall Faucet | Aleo™ Tall Single-handle Bathroom Sink Faucet | `K-72298IN-4ND-RGD` | Extended tower vessel faucet in Rose Gold with sculpted ergonomic handle and smooth water delivery. |
| **38** | Single Faucet | Hone™ Single Control Lav Faucet with Drain | `K-22534IN-4-CP` | Polished Chrome cylindrical single-control faucet with pop-up clicker drain and durable brass waterway. |
| **39** | Tall Faucet | ModernLife Edge™ Tall Single-handle Faucet | `K-25758IN-4ND-CP` | Ultra-slim architectural tall vessel faucet with razor-thin lever and crisp planar surfaces. |
| **40** | Wall-Mount Faucet Valve | Complementary™ Single-handle Wall-mount Faucet Valve | `K-5679IN-CP` | Solid brass concealed wall-mount rough-in valve with polished chrome decorative faceplate. |
| **41** | Shower Door | Elate™ 200 cm H Sliding Shower Door | `K-39061IN-SHP` | 120 cm wide 2-meter tall sliding glass shower door with oversized top rollers and Bright Polished Silver header. |
| **42** | Shower Door | New Trilogy™ 206.1 cm H Pivot Shower Door | `K-704796IN-2BL` | Matte Black framed pivot shower door standing 2.06m tall with heavy-duty 8mm tempered glass. |
| **43** | Shower Door | New Trilogy™ 2000 mm H Pivot Shower Door | `K-704702IN-SHP` | High-gloss silver pivot shower door with continuous magnetic catch and outward-opening clearance. |
| **44** | Shower Door | Contra™ 200 cm H Sliding Shower Door | `K-705116IN-SHP` | Frameless sliding shower enclosure with exposed stainless steel dual roller wheels and soft-cushion stops. |
| **45** | Shower Door | New Trilogy™ 200–216.1 cm H Pivot Shower Door | `K-704699IN-SHP` | 100 cm wide adjustable pivot shower door with full-length clear water seals and ergonomic towel bar handle. |
| **46** | Shower Door | Elate™ 200 cm H Sliding Shower Door | `K-39060IN-SHP` | 105 cm compact sliding shower door with smooth bypass action and low threshold for easy walk-in entry. |
| **47** | Shower Door | Contra™ 200–210 cm H Sliding Shower Door | `K-705115IN-SHP` | Adjustable height 200-210cm sliding shower door with CleanCoat hydrophobic surface protection. |
| **48** | Shower Door | New Levity™ 200 cm H Sliding Shower Door | `K-709076IN-CP` | Dual-sliding bypass glass shower door system with cushioned center guide and minimalist top track. |
| **49** | Shower Door | Singulier™ 200–212.1 cm H Pivot Shower Door | `K-708066IN-CP` | French architectural pivot shower door with integrated rise-and-fall hinge mechanism preventing seal drag. |
| **50** | Mirrored Cabinet | Archer™ 51 × 78.7 cm Mirrored Cabinet | `K-3073IN-NA` | 51x79 cm reversible mirrored cabinet with beveled glass door, 3 adjustable glass shelves, and rust-free aluminum body. |
| **51** | Vanity Cabinet | Forefront™ 90 cm Wall-hung Vanity Cabinet | `K-31601IN-E64` | 90 cm wall-hung floating vanity cabinet in Nordic Oak finish with full-extension soft-close dual drawers. |
| **52** | Vanity Cabinet | Foreward™ 75 cm Wall-hung Vanity Cabinet | `K-28741IN-RWP` | 75 cm contemporary timber wall-hung vanity with integrated finger-pull drawer fronts and plumbing cutout. |
| **53** | Vanity Cabinet | Forefront™ 60 cm Wall-hung Vanity Cabinet | `K-31602IN-E64` | 60 cm compact powder room floating vanity cabinet with deep bottom storage and moisture-resistant lacquer. |
| **54** | Lighted Mirror | ModernLife™ 51 × 101.8 cm Capsule Lighted Mirror | `K-37876IN-NA` | 51x102 cm pill-capsule vertical lighted mirror with diffuse perimeter glow, touch sensor, and anti-fog heating pad. |
| **55** | Lighted Mirror | Forefront™ Lite 72 × 65 cm Lighted Mirror | `K-29155IN-NA` | 72x65 cm rectangular backlit LED mirror providing uniform indirect task lighting for grooming. |
| **56** | Lighted Mirror | Forefront™ Lite 90 × 65 cm Lighted Mirror | `K-29156IN-NA` | 90x65 cm wide lighted mirror ideal for double vanities with 3000K/4000K dual-color circadian toggle. |
| **57** | Framed Mirror | Essential 60 × 120 cm Capsule Framed Mirror | `K-38367IN-BLL` | 60x120 cm elongated capsule mirror enclosed in a clean Matte Black anodized aluminum metal rim. |
| **58** | Framed Mirror | Essential 61.6 × 92.1 cm Arched Framed Mirror | `K-30637IN-BLL` | 62x92 cm classic Roman arch framed mirror with slender black profile and distortion-free copper-free backing. |
| **59** | Mirrored Cabinet | Embark™ Premium XL Arched Mirrored Cabinet | `K-56151IN-NA` | Architectural arched mirrored medicine cabinet featuring internal LED lighting, magnetic organizer bar, and double-sided mirror door. |
| **60** | Drop-in Bath | Ove™ 170 × 75 cm Drop-in Whirlpool Bath | `K-1709IN-K-0` | 170 cm drop-in hydrotherapy whirlpool bathtub with 6 adjustable hydromassage body jets and quiet-flow pump. |
##
### 🛠️ Tech Stack
##
* **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3, Tailwind CSS, Three.js (r128), FontAwesome 6 Pro
* **Node.js Web Server**: Node.js HTTP Server (`server.js`) with Groq Llama 3.3 proxy & Prompt Guard
* **Python AI Spatial Engine**: Python 3.8+ modular microservice & standalone CLI (`ai_engine/`, `main.py`)
* **AI Model Engine**: Groq Cloud API (`llama-3.3-70b-versatile`)
* **Security & Prompt Safety**: Meta Llama Prompt Guard 22M (`meta-llama/llama-prompt-guard-2-22m`)
* **Testing & Quality Assurance**: Python `unittest` suite (9 test cases, 100% pass rate in <5ms)
##
### 💻 Local Quickstart
##

### Prerequisites
* **Node.js** (v18 or higher installed)
* **Python** (v3.8 or higher installed)

### 1. Clone & Navigate
```bash
git clone https://github.com/krishbhensdadia21/kohler-ai-bathroom-designer.git
cd kohler-ai-bathroom-designer
```

### 2. Configure Environment (Optional)
If you have a Groq API key, copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your API key inside `.env`:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```
*(Note: If no API key is provided, the application runs seamlessly using its built-in offline multi-objective spatial intelligence engine.)*

### 3. Run the Live Web Application
```bash
node server.js
```

### 4. Open in Browser
Navigate to **`http://localhost:3000`** in any web browser.
##
### 📄 License & Attribution
##
This project is open-source under the **MIT License**. Genuine Kohler product models, names, and design trademarks are property of **Kohler Co.** Submitted for the **KOHLER-MITWPU AI Research Lab Program**.
