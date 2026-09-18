"""
KOHLER Authentic Product Catalog & Specification Database (15 Genuine Products)
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
    # ==================== 1. SMART TOILETS ====================
    KohlerFixture(
        id='veil-smart-toilet',
        art='K-5401IN-0',
        name='Veil™ Smart One-piece Toilet',
        category='toilets',
        series='Veil',
        price_inr=85000,
        price_usd=1150,
        width_m=0.41,
        depth_m=0.71,
        height_m=0.72,
        styles=['minimalist', 'minimalist-modern', 'zen', 'japanese-zen', 'luxury', 'modern'],
        sustainability=SustainabilitySpec(flush_gpf=1.0, annual_water_savings_l=21900, recycled_content_pct=18),
        compatibility=PlumbingCompatibility(rough_in_inches=12.0, drain_diameter='4" Floor Flange', electrical_req='120V/15A GFCI'),
        description='Sculptural smart one-piece toilet with remote control, heated Quiet-Close seat, and automatic bidet cleansing.'
    ),

    # ==================== 2. TOILETS ====================
    KohlerFixture(
        id='reach-one-piece-toilet',
        art='K-3983IN-S-0',
        name='Reach™ One-piece Round-front Toilet with Skirted Trapway, Dual Flush',
        category='toilets',
        series='Reach',
        price_inr=28000,
        price_usd=375,
        width_m=0.38,
        depth_m=0.68,
        height_m=0.73,
        styles=['minimalist', 'minimalist-modern', 'modern', 'compact', 'zen'],
        sustainability=SustainabilitySpec(flush_gpf=1.06, annual_water_savings_l=14920, recycled_content_pct=20),
        compatibility=PlumbingCompatibility(rough_in_inches=12.0, drain_diameter='4" Floor Flange'),
        description='One-piece round-front toilet with clean skirted trapway, dual flush top actuator, and quiet-close seat.'
    ),

    # ==================== 3. TOILETS ====================
    KohlerFixture(
        id='ove-one-piece-toilet',
        art='K-17629T-NS-0',
        name='Ove™ One-piece Round-front Toilet with Skirted Trapway, Dual Flush',
        category='toilets',
        series='Ove',
        price_inr=34000,
        price_usd=450,
        width_m=0.40,
        depth_m=0.70,
        height_m=0.74,
        styles=['classic', 'classic-luxury', 'modern', 'zen'],
        sustainability=SustainabilitySpec(flush_gpf=1.06, annual_water_savings_l=14920, recycled_content_pct=16),
        compatibility=PlumbingCompatibility(rough_in_inches=12.0, drain_diameter='4" Floor Flange'),
        description='Sculptural organic egg-shaped one-piece toilet with skirted trapway, dual flush 2.6/4L, and soft-close ergonomic seat.'
    ),

    # ==================== 4. VANITIES ====================
    KohlerFixture(
        id='prologue-vanity',
        art='K-30457IN-MWF',
        name='Prologue™ 75 cm Wall-hung Bathroom Vanity Cabinet',
        category='vanities',
        series='Prologue',
        price_inr=46000,
        price_usd=620,
        width_m=0.75,
        depth_m=0.48,
        height_m=0.50,
        styles=['minimalist', 'minimalist-modern', 'zen', 'compact'],
        sustainability=SustainabilitySpec(recycled_content_pct=22),
        compatibility=PlumbingCompatibility(drain_diameter='1-1/4" Wall P-Trap'),
        description='Wall-hung floating vanity cabinet with dual soft-close drawers, integrated bevelled J-pulls, and vitreous china basin.'
    ),

    # ==================== 5. VANITIES ====================
    KohlerFixture(
        id='luxe-vanity',
        art='K-30460IN-MWF',
        name='Luxe™ 90 cm Wall-hung Bathroom Vanity Cabinet',
        category='vanities',
        series='Luxe',
        price_inr=68000,
        price_usd=910,
        width_m=0.90,
        depth_m=0.50,
        height_m=0.50,
        styles=['classic', 'classic-luxury', 'modern', 'luxury'],
        sustainability=SustainabilitySpec(recycled_content_pct=25),
        compatibility=PlumbingCompatibility(drain_diameter='1-1/4" Wall P-Trap', electrical_req='Optional 12V LED'),
        description='Luxury 90 cm floating vanity with deep soft-close storage drawers, premium architectural trim, and seamless ceramic basin deck.'
    ),

    # ==================== 6. BASIN ====================
    KohlerFixture(
        id='brazn-vessel-sink',
        art='K-21060IN-0',
        name='Brazn™ 58.4 cm Rectangular Vessel Bathroom Sink',
        category='vanities',
        series='Brazn',
        price_inr=32000,
        price_usd=430,
        width_m=0.584,
        depth_m=0.368,
        height_m=0.84,
        styles=['zen', 'japanese-zen', 'industrial', 'industrial-chic', 'minimalist'],
        sustainability=SustainabilitySpec(recycled_content_pct=35),
        compatibility=PlumbingCompatibility(drain_diameter='1-1/4" Exposed Bottle Trap'),
        description='Architectural modernist vessel sink in vitreous china with sharp rectangular rim, chamfered edges, and umbrella drain.'
    ),

    # ==================== 7. SHOWER DOOR ====================
    KohlerFixture(
        id='new-trilogy-shower-door',
        art='K-704699IN-SHP',
        name='New Trilogy™ 2000–2161 mm H Pivot Shower Door with 8 mm Thick Glass',
        category='showers',
        series='New Trilogy',
        price_inr=82000,
        price_usd=1100,
        width_m=1.00,
        depth_m=0.90,
        height_m=2.05,
        styles=['minimalist', 'minimalist-modern', 'classic', 'classic-luxury', 'zen', 'industrial'],
        sustainability=SustainabilitySpec(flow_rate_gpm=1.75, annual_water_savings_l=33160),
        compatibility=PlumbingCompatibility(water_pressure_min_psi=45, supply_line='1/2" Copper/PEX', drain_diameter='2" Shower Drain'),
        description='Architectural 2.05m tall pivot shower door with 8 mm CleanCoat tempered glass, solid brass pivot hinges, and high-polish tubular handle.',
        clearance_front_m=0.610
    ),

    # ==================== 8. SHOWER ====================
    KohlerFixture(
        id='statement-showerhead',
        art='K-26290T-2MB',
        name='Statement™ Three-function Showerhead',
        category='showers',
        series='Statement',
        price_inr=28500,
        price_usd=380,
        width_m=0.25,
        depth_m=0.35,
        height_m=0.25,
        styles=['industrial', 'industrial-chic', 'minimalist', 'minimalist-modern', 'zen'],
        sustainability=SustainabilitySpec(flow_rate_gpm=1.75, annual_water_savings_l=33160),
        compatibility=PlumbingCompatibility(water_pressure_min_psi=45, supply_line='1/2" NPT', drain_diameter='2" Shower Drain'),
        description='Contemporary multifunction showerhead with Full Coverage, Cloud spray, Deep Massage, and Katalyst air-induction.',
        clearance_front_m=0.610
    ),

    # ==================== 9. BATHTUB ====================
    KohlerFixture(
        id='evok-bathtub',
        art='K-25164T-0',
        name='Evok 2.0™ 1.7M Seamless Rectangular Freestanding Bathtub',
        category='bathtubs',
        series='Evok 2.0',
        price_inr=125000,
        price_usd=1680,
        width_m=1.70,
        depth_m=0.80,
        height_m=0.60,
        styles=['zen', 'japanese-zen', 'luxury', 'classic-luxury', 'modern', 'minimalist'],
        sustainability=SustainabilitySpec(annual_water_savings_l=0),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, drain_diameter='1-1/2" Slotted Overflow Drain'),
        description='Seamless rectangular freestanding soaking tub with softened modern corners, double-ended lumbar support, and slotted overflow.'
    ),

    # ==================== 10. SMART MIRROR ====================
    KohlerFixture(
        id='ming-smart-mirror',
        art='K-77115IN-NA',
        name='Ming™ 80 cm Lighted Mirror with Proximity Sensor',
        category='mirrors',
        series='Ming',
        price_inr=42000,
        price_usd=560,
        width_m=0.80,
        depth_m=0.05,
        height_m=0.80,
        styles=['minimalist', 'minimalist-modern', 'zen', 'japanese-zen', 'modern'],
        sustainability=SustainabilitySpec(recycled_content_pct=20),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, electrical_req='120V In-Wall Hardwire'),
        description='Circular lighted smart mirror with proximity sensor, perimeter frosted LED halo, circadian light control, and defogger.'
    ),

    # ==================== 11. MIRROR ====================
    KohlerFixture(
        id='reve-mirror',
        art='K-23268IN-NA',
        name='Reve™ 1000 mm Lighted Mirror',
        category='mirrors',
        series='Reve',
        price_inr=36000,
        price_usd=480,
        width_m=1.00,
        depth_m=0.05,
        height_m=0.75,
        styles=['classic', 'classic-luxury', 'modern', 'industrial', 'minimalist'],
        sustainability=SustainabilitySpec(recycled_content_pct=22),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, electrical_req='120V In-Wall Hardwire'),
        description='Wide 100 cm rectangular mirror with dual vertical lateral LED light bars, touch sensor dimmer, 90+ CRI task lighting, and anti-fog pad.'
    ),

    # ==================== 12. FAUCET ====================
    KohlerFixture(
        id='purist-faucet',
        art='K-14402IN-4A-CP',
        name='Purist™ Single Control Lavatory Faucet',
        category='faucets',
        series='Purist',
        price_inr=19800,
        price_usd=270,
        width_m=0.15,
        depth_m=0.18,
        height_m=0.20,
        styles=['minimalist', 'minimalist-modern', 'modern', 'zen'],
        sustainability=SustainabilitySpec(flow_rate_gpm=1.2, annual_water_savings_l=16580),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, supply_line='3/8" Flexible Braided'),
        description='Pure architectural cylindrical single-lever faucet in Polished Chrome with laminar flow and ceramic disc valve.'
    ),

    # ==================== 13. FAUCET ====================
    KohlerFixture(
        id='parallel-faucet',
        art='K-23482IN-4-BV',
        name='Parallel™ Pillar Tap',
        category='faucets',
        series='Parallel',
        price_inr=12500,
        price_usd=168,
        width_m=0.13,
        depth_m=0.16,
        height_m=0.18,
        styles=['minimalist', 'minimalist-modern', 'modern', 'classic'],
        sustainability=SustainabilitySpec(flow_rate_gpm=1.2, annual_water_savings_l=16580),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, supply_line='3/8" Flexible Braided'),
        description='Faceted geometric pillar tap in Brushed Bronze with precise angular contours and quarter-turn ceramic cartridge.'
    ),

    # ==================== 14. FAUCET ====================
    KohlerFixture(
        id='artifacts-faucet',
        art='K-72760T-CP',
        name='Artifacts™ Widespread Bathroom Sink Faucets',
        category='faucets',
        series='Artifacts',
        price_inr=34000,
        price_usd=460,
        width_m=0.25,
        depth_m=0.23,
        height_m=0.20,
        styles=['classic', 'classic-luxury', 'luxury', 'traditional'],
        sustainability=SustainabilitySpec(flow_rate_gpm=1.5, annual_water_savings_l=11600),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, supply_line='3/8" Flexible Braided'),
        description='Widespread 3-hole bathroom sink faucet with classical Edwardian column spout and authentic dual cross handles.'
    ),

    # ==================== 15. FAUCET ====================
    KohlerFixture(
        id='composed-tall-faucet',
        art='K-73159IN-7-CP',
        name='Composed™ Tall Single-handle Bathroom Sink Faucet',
        category='faucets',
        series='Composed',
        price_inr=22000,
        price_usd=295,
        width_m=0.15,
        depth_m=0.20,
        height_m=0.31,
        styles=['zen', 'japanese-zen', 'industrial', 'industrial-chic', 'minimalist'],
        sustainability=SustainabilitySpec(flow_rate_gpm=1.2, annual_water_savings_l=16580),
        compatibility=PlumbingCompatibility(requires_wet_wall=False, supply_line='3/8" Flexible Braided'),
        description='Tall architectural single-handle faucet designed specifically for vessel basins with side joystick control and sleek flat spout.'
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
