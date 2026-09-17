# KOHLER AI Bathroom Designer & Planner 🛁✨
### *Spatial AI Bathroom Designer & Interactive 3D Suite Planner*

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Three.js](https://img.shields.io/badge/3D%20Engine-Three.js%20WebGL-blue?style=for-the-badge&logo=threedotjs)](https://threejs.org/)
[![Groq AI](https://img.shields.io/badge/AI%20Engine-Groq%20Llama%203.3%2070B-orange?style=for-the-badge)](https://groq.com/)
[![Prompt Guard](https://img.shields.io/badge/Security-Meta%20Prompt%20Guard%2022M-red?style=for-the-badge)](https://huggingface.co/meta-llama/Prompt-Guard-86M)
[![NKBA Certified](https://img.shields.io/badge/Standards-NKBA%20%26%20ADA%20Clearance-emerald?style=for-the-badge)](https://nkba.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

## 🌟 Overview

The **KOHLER AI Bathroom Designer & Planner** is an interactive spatial design assistant engineered to take user constraints (room dimensions, budget ceiling, aesthetic themes, and priority fixtures) and synthesize personalized, code-compliant Kohler bathroom suites. 

It combines **natural-language wishlist parsing**, **multi-objective Pareto optimization**, **automated NKBA / ADA building code clearance checks**, **MEP plumbing wet-wall cost optimization**, and **interactive 3D WebGL rendering** powered by **Groq AI (Llama 3.3 70B)** and secured by **Meta Llama Prompt Guard 22M**.

All fixtures and brassware in the planner represent **100% authentic, production models from Kohler Co.** (*The Bold Look of Kohler*).

---

## 📁 Repository Structure

```text
kohler-ai-bathroom-designer/
├── public/                       # Static public assets for Vercel CDN
│   ├── ai-bot-icon.png           # AI Assistant button brand icon
│   └── logo.png                  # Kohler AI Designer brand logo
├── index.html                    # Single-Page App (Three.js WebGL, UI & Spatial AI Engine)
├── server.js                     # Node.js Backend Server (Groq Llama 3.3 API, Prompt Guard 22M)
├── vercel.json                   # Vercel deployment routing & static cache headers
├── package.json                  # Node.js project metadata & dependencies
├── package-lock.json             # Dependency lockfile
├── .env.example                  # Environment variable template for GROQ_API_KEY
├── .gitignore                    # Git ignore rules
├── README.md                     # Technical documentation & project guide
├── ai-bot-icon.png               # Brand icon (root fallback)
└── logo.png                      # Brand logo (root fallback)
```

---

## 🚀 Implemented Features (100% Accurate to Codebase)

### 1. Default Architectural Canvas (Clean Empty Room)
* **Pristine Initial State**: When the app loads, it opens to a clean, empty architectural room (`placedProducts = []`, `Investment: ₹0`, `Theme: None`, `Wet-Wall: N/A`, `NKBA: 100% Pass`).
* **1-Click Reset to Default**: Clicking **`Clear Room`** clears all placed products, resets the AI engine, and **automatically restores room dimensions to the default 10.5 ft × 9.2 ft (3.2m × 2.8m)**.

### 2. Dual-Mode AI Assistant
The AI Assistant modal provides two distinct optimization pathways:
* **Tab 1: Predefined Constraints**:
  * Precision room dimensions (Width, Depth, Ceiling Height with live area calculation).
  * Smooth budget limit slider (from ₹1.0L Essential to ₹12.0L+ Luxury).
  * 4 Curated Kohler Themes (*Minimalist Modern*, *Classic Luxury*, *Japanese Zen*, *Industrial Chic*).
  * 4 Fixture inclusion toggles (*Toilet*, *Shower Enclosure*, *Vanity & Basin*, *Smart Mirror*).
* **Tab 2: Custom AI Prompt (Natural-Language)**:
  * Freeform natural-language prompt box with quick-inspiration tags.
  * **Real-time NLP Intent Detection**: Automatically detects room size keywords (e.g., *"15x10 ft"*, *"powder room"*, *"master spa"*) and budget constraints (e.g., *"under 2.5 lakh"*), displaying live preview badges.
* **Explicit Generation Trigger**: Changing themes, toggling checkboxes, or typing prompt notes updates configurations without prematurely dumping products onto the screen. Products appear **only when clicking `⚡ Generate Optimized Kohler Bundle (Groq AI)`**.

### 3. Multi-Objective Bundle Optimization & Exact Fixture Matching
* **Pareto Optimization**: Evaluates candidate configurations across Spatial Fit, Budget Allocation, Theme Synergy, and Plumbing Alignment.
* **Exact Fixture Selection**: Selecting *Vanity & Basin* adds the complete vanity unit with its integrated countertop basin and taps. No unselected extra standalone faucets are injected or billed.
* **Explainable AI (XAI)**: Every recommended fixture features transparent justifications covering Spatial Fit, Budget Efficiency, Theme Synergy, and Plumbing Rough-In.
* **Single Source of Truth Pricing**: The AI candidate bundle total and the 3D planner's live Investment counter are strictly synchronized with zero discrepancy.

### 4. Interactive 3D WebGL Planner (Three.js)
* **3 Camera View Modes**:
  * 🧊 **3D Orbit**: Orbital camera navigation with smooth damping, zoom in/out, and view reset.
  * 📐 **2D Floorplan**: Top-down orthographic architectural floorplan with dimensional grid.
  * 🚶 **First-Person Walk-In**: Human eye-level perspective inside the room.
* **Interactive Manipulation**: Select, drag along walls, rotate 90°, duplicate, or delete any fixture with instant bounding-box collision detection.
* **Snapping Tools**: Toggleable Grid Snap, Wall Snap, and Clearance Zone indicators.

### 5. Circadian Lighting & Luxury Surface Customization
* **Lighting Ambiance**:
  * ☀️ **Daylight** (Clean daylight sun & fill lighting)
  * 🌅 **Sunset Dusk** (Warm golden dusk ambiance)
  * 🌙 **Night Ambiance** (Dramatic night lighting with glowing LED smart mirror backlight)
* **Color Temperature Controls**: Quick Kelvin presets for **2700K**, **4000K**, and **5000K**.
* **Procedural Luxury Surfaces**:
  * **Walls**: Square ceramic tiles, Calacatta Gold marble, or Nero Marquina marble.
  * **Floors**: Dark architectural slate, Carrara marble, or Hinoki teak planks.

### 6. Automated Building Code & MEP Validation
* **NKBA / ADA Clearance Zone Visualizer**:
  * Enforces minimum clearances: $\ge 21"$ in front of toilets and vanities, $\ge 24"$ in front of shower entrances, and 15" centerline distance from walls.
  * Dynamic green/red floor clearance bounding boxes with live compliance badges (**NKBA: 100% Pass** / Code Conflict).
  * Comprehensive clearance report modal detailing observed vs. required clearances.
* **Plumbing Wet-Wall Optimization**:
  * Evaluates fixture alignment along the primary wet-wall stack.
  * Displays a live wet-wall alignment percentage and estimated plumbing labor cost savings.

### 7. Consolidated KOHLER Design & Quote (BOM)
* **Live Investment Counter**: Dynamic multi-currency pricing (**INR ₹**, **USD $**, **CAD $**).
* **Detailed Bill of Materials (BOM)**: Lists product names, Kohler catalog SKUs, individual item prices, quantities, and line totals.
* **Studio KOHLER Specifier Data Sheet**: Architectural specification table detailing rough-in dimensions (12" toilet rough-in, 1-1/4" P-trap, 1/2" NPT valves), electrical requirements, flow rates, and compliance certifications.
* **Actionable Export Tools**:
  * 🖨️ **Print Specification Sheet**
  * 📋 **Copy Shopping List to Clipboard**
  * 💾 **Export Kohler RFQ JSON**
  * 📍 **Showroom RFQ Submission**: Request a formal quotation from authorized Kohler Experience Centers (Mumbai, Delhi, Bengaluru, London, New York, Singapore).

---

## 🛁 Authentic Kohler Product Catalog

Every fixture used in the planner corresponds to an authentic Kohler catalog model:

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
* **Backend**: Node.js HTTP Server (`server.js`)
* **AI Engine**: Groq Cloud API (`llama-3.3-70b-versatile`)
* **AI Safety & Guardrails**: Meta Llama Prompt Guard 22M (`meta-llama/llama-prompt-guard-2-22m`)
* **Deployment**: Vercel (configured via `vercel.json` and `/public`) with GitHub Pages compatibility

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
Add your key inside `.env`:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```
*(Note: If no API key is provided, the planner runs seamlessly using its built-in offline multi-objective spatial intelligence engine.)*

### 3. Run the Server
```bash
node server.js
```

### 4. Open in Browser
Navigate to **`http://localhost:3000`** in your browser.

---

## 🌐 Deploy to Vercel

1. Push your repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Under **Environment Variables**, add:
   * `GROQ_API_KEY`: *(Your Groq API key)*
4. Click **Deploy**. Vercel will automatically serve the static assets from `/public` and route requests according to `vercel.json`.

---

## 📄 License
This project is open-source under the **MIT License**. Authentic Kohler product models, marks, and design geometries are property of **Kohler Co.**
