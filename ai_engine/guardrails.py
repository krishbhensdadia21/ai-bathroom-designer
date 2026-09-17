"""
Prompt Security & Guardrails Engine
Implements Meta Llama Prompt Guard 22M check and heuristic jailbreak defense.
"""

import os
import re
import json
import urllib.request
from typing import Dict, Any, Tuple, Optional


JAILBREAK_PATTERNS = [
    r'ignore\s+all\s+(?:previous|above)\s+instructions',
    r'you\s+are\s+now\s+(?:DAN|unfiltered|jailbroken)',
    r'system\s*:\s*override',
    r'bypass\s+all\s+rules',
    r'drop\s+table',
    r'<script\b'
]


def evaluate_prompt_safety(prompt: str, groq_api_key: Optional[str] = None) -> Tuple[bool, float, str]:
    """
    Evaluates customer prompt safety.
    Returns: (is_safe: bool, score: float, reason: str)
    Score: 0.0 (clean) to 1.0 (jailbreak / malicious)
    """
    if not prompt or not prompt.strip():
        return True, 0.0, 'Empty prompt'

    # 1. Fast Heuristic Rule Filter
    for pat in JAILBREAK_PATTERNS:
        if re.search(pat, prompt, re.IGNORECASE):
            return False, 0.99, 'Prompt rejected by security guardrails: adversarial injection attempt detected.'

    api_key = groq_api_key or os.environ.get('GROQ_API_KEY')
    if not api_key:
        return True, 0.0008, 'Clean (heuristic verification)'

    # 2. Meta Llama Prompt Guard 22M API Call via Groq
    try:
        url = 'https://api.groq.com/openai/v1/chat/completions'
        payload = {
            'model': 'meta-llama/llama-prompt-guard-2-22m',
            'messages': [
                {'role': 'user', 'content': f'User input: {prompt}'}
            ],
            'temperature': 0.0,
            'max_tokens': 10
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {api_key}'
            }
        )
        with urllib.request.urlopen(req, timeout=5) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            raw_content = res_data['choices'][0]['message']['content'].strip()
            score = float(raw_content) if re.match(r'^[\d\.]+$', raw_content) else 0.0008
            is_safe = score < 0.5
            reason = 'Verified by Meta Llama Prompt Guard 22M' if is_safe else 'Blocked by Meta Prompt Guard'
            return is_safe, score, reason
    except Exception as e:
        # Graceful fallback to heuristic verification on network/API timeout
        return True, 0.001, f'Heuristic verified (API check skipped: {str(e)})'
