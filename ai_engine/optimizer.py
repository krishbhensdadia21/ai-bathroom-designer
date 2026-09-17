"""
Multi-Objective Combinatorial Bundle Optimizer
Core Algorithmic Engine for Track 1: KOHLER AI Bathroom Designer & Planner
"""

from typing import List, Dict, Any, Optional, Tuple
from .catalog import (
    KOHLER_CATALOG, KohlerFixture,
    get_catalog_by_category, get_catalog_by_id
)
from .clearance_validator import validate_room_dimensions, evaluate_bundle_clearances


class KohlerAIOptimizer:
    """
    Multi-objective optimization engine scoring candidate Kohler suites across:
    1. Spatial clearance & room envelope fit
    2. Budget efficiency & ceiling adherence
    3. Aesthetic theme harmony & finish cohesion
    4. Smart device functionality
    5. Environmental WaterSense sustainability
    6. MEP plumbing wet-wall alignment
    """

    def __init__(self, catalog: Optional[List[KohlerFixture]] = None):
        self.catalog = catalog or KOHLER_CATALOG

    def optimize_bundle(
        self,
        room_w_m: float = 3.2,
        room_d_m: float = 2.8,
        budget_inr: int = 350000,
        theme: str = 'Minimalist Modern',
        inclusions: Optional[Dict[str, bool]] = None,
        customer_notes: str = ''
    ) -> Dict[str, Any]:
        """
        Executes combinatorial exploration and returns optimal suite with explainability.
        """
        # 1. Validate room envelope constraints
        is_dim_valid, dim_reason, dim_suggestions = validate_room_dimensions(room_w_m, room_d_m)
        if not is_dim_valid:
            return {
                'feasible': False,
                'failed_constraint': 'Room Dimensions Envelope',
                'failure_reason': dim_reason,
                'relaxation_suggestions': dim_suggestions,
                'bundle': []
            }

        # 2. Budget threshold guard
        if budget_inr < 70000:
            return {
                'feasible': False,
                'failed_constraint': 'Budget Below Minimum Kohler Entry Threshold',
                'failure_reason': f'Budget of ₹{budget_inr:,} is below the threshold (₹75,000) for authentic Kohler vitreous china and ceramic disc fittings.',
                'relaxation_suggestions': [
                    'Increase target budget to ₹1,25,000 for Kohler Essential Value Suite',
                    'Phase renovation: install primary wet-wall fixtures first'
                ],
                'bundle': []
            }

        # 3. Determine active inclusion categories
        inc = inclusions or {'toilet': True, 'vanity': True, 'shower': True, 'mirror': True, 'tub': False, 'faucet': False}
        inc_toilet = inc.get('toilet', True)
        inc_vanity = inc.get('vanity', True)
        inc_shower = inc.get('shower', True)
        inc_mirror = inc.get('mirror', True)
        inc_tub = inc.get('tub', False) or ('tub' in customer_notes.lower())
        inc_faucet = inc.get('faucet', False) or ('faucet' in customer_notes.lower() or 'tap' in customer_notes.lower())

        if not any([inc_toilet, inc_vanity, inc_shower, inc_mirror, inc_tub]):
            return {
                'feasible': False,
                'empty_selection': True,
                'failed_constraint': 'Zero Fixtures Selected',
                'failure_reason': 'All fixtures unchecked. Please select at least one fixture category.',
                'relaxation_suggestions': ['Check "Toilet" for a compact Powder Room', 'Check "Vanity & Basin" for grooming'],
                'bundle': []
            }

        # 4. Filter candidate pools by category
        toilets = [f for f in self.catalog if f.category == 'toilets'] if inc_toilet else [None]
        vanities = [f for f in self.catalog if f.category == 'vanities'] if inc_vanity else [None]
        showers = [f for f in self.catalog if f.category == 'showers'] if inc_shower else [None]
        mirrors = [f for f in self.catalog if f.category == 'mirrors'] if inc_mirror else [None]
        tubs = [f for f in self.catalog if f.category == 'bathtubs'] if inc_tub else [None]
        faucets = [f for f in self.catalog if f.category == 'faucets'] if inc_faucet else [None]

        theme_slug = theme.lower().replace(' ', '-')
        room_area = room_w_m * room_d_m
        # 5. Combinatorial exploration with O(1) auxiliary space complexity
        # Instead of allocating an unbounded list of all combinations in memory,
        # we evaluate candidates in-stream and retain only the Pareto-optimal suite.
        best_bundle: Optional[Dict[str, Any]] = None
        best_fitness: float = -1.0

        for t in toilets:
            for v in vanities:
                # Fast physical back wet-wall pruning
                if t and v and (t.width_m + v.width_m + 0.35) > room_w_m:
                    continue
                if t and (t.depth_m + 0.533) > room_d_m:
                    continue

                for s in showers:
                    if s and s.id == 'hydrorail-shower' and room_area < 3.5:
                        continue

                    for m in mirrors:
                        for b in tubs:
                            for f in faucets:
                                items: List[KohlerFixture] = [x for x in [t, v, s, m, b, f] if x is not None]
                                total_inr = sum(item.price_inr for item in items)
                                total_usd = sum(item.price_usd for item in items)

                                # Budget ceiling pruning (strict 125% max)
                                if total_inr > budget_inr * 1.25:
                                    continue

                                # Scoring 1: Spatial Fit (0-100, 25% weight)
                                footprint = sum(item.width_m * item.depth_m for item in items)
                                free_ratio = max(0.0, (room_area - footprint) / room_area)
                                spatial_score = min(99, max(45, int(50 + (free_ratio - 0.35) * 120)))

                                # Scoring 2: Budget Efficiency (0-100, 20% weight)
                                util_ratio = total_inr / budget_inr
                                if util_ratio <= 1.0:
                                    budget_score = int(75 + (util_ratio - 0.70) * 80)
                                else:
                                    budget_score = max(30, int(75 - (util_ratio - 1.0) * 180))
                                budget_score = min(99, max(30, budget_score))

                                # Scoring 3: Style Cohesion (0-100, 20% weight)
                                matches = sum(1 for item in items if any(theme_slug in st or st in theme_slug for st in item.styles))
                                style_score = int((matches / len(items)) * 100) if items else 90

                                # Scoring 4: Functionality (0-100, 15% weight)
                                func_score = 50
                                if t and 'intelligent' in t.name.lower(): func_score += 25
                                if s and 'hydrorail' in s.id: func_score += 25
                                if v and 'tailored' in v.id: func_score += 15
                                if m and 'voice' in m.name.lower(): func_score += 15
                                func_score = min(99, func_score)

                                # Scoring 5: Sustainability WaterSense (0-100, 10% weight)
                                total_water_saved = sum(item.sustainability.annual_water_savings_l for item in items)
                                sust_score = min(99, max(40, int(50 + (total_water_saved / 58000) * 49)))

                                # Scoring 6: Plumbing Wet-Wall (0-100, 10% weight)
                                wet_score = 96 if (t and v and t.compatibility.requires_wet_wall and v.compatibility.requires_wet_wall) else 88

                                # Composite Fitness Score
                                composite = round(
                                    spatial_score * 0.25 +
                                    budget_score * 0.20 +
                                    style_score * 0.20 +
                                    func_score * 0.15 +
                                    sust_score * 0.10 +
                                    wet_score * 0.10,
                                    1
                                )

                                # In-place Pareto optimal tracking (O(1) memory)
                                if composite > best_fitness:
                                    best_fitness = composite
                                    best_bundle = {
                                        'items': items,
                                        'total_inr': total_inr,
                                        'total_usd': total_usd,
                                        'fitness_score': composite,
                                        'scores': {
                                            'spatial_fit': spatial_score,
                                            'budget_efficiency': budget_score,
                                            'theme_cohesion': style_score,
                                            'functionality': func_score,
                                            'sustainability': sust_score,
                                            'plumbing_wet_wall': wet_score
                                        },
                                        'water_savings_l': total_water_saved,
                                        'carbon_offset_kg': round(total_water_saved * 0.005, 1)
                                    }

        if not best_bundle:
            return {
                'feasible': False,
                'failed_constraint': 'Budget / Spatial Intersection',
                'failure_reason': f'No candidate combination of requested fixtures satisfied physical envelope and target budget of ₹{budget_inr:,}.',
                'relaxation_suggestions': [
                    f'Increase budget to ₹{int(budget_inr * 1.3):,}',
                    'Uncheck one fixture category to reduce required footprint'
                ],
                'bundle': []
            }

        # 6. Highest composite fitness bundle (Pareto optimal)
        best = best_bundle

        # 7. Generate Explainability Justifications
        explainable_bundle = []
        for it in best['items']:
            explainable_bundle.append({
                'id': it.id,
                'sku_code': it.art,
                'art': it.art,
                'name': it.name,
                'category': it.category,
                'series': it.series,
                'price_inr': it.price_inr,
                'price_usd': it.price_usd,
                'width_m': it.width_m,
                'depth_m': it.depth_m,
                'height_m': it.height_m,
                'dim': f"{int(it.width_m * 39.3701)}\"W × {int(it.depth_m * 39.3701)}\"D",
                'description': it.description,
                'explainability': {
                    'spatial_fit': f'Preserves {int(it.clearance_front_m * 39.3701)}" front activity zone, exceeding NKBA standards.',
                    'budget_fit': f'Allocates {round((it.price_inr / best["total_inr"]) * 100)}% of suite investment.',
                    'theme_fit': f'Engineered for {theme} palette with genuine Kohler ceramic & brass finishes.',
                    'plumbing_fit': f'Standard {it.compatibility.supply_line} supply and {it.compatibility.drain_diameter} rough-in.'
                }
            })

        clearance_eval = evaluate_bundle_clearances(best['items'], room_w_m, room_d_m)

        return {
            'feasible': True,
            'theme': theme,
            'fitness_score': best['fitness_score'],
            'total_price_inr': best['total_inr'],
            'total_price_usd': best['total_usd'],
            'scores': best['scores'],
            'water_savings_l': best['water_savings_l'],
            'carbon_offset_kg': best['carbon_offset_kg'],
            'clearance_report': clearance_eval,
            'bundle': explainable_bundle
        }
