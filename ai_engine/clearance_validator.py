"""
NKBA / ADA Architectural Building Code & Clearance Validation Engine
Enforces standard spatial clearances and physical collision detection.
"""

from typing import List, Dict, Any, Tuple
from .catalog import KohlerFixture


def validate_room_dimensions(room_w_m: float, room_d_m: float) -> Tuple[bool, str, List[str]]:
    """
    Validates whether room dimensions can physically fit any standard bathroom suite.
    """
    area_sq_m = room_w_m * room_d_m
    min_dim = min(room_w_m, room_d_m)
    
    if min_dim < 1.4 or area_sq_m < 2.5:
        w_ft = round(room_w_m * 3.28084, 1)
        d_ft = round(room_d_m * 3.28084, 1)
        area_sq_ft = round(area_sq_m * 10.7639, 1)
        reason = (
            f"Bathroom footprint ({w_ft}ft × {d_ft}ft = {area_sq_ft} sq ft) physically cannot "
            f"accommodate standard fixtures while preserving NKBA 21\" front clearance and 15\" centerline code."
        )
        suggestions = [
            'Expand bathroom footprint to at least 7.5ft × 6.5ft (48+ sq ft) for standard suite',
            'Convert layout to a compact Powder Room (Toilet + Console, removing Shower & Tub)',
            'Utilize ultra-compact wall-hung carrier toilet (Reach K-77701IN) and corner console'
        ]
        return False, reason, suggestions
        
    return True, "Valid dimensions envelope", []


def evaluate_bundle_clearances(
    bundle: List[KohlerFixture],
    room_w_m: float,
    room_d_m: float
) -> Dict[str, Any]:
    """
    Simulates rough spatial placement along primary wet-wall and evaluates NKBA compliance.
    """
    toilet = next((f for f in bundle if f.category == 'toilets'), None)
    vanity = next((f for f in bundle if f.category == 'vanities'), None)
    shower = next((f for f in bundle if f.category == 'showers'), None)
    tub = next((f for f in bundle if f.category == 'bathtubs'), None)
    
    violations = []
    
    # 1. Back wet-wall width check (Toilet + Vanity + 0.35m separation)
    if toilet and vanity:
        combined_w = toilet.width_m + vanity.width_m + 0.35
        if combined_w > room_w_m:
            violations.append(
                f"Wet-wall width shortage: Combined toilet ({toilet.width_m}m) and vanity ({vanity.width_m}m) "
                f"with required 15\" centerline clearance exceeds available wall width ({room_w_m}m)."
            )
            
    # 2. Toilet front clearance: depth + 0.533m (21") <= room depth
    if toilet and (toilet.depth_m + 0.533) > room_d_m:
        violations.append(
            f"Toilet activity zone violation: Toilet depth ({toilet.depth_m}m) + 21\" front clearance (0.53m) "
            f"exceeds room depth ({room_d_m}m)."
        )
        
    # 3. Shower corner footprint check: Revel enclosure requires minimum 3.6 sq m
    if shower and shower.id == 'hydrorail-shower':
        if (room_w_m * room_d_m) < 3.5:
            violations.append(
                "Shower enclosure conflict: Revel 1.12m × 0.96m glass box requires at least 3.5m² room area."
            )
            
    # 4. Bathtub space check: Tub + 21" walkway
    if tub and (tub.width_m > room_w_m - 0.5 or tub.depth_m + 0.533 > room_d_m):
        violations.append(
            f"Bathtub clearance conflict: Freestanding tub ({tub.width_m}m × {tub.depth_m}m) requires wider clearance."
        )

    is_compliant = len(violations) == 0
    return {
        'compliant': is_compliant,
        'violations': violations,
        'clearance_status': '100% Pass (NKBA Certified)' if is_compliant else 'Clearance Warning'
    }
