    // ==================== 9. GROQ AI ASSISTANT (TRACK 1 CORE LOGIC) ====================
    // currentSelectedTheme declared at line 1530
    let currentAiRecommendation = null;
    let isAiEngineReset = false;

    function openAiAssistantModal() {
      document.getElementById('modal-ai-assistant').classList.remove('hidden');
      if (isAiEngineReset || !currentAiRecommendation) {
        // Show empty placeholder state (nothing shown until user enters inputs)
        const emptyContainer = document.getElementById('ai-empty-container');
        if (emptyContainer) emptyContainer.classList.remove('hidden');
        const feasibleContainer = document.getElementById('ai-feasible-container');
        if (feasibleContainer) feasibleContainer.classList.add('hidden');
        const impossibleContainer = document.getElementById('ai-impossible-container');
        if (impossibleContainer) impossibleContainer.classList.add('hidden');
        const applySection = document.getElementById('ai-apply-section');
        if (applySection) applySection.classList.add('hidden');
        return;
      }
    }
    function closeAiAssistantModal() {
      const modal = document.getElementById('modal-ai-assistant');
      if (modal) modal.classList.add('hidden');
      // If a valid AI suite was generated, apply it to the 3D scene upon closing so the user never sees only 2 starter products
      if (currentAiRecommendation && currentAiRecommendation.feasible && currentAiRecommendation.bundle && currentAiRecommendation.bundle.length > 2 && placedProducts.length <= 2) {
        applyAiBundleToBathroom();
      }
    }

    function setAiNeedsRegeneration(message) {
      currentAiRecommendation = null;
      isAiEngineReset = true;
      const emptyContainer = document.getElementById('ai-empty-container');
      const feasibleContainer = document.getElementById('ai-feasible-container');
      const impossibleContainer = document.getElementById('ai-impossible-container');
      const applySection = document.getElementById('ai-apply-section');

      if (emptyContainer) {
        emptyContainer.classList.remove('hidden');
        const desc = emptyContainer.querySelector('p');
        if (desc && message) {
          desc.innerHTML = message;
        }
      }
      if (feasibleContainer) feasibleContainer.classList.add('hidden');
      if (impossibleContainer) impossibleContainer.classList.add('hidden');
      if (applySection) applySection.classList.add('hidden');
    }

    function selectAiTheme(theme) {
      currentSelectedTheme = theme;
      if (typeof applyAestheticTheme === 'function') {
        applyAestheticTheme(theme);
      }
      setAiNeedsRegeneration(`Theme set to <strong>${theme}</strong>. Click <strong>Generate Optimized Kohler Bundle</strong> to synthesize your custom suite.`);
    }

    function onAiDimensionInputChange() {
      const wFt = parseFloat(document.getElementById('ai-input-width').value) || 10.5;
      const dFt = parseFloat(document.getElementById('ai-input-depth').value) || 9.2;
      const hFt = parseFloat(document.getElementById('ai-input-height').value) || 8.5;
      const sqFt = (wFt * dFt).toFixed(1);
      const sqM = (wFt * dFt * 0.092903).toFixed(2);
      const areaEl = document.getElementById('ai-calculated-area');
      if (areaEl) areaEl.innerText = `${sqFt} sq ft (${sqM} m²)`;

      roomWidth = Math.round(wFt * 0.3048 * 10) / 10;
      roomDepth = Math.round(dFt * 0.3048 * 10) / 10;
      roomHeight = Math.round(hFt * 0.3048 * 10) / 10;
      buildRoomArchitecture();

      setAiNeedsRegeneration(`Room dimensions set to <strong>${wFt} × ${dFt} ft</strong>. Click <strong>Generate Optimized Kohler Bundle</strong> to calculate.`);
    }

    function updateAiBudgetDisplay(val) {
      const n = parseInt(val);
      document.getElementById('ai-budget-label').innerText = '₹' + n.toLocaleString('en-IN');
      setAiNeedsRegeneration(`Target budget set to <strong>₹${n.toLocaleString('en-IN')}</strong>. Click <strong>Generate Optimized Kohler Bundle</strong> to calculate.`);
    }

    let currentInputMode = 'predefined';
    let lastAutoDetectedDim = null;

    function extractRoomDimensionsFromPrompt(notes) {
      if (!notes || typeof notes !== 'string') return null;
      const str = notes.trim();
      if (!str) return null;
      const nLow = str.toLowerCase();

      // Pattern 1: Explicit dimensions (e.g. 16x11, 16 x 11 ft, 16.5 x 10.5 feet, 14 by 10 ft, 14 ft by 10 ft, 14' x 10', 14ft x 10ft)
      const dimRegex = /\b(\d{1,2}(?:\.\d+)?)\s*(?:ft|feet|'|m|meter)?\s*(?:x|×|by|\*)\s*(\d{1,2}(?:\.\d+)?)\s*(?:ft|feet|'|m|meter)?\b/i;
      const m1 = nLow.match(dimRegex);
      if (m1) {
        let w = parseFloat(m1[1]);
        let d = parseFloat(m1[2]);
        if (nLow.includes('meter') || nLow.includes(' m ') || nLow.endsWith(' m')) {
          w *= 3.28084;
          d *= 3.28084;
        }
        w = Math.max(5.5, Math.min(26.0, w));
        d = Math.max(5.0, Math.min(20.0, d));
        let h = 8.5;
        const hMatch = nLow.match(/(\d{1,2}(?:\.\d+)?)\s*(?:ft|feet|'|m)?\s*(?:height|tall|ceiling)/i);
        if (hMatch) h = Math.max(7.5, Math.min(13.0, parseFloat(hMatch[1])));
        return {
          widthFt: Math.round(w * 10) / 10,
          depthFt: Math.round(d * 10) / 10,
          heightFt: Math.round(h * 10) / 10,
          reason: `Custom dimensions from prompt (${(Math.round(w * 10) / 10).toFixed(1)}ft × ${(Math.round(d * 10) / 10).toFixed(1)}ft)`,
          explicit: true
        };
      }

      // Pattern 2: "width 14 ft ... depth 10 ft" or "14 ft wide ... 10 ft deep"
      const wMatch = nLow.match(/(?:width|wide)\s*(?:of|:)?\s*(\d{1,2}(?:\.\d+)?)\s*(?:ft|feet|')?/i);
      const dMatch = nLow.match(/(?:depth|deep)\s*(?:of|:)?\s*(\d{1,2}(?:\.\d+)?)\s*(?:ft|feet|')?/i);
      if (wMatch && dMatch) {
        let w = Math.max(5.5, Math.min(26.0, parseFloat(wMatch[1])));
        let d = Math.max(5.0, Math.min(20.0, parseFloat(dMatch[1])));
        let h = 8.5;
        const hMatch = nLow.match(/(\d{1,2}(?:\.\d+)?)\s*(?:ft|feet|'|m)?\s*(?:height|tall|ceiling)/i);
        if (hMatch) h = Math.max(7.5, Math.min(13.0, parseFloat(hMatch[1])));
        return {
          widthFt: Math.round(w * 10) / 10,
          depthFt: Math.round(d * 10) / 10,
          heightFt: Math.round(h * 10) / 10,
          reason: `Custom dimensions from prompt (${(Math.round(w * 10) / 10).toFixed(1)}ft × ${(Math.round(d * 10) / 10).toFixed(1)}ft)`,
          explicit: true
        };
      }

      // Pattern 3: Qualitative / Semantic room envelope indicators
      if (nLow.includes('powder room') || nLow.includes('half bath') || nLow.includes('tiny bathroom') || nLow.includes('small powder')) {
        return { widthFt: 6.5, depthFt: 6.0, heightFt: 8.5, reason: 'Compact Powder Room envelope (6.5ft × 6.0ft)', explicit: false };
      }
      if (nLow.includes('compact') || nLow.includes('small bathroom') || nLow.includes('space-saving') || nLow.includes('condo') || nLow.includes('studio')) {
        return { widthFt: 8.5, depthFt: 7.0, heightFt: 8.5, reason: 'Space-saving compact footprint (8.5ft × 7.0ft)', explicit: false };
      }
      if (nLow.includes('grand') || nLow.includes('palatial') || nLow.includes('huge') || nLow.includes('villa') || nLow.includes('presidential')) {
        return { widthFt: 18.0, depthFt: 12.0, heightFt: 9.5, reason: 'Grand luxury master footprint (18.0ft × 12.0ft)', explicit: false };
      }
      if (nLow.includes('spacious') || nLow.includes('master') || nLow.includes('japanese zen') || nLow.includes('spa') || nLow.includes('walk-in shower and tub') || nLow.includes('freestanding tub')) {
        return { widthFt: 15.0, depthFt: 10.5, heightFt: 9.0, reason: 'Spacious master spa envelope (15.0ft × 10.5ft)', explicit: false };
      }
      if (nLow.includes('family') || nLow.includes('children') || nLow.includes('elderly')) {
        return { widthFt: 13.0, depthFt: 9.5, heightFt: 8.5, reason: 'Comfortable family bathroom footprint (13.0ft × 9.5ft)', explicit: false };
      }
      if (nLow.includes('minimalist')) {
        return { widthFt: 11.5, depthFt: 9.0, heightFt: 8.5, reason: 'Clean minimalist layout envelope (11.5ft × 9.0ft)', explicit: false };
      }

      return null;
    }

    function extractThemeFromPrompt(notes) {
      if (!notes || typeof notes !== 'string') return null;
      const nLow = notes.toLowerCase();
      if (nLow.includes('zen') || nLow.includes('japanese') || nLow.includes('spa') || nLow.includes('tranquil') || nLow.includes('teak') || nLow.includes('hinoki')) {
        return 'Japanese Zen';
      }
      if (nLow.includes('classic') || nLow.includes('luxury') || nLow.includes('luxurious') || nLow.includes('marble') || nLow.includes('calacatta') || nLow.includes('palatial') || nLow.includes('gold') || nLow.includes('brass')) {
        return 'Classic Luxury';
      }
      if (nLow.includes('industrial') || nLow.includes('chic') || nLow.includes('urban') || nLow.includes('loft') || nLow.includes('steel') || nLow.includes('crittall')) {
        return 'Industrial Chic';
      }
      if (nLow.includes('waste') || nLow.includes('wastelab') || nLow.includes('eco') || nLow.includes('terrazzo') || nLow.includes('recycled') || nLow.includes('sustainable')) {
        return 'Kohler WasteLAB Eco-Luxury';
      }
      if (nLow.includes('minimalist') || nLow.includes('modern') || nLow.includes('clean line') || nLow.includes('simple') || nLow.includes('scandinavian')) {
        return 'Minimalist Modern';
      }
      return null;
    }

    function extractInclusionsFromPrompt(notes) {
      if (!notes || typeof notes !== 'string') return null;
      const nLow = notes.toLowerCase().trim();
      if (!nLow) return null;

      const isPowder = nLow.includes('powder room') || nLow.includes('half bath') || nLow.includes('powder');
      const mentionsToilet = nLow.includes('toilet') || nLow.includes('commode') || nLow.includes('bidet') || nLow.includes('wc') || nLow.includes('veil') || nLow.includes('reach');
      const mentionsVanity = nLow.includes('vanity') || nLow.includes('sink') || nLow.includes('basin') || nLow.includes('console') || nLow.includes('brazn') || nLow.includes('jacquard') || nLow.includes('tailored');
      const mentionsShower = nLow.includes('shower') || nLow.includes('wet room') || nLow.includes('wet-room') || nLow.includes('rainhead') || nLow.includes('revel') || nLow.includes('hydrorail');
      const mentionsMirror = nLow.includes('mirror') || nLow.includes('verdera');
      const mentionsTub = nLow.includes('tub') || nLow.includes('bathtub') || nLow.includes('soak') || nLow.includes('evok') || nLow.includes('jacuzzi') || nLow.includes('whirlpool');
      const noShower = nLow.includes('no shower') || nLow.includes('without shower') || nLow.includes('no-shower') || nLow.includes('remove shower') || nLow.includes('omit shower');
      const noTub = nLow.includes('no tub') || nLow.includes('without tub') || nLow.includes('no-tub') || nLow.includes('no bathtub') || nLow.includes('without bathtub') || nLow.includes('remove tub') || nLow.includes('omit tub');

      if (isPowder) {
        return {
          toilet: true,
          vanity: true,
          mirror: true,
          shower: (mentionsShower && !noShower && nLow.includes('with shower')) ? true : false,
          tub: false
        };
      }

      // Detect explicit user product list (e.g. "with a bathtub, double vanity, smart toilet, and large mirror" or "1 toilet + 1 mirror + 1 vanity" or "toilet, basin, shower")
      const hasExplicitList = nLow.includes('with ') || nLow.includes('having ') || nLow.includes('includes ') || nLow.includes('including ') || nLow.includes('+') || nLow.includes('only ') || nLow.includes('just ') || (mentionsTub && !mentionsShower);
      const anyExplicitMention = mentionsToilet || mentionsVanity || mentionsShower || mentionsMirror || mentionsTub;

      if (hasExplicitList && anyExplicitMention) {
        return {
          toilet: mentionsToilet,
          vanity: mentionsVanity,
          mirror: mentionsMirror || mentionsVanity,
          shower: mentionsShower && !noShower,
          tub: mentionsTub && !noTub
        };
      }

      if (noShower) {
        return {
          toilet: mentionsToilet || true,
          vanity: mentionsVanity || true,
          mirror: mentionsMirror || true,
          shower: false,
          tub: mentionsTub && !noTub
        };
      }

      // Full suite default
      return {
        toilet: true,
        vanity: true,
        shower: !noShower,
        mirror: true,
        tub: (!noTub && (mentionsTub || (nLow.includes('spa') || nLow.includes('master') || nLow.includes('luxury') || nLow.includes('zen'))))
      };
    }

    function extractBudgetFromPrompt(notes) {
      if (!notes || typeof notes !== 'string') return null;
      const str = notes.toLowerCase();

      // 1. Lakhs (e.g. "under ₹2.5 lakh", "budget 2.5 lakh", "under 2.5L", "within 2 lakh", "under 2.5 lakhs", "upto 3 lac")
      const lakhMatch = str.match(/(?:under|below|within|budget(?:\s*of|\s*under|\s*around)?|max(?:imum)?|upto|up\s*to|target|cap|less\s*than)?\s*(?:₹|rs\.?|inr)?\s*([0-9]+(?:\.[0-9]+)?)\s*(?:lakhs?|lacs?|lac|l)\b/i);
      if (lakhMatch && parseFloat(lakhMatch[1]) > 0 && parseFloat(lakhMatch[1]) <= 100) {
        const val = parseFloat(lakhMatch[1]);
        const inr = Math.round(val * 100000);
        return {
          amountINR: inr,
          val: val,
          unit: 'lakh',
          formatted: `₹${val} Lakh (₹${inr.toLocaleString('en-IN')})`,
          reason: `Budget capped under ₹${val} Lakh`
        };
      }

      // 2. Thousands / K (e.g. "under 250k", "budget 200k", "under ₹250k")
      const kMatch = str.match(/(?:under|below|within|budget(?:\s*of|\s*under)?|max(?:imum)?|upto|up\s*to)?\s*(?:₹|rs\.?|inr)?\s*([0-9]+(?:\.[0-9]+)?)\s*k\b/i);
      if (kMatch && parseFloat(kMatch[1]) >= 10) {
        const val = parseFloat(kMatch[1]);
        const inr = Math.round(val * 1000);
        return {
          amountINR: inr,
          val: val,
          unit: 'k',
          formatted: `₹${inr.toLocaleString('en-IN')}`,
          reason: `Budget capped under ₹${inr.toLocaleString('en-IN')}`
        };
      }

      // 3. Full Rupee amounts (e.g. "under ₹2,50,000", "budget 250000", "within ₹200000")
      const fullInrMatch = str.match(/(?:under|below|within|budget(?:\s*of|\s*under|\s*target)?|max(?:imum)?|upto|up\s*to|less\s*than)\s*(?:₹|rs\.?|inr)?\s*([0-9]{1,3}(?:,[0-9]{2,3})+|[0-9]{5,8})\b/i);
      if (fullInrMatch) {
        const inr = parseInt(fullInrMatch[1].replace(/,/g, ''));
        if (inr >= 50000 && inr <= 5000000) {
          return {
            amountINR: inr,
            val: inr,
            unit: 'inr',
            formatted: `₹${inr.toLocaleString('en-IN')}`,
            reason: `Budget capped under ₹${inr.toLocaleString('en-IN')}`
          };
        }
      }

      // 4. USD format (e.g. "under $3,000", "budget $2500")
      const usdMatch = str.match(/(?:under|below|within|budget(?:\s*of)?|max(?:imum)?|upto|up\s*to)?\s*\$\s*([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{3,6})\b/i);
      if (usdMatch) {
        const usd = parseInt(usdMatch[1].replace(/,/g, ''));
        if (usd >= 500) {
          const inr = Math.round(usd * 75);
          return {
            amountINR: inr,
            amountUSD: usd,
            val: usd,
            unit: 'usd',
            formatted: `$${usd.toLocaleString('en-US')}`,
            reason: `Budget capped under $${usd.toLocaleString('en-US')}`
          };
        }
      }

      return null;
    }

    function applyAutoRoomDimensions(wFt, dFt, hFt, reason) {
      const wEl = document.getElementById('ai-input-width');
      const dEl = document.getElementById('ai-input-depth');
      const hEl = document.getElementById('ai-input-height');
      if (wEl) wEl.value = wFt.toFixed(1);
      if (dEl) dEl.value = dFt.toFixed(1);
      if (hEl) hEl.value = hFt.toFixed(1);

      const sqFt = (wFt * dFt).toFixed(1);
      const sqM = (wFt * dFt * 0.092903).toFixed(2);
      const areaEl = document.getElementById('ai-calculated-area');
      if (areaEl) areaEl.innerText = `${sqFt} sq ft (${sqM} m²)`;

      roomWidth = Math.round(wFt * 0.3048 * 10) / 10;
      roomDepth = Math.round(dFt * 0.3048 * 10) / 10;
      roomHeight = Math.round(hFt * 0.3048 * 10) / 10;

      // Sync with dimensions modal controls if present
      const dimW = document.getElementById('input-dim-width');
      const dimD = document.getElementById('input-dim-depth');
      const dimH = document.getElementById('input-dim-height');
      if (dimW) dimW.value = roomWidth.toFixed(1);
      if (dimD) dimD.value = roomDepth.toFixed(1);
      if (dimH) dimH.value = roomHeight.toFixed(1);

      const lblW = document.getElementById('modal-label-width');
      const lblD = document.getElementById('modal-label-depth');
      const lblH = document.getElementById('modal-label-height');
      const lblArea = document.getElementById('modal-calc-area');
      if (lblW) lblW.innerText = `${wFt.toFixed(1)} ft (${roomWidth.toFixed(1)} m)`;
      if (lblD) lblD.innerText = `${dFt.toFixed(1)} ft (${roomDepth.toFixed(1)} m)`;
      if (lblH) lblH.innerText = `${hFt.toFixed(1)} ft (${roomHeight.toFixed(1)} m)`;
      if (lblArea) lblArea.innerText = `${sqFt} sq ft / ${sqM} m²`;

      buildRoomArchitecture();

      // Update badge in Custom AI Prompt pane
      const autoBadge = document.getElementById('ai-auto-room-badge');
      const autoDimText = document.getElementById('ai-auto-room-dimensions');
      const autoReasonText = document.getElementById('ai-auto-room-reason');
      if (autoBadge && autoDimText && autoReasonText) {
        autoDimText.innerText = `${wFt.toFixed(1)} ft × ${dFt.toFixed(1)} ft (${sqFt} sq ft)`;
        autoReasonText.innerText = reason || 'Auto-adapted to your prompt';
        autoBadge.classList.remove('hidden');
      }
    }

    function switchInputMode(mode) {
      currentInputMode = mode;
      const btnPredefined = document.getElementById('btn-mode-predefined');
      const btnNatural = document.getElementById('btn-mode-natural');
      const panePredefined = document.getElementById('pane-predefined-constraints');
      const paneNatural = document.getElementById('pane-natural-language');

      if (mode === 'natural') {
        if (panePredefined) panePredefined.classList.add('hidden');
        if (paneNatural) paneNatural.classList.remove('hidden');

        if (btnPredefined) {
          btnPredefined.className = 'flex-1 py-2 px-2.5 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-gray-600 hover:text-black font-extrabold text-xs cursor-pointer';
        }
        if (btnNatural) {
          btnNatural.className = 'flex-1 py-2 px-2.5 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 bg-black text-white shadow-xs font-black text-xs cursor-pointer';
        }

        const tx = document.getElementById('ai-custom-notes');
        if (tx) {
          tx.focus();
          updateAiCustomNotesCount();
        }
      } else {
        if (panePredefined) panePredefined.classList.remove('hidden');
        if (paneNatural) paneNatural.classList.add('hidden');

        if (btnPredefined) {
          btnPredefined.className = 'flex-1 py-2 px-2.5 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 bg-black text-white shadow-xs font-black text-xs cursor-pointer';
        }
        if (btnNatural) {
          btnNatural.className = 'flex-1 py-2 px-2.5 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-gray-600 hover:text-black font-extrabold text-xs cursor-pointer';
        }

        // In Predefined Constraints mode, do not display auto room badge or budget badge
        const autoBadge = document.getElementById('ai-auto-room-badge');
        if (autoBadge) autoBadge.classList.add('hidden');
        const budgetBadge = document.getElementById('ai-auto-budget-badge');
        if (budgetBadge) budgetBadge.classList.add('hidden');
      }
    }

    let aiCustomNotesDebounceTimer = null;

    function updateAiCustomNotesCount() {
      const el = document.getElementById('ai-custom-notes');
      const counter = document.getElementById('ai-custom-char-count');
      if (el && counter) {
        counter.innerText = `${el.value.length} / 500`;
      }

      // ONLY IN CUSTOM AI PROMPT MODE: preview detected room size intent, budget intent & sync theme live
      if (currentInputMode === 'natural' && el) {
        const text = el.value.trim();

        // 1. Room dimensions preview
        const autoDim = extractRoomDimensionsFromPrompt(text);
        const autoBadge = document.getElementById('ai-auto-room-badge');
        const autoDimText = document.getElementById('ai-auto-room-dimensions');
        const autoReasonText = document.getElementById('ai-auto-room-reason');
        if (autoDim && autoBadge && autoDimText && autoReasonText) {
          const sqFt = (autoDim.widthFt * autoDim.depthFt).toFixed(1);
          autoDimText.innerText = `${autoDim.widthFt.toFixed(1)} ft × ${autoDim.depthFt.toFixed(1)} ft (${sqFt} sq ft)`;
          autoReasonText.innerText = autoDim.reason;
          autoBadge.classList.remove('hidden');
          lastAutoDetectedDim = autoDim;
        } else if (autoBadge) {
          autoBadge.classList.add('hidden');
          lastAutoDetectedDim = null;
        }

        // 1b. Budget intent preview
        const autoBudget = extractBudgetFromPrompt(text);
        const budgetBadge = document.getElementById('ai-auto-budget-badge');
        const budgetAmountText = document.getElementById('ai-auto-budget-amount');
        const budgetReasonText = document.getElementById('ai-auto-budget-reason');
        if (autoBudget && budgetBadge && budgetAmountText && budgetReasonText) {
          budgetAmountText.innerText = autoBudget.formatted;
          budgetReasonText.innerText = autoBudget.reason;
          budgetBadge.classList.remove('hidden');
        } else if (budgetBadge) {
          budgetBadge.classList.add('hidden');
        }

        // 2. Synchronize theme detection from custom prompt
        const detectedTheme = extractThemeFromPrompt(text);
        if (detectedTheme) {
          currentSelectedTheme = detectedTheme;
          const subnavTheme = document.getElementById('subnav-theme-label');
          if (subnavTheme) subnavTheme.innerText = detectedTheme;
          document.querySelectorAll('.ai-theme-btn').forEach(btn => {
            if (btn.dataset.theme === detectedTheme) {
              btn.classList.add('active', 'border-black', 'bg-gray-50', 'border-2');
              btn.classList.remove('border-gray-200', 'bg-white');
            } else {
              btn.classList.remove('active', 'border-black', 'bg-gray-50', 'border-2');
              if (btn.dataset.theme === 'Kohler WasteLAB Eco-Luxury') {
                btn.classList.add('border-emerald-200', 'bg-emerald-50/40');
              } else {
                btn.classList.add('border-gray-200', 'bg-white');
              }
            }
          });
        }

        if (aiCustomNotesDebounceTimer) clearTimeout(aiCustomNotesDebounceTimer);
        if (text.length === 0) {
          const understoodContainer = document.getElementById('ai-understood-container');
          if (understoodContainer) understoodContainer.classList.add('hidden');
        } else if (text.length >= 8) {
          setAiNeedsRegeneration('Custom prompt entered. Click <strong>Generate Optimized Kohler Bundle</strong> to analyze and synthesize your suite.');
        }
      }
    }

    function clearAiCustomNotes() {
      const el = document.getElementById('ai-custom-notes');
      if (el) {
        el.value = '';
        if (aiCustomNotesDebounceTimer) clearTimeout(aiCustomNotesDebounceTimer);
        updateAiCustomNotesCount();
        const autoBadge = document.getElementById('ai-auto-room-badge');
        if (autoBadge) autoBadge.classList.add('hidden');
        const budgetBadge = document.getElementById('ai-auto-budget-badge');
        if (budgetBadge) budgetBadge.classList.add('hidden');
        lastAutoDetectedDim = null;
        const understoodContainer = document.getElementById('ai-understood-container');
        if (understoodContainer) understoodContainer.classList.add('hidden');
        setAiNeedsRegeneration('Prompt cleared. Type your wishlist or select predefined constraints, then click <strong>Generate</strong>.');
        el.focus();
      }
    }

    function appendPromptChip(text) {
      const el = document.getElementById('ai-custom-notes');
      if (!el) return;
      const cur = el.value.trim();
      if (cur.length > 0) {
        if (!cur.endsWith('.') && !cur.endsWith(',')) {
          el.value = cur + ', ' + text;
        } else {
          el.value = cur + ' ' + text;
        }
      } else {
        el.value = text;
      }
      updateAiCustomNotesCount();
      el.focus();
      setAiNeedsRegeneration(`Inspiration added: "<em>${text}</em>". Click <strong>Generate Optimized Kohler Bundle</strong> to analyze.`);
    }

    function parsePromptPreferences(notes, roomW = 3.2, roomD = 2.8, theme = 'Japanese Zen') {
      if (!notes || !notes.trim()) return [];
      const nLow = notes.toLowerCase();
      const tags = [];

      // If in Custom AI Prompt mode, prepend auto-adapted room size tag & budget tag if detected
      if (currentInputMode === 'natural') {
        const autoDim = extractRoomDimensionsFromPrompt(notes);
        if (autoDim) {
          const sqFt = (autoDim.widthFt * autoDim.depthFt).toFixed(1);
          tags.push(`✓ Room size auto-adapted: ${autoDim.widthFt.toFixed(1)}ft × ${autoDim.depthFt.toFixed(1)}ft (${sqFt} sq ft) — ${autoDim.reason}`);
        }
        const autoBudget = extractBudgetFromPrompt(notes);
        if (autoBudget) {
          tags.push(`✓ Budget target enforced: ${autoBudget.formatted} — selected budget-compliant suite`);
        }
      }

      // Atmosphere / Style
      if (nLow.includes('spa') || nLow.includes('zen') || nLow.includes('tranquil') || nLow.includes('resort')) {
        tags.push('✓ Japanese Zen spa atmosphere & tranquil wellness');
      } else if (nLow.includes('luxury') || nLow.includes('luxurious') || nLow.includes('opulent')) {
        tags.push('✓ Luxury high-end architectural styling');
      } else if (nLow.includes('minimalist') || nLow.includes('clean line') || nLow.includes('simple')) {
        tags.push('✓ Minimalist aesthetic with uncluttered surfaces');
      } else if (nLow.includes('industrial') || nLow.includes('loft') || nLow.includes('steel')) {
        tags.push('✓ Urban industrial aesthetic with architectural metals');
      }

      // Materials & Finishes
      if (nLow.includes('teak') || nLow.includes('wood') || nLow.includes('timber') || nLow.includes('natural finish') || nLow.includes('natural wood')) {
        tags.push('✓ Warm teak / natural wood preference');
      } else if (nLow.includes('brass') || nLow.includes('gold')) {
        tags.push('✓ Vibrant Brushed Brass hardware preference');
      } else if (nLow.includes('matte black') || nLow.includes('black')) {
        tags.push('✓ Matte Black architectural finishes');
      } else if (nLow.includes('marble') || nLow.includes('calacatta') || nLow.includes('quartz')) {
        tags.push('✓ Calacatta quartz luxury stone surfaces');
      }

      // Storage
      if (nLow.includes('storage') || nLow.includes('drawer') || nLow.includes('cabinet') || nLow.includes('organiz')) {
        tags.push('✓ Increased storage with deep vanity drawer system');
      }

      // Bathtub / Shower
      if (nLow.includes('bathtub') || nLow.includes('tub') || nLow.includes('soak')) {
        if (roomW >= 2.8 && roomD >= 2.6) {
          tags.push('✓ Bathtub requested (Freestanding Evok soaking tub)');
        } else {
          tags.push('⚠️ Bathtub requested: Space trade-off (prioritizing walk-in shower for room footprint)');
        }
      }
      if (nLow.includes('walk-in shower') || nLow.includes('open shower') || nLow.includes('walk in') || nLow.includes('shower')) {
        tags.push('✓ Spacious walk-in shower wet-room enclosure');
      }

      // Accessibility / Parents / Family
      if (nLow.includes('parent') || nLow.includes('elderly') || nLow.includes('accessib') || nLow.includes('safe') || nLow.includes('comfort')) {
        tags.push('✓ Accessibility & comfort (17" ADA chair-height toilet & wide clearances)');
      } else if (nLow.includes('family') || nLow.includes('kid')) {
        tags.push('✓ Family-friendly durable materials & anti-scald valving');
      }

      // Spatial / Layout
      if (nLow.includes('away from entrance') || nLow.includes('away from door') || nLow.includes('toilet away')) {
        tags.push('✓ Toilet positioned on far wet-wall away from entrance line-of-sight');
      }
      if (nLow.includes('spacious') || nLow.includes('open space') || nLow.includes('maximize open')) {
        tags.push('✓ Floating wall-hung fixtures to maximize visible open floor space');
      }

      // Eco / Water
      if (nLow.includes('water') || nLow.includes('saving') || nLow.includes('eco') || nLow.includes('watersense')) {
        tags.push('✓ Water-saving Kohler WaterSense dual-flush & air-induction fittings');
      }

      if (tags.length === 0) {
        tags.push(`✓ Custom requirements evaluated & incorporated into ${theme} suite`);
      }

      return tags;
    }

    function onPriorityCheckboxChange() {
      const inclusions = {
        toilet: document.getElementById('prio-smart-toilet') ? document.getElementById('prio-smart-toilet').checked : false,
        shower: document.getElementById('prio-thermo-shower') ? document.getElementById('prio-thermo-shower').checked : false,
        vanity: document.getElementById('prio-dual-vanity') ? document.getElementById('prio-dual-vanity').checked : false,
        mirror: document.getElementById('prio-smart-mirror') ? document.getElementById('prio-smart-mirror').checked : false
      };
      const notes = (document.getElementById('ai-custom-notes') ? document.getElementById('ai-custom-notes').value : '').trim();

      // If user unchecked everything and has no custom prompt, keep in empty state
      if (!inclusions.toilet && !inclusions.shower && !inclusions.vanity && !inclusions.mirror && !notes) {
        isAiEngineReset = true;
        currentAiRecommendation = null;
        const emptyContainer = document.getElementById('ai-empty-container');
        if (emptyContainer) emptyContainer.classList.remove('hidden');
        const feasibleContainer = document.getElementById('ai-feasible-container');
        if (feasibleContainer) feasibleContainer.classList.add('hidden');
        const impossibleContainer = document.getElementById('ai-impossible-container');
        if (impossibleContainer) impossibleContainer.classList.add('hidden');
        const applySection = document.getElementById('ai-apply-section');
        if (applySection) applySection.classList.add('hidden');
        return;
      }

      setAiNeedsRegeneration('Fixture inclusions updated. Click <strong>Generate Optimized Kohler Bundle</strong> to synthesize your custom suite.');
    }

    async function triggerGroqAiRecommendation() {
      const notes = (document.getElementById('ai-custom-notes') ? document.getElementById('ai-custom-notes').value : '').trim();
      let inclusions = {
        toilet: document.getElementById('prio-smart-toilet') ? document.getElementById('prio-smart-toilet').checked : false,
        shower: document.getElementById('prio-thermo-shower') ? document.getElementById('prio-thermo-shower').checked : false,
        vanity: document.getElementById('prio-dual-vanity') ? document.getElementById('prio-dual-vanity').checked : false,
        mirror: document.getElementById('prio-smart-mirror') ? document.getElementById('prio-smart-mirror').checked : false
      };

      // In Custom AI Prompt mode with notes entered, dynamically extract theme & inclusions from prompt
      let effectiveTheme = currentSelectedTheme;
      if (currentInputMode === 'natural' && notes) {
        const themeFromPrompt = extractThemeFromPrompt(notes);
        if (themeFromPrompt) {
          effectiveTheme = themeFromPrompt;
          currentSelectedTheme = themeFromPrompt;
          const subnavTheme = document.getElementById('subnav-theme-label');
          if (subnavTheme) subnavTheme.innerText = themeFromPrompt;
        } else if (!effectiveTheme || effectiveTheme === 'None' || effectiveTheme === 'none') {
          effectiveTheme = 'Minimalist Modern';
        }

        const promptInclusions = extractInclusionsFromPrompt(notes);
        if (promptInclusions) {
          inclusions = promptInclusions;
          if (document.getElementById('prio-smart-toilet')) document.getElementById('prio-smart-toilet').checked = !!inclusions.toilet;
          if (document.getElementById('prio-thermo-shower')) document.getElementById('prio-thermo-shower').checked = !!inclusions.shower;
          if (document.getElementById('prio-dual-vanity')) document.getElementById('prio-dual-vanity').checked = !!inclusions.vanity;
          if (document.getElementById('prio-smart-mirror')) document.getElementById('prio-smart-mirror').checked = !!inclusions.mirror;
        }
      }

      // Check if user has entered NO inputs at all
      if (!inclusions.toilet && !inclusions.shower && !inclusions.vanity && !inclusions.mirror && !notes) {
        renderAiRecommendationResults({
          feasible: false,
          empty_selection: true,
          failed_constraint: 'No Inputs Provided',
          failure_reason: 'Please select at least one fixture category on the left, or enter your requirements in the Custom AI Prompt tab.',
          suggestions: [
            'Check Toilet, Shower, Vanity, or Mirror',
            'Or switch to Custom AI Prompt and describe your dream bathroom'
          ]
        });
        return;
      }

      isAiEngineReset = false;

      const btn = document.getElementById('btn-generate-ai');
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Analyzing Constraints with Groq AI...</span>';
      btn.disabled = true;

      // ONLY IN CUSTOM AI PROMPT MODE: automatically adjust room size based on user prompt
      if (currentInputMode === 'natural' && notes) {
        const autoDim = extractRoomDimensionsFromPrompt(notes);
        if (autoDim) {
          applyAutoRoomDimensions(autoDim.widthFt, autoDim.depthFt, autoDim.heightFt, autoDim.reason);
        }
      }

      const wFtRaw = document.getElementById('ai-input-width') ? document.getElementById('ai-input-width').value : '';
      const dFtRaw = document.getElementById('ai-input-depth') ? document.getElementById('ai-input-depth').value : '';
      const hFtRaw = document.getElementById('ai-input-height') ? document.getElementById('ai-input-height').value : '';

      const wFt = parseFloat(wFtRaw) || (roomWidth * 3.28084);
      const dFt = parseFloat(dFtRaw) || (roomDepth * 3.28084);
      const hFt = parseFloat(hFtRaw) || (roomHeight * 3.28084);

      const priorities = [];
      if (inclusions.toilet) priorities.push('Smart Bidet Toilet');
      if (inclusions.shower) priorities.push('Thermostatic Shower');
      if (inclusions.vanity) priorities.push('Master Dual Vanity');
      if (inclusions.mirror) priorities.push('Alexa Voice Mirror');

      const slider = document.getElementById('ai-budget-slider');
      let budgetNum = slider ? parseInt(slider.value) : 350000;
      let budget = document.getElementById('ai-budget-label').innerText;
      let promptBudget = null;

      if (currentInputMode === 'natural' && notes) {
        promptBudget = extractBudgetFromPrompt(notes);
        if (promptBudget) {
          budgetNum = promptBudget.amountINR;
          budget = promptBudget.formatted;
        }
      }

      const roomW = Math.round(wFt * 0.3048 * 10) / 10;
      const roomD = Math.round(dFt * 0.3048 * 10) / 10;

      try {
        const response = await fetch('/api/groq/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dimensions: `${wFt}ft x ${dFt}ft x ${hFt}ft`,
            room_width_m: roomW,
            room_depth_m: roomD,
            budget: budget,
            budget_num: budgetNum,
            theme: effectiveTheme,
            priorities: priorities.join(', '),
            inclusions: inclusions,
            customerNotes: notes,
            prompt_budget: promptBudget,
            input_mode: currentInputMode
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (currentInputMode === 'natural' && data.auto_adjusted_dimensions) {
            const ad = data.auto_adjusted_dimensions;
            applyAutoRoomDimensions(ad.widthFt, ad.depthFt, ad.heightFt, ad.reason);
          }
          if (data.theme) {
            currentSelectedTheme = data.theme;
            const subnavTheme = document.getElementById('subnav-theme-label');
            if (subnavTheme) subnavTheme.innerText = data.theme;
          }
          currentAiRecommendation = data;
          renderAiRecommendationResults(data);
          if (data.feasible) {
            const roomMsg = (currentInputMode === 'natural' && data.auto_adjusted_dimensions) ? ` (Room auto-set to ${data.auto_adjusted_dimensions.widthFt}ft × ${data.auto_adjusted_dimensions.depthFt}ft)` : '';
            showToast(`✨ Groq Multi-Objective Bundle generated (${data.bundle ? data.bundle.length : 0} fixtures)${roomMsg}! Click "Apply AI Bundle" below to place.`);
          } else {
            showToast('No feasible configuration found for constraints');
          }
          return;
        }
        throw new Error('Server returned non-200');
      } catch (e) {
        console.warn('Backend Groq endpoint not reachable, running client-side optimization engine:', e);
        const clientBundle = optimizeKohlerBundle(roomW, roomD, budgetNum, effectiveTheme, priorities, notes, inclusions);
        currentAiRecommendation = clientBundle;
        renderAiRecommendationResults(clientBundle);
        if (clientBundle.feasible) {
          showToast(`✨ Generated bundle (${clientBundle.bundle ? clientBundle.bundle.length : 0} fixtures)! Click "Apply AI Bundle" to place.`);
        } else {
          showToast('No feasible configuration found for constraints');
        }
      } finally {
        btn.innerHTML = '<i class="fa-solid fa-bolt text-amber-500"></i><span>Generate Optimized Kohler Bundle (Groq AI)</span>';
        btn.disabled = false;
      }
    }

    function generateClientKohlerBundle(theme = 'Minimalist Modern', budget = '₹3,50,000', dimensions = '10.5ft x 9.2ft') {
      const wFt = parseFloat(document.getElementById('ai-input-width') ? document.getElementById('ai-input-width').value : 10.5) || 10.5;
      const dFt = parseFloat(document.getElementById('ai-input-depth') ? document.getElementById('ai-input-depth').value : 9.2) || 9.2;
      const slider = document.getElementById('ai-budget-slider');
      const budgetNum = slider ? parseInt(slider.value) : 350000;
      const roomW = Math.round(wFt * 0.3048 * 10) / 10;
      const roomD = Math.round(dFt * 0.3048 * 10) / 10;
      const inclusions = {
        toilet: document.getElementById('prio-smart-toilet') ? document.getElementById('prio-smart-toilet').checked : true,
        shower: document.getElementById('prio-thermo-shower') ? document.getElementById('prio-thermo-shower').checked : true,
        vanity: document.getElementById('prio-dual-vanity') ? document.getElementById('prio-dual-vanity').checked : true,
        mirror: document.getElementById('prio-smart-mirror') ? document.getElementById('prio-smart-mirror').checked : false
      };
      return optimizeKohlerBundle(roomW, roomD, budgetNum, theme, [], '', inclusions);
    }
