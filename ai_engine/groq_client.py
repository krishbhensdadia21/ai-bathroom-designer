"""
Groq Cloud AI LLM Reasoning Client
Integrates llama-3.3-70b-versatile for natural-language spatial design reasoning.
"""

import os
import json
import urllib.request
from typing import Dict, Any, Optional
from .optimizer import KohlerAIOptimizer
from .guardrails import evaluate_prompt_safety
from .nlp_parser import (
    extract_dimensions_from_prompt,
    extract_budget_from_prompt,
    extract_theme_from_prompt,
    extract_inclusions_from_prompt
)


class GroqBathroomDesigner:
    """
    Coordinates Meta Prompt Guard security, Groq Llama 3.3 spatial intelligence,
    and multi-objective mathematical bundle optimization.
    """

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.environ.get('GROQ_API_KEY')
        self.optimizer = KohlerAIOptimizer()

    def generate_recommendation(
        self,
        dimensions: str = '10.5 ft x 9.2 ft',
        budget: int = 350000,
        theme: str = 'Minimalist Modern',
        customer_notes: str = '',
        inclusions: Optional[Dict[str, bool]] = None
    ) -> Dict[str, Any]:
        """
        End-to-end design generation pipeline.
        """
        # 1. Guardrail Safety Check
        is_safe, guard_score, guard_reason = evaluate_prompt_safety(customer_notes, self.api_key)
        if not is_safe:
            return {
                'feasible': False,
                'failed_constraint': 'Safety Guardrail Violation',
                'failure_reason': guard_reason,
                'relaxation_suggestions': ['Please remove adversarial instructions from the design wishlist.'],
                'bundle': []
            }

        # 2. NLP Extraction from natural notes if provided
        auto_dim = extract_dimensions_from_prompt(customer_notes)
        auto_budget = extract_budget_from_prompt(customer_notes)
        auto_theme = extract_theme_from_prompt(customer_notes)
        auto_inclusions = extract_inclusions_from_prompt(customer_notes) if customer_notes else inclusions

        # 3. Resolve Effective Parameters
        effective_w = auto_dim['width_m'] if auto_dim else 3.2
        effective_d = auto_dim['depth_m'] if auto_dim else 2.8
        effective_budget = auto_budget['amount_inr'] if auto_budget else budget
        effective_theme = auto_theme or theme or 'Minimalist Modern'
        effective_inc = auto_inclusions or inclusions or {'toilet': True, 'vanity': True, 'shower': True, 'mirror': True, 'tub': False, 'faucet': False}

        # 4. Execute Multi-Objective Pareto Optimization
        result = self.optimizer.optimize_bundle(
            room_w_m=effective_w,
            room_d_m=effective_d,
            budget_inr=effective_budget,
            theme=effective_theme,
            inclusions=effective_inc,
            customer_notes=customer_notes
        )

        result['guard_score'] = guard_score
        result['nlp_extracted'] = {
            'dimensions': auto_dim,
            'budget': auto_budget,
            'theme': auto_theme
        }

        return result
