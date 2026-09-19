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
| **3. Video Walkthrough** | Demonstration of the 3D space planner and generative AI recommendation engine | 🎥 **[Video Walkthrough Documentation](https://drive.google.com/file/d/1JLduiibQigBj4lLsjb8qXYPyGb0GnuWj/view?usp=sharing)** |
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
### 🛁 Authentic Kohler Catalog Specifications
##
Every product model in the planner corresponds to an authentic, production Kohler catalog item:

| Category | Kohler Series | SKU | Key Architectural Specs |
|---|---|---|---|
| **Smart Toilet** | Veil™ Smart One-piece Toilet | `K-5401IN-0` | Flagship smart toilet with touchless dual flush, heated Quiet-Close seat, LED nightlight |
| **One-Piece Toilet** | Reach™ One-piece Toilet | `K-3983IN-S-0` | Skirted trapway, Class Five 4.8 LPF canister flush, compact ergonomic profile |
| **One-Piece Toilet** | Ove™ One-Piece Toilet | `K-17688IN-SM-0` | Sculptural French organic contours, dual flush 3/4.5 LPF, Quiet-Close slim seat |
| **Integrated Vanity** | Trace™ Integrated Top and Basin | `K-30375IN-0` | 700 mm seamless vitreous china top + basin with wall-hung soft-close cabinet & J-pull |
| **Integrated Vanity** | Vive™ Integrated Top and Basin | `K-28782IN-0` | 720 mm integrated vanity top with bevelled contours, dual drawers, and brass pull bar |
| **Vessel Basin** | Brazn™ 58.4 cm Rectangular Vessel Sink | `K-21060IN-0` | Splayed chamfered walls, knife-edge rim, slotted overflow, flush ceramic umbrella drain |
| **Semi-Recessed Basin** | Forefront™ Square Semi-Recessed Basin | `K-11479IN-VC1-0` | 413 mm square vitreous china basin with cantilevered front overhang on console shelf |
| **Shower Door** | New Trilogy™ 2000–2161 mm H Pivot Door | `K-704699IN-SHP` | 8 mm ultra-clear tempered glass with SHP high-polish pivot hinges and tubular handle |
| **Showerhead** | Statement™ Round Multifunction Showerhead | `K-26299IN-CP` | Katalyst® air-induction spray, Cloud spray, Deep Massage streams, MasterClean face |
| **Freestanding Bath** | Evok 2.0™ 1600 mm Acrylic Bathtub | `K-20935IN-0` | Seamless ergonomic double-ended soaking tub with center toe-tap drain & waste |
| **Smart Mirror** | Ming™ 80 cm Lighted Mirror | `K-77115IN-NA` | Circular frosted perimeter LED ring, hands-free proximity sensor, defogger pad |
| **Lighted Mirror** | Reve™ 1000 mm Lighted Mirror | `K-23268IN-NA` | Wide 100 cm rectangular mirror with dual lateral LED task light bars and touch dimmer |
| **Single Faucet** | Purist™ Single Control Lavatory Faucet | `K-14402IN-4A-CP` | Minimalist tubular spout with straight lever handle in polished chrome, 1.2 GPM |
| **Pillar Tap** | Parallel™ Pillar Tap | `K-23482IN-4-BV` | Faceted geometric pillar body in Brushed Bronze with quarter-turn ceramic valve |
| **Widespread Faucet** | Artifacts™ Widespread Sink Faucets | `K-72760T-CP` | Edwardian swan neck spout with dual porcelain-capped cross handles in chrome |
| **Tall Vessel Faucet** | Composed™ Tall Single-handle Faucet | `K-73159IN-7-CP` | Tower vessel column with side joystick lever and flat horizontal spout, 1.2 GPM |
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
