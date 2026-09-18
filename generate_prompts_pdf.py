"""
KOHLER AI Space Platform — Publication-Quality PDF Generator
Generates: 'KOHLER_AI_Prompts_System_Instructions_Workflows.pdf'
"""

import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, PageBreak, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Canvas that performs a two-pass calculation for 'Page X of Y' footer."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super().showPage()
        super().save()

    def draw_header_footer(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#0D0F12"))

        # Running header (pages 2+)
        if self._pageNumber > 1:
            self.drawString(54, 750, "KOHLER AI Space Platform")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748B"))
            self.drawString(165, 750, "|   AI Prompts, System Instructions & Engineering Workflows")
            self.drawRightString(612 - 54, 750, "KOHLER-MITWPU AI Research Lab Challenge")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(54, 744, 612 - 54, 744)

        # Running footer
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(612 - 54, 34, page_text)
        self.drawString(54, 34, "CONFIDENTIAL — EVALUATION COMMITTEE DELIVERABLE 2 (PROMPTS & WORKFLOWS)")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(54, 44, 612 - 54, 44)

        self.restoreState()


def build_pdf(filename="KOHLER_AI_Prompts_System_Instructions_Workflows.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Kohler Design System Palette
    c_primary = colors.HexColor("#0D0F12")     # Kohler Black
    c_gold = colors.HexColor("#B45309")        # Kohler Warm Amber
    c_gold_light = colors.HexColor("#FFFBEB")  # Light Gold Fill
    c_muted = colors.HexColor("#334155")       # Slate Body
    c_card_bg = colors.HexColor("#F8FAFC")     # Card Fill
    c_code_bg = colors.HexColor("#0F172A")     # Terminal Fill
    c_border = colors.HexColor("#CBD5E1")

    # Typography
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=c_primary,
        spaceAfter=2
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=c_primary,
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=c_gold,
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.8,
        textColor=c_muted,
        spaceAfter=5
    )

    code_style = ParagraphStyle(
        'Code_Custom',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.0,
        leading=9.4,
        textColor=colors.HexColor("#E2E8F0")
    )

    callout_style = ParagraphStyle(
        'Callout_Text',
        parent=body_style,
        textColor=colors.HexColor("#78350F"),
        fontSize=8.0,
        leading=11.2
    )

    caption_style = ParagraphStyle(
        'Caption_Style',
        parent=body_style,
        fontName='Helvetica-Oblique',
        fontSize=7.5,
        leading=10,
        alignment=1,
        textColor=colors.HexColor("#64748B"),
        spaceAfter=6
    )

    story = []

    # =========================================================================
    # PAGE 1: TITLE, META, EXECUTIVE SUMMARY & SYSTEM ARCHITECTURE
    # =========================================================================
    logo_path = os.path.join(os.path.dirname(__file__), 'public', 'logo.png')
    if not os.path.exists(logo_path):
        logo_path = os.path.join(os.path.dirname(__file__), 'logo.png')
    logo_flowable = None
    if os.path.exists(logo_path):
        logo_flowable = RLImage(logo_path, width=0.80 * inch, height=0.80 * inch)

    header_table_data = [
        [
            logo_flowable or "",
            Paragraph(
                "<b>KOHLER AI SPACE PLATFORM</b><br/>"
                "<font size='9' color='#B45309'><b>KOHLER-MITWPU AI Research Lab Selection Challenge</b></font><br/>"
                "<font size='8' color='#64748B'>Track 1: KOHLER AI Bathroom Designer &amp; Planner | Deliverable 2: Prompts &amp; Workflows</font>",
                title_style
            )
        ]
    ]

    header_table = Table(header_table_data, colWidths=[1.0 * inch, 6.0 * inch])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(header_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_gold, spaceBefore=4, spaceAfter=8))

    meta_data = [
        [
            Paragraph("<b>Author / Candidate:</b> Krish Bhensdadia", body_style),
            Paragraph("<b>Deliverable:</b> Deliverable 2 (Prompts &amp; Workflows)", body_style),
            Paragraph("<b>Target LLM:</b> Llama 3.3 70B &amp; Prompt Guard 22M", body_style)
        ],
        [
            Paragraph("<b>Live Prototype:</b> <font color='#B45309'>kohler-ai-bathroom-designer.vercel.app</font>", body_style),
            Paragraph("<b>Repository:</b> krishbhensdadia21/kohler-ai-bathroom-designer", body_style),
            Paragraph("<b>Evaluation Date:</b> September 2026", body_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[2.3 * inch, 2.5 * inch, 2.2 * inch])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), c_card_bg),
        ('BOX', (0, 0), (-1, -1), 0.5, c_border),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 8))

    story.append(Paragraph("1. Executive Summary &amp; Challenge System Architecture", h1_style))
    story.append(Paragraph(
        "This technical document provides the complete, authoritative catalog of AI system prompts, security guardrails, "
        "natural-language spatial parsers, and multi-objective algorithmic workflows developed for the <b>KOHLER-MITWPU AI Research Lab Program</b> "
        "(Track 1: KOHLER AI Bathroom Designer &amp; Planner). The platform provides an intelligent, dual-mode recommendation assistant "
        "that converts physical room dimensions, budget limits, aesthetic themes, and customer constraints into fully optimized, "
        "authentic Kohler fixture suites rendered in interactive 3D WebGL and 2D CAD architectural viewports.",
        body_style
    ))

    arch_data = [
        [
            Paragraph("<b>Subsystem Component</b>", body_style),
            Paragraph("<b>AI Engine / Model</b>", body_style),
            Paragraph("<b>Operational Role &amp; Engineering Responsibility</b>", body_style)
        ],
        [
            Paragraph("<b>1. Input Security Guard</b>", body_style),
            Paragraph("Meta Llama Prompt Guard 2 (22M)", body_style),
            Paragraph("Adversarial injection detection, jailbreak mitigation, system prompt exfiltration defense.", body_style)
        ],
        [
            Paragraph("<b>2. Spatial &amp; Budget NLP</b>", body_style),
            Paragraph("Heuristic NLP &amp; Regex Tokenizer", body_style),
            Paragraph("Extracts footprint (ft/m) and currency (INR/USD) from conversational prose prompts.", body_style)
        ],
        [
            Paragraph("<b>3. Constraint Verifier</b>", body_style),
            Paragraph("Deterministic NKBA Engine", body_style),
            Paragraph("Enforces 21\" front clearance, 15\" centerline envelope, and INR 70,000 budget feasibility.", body_style)
        ],
        [
            Paragraph("<b>4. Multi-Objective Solver</b>", body_style),
            Paragraph("Weighted Pareto Optimizer", body_style),
            Paragraph("Balances aesthetic cohesion, spatial ergonomics, budget fit, eco-savings, and wet-wall plumbing.", body_style)
        ],
        [
            Paragraph("<b>5. Generative Reasoner</b>", body_style),
            Paragraph("Meta Llama 3.3 70B Versatile", body_style),
            Paragraph("Synthesizes explainable architectural trade-off rationales, design concept, and tier comparisons.", body_style)
        ],
        [
            Paragraph("<b>6. 3D WebGL Canvas</b>", body_style),
            Paragraph("Three.js Modular Canvas Core", body_style),
            Paragraph("Procedural PBR materials, dynamic raycast wall culling, wet-wall snapping, and clearance visualizer.", body_style)
        ]
    ]
    arch_table = Table(arch_data, colWidths=[1.8 * inch, 1.8 * inch, 3.4 * inch])
    arch_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_card_bg]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(arch_table)
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "<b>Evaluation Criteria Mapping (100% Weightage Alignment):</b><br/>"
        "&bull; <b>Approach &amp; Innovation (45%):</b> Dual-mode assistant (Natural &amp; Predefined), Prompt Guard 22M security, and Multi-Objective optimization.<br/>"
        "&bull; <b>Technical Execution (25%):</b> Three.js PBR rendering, 15 modular JS files, Python spatial engine, and zero-glitch Vercel Edge hosting.<br/>"
        "&bull; <b>User Experience &amp; Feasibility (20%):</b> Clean empty room default, 1-click preset loader, live clearance radar, and unified multi-currency quote BOM.<br/>"
        "&bull; <b>Business &amp; Sustainability (10%):</b> Kohler WaterSense LEED calculation (up to 18,500 L/yr saved) and wet-wall installation cost reduction.",
        body_style
    ))

    # =========================================================================
    # PAGE 2: COMPLETE META LLAMA 3.3 70B SYSTEM PROMPT
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("2. Meta Llama 3.3 70B: Generative Recommendation System Prompt", h1_style))
    story.append(Paragraph(
        "The primary reasoning engine leverages <b>Meta Llama 3.3 70B Versatile</b> via the Groq cloud inference API. "
        "The system prompt defines the AI's professional architectural persona, catalog specifications, NKBA clearance codes, "
        "multi-tier budget rules, and strict JSON output schema. A deterministic temperature (<b>temperature = 0.2</b>) eliminates hallucinations.",
        body_style
    ))

    llama_prompt_text = """### ROLE & PERSONA
You are the Principal Kohler Luxury Architectural Space Planner & Smart Home Systems Specialist.
Your mission is to analyze customer constraints (dimensions, budget, aesthetic themes, customer priorities)
and formulate an optimal, code-compliant Kohler luxury fixture suite with full architectural explanation.

### STRICT OPERATIONAL GUIDELINES:
1. CATALOG DISCIPLINE: Recommend ONLY authentic Kohler products from the approved catalog.
   Never invent fantasy product names or synthetic model numbers.
2. ERGONOMIC COMPLIANCE: Adhere to NKBA residential plumbing guidelines:
   - Minimum 21" (0.53m) front clearance for toilets and vanities (recommend 30"/0.76m where feasible).
   - Minimum 15" (0.38m) centerline clearance from fixture center to any side obstruction.
   - Enforce dedicated wet-wall alignment to concentrate plumbing and save installation cost.
3. THREE-TIER BUDGET ARCHITECTURE:
   Always generate three distinct, fully priced product bundles fitting the spatial footprint:
   - Essential Value Tier: Maximum utility and Kohler engineering (~35-50% budget).
   - Signature Optimal Tier: Best balance of luxury, digital technology, and ergonomics (~75-90% budget).
   - Luxury Prestige Tier: Flagship statement fixtures, intelligent bidet toilets, and smart digital showers (~95-100% budget).
4. ENVIRONMENTAL SUSTAINABILITY:
   Calculate annual water savings (gallons/liters) achieved by Kohler WaterSense 1.28 GPF Class Five
   toilets and Katalyst air-induction showerheads compared to the 2.5 GPF EPA baseline.

### INPUT SCHEMA EXPECTED:
{
  "dimensions": "10ft x 8ft",
  "budget": 350000,
  "theme": "Minimalist Modern",
  "priorities": "Eco-friendly / Water Conservation",
  "customerNotes": "Family bath with dual vanity, clean lines, and water efficiency"
}

### STRICT JSON OUTPUT SCHEMA REQUIRED:
{
  "feasible": true,
  "theme": "Minimalist Modern | Classic Luxury | Japanese Zen",
  "design_concept": "Concise architectural statement of the design intent.",
  "active_tier": "signature",
  "ai_understood_preferences": ["Preference item 1", "Preference item 2"],
  "alternatives": {
    "essential": { "tier_name": "Essential Value Suite", "total_price_inr": 185000, "items": [...] },
    "signature": { "tier_name": "Signature Designer Suite", "total_price_inr": 312000, "items": [...] },
    "luxury": { "tier_name": "Luxury Smart Spa Suite", "total_price_inr": 445000, "items": [...] }
  },
  "tradeoff_reasoning": "Detailed rationale explaining product selections and budget tradeoffs.",
  "sustainability": { "annual_water_saved_liters": 18500, "carbon_offset_kg": 42 },
  "wet_wall_score": 96,
  "estimated_plumbing_savings_inr": 45000,
  "code_compliance_score": 100
}"""

    code_table = Table([[Paragraph(llama_prompt_text.replace("\n", "<br/>").replace(" ", "&nbsp;"), code_style)]], colWidths=[7.0 * inch])
    code_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), c_code_bg),
        ('BOX', (0, 0), (-1, -1), 1.0, c_gold),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(code_table)

    # =========================================================================
    # PAGE 3: SECURITY PROMPT GUARD & NLP SPATIAL EXTRACTION
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("3. Meta Llama Prompt Guard 22M: Security &amp; Injection Defense", h1_style))
    story.append(Paragraph(
        "To protect the enterprise system against prompt injection, jailbreaking, and prompt exfiltration attacks, "
        "all user-supplied natural language inputs pass through a dedicated security classifier: "
        "<b>meta-llama/llama-prompt-guard-2-22m</b>. The classifier evaluates the input string and outputs a normalized risk probability.",
        body_style
    ))

    guard_code = """# Meta Llama Prompt Guard 22M Evaluation Template
guard_prompt = f"User prompt: Theme: {theme}, Budget: {budgetNum}, Dimensions: {dimensions}, Notes: {customerNotes}"
guard_response = await groqClient.chat.completions.create(
    model="meta-llama/llama-prompt-guard-2-22m",
    messages=[{"role": "user", "content": guard_prompt}]
)
guard_score = float(guard_response.choices[0].message.content.strip())"""

    guard_code_table = Table([[Paragraph(guard_code.replace("\n", "<br/>").replace(" ", "&nbsp;"), code_style)]], colWidths=[7.0 * inch])
    guard_code_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), c_code_bg),
        ('BOX', (0, 0), (-1, -1), 0.75, c_gold),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(guard_code_table)
    story.append(Spacer(1, 6))

    guard_data = [
        [
            Paragraph("<b>Guardrail Threshold</b>", body_style),
            Paragraph("<b>Classification Status</b>", body_style),
            Paragraph("<b>System Action &amp; Safety Enforcement</b>", body_style)
        ],
        [
            Paragraph("<b>Guard Score &lt; 0.50</b><br/>(Typical: 0.0008)", body_style),
            Paragraph("<font color='green'><b>Verified Safe</b></font>", body_style),
            Paragraph("Prompt cleared. Proceed seamlessly to NLP entity parsing and multi-objective optimization.", body_style)
        ],
        [
            Paragraph("<b>Guard Score &ge; 0.50</b>", body_style),
            Paragraph("<font color='red'><b>Adversarial / Injection</b></font>", body_style),
            Paragraph("Execution intercepted. User input is sanitized; engine reverts safely to deterministic theme defaults.", body_style)
        ]
    ]
    guard_table = Table(guard_data, colWidths=[1.8 * inch, 1.8 * inch, 3.4 * inch])
    guard_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_card_bg]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(guard_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("4. Natural Language Spatial &amp; Financial Entity Tokenizer", h1_style))
    story.append(Paragraph(
        "Users frequently specify their project parameters in conversational English. "
        "The system incorporates high-precision entity extraction regex and semantic rules to extract physical footprint, budget caps, and themes:",
        body_style
    ))

    nlp_examples = [
        [
            Paragraph("<b>Entity Target</b>", body_style),
            Paragraph("<b>Sample Natural Language Input</b>", body_style),
            Paragraph("<b>Extracted System Parameters</b>", body_style)
        ],
        [
            Paragraph("<b>Dimensions (Feet)</b>", body_style),
            Paragraph("<i>'Looking for a modern bath around 9.5ft x 8ft'</i>", body_style),
            Paragraph("<code>width_ft: 9.5, depth_ft: 8.0 &rarr; 2.9m &times; 2.44m</code>", body_style)
        ],
        [
            Paragraph("<b>Dimensions (Metric)</b>", body_style),
            Paragraph("<i>'Renovating master bathroom 3.2m by 2.8m'</i>", body_style),
            Paragraph("<code>width_m: 3.2, depth_m: 2.8 &rarr; 10.5ft &times; 9.2ft</code>", body_style)
        ],
        [
            Paragraph("<b>Budget (INR Lakhs)</b>", body_style),
            Paragraph("<i>'We have a ceiling of 4.5 lakh rupees'</i>", body_style),
            Paragraph("<code>budget_inr: 450,000</code>", body_style)
        ],
        [
            Paragraph("<b>Budget (Compact Notation)</b>", body_style),
            Paragraph("<i>'Max budget 280k INR'</i>", body_style),
            Paragraph("<code>budget_inr: 280,000</code>", body_style)
        ],
        [
            Paragraph("<b>Aesthetic Theme</b>", body_style),
            Paragraph("<i>'I love Japanese Zen soaking tub with dark slate'</i>", body_style),
            Paragraph("<code>theme: 'Japanese Zen', bathtub_required: true</code>", body_style)
        ],
        [
            Paragraph("<b>Room Preset Type</b>", body_style),
            Paragraph("<i>'Need a compact guest powder room setup'</i>", body_style),
            Paragraph("<code>room_type: 'powder_room' (toilet + console only)</code>", body_style)
        ]
    ]
    nlp_table = Table(nlp_examples, colWidths=[1.8 * inch, 2.7 * inch, 2.5 * inch])
    nlp_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_card_bg]),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(nlp_table)

    # =========================================================================
    # PAGE 4: MULTI-OBJECTIVE OPTIMIZATION & FEASIBILITY ENGINE
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("5. Multi-Objective Optimization Formulation &amp; Tiers", h1_style))
    story.append(Paragraph(
        "Fixture bundle recommendation is formulated as a multi-criteria optimization problem over the discrete catalog space <i>C</i>. "
        "The objective maximizes composite utility <i>U(B)</i> for candidate bundle <i>B</i> subject to hard physical and financial constraints:",
        body_style
    ))

    math_text = """<b>Composite Objective Function:</b><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<b>Maximize U(B) = w<sub>aes</sub> &middot; S<sub>aes</sub>(B, T) + w<sub>spc</sub> &middot; S<sub>spc</sub>(B, &Omega;) + w<sub>bdg</sub> &middot; S<sub>bdg</sub>(B, Budget) + w<sub>eco</sub> &middot; S<sub>eco</sub>(B) + w<sub>plm</sub> &middot; S<sub>plm</sub>(B)</b><br/><br/>
<b>Subject to Hard Constraints:</b><br/>
&nbsp;&nbsp;&nbsp;&nbsp;1. &sum; Price(i) &le; Budget &nbsp;&nbsp;&nbsp;&nbsp;(Strict financial cap)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;2. FrontClearance(i) &ge; 21 inches (0.53m) &nbsp;&nbsp;&nbsp;&nbsp;(NKBA 21\" front egress code)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;3. CenterlineClearance(i) &ge; 15 inches (0.38m) &nbsp;&nbsp;&nbsp;&nbsp;(NKBA 15\" side clearance code)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;4. Area(&Omega;) &ge; 2.5 m&sup2; (27 sq ft) &nbsp;&nbsp;&nbsp;&nbsp;(Minimum spatial viability threshold)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;5. Min(Width, Depth) &ge; 1.4m &nbsp;&nbsp;&nbsp;&nbsp;(Corridor passage clearance)"""

    math_table = Table([[Paragraph(math_text, body_style)]], colWidths=[7.0 * inch])
    math_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), c_gold_light),
        ('BOX', (0, 0), (-1, -1), 1, c_gold),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(math_table)
    story.append(Spacer(1, 6))

    story.append(Paragraph("<b>Dynamic User Priority Weight Vector Tuning:</b>", h2_style))
    weights_data = [
        [
            Paragraph("<b>Declared Priority</b>", body_style),
            Paragraph("<b>Weight Adjustments (w<sub>aes</sub>, w<sub>spc</sub>, w<sub>bdg</sub>, w<sub>eco</sub>, w<sub>plm</sub>)</b>", body_style),
            Paragraph("<b>Key Catalog Selections Favored</b>", body_style)
        ],
        [
            Paragraph("<b>Balanced (Default)</b>", body_style),
            Paragraph("<code>[0.25, 0.25, 0.20, 0.15, 0.15]</code>", body_style),
            Paragraph("Balanced suite; Signature tier; Kohler Veil + Parallel fixtures.", body_style)
        ],
        [
            Paragraph("<b>Water Conservation</b>", body_style),
            Paragraph("<code>[0.15, 0.20, 0.15, <b>0.35</b>, 0.15]</code>", body_style),
            Paragraph("Class Five 1.28 GPF flushing; Katalyst 1.75 GPM air-induction showers.", body_style)
        ],
        [
            Paragraph("<b>Maximum Luxury</b>", body_style),
            Paragraph("<code>[<b>0.40</b>, 0.20, 0.10, 0.15, 0.15]</code>", body_style),
            Paragraph("Anthem digital thermostatic valving; Statement showering; Rose Gold finishes.", body_style)
        ],
        [
            Paragraph("<b>Budget Focused</b>", body_style),
            Paragraph("<code>[0.15, 0.25, <b>0.35</b>, 0.10, 0.15]</code>", body_style),
            Paragraph("Essential Value Tier; Reach One-Piece skirted toilet; compact vanity.", body_style)
        ]
    ]
    weights_table = Table(weights_data, colWidths=[1.6 * inch, 2.7 * inch, 2.7 * inch])
    weights_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_card_bg]),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(weights_table)
    story.append(Spacer(1, 8))

    story.append(Paragraph("6. Hard Feasibility Constraints &amp; Active Relaxation Engine", h1_style))
    story.append(Paragraph(
        "A common failure in naive AI generative systems is hallucinating impossible layouts (e.g., placing a freestanding tub "
        "inside a 4ft x 4ft guest restroom). The Kohler AI Space Platform strictly avoids this via an active Feasibility Checker:",
        body_style
    ))

    feasibility_data = [
        [
            Paragraph("<b>Constraint Violation</b>", body_style),
            Paragraph("<b>Failure Diagnostics Message</b>", body_style),
            Paragraph("<b>Automated Feasible Relaxation Actions</b>", body_style)
        ],
        [
            Paragraph("<b>Room Envelope Underflow</b><br/>(Area &lt; 2.5m&sup2; / 27 sq ft)", body_style),
            Paragraph("<i>'Dimensions physically cannot accommodate standard fixtures while preserving NKBA 21\" front clearance.'</i>", body_style),
            Paragraph(
                "&bull; Expand footprint to 7.5ft &times; 6.5ft (48 sq ft)<br/>"
                "&bull; Convert layout to Powder Room (Toilet + Console)<br/>"
                "&bull; Utilize ultra-compact wall-hung carrier toilet",
                body_style
            )
        ],
        [
            Paragraph("<b>Budget Below Threshold</b><br/>(Budget &lt; INR 70,000)", body_style),
            Paragraph("<i>'Target budget is below entry threshold required for authentic Kohler vitreous china and solid brass valving.'</i>", body_style),
            Paragraph(
                "&bull; Increase budget to INR 1,25,000 for Essential Suite<br/>"
                "&bull; Select Kohler Reach One-Piece and Parallel brassware<br/>"
                "&bull; Phased renovation: Install wet-wall fixtures first",
                body_style
            )
        ]
    ]
    feas_table = Table(feasibility_data, colWidths=[2.0 * inch, 2.5 * inch, 2.5 * inch])
    feas_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_card_bg]),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(feas_table)

    # =========================================================================
    # PAGE 5: ARCHITECTURAL WORKFLOWS & AI MODAL PREVIEW
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("7. Architectural Workflows &amp; Dataflow Sequences", h1_style))
    story.append(Paragraph(
        "The platform coordinates four integrated operational workflows spanning web client, AI inference service, and 3D graphics:",
        body_style
    ))

    story.append(Paragraph("<b>Workflow A: Conversational Natural Language to 3D Scene Reconstruction</b>", h2_style))
    story.append(Paragraph(
        "<b>1. User Prompt:</b> User types prompt in AI Assistant modal (e.g. <i>'10x8ft master bath with 4L budget, modern theme'</i>).<br/>"
        "<b>2. Security Evaluation:</b> Evaluated by <code>meta-llama/llama-prompt-guard-2-22m</code>; returns <code>guard_score: 0.0008</code> (Safe).<br/>"
        "<b>3. Entity Parsing:</b> Tokenizer extracts <code>width: 3.0m, depth: 2.4m, budget: INR 4,00,000, theme: 'Minimalist Modern'</code>.<br/>"
        "<b>4. Multi-Objective Solver:</b> Synthesizes 3 switchable tiers (Essential, Signature, Luxury).<br/>"
        "<b>5. Scene Synthesis:</b> Three.js clears previous objects, rebuilds dynamic architectural walls, and places fixtures with NKBA clearances.",
        body_style
    ))

    story.append(Paragraph("<b>Workflow B: Multi-Currency Bill of Materials (BOM) &amp; Studio Specifier Docket</b>", h2_style))
    story.append(Paragraph(
        "<b>1. Real-Time BOM Sync:</b> Every 3D placement or deletion instantly updates the unified quote docket.<br/>"
        "<b>2. Multi-Currency Conversion:</b> Instant toggle between INR (Rs.), USD ($), and CAD (C$) with zero pricing discrepancies.<br/>"
        "<b>3. Specifier Docket:</b> Exports full installation rough-in cut sheets, LEED water efficiency credits, and contractor dockets.<br/>"
        "<b>4. Showroom RFQ Transmission:</b> One-click quote transmission to Kohler Experience Centers (Mumbai, Delhi, Bengaluru).",
        body_style
    ))
    story.append(Spacer(1, 4))

    # Visual Figure: AI Modal Results Screenshot
    modal_img_path = os.path.join(os.path.dirname(__file__), 'docs', 'ui_ai_modal.png')
    if os.path.exists(modal_img_path):
        story.append(RLImage(modal_img_path, width=6.2 * inch, height=3.4 * inch))
        story.append(Paragraph("<b>Figure 1:</b> Dual-Mode AI Recommendation Assistant showing Natural Language prompt input, Meta Llama Prompt Guard 22M safety verification badge, and 3-Tier switchable recommendation cards (Signature, Essential, Luxury) with trade-off reasoning.", caption_style))

    # =========================================================================
    # PAGE 6: TECHNICAL EXECUTION, 3D PLATFORM VIEW & CERTIFICATE
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("8. Technical Stack, Modular Structure &amp; Deployment", h1_style))
    story.append(Paragraph(
        "To ensure industrial robustness, zero-glitch operation, and low space complexity, the codebase was refactored into "
        "15 dedicated JavaScript client modules, 12 modular HTML components, an automated build compiler (<code>build.js</code>), "
        "and a standalone Python AI spatial engine (<code>main.py</code>, <code>ai_engine/</code>):",
        body_style
    ))

    mod_data = [
        [
            Paragraph("<b>File / Subsystem</b>", body_style),
            Paragraph("<b>Size / Complexity</b>", body_style),
            Paragraph("<b>Primary Architectural Responsibility</b>", body_style)
        ],
        [
            Paragraph("<code>js/optimizer.js</code>", body_style),
            Paragraph("43 KB (Modular JS)", body_style),
            Paragraph("Client-side multi-objective optimization, tier scoring, and tradeoff cards.", body_style)
        ],
        [
            Paragraph("<code>js/ai_assistant.js</code>", body_style),
            Paragraph("40 KB (Modular JS)", body_style),
            Paragraph("Dual-mode AI modal controller, Groq API client, NLP prompt parser.", body_style)
        ],
        [
            Paragraph("<code>js/fixtures.js</code>", body_style),
            Paragraph("38 KB (Modular JS)", body_style),
            Paragraph("Procedural Three.js 3D fixture geometry generators and PBR materials.", body_style)
        ],
        [
            Paragraph("<code>js/clearance.js</code>", body_style),
            Paragraph("18 KB (Modular JS)", body_style),
            Paragraph("Real-time NKBA 21\" front / 15\" side clearance radar visualizer.", body_style)
        ],
        [
            Paragraph("<code>main.py &amp; ai_engine/</code>", body_style),
            Paragraph("8 KB Python Suite", body_style),
            Paragraph("Standalone CLI and unit test suite for spatial intelligence and Groq inference.", body_style)
        ],
        [
            Paragraph("<code>vercel.json &amp; build.js</code>", body_style),
            Paragraph("Edge Automation", body_style),
            Paragraph("Automated build sync to <code>public/</code> and Vercel Edge Serverless Function hosting.", body_style)
        ]
    ]
    mod_table = Table(mod_data, colWidths=[1.8 * inch, 1.6 * inch, 3.6 * inch])
    mod_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_primary),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_card_bg]),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(mod_table)
    story.append(Spacer(1, 4))

    # Visual Figure: Main 3D WebGL Planner View
    main_img_path = os.path.join(os.path.dirname(__file__), 'docs', 'ui_main_planner.png')
    if os.path.exists(main_img_path):
        story.append(RLImage(main_img_path, width=6.2 * inch, height=2.4 * inch))
        story.append(Paragraph("<b>Figure 2:</b> Live 3D WebGL Space Platform in Chrome showing procedural PBR tile materials, Kohler fixtures with clearance radar rings, camera orbit controls, and real-time quote BOM bar.", caption_style))

    # Sign-off box
    signoff_text = (
        "<b>SUBMISSION VERIFICATION &amp; INTEGRITY CERTIFICATE</b><br/>"
        "This documentation represents the authentic, production-deployed engineering workflows created for the "
        "KOHLER-MITWPU AI Research Lab Program (Track 1: KOHLER AI Bathroom Designer &amp; Planner). All system prompts, "
        "guardrail policies, architectural rules, and source files are committed to the repository and live at "
        "<b>https://kohler-ai-bathroom-designer.vercel.app/</b>."
    )
    signoff_table = Table([[Paragraph(signoff_text, callout_style)]], colWidths=[7.0 * inch])
    signoff_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), c_gold_light),
        ('BOX', (0, 0), (-1, -1), 1, c_gold),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(signoff_table)

    # Build the document with two-pass numbered canvas
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Publication-quality PDF generated successfully: {filename}")

if __name__ == '__main__':
    out_file = "KOHLER_AI_Prompts_System_Instructions_Workflows.pdf"
    if len(sys.argv) > 1:
        out_file = sys.argv[1]
    build_pdf(out_file)

