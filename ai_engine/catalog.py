"""
KOHLER Authentic Product Catalog & Specification Database
Part of the KOHLER AI Bathroom Designer & Planner (Track 1)
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any


@dataclass
class SustainabilitySpec:
    flow_rate_gpm: Optional[float] = None
    flush_gpf: Optional[float] = None
    watersense: bool = True
    annual_water_savings_l: int = 0
    epd_certified: bool = True
    recycled_content_pct: int = 0


@dataclass
class PlumbingCompatibility:
    requires_wet_wall: bool = True
    rough_in_inches: Optional[float] = None
    supply_line: str = '1/2" NPT'
    drain_diameter: str = '1-1/2" P-Trap'
    water_pressure_min_psi: int = 20
    electrical_req: Optional[str] = None


@dataclass
class KohlerFixture:
    id: str
    art: str
    name: str
    category: str
    series: str
    price_inr: int
    price_usd: int
    width_m: float
    depth_m: float
    height_m: float
    styles: List[str]
    sustainability: SustainabilitySpec
    compatibility: PlumbingCompatibility
    description: str
    clearance_front_m: float = 0.533  # NKBA 21" front minimum
    clearance_side_m: float = 0.381   # NKBA 15" centerline minimum


KOHLER_CATALOG: List[KohlerFixture] = [
    # ==================== TOILETS ====================
    KohlerFixture(
        id='veil-smart-toilet',
        art='K-5401IN-0',
        name='Veil® One-Piece Intelligent Toilet',
        category='toilets',
        series='Veil',
        price_inr=92000,
        price_usd=1250,
        width_m=0.43,
        depth_m=0.67,
        height_m=0.53,
        styles=['minimalist', 'minimalist-modern', 'zen', 'japanese-zen', 'luxury'],
        sustainability=SustainabilitySpec(flush_gpf=1.0, annual_water_savings_l=21900, recycled_content_pct=15),
        compatibility=PlumbingCompatibility(rough_in_inches=12.0, drain_diameter='3" Waste Line', electrical_req='220V/15A GFI'),
        description='Touchless dual flush (0.8/1.28 GPF), UV bidet wand, integrated heated seat and LED nightlight.'
    ),
    KohlerFixture(
        id='reach-wall-hung',
        art='K-77701IN-0',
        name='Reach™ Quiet-Close with In-Wall Carrier',
        category='toilets',
        series='Reach',
        price_inr=32000,
        price_usd=430,
        width_m=0.36,
        depth_m=0.54,
        height_m=0.40,
        styles=['minimalist', 'minimalist-modern', 'industrial', 'industrial-chic', 'compact'],
        sustainability=SustainabilitySpec(flush_gpf=1.1, annual_water_savings_l=18500, recycled_content_pct=20),
        compatibility=PlumbingCompatibility(rough_in_inches=12.0, drain_diameter='3" Waste Line'),
        description='Concealed in-wall carrier saves 8–10" of floor space, glazed trapway.'
    ),
    KohlerFixture(
        id='memoirs-stately-toilet',
        art='K-3983IN-0',
        name='Memoirs® Stately Comfort Height Toilet',
        category='toilets',
        series='Memoirs',
        price_inr=42000,
        price_usd=560,
        width_m=0.48,
        depth_m=0.72,
        height_m=0.79,
        styles=['classic', 'classic-luxury', 'traditional', 'heritage'],
        sustainability=SustainabilitySpec(flush_gpf=1.28, annual_water_savings_l=16200, recycled_content_pct=10),
        compatibility=PlumbingCompatibility(rough_in_inches=12.0, drain_diameter='3" Waste Line'),
        description='AquaPiston® 360° canister flush, architectural crown molding profile.'
    ),
    KohlerFixture(
        id='leap-smart-toilet',
        art='K-76625IN-0',
        name='Leap™ Modern Skirted One-Piece Toilet',
        category='toilets',
        series='Leap',
        price_inr=24500,
        price_usd=330,
        width_m=0.40,
        depth_m=0.69,
        height_m=0.72,
        styles=['minimalist', 'minimalist-modern', 'modern'],
        sustainability=SustainabilitySpec(flush_gpf=1.2, annual_water_savings_l=17500, recycled_content_pct=12),
        compatibility=PlumbingCompatibility(rough_in_inches=12.0, drain_diameter='3" Waste Line'),
        description='Seamless skirted trapway design with siphon jet high-efficiency flush.'
    ),

    # ==================== VANITIES ====================
    KohlerFixture(
        id='tailored-dual-vanity',
        art='K-99539-LG',
        name='Tailored® 60" Floating Vanity with Sinks',
        category='vanities',
        series='Tailored',
        price_inr=145000,
        price_usd=1950,
        width_m=1.52,
        depth_m=0.55,
        height_m=0.86,
        styles=['minimalist', 'minimalist-modern', 'luxury', 'modern'],
        sustainability=SustainabilitySpec(recycled_content_pct=30),
        compatibility=PlumbingCompatibility(drain_diameter='Twin 1-1/2" P-Trap'),
        description='Solid hardwood oak carcass, Silestone® quartz countertop with dual undermount ceramic basins.'
    ),
    KohlerFixture(
        id='jacquard-vanity',
        art='K-99507IN-0',
        name='Jacquard® 36" Transitional Shaker Vanity',
        category='vanities',
        series='Jacquard',
        price_inr=58000,
        price_usd=780,
        width_m=0.94,
        depth_m=0.54,
        height_m=0.86,
        styles=['classic', 'classic-luxury', 'transitional'],
        sustainability=SustainabilitySpec(recycled_content_pct=25),
        compatibility=PlumbingCompatibility(drain_diameter='1-1/2" P-Trap'),
        description='Transitional shaker profile, moisture-resistant finish with ceramic undermount basin and slow-close drawers.'
    ),
    KohlerFixture(
        id='brazn-console',
        art='K-21057-0',
        name='Brazn™ Minimalist Architectural Steel Console',
        category='vanities',
        series='Brazn',
        price_inr=72000,
        price_usd=980,
        width_m=0.86,
        depth_m=0.50,
        height_m=0.86,
        styles=['zen', 'japanese-zen', 'industrial', 'industrial-chic'],
        sustainability=SustainabilitySpec(recycled_content_pct=40),
        compatibility=PlumbingCompatibility(drain_diameter='1-1/2" Exposed P-Trap'),
        description='Bauhaus-inspired architectural steel frame, teak slatted lower shelf, and cylindrical ceramic vessel basin.'
    ),

    # ==================== SHOWERS ====================
    KohlerFixture(
        id='hydrorail-shower',
        art='K-76465IN-CP',
        name='Revel® Glass Box with HydroRail-R Column',
        category='showers',
        series='HydroRail',
        price_inr=54000,
        price_usd=720,
        width_m=1.12,
        depth_m=0.96,
        height_m=2.10,
        styles=['minimalist', 'minimalist-modern', 'classic', 'classic-luxury', 'zen', 'japanese-zen'],
        sustainability=SustainabilitySpec(flow_rate_gpm=1.75, annual_water_savings_l=26500),
        compatibility=PlumbingCompatibility(water_pressure_min_psi=45, supply_line='1/2" Copper/CPVC', drain_diameter='2" Shower Drain'),
        description='5/16" CleanCoat® tempered glass box, HydroRail-R arch column, 10" Katalyst rainhead and handshower.',
        clearance_front_m=0.610  # NKBA 24" entry minimum
    ),
    KohlerFixture(
        id='statement-shower',
        art='K-26292IN-CP',
        name='Statement® Oval Rainhead & Handshower System',
        category='showers',
        series='Statement',
        price_inr=48000,
        price_usd=640,
        width_m=0.90,
        depth_m=0.90,
        height_m=2.10,
        styles=['industrial', 'industrial-chic', 'minimalist', 'minimalist-modern'],
        sustainability=SustainabilitySpec(flow_rate_gpm=2.0, annual_water_savings_l=19800),
        compatibility=PlumbingCompatibility(water_pressure_min_psi=45, supply_line='1/2" NPT', drain_diameter='2" Shower Drain'),
        description='Katalyst® air-induction spray infusing 2.2M air bubbles per minute, thermostatic valve trim.',
        clearance_front_m=0.610
    ),

    # ==================== BATHTUBS ====================
    KohlerFixture(
        id='evok-bathtub',
        art='K-1130IN-0',
        name='Evok® 66" Freestanding Ergonomic Soaking Tub',
        category='bathtubs',
        series='Evok',
        price_inr=115000,
        price_usd=1550,
        width_m=1.68,
        depth_m=0.82,
        height_m=0.60,
        styles=['zen', 'japanese-zen', 'luxury', 'classic-luxury'],
        sustainability=SustainabilitySpec(annual_water_savings_l=0),
        compatibility=PlumbingCompatibility(drain_diameter='1-1/2" Center Toe-Tap Drain'),
        description='Seamless high-gloss acrylic casting, sloped lumbar support recline, slotted overflow.'
    ),

    # ==================== MIRRORS ====================
    KohlerFixture(
        id='verdera-mirror',
        art='K-99009IN-NA',
        name='Verdera® Voice Lighted Halo Smart Mirror',
        category='mirrors',
        series='Verdera',
        price_inr=38000,
        price_usd=510,
        width_m=1.02,
        depth_m=0.08,
        height_m=0.82,
        styles=['minimalist', 'minimalist-modern', 'classic', 'classic-luxury', 'zen', 'japanese-zen'],
        sustainability=SustainabilitySpec(),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, electrical_req='220V In-Wall Box'),
        description='2200K–5000K tunable circadian LED halo lighting, built-in defogger heating pad.'
    ),
    KohlerFixture(
        id='verdera-30-mirror',
        art='K-99008IN-NA',
        name='Verdera® 30" Compact Lighted LED Mirror',
        category='mirrors',
        series='Verdera',
        price_inr=26000,
        price_usd=350,
        width_m=0.76,
        depth_m=0.06,
        height_m=0.76,
        styles=['industrial', 'industrial-chic', 'compact', 'minimalist'],
        sustainability=SustainabilitySpec(),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, electrical_req='220V In-Wall Box'),
        description='Frameless perimeter backlit LED mirror with copper-free glass.'
    ),

    # ==================== FAUCETS ====================
    KohlerFixture(
        id='purist-faucet',
        art='K-99856IN-4',
        name='Purist® Tall Basin Monoblock Faucet',
        category='faucets',
        series='Purist',
        price_inr=19800,
        price_usd=270,
        width_m=0.18,
        depth_m=0.20,
        height_m=0.32,
        styles=['minimalist', 'minimalist-modern'],
        sustainability=SustainabilitySpec(flow_rate_gpm=1.2, annual_water_savings_l=5200),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, supply_line='3/8" Flexible Braided'),
        description='Solid brass construction, ceramic disc valving, 1.2 GPM laminar stream aerator.'
    ),
    KohlerFixture(
        id='parallel-faucet',
        art='K-23484IN-4',
        name='Parallel® Cylindrical Basin Faucet',
        category='faucets',
        series='Parallel',
        price_inr=11200,
        price_usd=150,
        width_m=0.16,
        depth_m=0.18,
        height_m=0.26,
        styles=['minimalist', 'minimalist-modern', 'modern'],
        sustainability=SustainabilitySpec(flow_rate_gpm=1.2, annual_water_savings_l=5200),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, supply_line='3/8" Flexible Braided'),
        description='Crisp cylindrical styling, corrosion-resistant Kohler finish.'
    ),
    KohlerFixture(
        id='artifacts-faucet',
        art='K-10129IN-4',
        name='Artifacts® Column Spout Basin Faucet',
        category='faucets',
        series='Artifacts',
        price_inr=32000,
        price_usd=430,
        width_m=0.20,
        depth_m=0.22,
        height_m=0.34,
        styles=['classic', 'classic-luxury'],
        sustainability=SustainabilitySpec(flow_rate_gpm=1.2, annual_water_savings_l=5200),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, supply_line='3/8" Flexible Braided'),
        description='Vintage Edwardian column spout profile in vibrant brushed brass.'
    ),
    KohlerFixture(
        id='composed-faucet',
        art='K-73159IN-4',
        name='Composed® Geometric Single-Handle Faucet',
        category='faucets',
        series='Composed',
        price_inr=14500,
        price_usd=195,
        width_m=0.16,
        depth_m=0.19,
        height_m=0.28,
        styles=['zen', 'japanese-zen', 'industrial', 'industrial-chic'],
        sustainability=SustainabilitySpec(flow_rate_gpm=1.2, annual_water_savings_l=5200),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, supply_line='3/8" Flexible Braided'),
        description='Timeless geometric proportions with side-joystick control.'
    )
]


def get_catalog_by_id(fixture_id: str) -> Optional[KohlerFixture]:
    """Retrieve fixture by ID."""
    for fix in KOHLER_CATALOG:
        if fix.id == fixture_id:
            return fix
    return None


def get_catalog_by_category(category: str) -> List[KohlerFixture]:
    """Retrieve fixtures matching category."""
    cat_clean = category.lower()
    return [f for f in KOHLER_CATALOG if cat_clean in f.category.lower() or f.category.lower() in cat_clean]
