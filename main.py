#!/usr/bin/env python3
"""
KOHLER AI Bathroom Designer & Planner — Main Python CLI & API Micro-Service
Track 1: KOHLER-MITWPU AI Research Lab Program
"""

import sys
import json
import argparse
from http.server import HTTPServer, BaseHTTPRequestHandler

# Ensure cross-platform UTF-8 terminal encoding on Windows
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from ai_engine import (
    KohlerAIOptimizer,
    GroqBathroomDesigner,
    extract_dimensions_from_prompt,
    extract_budget_from_prompt,
    extract_theme_from_prompt,
    extract_inclusions_from_prompt,
    KOHLER_CATALOG
)

# Standalone ASGI / WSGI application handler for serverless & cloud framework detection
def app(environ_or_scope, start_response=None, receive=None, send=None):
    """Top-level callable for serverless / ASGI / WSGI runtime detectors."""
    if callable(start_response):
        start_response("200 OK", [("Content-Type", "application/json; charset=utf-8")])
        return [b'{"status":"active","service":"AI Bathroom Designer Python Engine"}']
    async def asgi_handler(receive, send):
        await send({"type": "http.response.start", "status": 200, "headers": [[b"content-type", b"application/json"]]})
        await send({"type": "http.response.body", "body": b'{"status":"active","service":"AI Bathroom Designer Python Engine"}'})
    return asgi_handler(receive, send)


def run_cli(args):
    """Executes design suite generation in command-line mode."""
    designer = GroqBathroomDesigner()
    
    if args.prompt:
        print(f"[*] Processing Natural-Language Wishlist: \"{args.prompt}\"")
        dim = extract_dimensions_from_prompt(args.prompt)
        budget = extract_budget_from_prompt(args.prompt)
        theme = extract_theme_from_prompt(args.prompt)
        print(f"    - Extracted Dimensions: {dim['width_ft']}ft × {dim['depth_ft']}ft" if dim else "    - Dimensions: Default (10.5ft × 9.2ft)")
        print(f"    - Extracted Budget: ₹{budget['amount_inr']:,}" if budget else "    - Budget: Default")
        print(f"    - Inferred Theme: {theme}" if theme else "    - Theme: Default")

        result = designer.generate_recommendation(
            customer_notes=args.prompt,
            budget=args.budget or (budget['amount_inr'] if budget else 350000),
            theme=args.theme or (theme or 'Minimalist Modern')
        )
    else:
        inclusions = {
            'toilet': not args.no_toilet,
            'vanity': not args.no_vanity,
            'shower': not args.no_shower,
            'mirror': not args.no_mirror,
            'tub': args.tub,
            'faucet': args.faucet
        }
        result = designer.generate_recommendation(
            dimensions=f"{args.width} ft x {args.depth} ft",
            budget=args.budget,
            theme=args.theme,
            inclusions=inclusions
        )

    if args.json:
        print(json.dumps(result, indent=2))
        return

    print("\n" + "=" * 65)
    print(f" KOHLER AI BATHROOM PLANNER — OPTIMIZATION RESULTS")
    print("=" * 65)

    if not result.get('feasible'):
        print(f"\n[X] Feasibility: FAILED")
        print(f"    Reason: {result.get('failure_reason')}")
        print("\nRelaxation Suggestions:")
        for s in result.get('relaxation_suggestions', []):
            print(f"  • {s}")
        return

    print(f"\n[✓] Optimal Suite Status: FEASIBLE & CODE-COMPLIANT")
    print(f"    Selected Theme:     {result['theme']}")
    print(f"    Composite Fitness:  {result['fitness_score']} / 100")
    print(f"    Suite Investment:   ₹{result['total_price_inr']:,}  (${result['total_price_usd']:,} USD)")
    print(f"    WaterSense Savings: {result['water_savings_l']:,} Liters / Year")
    print(f"    Carbon Offset:      {result['carbon_offset_kg']} kg CO2e")

    print("\nObjective Function Scores:")
    for k, v in result['scores'].items():
        print(f"  • {k.replace('_', ' ').title():<20}: {v}/100")

    print("\nRecommended Kohler Product Bundle:")
    for idx, item in enumerate(result['bundle'], 1):
        print(f"\n  {idx}. {item['name']}")
        print(f"     SKU: {item['sku_code']} | Category: {item['category']} | Price: ₹{item['price_inr']:,}")
        exp = item.get('explainability', {})
        print(f"     [📐 Spatial]:  {exp.get('spatial_fit')}")
        print(f"     [💰 Budget]:   {exp.get('budget_fit')}")
        print(f"     [🎨 Theme]:    {exp.get('theme_fit')}")
        print(f"     [💧 Plumbing]: {exp.get('plumbing_fit')}")

    print("\n" + "=" * 65)


class PythonAiRequestHandler(BaseHTTPRequestHandler):
    """Lightweight HTTP API microservice serving /api/recommend."""

    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_GET(self):
        if self.path == '/api/catalog':
            self._set_headers(200)
            items = [{'id': f.id, 'sku': f.art, 'name': f.name, 'category': f.category, 'price_inr': f.price_inr} for f in KOHLER_CATALOG]
            self.wfile.write(json.dumps(items).encode('utf-8'))
        else:
            self._set_headers(200)
            self.wfile.write(json.dumps({'status': 'online', 'service': 'KOHLER AI Python Optimization Micro-Service'}).encode('utf-8'))

    def do_POST(self):
        if self.path in ['/api/recommend', '/api/groq/recommend']:
            content_len = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_len).decode('utf-8')
            try:
                payload = json.loads(post_body or '{}')
                designer = GroqBathroomDesigner()
                result = designer.generate_recommendation(
                    dimensions=payload.get('dimensions', '10.5 ft x 9.2 ft'),
                    budget=payload.get('budget_num', payload.get('budget', 350000)),
                    theme=payload.get('theme', 'Minimalist Modern'),
                    customer_notes=payload.get('customerNotes', payload.get('prompt', '')),
                    inclusions=payload.get('inclusions')
                )
                self._set_headers(200)
                self.wfile.write(json.dumps(result).encode('utf-8'))
            except Exception as e:
                self._set_headers(500)
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({'error': 'Not found'}).encode('utf-8'))


def main():
    parser = argparse.ArgumentParser(description="KOHLER AI Spatial Bathroom Designer (Track 1)")
    parser.add_argument('--prompt', type=str, help='Natural-language customer wishlist prompt')
    parser.add_argument('--theme', type=str, default='Minimalist Modern', help='Aesthetic Theme (e.g. Minimalist Modern, Classic Luxury, Japanese Zen, Industrial Chic)')
    parser.add_argument('--budget', type=int, default=350000, help='Target budget ceiling in INR')
    parser.add_argument('--width', type=float, default=10.5, help='Bathroom width in feet')
    parser.add_argument('--depth', type=float, default=9.2, help='Bathroom depth in feet')
    parser.add_argument('--no-toilet', action='store_true', help='Exclude toilet')
    parser.add_argument('--no-vanity', action='store_true', help='Exclude vanity & basin')
    parser.add_argument('--no-shower', action='store_true', help='Exclude shower')
    parser.add_argument('--no-mirror', action='store_true', help='Exclude mirror')
    parser.add_argument('--tub', action='store_true', help='Include freestanding bathtub')
    parser.add_argument('--faucet', action='store_true', help='Include separate standalone faucet')
    parser.add_argument('--json', action='store_true', help='Output raw JSON response')
    parser.add_argument('--serve', action='store_true', help='Start Python HTTP API micro-service')
    parser.add_argument('--port', type=int, default=5000, help='Port for HTTP API micro-service')

    args = parser.parse_args()

    if args.serve:
        server_address = ('', args.port)
        httpd = HTTPServer(server_address, PythonAiRequestHandler)
        print(f"[*] KOHLER AI Python Micro-Service running on http://localhost:{args.port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[!] Shutting down server...")
            httpd.server_close()
    else:
        run_cli(args)


if __name__ == '__main__':
    main()
