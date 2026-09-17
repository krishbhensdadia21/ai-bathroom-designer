"""
KOHLER AI Spatial Bathroom Designer & Planner — Python AI Engine
Track 1: KOHLER-MITWPU AI Research Lab Program
"""

from .catalog import KOHLER_CATALOG, KohlerFixture, get_catalog_by_id, get_catalog_by_category
from .nlp_parser import (
    extract_dimensions_from_prompt,
    extract_budget_from_prompt,
    extract_theme_from_prompt,
    extract_inclusions_from_prompt
)
from .guardrails import evaluate_prompt_safety
from .clearance_validator import validate_room_dimensions, evaluate_bundle_clearances
from .optimizer import KohlerAIOptimizer
from .groq_client import GroqBathroomDesigner

__all__ = [
    'KOHLER_CATALOG',
    'KohlerFixture',
    'get_catalog_by_id',
    'get_catalog_by_category',
    'extract_dimensions_from_prompt',
    'extract_budget_from_prompt',
    'extract_theme_from_prompt',
    'extract_inclusions_from_prompt',
    'evaluate_prompt_safety',
    'validate_room_dimensions',
    'evaluate_bundle_clearances',
    'KohlerAIOptimizer',
    'GroqBathroomDesigner'
]
