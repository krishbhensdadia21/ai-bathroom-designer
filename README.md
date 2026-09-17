# KOHLER AI Bathroom Designer & Planner 🛁✨
### *Track 1: Spatial AI Bathroom Designer & Interactive 3D Suite Planner*

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Three.js](https://img.shields.io/badge/3D%20Engine-Three.js%20WebGL-blue?style=for-the-badge&logo=threedotjs)](https://threejs.org/)
[![Groq AI](https://img.shields.io/badge/AI%20Engine-Groq%20Llama%203.3%2070B-orange?style=for-the-badge)](https://groq.com/)
[![Prompt Guard](https://img.shields.io/badge/Security-Meta%20Prompt%20Guard%2022M-red?style=for-the-badge)](https://huggingface.co/meta-llama/Prompt-Guard-86M)
[![NKBA Certified](https://img.shields.io/badge/Standards-NKBA%20%26%20ADA%20Clearance-emerald?style=for-the-badge)](https://nkba.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

## 🌟 Overview

The **KOHLER AI Bathroom Designer & Planner** is an interactive spatial AI design assistant engineered to take customer constraints (dimensions, budgets, aesthetic themes, and priority fixtures) and synthesize personalized, code-compliant Kohler bathroom suites. 

It combines **natural-language wishlist parsing**, **multi-objective Pareto optimization**, **automated NKBA / ADA building code clearance checks**, **MEP plumbing wet-wall cost optimization**, and **interactive 3D WebGL rendering** powered by **Groq AI** and secured by **Meta Llama Prompt Guard 22M**.

All fixtures and brassware in the planner represent **100% authentic, production models from Kohler Co.** (*The Bold Look of Kohler*).

---

## 📁 Project Folder Structure

```text
kohler-ai-bathroom-designer/
├── public/                       # Static public assets for Vercel CDN
│   ├── ai-bot-icon.png           # AI Assistant brand icon
│   └── logo.png                  # Kohler AI Designer brand logo
├── index.html                    # Single-Page Application (Three.js, UI, AI Modal, 3D Engine)
├── server.js                     # Node.js HTTP Backend (Groq API, Llama Guard, Offline Fallbacks)
├── vercel.json                   # Vercel deployment routing & static cache headers
├── package.json                  # Node dependencies & project metadata
├── package-lock.json             # Dependency lockfile
├── .env.example                  # Environment template for Groq API key
├── README.md                     # Comprehensive technical documentation
└── [asset images]                # UI screenshots & showcase renders
```

---

## 🚀 Key Features & Architectural Capabilities

### 1. Default Architectural Canvas (Clean Empty Room)
* **Pristine Initial State**: When users first open the application, they are greeted by a clean, empty architectural bathroom with neutral square wall tiles and slate flooring (`placedProducts = []`, `Investment: ₹0`, `Theme: None`, `Wet-Wall: N/A`).
* **1-Click Reset to Default**: Clicking **`Clear Room`** completely clears placed fixtures, resets the AI engine, and **automatically restores room dimensions to the default 10.5 ft × 9.2 ft (3.2m × 2.8m)**.

### 2. Dual-Mode AI Assistant
The AI Assistant provides two intuitive pathways for customers and interior designers:
* **Tab 1: Predefined Constraints**:
  * Precision room dimensions (Width, Depth, Ceiling Height with live area calculation).
  * Smooth budget limit slider (from ₹1.0L Essential to ₹12.0L+ Luxury).
  * 4 Curated Kohler Themes (*Minimalist Modern*, *Classic Luxury*, *Japanese Zen*, *Industrial Chic*).
  * Fixture inclusion toggles (*Toilet*, *Shower Enclosure*, *Vanity & Basin*, *Smart Mirror*).
* **Tab 2: Custom AI Prompt (Natural-Language)**:
  * Freeform natural-language prompt box with quick-inspiration tags.
  * **Real-time NLP Intent Detection**: Automatically detects room size keywords (e.g., *"15x10 ft"*, *"powder room"*, *"master spa"*) and budget constraints (e.g., *"under 2.5 lakh"*), displaying real-time preview badges.
* **Controlled Generation UX**: Selecting themes or typing prompts does not prematurely dump products onto the screen. Results appear **only when clicking `⚡ Generate Optimized Kohler Bundle`**.

### 3. Multi-Objective Bundle Optimization
Scores candidate configurations across four objective functions to select the highest-scoring Pareto-optimal bundle:
$$\text{Composite Score} = w_1 \cdot \text{SpatialFit} + w_2 \cdot \text{BudgetFit} + w_3 \cdot \text{WetWallFit} + w_4 \cdot \text{ThemeFit}$$
* **No Phantom Products**: When *Vanity & Basin* is selected, the complete vanity unit is placed without injecting unexpected, duplicate standalone faucets.
* **Explainable AI (XAI)**: Every recommended fixture features a 4-factor breakdown (Spatial Fit, Budget Allocation, Theme Synergy, and Plumbing Rough-In).
* **Zero Pricing Discrepancy**: The AI candidate bundle total and the 3D planner's live Investment counter are strictly synchronized to the single source of truth.

### 4. Interactive 3D WebGL Planner
* **Multiple Camera Modes**:
  * 🧊 **3D Orbit**: Smooth orbital camera navigation with damping and zoom controls.
  * 📐 **2D Floorplan**: Top-down orthographic architectural layout with dimensional grid.
  * 🚶 **First-Person Walk-In**: Human eye-level perspective inside the room.
* **Lighting & Circadian Ambiance**:
  * ☀️ **Daylight** (5000K)
  * 🌅 **Sunset Dusk** (2700K)
  * 🌙 **Night Ambiance** with glowing smart mirrors and warm accent shadows.
* **Surface Finishes & Customization**: Customizable luxury wall surfaces (Travertine, Calacatta Gold Marble, Hinoki Wood Slats, Concrete) and flooring options.

### 5. Automated Building Code & MEP Validation
* **NKBA / ADA Compliance Visualizer**:
  * Validates $\ge 21"$ clearance in front of toilets and vanities, $\ge 24"$ in front of shower entrances, and 15" centerline distance from walls.
  * Visual green/red floor clearance boxes with live compliance badges (**NKBA: 100% Pass**).
* **Plumbing Wet-Wall Optimization**:
  * Evaluates fixture alignment along the primary wet-wall stack.
  * Displays a live alignment percentage and estimated plumbing labor cost savings.

### 6. Unified KOHLER Design & Quote (BOM)
* Consolidates Bill of Materials (BOM), SKU part numbers, and live list prices.
* Multi-currency support (**INR ₹**, **USD $**, **CAD $**).
* **Studio KOHLER B2B Specifier Sheet**: Provides exact rough-in dimensions (12" toilet rough-in, 1-1/4" P-trap, 1/2" NPT valves), electrical requirements, and WaterSense compliance metrics.
* **KDX WhatsApp AI Concierge**: 1-click handoff to authorized Kohler Experience Centers with pre-formatted project specifications.

---

## 🛁 Authentic Kohler Product Catalog

Every fixture used in the planner corresponds to an authentic Kohler catalog SKU:

| Category | Kohler Series | SKU | Key Architectural Specs |
|---|---|---|---|
| **Smart Toilet** | Veil® One-Piece | `K-5401IN-0` | Touchless dual flush (0.8/1.28 GPF), UV bidet wand, heated seat |
| **Wall-Hung Toilet** | Reach™ In-Wall | `K-77701IN-0` | Concealed in-wall carrier, saves 8–10" floor space |
| **Classic Toilet** | Memoirs® Stately | `K-3983IN-0` | AquaPiston® 360° canister flush, crown molding profile |
| **Dual Vanity** | Tailored® 60" | `K-99539-LG` | Solid hardwood, Silestone® quartz top, dual Ladena undermount sinks |
| **Single Vanity** | Jacquard® 36" | `K-99507IN-0` | Transitional shaker profile, moisture-resistant finish, slow-close drawers |
| **Zen Console** | Brazn™ Console | `K-21057-0` | Minimalist Bauhaus black steel frame with ceramic vessel basin |
| **Shower Enclosure** | Revel® Glass Box | `K-706015 / K-76465` | 5/16" CleanCoat® glass, HydroRail® column & Katalyst rainhead |
| **Multifunction Shower** | Statement® Rainhead | `K-26292IN-CP` | Katalyst® air-induction spray (2.2M air bubbles/min) |
| **Freestanding Bath** | Evok® Oval Tub | `K-1130IN-0` | Seamless high-gloss acrylic, ergonomic lumbar recline, toe-tap drain |
| **Smart Mirror** | Verdera® Voice | `K-99009IN-NA` | 2200K–5000K tunable circadian LED lighting, built-in defogger |

---

## 🛠️ Tech Stack

* **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Three.js (r128), FontAwesome 6 Pro
* **Backend**: Node.js HTTP Server (`server.js`)
* **AI Engine**: Groq Cloud SDK (`llama-3.3-70b-versatile`, `mixtral-8x7b-32768`)
* **AI Safety & Guardrails**: Meta Llama Prompt Guard 22M (`meta-llama/llama-prompt-guard-2-22m`)
* **Deployment**: Vercel (Configured via `vercel.json` and `/public`) & GitHub Pages ready

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
*(Note: If no API key is provided, the planner runs seamlessly with its built-in offline multi-objective spatial intelligence engine.)*

### 3. Run the Server
```bash
node server.js
```

### 4. Open in Browser
Navigate to **`http://localhost:3000`** in your browser.

---

## 🌐 Deploy to Vercel

1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Under **Environment Variables**, add:
   * `GROQ_API_KEY`: *(Your Groq API key)*
4. Click **Deploy**. Vercel will automatically serve static assets from `/public` and routes configured in `vercel.json`.

---

## 📄 License
This project is open-source under the **MIT License**. All Kohler product names, marks, and design geometries are property of **Kohler Co.**
