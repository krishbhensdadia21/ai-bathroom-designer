"""
Natural Language Processing (NLP) Intent & Constraint Parser
Extracts room dimensions, budgets, aesthetic themes, and fixture inclusions from raw text.
"""

import re
from typing import Dict, Any, Optional


def extract_dimensions_from_prompt(text: str) -> Optional[Dict[str, float]]:
    """
    Parses dimension strings like '10.5x9.2 ft', '12x10', '7 by 5 feet', 'powder room', etc.
    Returns width_ft, depth_ft, height_ft, and converted width_m, depth_m.
    """
    if not text:
        return None
    
    t_clean = text.lower()
    
    # 1. Pattern: 10.5 x 9.2 ft or 10.5x9.2 or 10.5 by 9.2
    dim_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:ft|feet|\')?\s*(?:x|×|by|\*)\s*(\d+(?:\.\d+)?)\s*(?:ft|feet|\')?', t_clean)
    if dim_match:
        w_ft = float(dim_match.group(1))
        d_ft = float(dim_match.group(2))
        return {
            'width_ft': w_ft,
            'depth_ft': d_ft,
            'height_ft': 8.5,
            'width_m': round(w_ft * 0.3048, 2),
            'depth_m': round(d_ft * 0.3048, 2),
            'source': 'explicit_nlp'
        }
    
    # 2. Semantic room type heuristics
    if 'powder room' in t_clean or 'half bath' in t_clean or 'guest bath' in t_clean:
        return {
            'width_ft': 6.5,
            'depth_ft': 5.0,
            'height_ft': 8.5,
            'width_m': 2.0,
            'depth_m': 1.5,
            'source': 'room_type_powder'
        }
    elif 'master' in t_clean or 'grand' in t_clean or 'spa' in t_clean or 'luxury suite' in t_clean:
        return {
            'width_ft': 15.0,
            'depth_ft': 10.0,
            'height_ft': 9.0,
            'width_m': 4.6,
            'depth_m': 3.0,
            'source': 'room_type_master'
        }
    elif 'compact' in t_clean or 'studio' in t_clean or 'small' in t_clean:
        return {
            'width_ft': 7.5,
            'depth_ft': 6.0,
            'height_ft': 8.5,
            'width_m': 2.3,
            'depth_m': 1.8,
            'source': 'room_type_compact'
        }
        
    return None


def extract_budget_from_prompt(text: str) -> Optional[Dict[str, Any]]:
    """
    Parses budget mentions like 'under 2.5 lakh', '3.5L', '₹2,00,000', '$4000', 'budget of 150000'.
    Returns amount_inr and amount_usd.
    """
    if not text:
        return None
        
    t_clean = text.lower()
    
    # Lakh pattern: '2.5 lakh', '2.5l', '3 lakhs'
    lakh_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|\s*l\b)', t_clean)
    if lakh_match:
        val = float(lakh_match.group(1))
        inr = int(val * 100000)
        return {'amount_inr': inr, 'amount_usd': int(inr / 80)}
        
    # USD pattern: '$4500' or '4500 usd' or '4500 dollars'
    usd_match = re.search(r'\$\s*(\d[\d,]+)|\b(\d[\d,]+)\s*(?:usd|dollars)', t_clean)
    if usd_match:
        raw = (usd_match.group(1) or usd_match.group(2)).replace(',', '')
        usd = int(raw)
        return {'amount_inr': usd * 80, 'amount_usd': usd}
        
    # Raw numeric INR pattern: '₹2,50,000' or '250000 inr' or 'budget 300000'
    inr_match = re.search(r'(?:₹|rs\.?|inr|budget\s*(?:of|is|:)?)\s*(\d[\d,]+)', t_clean)
    if inr_match:
        raw = inr_match.group(1).replace(',', '')
        inr = int(raw)
        if inr >= 10000:
            return {'amount_inr': inr, 'amount_usd': int(inr / 80)}
            
    return None


def extract_theme_from_prompt(text: str) -> Optional[str]:
    """
    Infers the closest authentic Kohler aesthetic theme from customer prompt keywords.
    """
    if not text:
        return None
        
    t = text.lower()
    if any(k in t for k in ['zen', 'japanese', 'wabi-sabi', 'hinoki', 'teak', 'calm', 'nature', 'bamboo']):
        return 'Japanese Zen'
    if any(k in t for k in ['classic', 'vintage', 'luxury', 'brass', 'gold', 'heritage', 'traditional', 'royal', 'calacatta']):
        return 'Classic Luxury'
    if any(k in t for k in ['industrial', 'concrete', 'crittall', 'black steel', 'loft', 'raw', 'urban', 'edison']):
        return 'Industrial Chic'
    if any(k in t for k in ['minimal', 'modern', 'clean', 'scandi', 'sleek', 'nordic', 'floating']):
        return 'Minimalist Modern'
        
    return None


def extract_inclusions_from_prompt(text: str) -> Dict[str, bool]:
    """
    Detects which fixture categories the customer explicitly wishes to include or exclude.
    """
    if not text:
        return {'toilet': True, 'vanity': True, 'shower': True, 'mirror': True, 'tub': False, 'faucet': False}
        
    t = text.lower()
    
    wants_powder = 'powder room' in t or 'half bath' in t
    wants_tub = any(k in t for k in ['tub', 'bathtub', 'soak', 'evok', 'freestanding'])
    wants_faucet = any(k in t for k in ['faucet', 'tap', 'purist', 'parallel', 'artifacts'])
    
    if wants_powder:
        return {
            'toilet': True,
            'vanity': True,
            'shower': False,
            'mirror': True,
            'tub': False,
            'faucet': wants_faucet
        }
        
    return {
        'toilet': not ('no toilet' in t or 'without toilet' in t),
        'vanity': not ('no vanity' in t or 'without vanity' in t),
        'shower': not ('no shower' in t or 'without shower' in t),
        'mirror': not ('no mirror' in t or 'without mirror' in t),
        'tub': wants_tub,
        'faucet': wants_faucet
    }
