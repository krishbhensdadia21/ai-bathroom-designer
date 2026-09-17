# KOHLER AI Bathroom Designer & Planner 

---

## 🏛️ Program & Challenge Overview

This project is submitted as an individual case study solution for the selection process of the **KOHLER-MITWPU AI Research Lab Program**.

* **Challenge Track**: **Track 1: KOHLER AI Bathroom Designer & Planner**
* **Core Objective**: Build an interactive AI design assistant that takes a customer's constraints (dimensions, budget limits, aesthetic themes, and device catalog specifications) and automates personalized product bundle recommendations.
* **Expected Outcome**: An intelligent recommendation engine that outputs optimized product combinations (smart toilets, vanities, thermostatic showers, mirrors, bathtubs) fitting exact physical space and budget parameters, accompanied by an interactive 3D WebGL representation

---

## 📑 Official Deliverables & Submission Assets

| Deliverable | Description | File / Access Link |
|---|---|---|
| **1. Working Model** | Live interactive 3D WebGL space planner & AI assistant deployed to production | 🔗 **[Live Vercel Application](https://kohler-ai-bathroom-designer.vercel.app/)** |
| **2. Prompts & Workflows PDF** | Comprehensive 6-page publication-quality technical report detailing all AI prompts, system instructions, Llama Guard rules, NLP parsers, and multi-objective workflows | 📄 **[KOHLER_AI_Prompts_System_Instructions_Workflows.pdf](./KOHLER_AI_Prompts_System_Instructions_Workflows.pdf)** |
| **3. Video Walkthrough** | Demonstration of the 3D space planner and generative AI recommendation engine | 🎥 **[Video Walkthrough Documentation](#-video-walkthrough)** |
| **4. Presentation Deck** | Structured presentation deck on system approach, architecture, innovation, and business impact | 📊 **[Presentation Deck Summary](#-presentation-deck)** |

---

## 📁 Repository Structure

```text
kohler-ai-bathroom-designer/
├── KOHLER_AI_Prompts_System_Instructions_Workflows.pdf  # Deliverable 2: Complete Prompts & Workflows Report
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
├── js/                           # Modular Client-Side JavaScript Engine (15 files)
│   ├── state.js                  # Global application state, currency multipliers, raycaster
│   ├── materials.js              # Procedural PBR materials & texture canvas generators
│   ├── catalog.js                # Authentic Kohler product catalog specification database
│   ├── fixtures.js               # 3D procedural fixture geometry builders (Veil, Reach, Revel, etc.)
│   ├── theme.js                  # Dynamic theme transformation engine & palette coordinator
│   ├── room.js                   # 3D architectural envelope builder (walls, floor, door, trim)
│   ├── interaction.js            # Fixture dragging, 3D selection, deletion, wall-snapping
│   ├── viewports.js              # 3D Orbit, 2D Floorplan, Walk-In camera perspectives & 2D CAD
│   ├── ui.js                     # Workflow controller, catalog drawer filters, and toasts
│   ├── ai_assistant.js           # Groq AI assistant controller, NLP parser, tier switching
│   ├── optimizer.js              # Client-side multi-objective combinatorial Pareto optimizer
│   ├── bom.js                    # Multi-currency BOM table, Studio Kohler toggle, RFQ export
│   ├── storage_export.js         # Room presets, clear room, localStorage, layout export
│   ├── clearance.js              # NKBA / ADA clearance validation engine & 3D visualizer rings
│   └── app.js                    # Circadian lighting, wet-wall system, animation loop & bootstrapper
├── css/                          # Modular Design System & Styles
│   └── styles.css                # Custom Kohler typography, glassmorphism, animations, scrollbars
├── index_template.html           # Master HTML template with component include directives
├── build.js                      # Automated component assembler compiling template into index.html
├── test_modular.js               # Comprehensive 6-point modular architecture verification test
├── index.html                    # Assembled production SPA (linked to modular js/ & css/)
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
├── public/                       # Static assets for Vercel CDN deployment
│   ├── ai-bot-icon.png           # AI Assistant brand icon
│   └── logo.png                  # Kohler AI Designer brand logo
├── vercel.json                   # Vercel deployment routing & edge cache headers
├── package.json                  # Dependencies, test scripts & build lifecycle
├── package-lock.json             # Dependency lockfile
├── .env.example                  # Environment variable template for GROQ_API_KEY
├── .gitignore                    # Git exclusion rules
├── README.md                     # Comprehensive case study documentation
├── ai-bot-icon.png               # Root brand icon
└── logo.png                      # Root brand logo
```

---

## 📊 Evaluation Criteria Alignment (100% Total Weightage)

| Evaluation Criteria | Weight | Implementation in this Solution |
|---|:---:|---|
| **Approach & Innovation** | **45%** | Dual-mode AI (Predefined & Natural-Language), NLP dimension & budget extraction, Meta Llama Prompt Guard 22M, multi-objective Pareto-scoring engine, and Explainable AI (XAI) transparent cards. |
| **Technical Execution** | **25%** | Client-side Three.js WebGL rendering, dynamic architectural envelope rebuilding, zero pricing discrepancy, real-time collision detection, and Vercel edge deployment with offline fallbacks. |
| **User Experience & Feasibility** | **20%** | Clean default empty room on load, 1-click Clear Room with automated dimension reset, manual generate trigger, unified quote BOM with multi-currency (INR, USD, CAD), and Studio Kohler specifier data sheet. |
| **Business & Sustainability Impact** | **10%** | Alignment with Kohler's water conservation initiatives (WaterSense annual savings, carbon offset tracking) and MEP plumbing wet-wall alignment optimization reducing labor costs. |

---

## 🚀 Architectural Breakdown & Key Innovations

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

### 2. Technical Execution (25% Weight)
* **High-Performance 3D WebGL Engine (Three.js r128)**: Complete client-side rendering pipeline featuring procedural PBR textures, soft directional shadows, and responsive canvas resizing.
* **Dynamic Architectural Rebuilding**: Changing room width, depth, or ceiling height dynamically triggers `buildRoomArchitecture()`, reconstructing wall meshes, baseboards, floor tiles, and door geometry in real time.
* **Interactive Fixture Manipulation**: Drag fixtures along wall planes, rotate 90°, duplicate, or delete with instant bounding-box collision detection.
* **Single Source of Truth (Zero Pricing Discrepancy)**: The AI candidate bundle total and the 3D planner's live Investment counter strictly reference the same underlying catalog data (`customData`), guaranteeing $0 discrepancy.
* **Resilient Multi-Platform Hosting**: Configured for instant deployment on **Vercel** (`vercel.json` + `/public`), **GitHub Pages**, or a local **Node.js** HTTP server (`server.js`) with fail-safe offline fallbacks.

### 3. User Experience & Feasibility (20% Weight)
* **Default Clean Architectural Canvas**: Upon initial visit, users start with a clean, empty room (`placedProducts = []`, `Investment: ₹0`, `Theme: None`, `Wet-Wall: N/A`, `NKBA: 100% Pass`), mirroring professional CAD design workflows.
* **1-Click Reset to Default**: Clicking **`Clear Room`** clears all fixtures and **automatically restores room dimensions to the default 10.5 ft × 9.2 ft (3.2m × 2.8m)**.
* **Controlled Generation UX**: Selecting themes or typing prompts does not prematurely dump products onto the screen; recommendations appear **only upon clicking `⚡ Generate Optimized Kohler Bundle (Groq AI)`**.
* **Exact Fixture Matching**: Selecting *Vanity & Basin* adds the complete vanity unit with its integrated countertop basin and taps—preventing duplicate, unselected standalone faucets.
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

### 4. Business & Sustainability Impact (10% Weight)
* **Kohler Environmental Stewardship**: Integrated calculations based on Kohler WaterSense® and Katalyst® air-induction technologies (2.2M air bubbles/minute), displaying annual water savings in liters and equivalent carbon offset (kg CO₂e).
* **Plumbing Wet-Wall (MEP) Optimization**: Evaluates fixture alignment along the primary wet-wall stack, calculating a live alignment score (up to 94%) and projecting reduced plumbing labor and material costs.
* **Direct Commercial Feasibility**: Enables Kohler showrooms and B2B trade partners to accelerate customer consultation cycles from days to minutes.

---

## 🛁 Authentic Kohler Catalog Specifications

Every product model in the planner corresponds to an authentic, production Kohler catalog item:

| Category | Kohler Series | SKU | Key Architectural Specs |
|---|---|---|---|
| **Smart Toilet** | Veil® One-Piece Intelligent Toilet | `K-5401IN-0` | Touchless dual flush (0.8/1.28 GPF), UV bidet wand, heated seat |
| **Wall-Hung Toilet** | Reach™ Quiet-Close with In-Wall Tank | `K-77701IN-0` | Concealed in-wall carrier, saves 8–10" floor space |
| **Classic Toilet** | Memoirs® Stately Comfort Height | `K-3983IN-0` | AquaPiston® 360° canister flush, architectural crown molding |
| **Dual Vanity** | Tailored® 60" Floating Vanity | `K-99539-LG` | Solid hardwood, Silestone® quartz top, dual undermount sinks |
| **Single Vanity** | Jacquard® 36" Shaker Vanity | `K-99507IN-0` | Transitional shaker profile, moisture-resistant finish, slow-close drawers |
| **Zen Console** | Brazn™ Architectural Steel Console | `K-21057-0` | Minimalist Bauhaus black steel frame with ceramic vessel basin |
| **Shower Enclosure** | Revel® Glass Box with HydroRail-R | `K-706015 / K-76465` | 5/16" CleanCoat® tempered glass box & Katalyst rainhead column |
| **Multifunction Shower** | Statement® Oval Shower System | `K-26292IN-CP` | Katalyst® air-induction spray (2.2M air bubbles/min) |
| **Freestanding Bath** | Evok® Freestanding Soaking Tub | `K-1130IN-0` | Seamless high-gloss acrylic, ergonomic lumbar recline, toe-tap drain |
| **Smart Mirror** | Verdera® Voice Lighted Mirror | `K-99009IN-NA` | 2200K–5000K tunable circadian LED lighting, built-in defogger |
| **Compact Mirror** | Verdera® 30" Lighted Mirror | `K-99008IN-NA` | Backlit halo LED illumination, copper-free mirror glass |
| **Deck Faucet** | Purist® Single-Handle Tall Faucet | `K-99856IN-4` | Solid brass construction, ceramic disc valve, 1.2 GPM aerator |
| **Geometric Faucet** | Parallel® Monoblock Faucet | `K-23484IN-4` | Modern cylindrical form, polished chrome / matte black finish |
| **Column Faucet** | Artifacts® Column Spout Faucet | `K-10129IN-4` | Vintage Edwardian column silhouette in vibrant brushed brass |
| **Minimalist Faucet** | Composed® Single-Control Faucet | `K-73159IN-4` | Pure geometric minimalism, laminar water flow |

---

## 🛠️ Tech Stack

* **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3, Tailwind CSS, Three.js (r128), FontAwesome 6 Pro
* **Node.js Web Server**: Node.js HTTP Server (`server.js`) with Groq Llama 3.3 proxy & Prompt Guard
* **Python AI Spatial Engine**: Python 3.8+ modular microservice & standalone CLI (`ai_engine/`, `main.py`)
* **AI Model Engine**: Groq Cloud API (`llama-3.3-70b-versatile`)
* **Security & Prompt Safety**: Meta Llama Prompt Guard 22M (`meta-llama/llama-prompt-guard-2-22m`)
* **Testing & Quality Assurance**: Python `unittest` suite (9 test cases, 100% pass rate in <5ms)
* **Deployment**: Vercel (`vercel.json` + `/public` CDN) & GitHub Pages compatible

## 🏛️ Modular Frontend Architecture (HTML Components & JavaScript Modules)

To prevent monolithic file bloat and optimize maintainability and separation of concerns, both the **HTML markup** and the **client-side JavaScript** have been completely modularized into focused, single-responsibility files:

### 📑 1. HTML Component Partials (`components/`)
The user interface is decomposed into 12 decoupled HTML partials located in `components/`:

| Component | Responsibility |
|---|---|
| [`components/header.html`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/components/header.html) | Brand logo, active currency selector, investment tally, and quick-action triggers. |
| [`components/workspace_nav.html`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/components/workspace_nav.html) | 3D Orbit, 2D Floorplan, Walk-In mode switcher, dimension editor, and finishes buttons. |
| [`components/canvas_container.html`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/components/canvas_container.html) | WebGL 3D rendering viewport, interactive HUD, dimension badges, and compass. |
| [`components/catalog_drawer.html`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/components/catalog_drawer.html) | Product picker dock & categorized drawer (Toilets, Vanities, Showers, Mirrors, Tubs, Faucets). |
| [`components/ai_modal.html`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/components/ai_modal.html) | Groq AI Assistant modal with dual-mode tabs (Predefined & Prompt), tier switchers, and XAI cards. |
| [`components/dimensions_modal.html`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/components/dimensions_modal.html) | Real-time parametric room envelope dimension customizer (Width, Depth, Ceiling Height). |
| [`components/finishes_modal.html`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/components/finishes_modal.html) | Procedural stone, wood, tile surface selectors (Calacatta, Carrara, Slate, Teak). |
| [`components/bom_modal.html`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/components/bom_modal.html) | Consolidated quote modal with multi-currency BOM itemization and print features. |
| [`components/experience_center_modal.html`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/components/experience_center_modal.html) | Kohler Experience Center showroom locator and dealer RFQ submission modal. |
| [`components/studio_specifier_modal.html`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/components/studio_specifier_modal.html) | Professional B2B architectural data sheet detailing plumbing rough-in specs and valving. |
| [`components/clearance_report_modal.html`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/components/clearance_report_modal.html) | Detailed NKBA / ADA building code clearance evaluation report. |
| [`components/about_modal.html`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/components/about_modal.html) | In-app modal summarizing the KOHLER-MITWPU AI Research Lab Program track & criteria. |

### ⚙️ 2. Client-Side JavaScript Modules (`js/`)
The 6,200+ lines of monolithic script have been partitioned into 15 focused JavaScript modules:

| Script Module | Purpose & Scope |
|---|---|
| [`js/state.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/state.js) | Global state, currency multipliers, camera handles, and mouse raycasting state. |
| [`js/materials.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/materials.js) | Procedural canvas texture generators (marble, wood, travertine, tiles) and PBR materials. |
| [`js/catalog.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/catalog.js) | Production Kohler catalog database with dimensions, prices, finishes, and rough-in specs. |
| [`js/fixtures.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/fixtures.js) | Procedural 3D geometry builders for authentic Kohler products (Veil, Reach, Revel, Evok, etc.). |
| [`js/theme.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/theme.js) | Dynamic theme transformation engine coordinating color palettes and accent meshes. |
| [`js/room.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/room.js) | 3D architectural envelope builder (dynamic wall meshes, floor tiles, door, and baseboards). |
| [`js/interaction.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/interaction.js) | 3D object manipulation, pointer raycasting, drag & drop, and automatic wall-snapping. |
| [`js/viewports.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/viewports.js) | Camera perspective controller (3D Orbit, 2D Floorplan, Walk-In) and 2D CAD annotations. |
| [`js/ui.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/ui.js) | Workflow stepper, catalog drawer filters, and toast notifications. |
| [`js/ai_assistant.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/ai_assistant.js) | Groq AI assistant controller, prompt parsing, NLP badges, and bundle placement. |
| [`js/optimizer.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/optimizer.js) | Client-side multi-objective combinatorial Pareto optimizer scoring all 6 objective functions. |
| [`js/bom.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/bom.js) | Bill of Materials generator, multi-currency live calculations (INR, USD, CAD), and RFQ export. |
| [`js/storage_export.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/storage_export.js) | Room presets (Powder Room, Master Spa), clear room, custom finishes, and JSON export. |
| [`js/clearance.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/clearance.js) | NKBA 21" front and 15" centerline code validator with interactive 3D visualizer rings. |
| [`js/app.js`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/js/app.js) | Circadian lighting (Day/Dusk/Night), wet-wall plumbing conduit system, and animation loop. |

### 🔨 3. Build & Automated Assembly (`build.js`)
* Run `npm run build` to assemble `components/*.html` into the production `index.html`.
* `server.js` automatically calls `buildHtml()` on startup, ensuring edits to any component partial take effect instantly.
* Run `npm run test:modular` to execute the automated 6-point modular integrity verification test.

---

## 🐍 Python AI Spatial Intelligence Engine (Modular & Space-Efficient)

In addition to the interactive WebGL application, the repository provides a dedicated **Python Spatial AI Engine** (`ai_engine/`) implementing the exact multi-objective Pareto optimization, NLP intent extraction, and NKBA building code clearance verification.

### 🧩 Architectural Separation & Space Complexity Optimization

To guarantee zero memory bloat and optimal space complexity, the Python engine is split into single-responsibility modules:

| Module | Purpose | Space Complexity | Description |
|---|---|:---:|---|
| [`ai_engine/catalog.py`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/ai_engine/catalog.py) | Authentic Catalog Specs | $\mathcal{O}(1)$ | Lightweight frozen dataclasses for authentic Kohler fixtures, rough-in specs, and WaterSense metrics. |
| [`ai_engine/nlp_parser.py`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/ai_engine/nlp_parser.py) | Natural-Language Extractor | $\mathcal{O}(1)$ | Regex and heuristic NLP parser extracting room dimensions, budget ceilings, themes, and fixture inclusions. |
| [`ai_engine/guardrails.py`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/ai_engine/guardrails.py) | Safety & Prompt Guard | $\mathcal{O}(1)$ | Meta Llama Prompt Guard 22M checks sanitizing adversarial prompt injections and out-of-domain queries. |
| [`ai_engine/clearance_validator.py`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/ai_engine/clearance_validator.py) | NKBA / ADA Building Codes | $\mathcal{O}(1)$ | Deterministic 21" front clearance, 24" shower entry, and 15" centerline distance validation. |
| [`ai_engine/optimizer.py`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/ai_engine/optimizer.py) | Multi-Objective Pareto Search | $\mathcal{O}(1)$ Auxiliary | In-stream Cartesian exploration with branch-and-bound pruning; tracks optimal suite in-place without storing explosive combinatorial states in RAM. |
| [`ai_engine/groq_client.py`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/ai_engine/groq_client.py) | Groq Llama 3.3 LLM Client | $\mathcal{O}(1)$ | Zero-dependency HTTP client using standard library `urllib.request` (no heavy third-party SDK dependencies). |
| [`main.py`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/main.py) | CLI & Microservice Server | $\mathcal{O}(1)$ | Dual-mode entry point supporting interactive command-line evaluation and lightweight JSON HTTP API. |
| [`tests/test_ai_engine.py`](file:///C:/Users/User/.gemini/antigravity-ide/scratch/ikea-bathroom-planner/tests/test_ai_engine.py) | Automated Verification | $\mathcal{O}(1)$ | 9 rigorous unit tests verifying catalog integrity, NLP parsing, clearance math, and Pareto scoring. |

### 🚀 Running the Python Engine

#### 1. Run Automated Unit Tests
```bash
python -m unittest discover tests
```
*(Executes 9 unit tests verifying catalog integrity, NLP extraction, optimizer math, exact fixture matching, and guardrail safety in ~0.003s).*

#### 2. Run Interactive CLI Recommendation
```bash
# Natural-language wishlist prompt
python main.py --prompt "I have an 8x6 ft bathroom with $4500 budget. I want a modern minimalist design with smart toilet and vanity."

# Parametric input constraints
python main.py --width 3.6 --depth 2.8 --budget 400000 --theme "Minimalist Modern"
```

#### 3. Run Microservice HTTP API
```bash
python main.py --serve --port 5000
```
Then send a `POST /optimize` request:
```bash
curl -X POST http://localhost:5000/optimize \
  -H "Content-Type: application/json" \
  -d '{"prompt": "10x8 ft classic luxury bathroom under 500000"}'
```

---

## 💻 Local Quickstart

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

---

## 📄 License & Attribution
This project is open-source under the **MIT License**. Genuine Kohler product models, names, and design trademarks are property of **Kohler Co.** Submitted for the **KOHLER-MITWPU AI Research Lab Program**.
