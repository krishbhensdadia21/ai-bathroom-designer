# KOHLER AI Bathroom Designer & Planner 🛁✨

---

## 🏛️ Program & Challenge Overview

This project is submitted as an individual case study solution for the selection process of the **KOHLER-MITWPU AI Research Lab Program**.

* **Challenge Track**: **Track 1: KOHLER AI Bathroom Designer & Planner**
* **Core Objective**: Build an interactive AI design assistant that takes a customer's constraints (dimensions, budget limits, aesthetic themes, and device catalog specifications) and automates personalized product bundle recommendations.
* **Expected Outcome**: An intelligent recommendation engine that outputs optimized product combinations (smart toilets, vanities, thermostatic showers, mirrors, bathtubs) fitting exact physical space and budget parameters, accompanied by an interactive 3D WebGL and 2D CAD representation.
* **Submission Deadline**: September 20th, 2026 (11:59 PM IST)

---

## 📁 Repository Structure

```text
kohler-ai-bathroom-designer/
├── public/                       # Static assets for Vercel CDN deployment
│   ├── ai-bot-icon.png           # AI Assistant brand icon
│   └── logo.png                  # Kohler AI Designer brand logo
├── index.html                    # Core SPA (Three.js WebGL, UI, AI Modal & Spatial Engine)
├── server.js                     # Node.js Server (Groq Llama 3.3 API & Prompt Guard 22M)
├── vercel.json                   # Vercel deployment routing & edge cache headers
├── package.json                  # Dependencies & project metadata
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
  * Export options: Print quote, copy shopping list to clipboard, export RFQ JSON, and showroom RFQ submission.
* **In-App "About Program" Modal**: Dedicated modal accessible from the top header summarizing challenge guidelines, criteria, and deliverables.

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

## 📋 Mandatory Submission Deliverables Checklist

* **Deadline**: September 20th, 2026 (11:59 PM IST)
* **Format**: Single GitHub Repository Link

| Requirement | Description | Status |
|---|---|:---:|
| **1. Working Model** | Complete source code, local runner (`node server.js`), and Vercel edge deployment configuration. | ✅ **Included** |
| **2. Prompts Documentation** | Comprehensive documentation of all AI system prompts, NLP extraction heuristics, and Meta Prompt Guard filters. | ✅ **Documented** |
| **3. Video Demonstration** | 1–3 minute walkthrough demonstrating input constraints, Groq AI suite generation, 3D interaction, and BOM export. | ✅ **Link Ready** |
| **4. Presentation Deck** | 4-slide executive PDF deck highlighting core approach, system architecture, tech stack, and innovation pitch. | ✅ **Deck Ready** |

---

## 🛠️ Tech Stack

* **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3, Tailwind CSS, Three.js (r128), FontAwesome 6 Pro
* **Backend**: Node.js HTTP Server (`server.js`)
* **AI Model Engine**: Groq Cloud API (`llama-3.3-70b-versatile`)
* **Security & Prompt Safety**: Meta Llama Prompt Guard 22M (`meta-llama/llama-prompt-guard-2-22m`)
* **Deployment**: Vercel (`vercel.json` + `/public` CDN) & GitHub Pages compatible

---

## 💻 Local Quickstart

### Prerequisites
* **Node.js** (v18 or higher installed)

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

### 3. Run the Server
```bash
node server.js
```

### 4. Open in Browser
Navigate to **`http://localhost:3000`** in any web browser.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/new).
3. In **Environment Variables**, add:
   * `GROQ_API_KEY`: *(Your Groq API key)*
4. Click **Deploy**. Vercel will automatically serve the static assets from `/public` and route serverless requests via `vercel.json`.

---

## 📄 License & Attribution
This project is open-source under the **MIT License**. Genuine Kohler product models, names, and design trademarks are property of **Kohler Co.** Submitted for the **KOHLER-MITWPU AI Research Lab Program**.
