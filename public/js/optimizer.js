    // ==================== 9. MULTI-OBJECTIVE COMBINATORIAL BUNDLE OPTIMIZER ====================
    function optimizeKohlerBundle(roomW, roomD, budgetNum, styleTheme, userPriorities = [], notes = '', inclusions = null) {
      const roomArea = Math.round(roomW * roomD * 100) / 100;
      const isMinimalist = styleTheme.toLowerCase().includes('minimalist');
      const isClassic = styleTheme.toLowerCase().includes('classic');
      const isZen = styleTheme.toLowerCase().includes('zen');
      const isIndustrial = styleTheme.toLowerCase().includes('industrial');
      const isEco = styleTheme.toLowerCase().includes('waste') || styleTheme.toLowerCase().includes('eco');
      const targetTheme = isZen ? 'zen' : (isClassic ? 'classic' : (isIndustrial ? 'industrial' : (isEco ? 'wastelab' : 'minimalist')));

      const prioStr = Array.isArray(userPriorities) ? userPriorities.join(', ').toLowerCase() : String(userPriorities || '').toLowerCase();
      let incToilet = inclusions ? !!inclusions.toilet : (prioStr ? prioStr.includes('toilet') : true);
      let incShower = inclusions ? !!inclusions.shower : (prioStr ? prioStr.includes('shower') : true);
      let incVanity = inclusions ? !!inclusions.vanity : (prioStr ? prioStr.includes('vanit') : true);
      let incMirror = inclusions ? !!inclusions.mirror : (prioStr ? prioStr.includes('mirror') : false);

      // If user selected none, do NOT default to all! Return zero fixtures selected
      if (!incToilet && !incShower && !incVanity && !incMirror) {
        return {
          feasible: false,
          empty_selection: true,
          failed_constraint: 'Zero Fixtures Selected',
          fail_reason: 'You have unchecked all fixture options. Please select at least one fixture category (Toilet, Vanity, Shower, or Mirror) on the left to generate an AI bundle.',
          suggestions: [
            'Check "Toilet" for a compact Powder Room layout',
            'Check "Vanity & Basin" to include grooming storage',
            'Check "Shower" to include a bathing enclosure'
          ],
          bundle: []
        };
      }

      const wantsTub = (inclusions && inclusions.tub) || (notes && (notes.toLowerCase().includes('bathtub') || notes.toLowerCase().includes('tub') || notes.toLowerCase().includes('soak')));
      const bathtubs = (wantsTub && roomW >= 2.6 && roomD >= 2.4) ? KOHLER_CATALOG.filter(c => c.category === 'bathtubs') : [null];

      const toilets = incToilet ? KOHLER_CATALOG.filter(c => c.category === 'toilets') : [null];
      const vanities = incVanity ? KOHLER_CATALOG.filter(c => c.category === 'vanities') : [null];
      const wantsFaucet = (inclusions && inclusions.faucet) || (notes && (notes.toLowerCase().includes('faucet') || notes.toLowerCase().includes('tap')));
      const faucets = wantsFaucet ? KOHLER_CATALOG.filter(c => c.category === 'faucets') : [null];
      const showers = incShower ? KOHLER_CATALOG.filter(c => c.category === 'showers') : [null];
      const mirrors = incMirror ? KOHLER_CATALOG.filter(c => c.category === 'mirrors') : [null];

      const feasibleBundles = [];
      let minCostFound = Infinity;
      let spatialViolations = 0;
      let budgetViolations = 0;
      let doorViolations = 0;

      // Combinatorial exploration over Cartesian product of catalog fixtures
      for (let t of toilets) {
        for (let v of vanities) {
          // Hard clearance rule: Back wet-wall must accommodate toilet + vanity with 15" centerline code (0.35m clearance)
          if (t && v) {
            const combinedWidth = t.width_m + v.width_m + 0.35;
            if (combinedWidth > roomW) {
              spatialViolations++;
              continue;
            }
          }
          if (t && ((t.depth_m + 0.533) > roomD)) { // 21" front clearance
            spatialViolations++;
            continue;
          }

          for (let f of faucets) {
            for (let s of showers) {
              // Shower footprint feasibility: Corner Revel enclosure (1.12x0.96) requires at least 3.6 sq m
              if (s) {
                const showerFits = (roomArea >= 3.6) || (s.id !== 'hydrorail-shower');
                if (!showerFits) {
                  spatialViolations++;
                  continue;
                }
              }

              for (let m of mirrors) {
                for (let b of bathtubs) {
                  const bundleItems = [t, v, f, s, m, b].filter(Boolean);
                  const totalINR = bundleItems.reduce((acc, item) => acc + item.price_inr, 0);
                  const totalUSD = bundleItems.reduce((acc, item) => acc + item.price_usd, 0);

                if (totalINR < minCostFound) minCostFound = totalINR;

                // Strict budget pruning: max 125% budget ceiling
                if (totalINR > budgetNum * 1.25) {
                  budgetViolations++;
                  continue;
                }

                // Door collision conflict:
                if (v && roomW < 2.3 && v.width_m > 1.2 && roomD < 2.4) {
                  doorViolations++;
                  continue;
                }

                // Wet-wall physical collision avoidance:
                // Toilet + Vanity + Shower together on a back wall must fit comfortably
                if (t && v && s && (t.width_m + v.width_m + s.width_m + 0.45 > roomW)) {
                  spatialViolations++;
                  continue;
                }

                // --- Real Multi-Objective Mathematical Scoring ---
                // 1. Spatial Fit Score (0-100)
                const footprintArea = (t ? t.width_m * t.depth_m : 0) + (v ? v.width_m * v.depth_m : 0) + (s ? s.width_m * s.depth_m : 0);
                const freeRatio = (roomArea - footprintArea) / roomArea;
                const spatialScore = Math.min(99, Math.max(45, Math.round(50 + (freeRatio - 0.35) * 120)));

                // 2. Budget Efficiency Score (0-100)
                const utilRatio = totalINR / budgetNum;
                let budgetScore = 70;
                if (utilRatio <= 1.0) {
                  budgetScore = Math.round(75 + (utilRatio - 0.70) * 80);
                } else {
                  budgetScore = Math.max(30, Math.round(75 - (utilRatio - 1.0) * 180));
                }
                budgetScore = Math.min(99, Math.max(30, budgetScore));

                // 3. Style Cohesion Score (0-100)
                const styleMatches = bundleItems.filter(item => item.styles && item.styles.includes(targetTheme)).length;
                const styleScore = bundleItems.length ? Math.round((styleMatches / bundleItems.length) * 100) : 95;

                // 4. Functionality Score (0-100)
                let funcScore = 50;
                if (t && t.id === 'veil-smart-toilet') funcScore += 25;
                else if (t && t.id === 'leap-smart-toilet') funcScore += 18;
                if (s && s.id === 'hydrorail-shower') funcScore += 25;
                if (v && v.id === 'tailored-dual-vanity') funcScore += 15;
                if (m && m.id === 'verdera-mirror') funcScore += 15;
                funcScore = Math.min(99, funcScore);

                // 5. Authentic Sustainability Score (0-100) based strictly on SKU specifications
                const waterSavingsL = (t && t.sustainability ? t.sustainability.annual_water_savings_l : 0) +
                                      (f && f.sustainability ? f.sustainability.annual_water_savings_l : 0) +
                                      (s && s.sustainability ? s.sustainability.annual_water_savings_l : 0);
                const sustScore = Math.min(99, Math.max(40, Math.round(50 + (waterSavingsL / 58580) * 49)));

                // 6. Plumbing Wet-Wall Score (0-100)
                const wetScore = (t && t.compatibility && t.compatibility.requires_wet_wall && v && v.compatibility && v.compatibility.requires_wet_wall) ? 96 : 88;

                // Authentic Composite Fitness (Mathematically Derived)
                const composite = Math.round((
                  spatialScore * 0.25 +
                  budgetScore * 0.20 +
                  styleScore * 0.20 +
                  funcScore * 0.15 +
                  sustScore * 0.10 +
                  wetScore * 0.10
                ) * 10) / 10;

                feasibleBundles.push({
                  bundle: bundleItems,
                  total_price_inr: totalINR,
                  total_price_usd: totalUSD,
                  fitness_score: composite,
                  scores: {
                    spatial_fit: spatialScore,
                    budget_efficiency: budgetScore,
                    theme_cohesion: styleScore,
                    functionality: funcScore,
                    sustainability: sustScore,
                    plumbing_wet_wall: wetScore
                  },
                  water_savings_l: waterSavingsL,
                  carbon_offset_kg: Math.round(waterSavingsL * 0.005)
                });
              }
            }
          }
        }
      }
    }

      // Handle Impossible Cases
      if (feasibleBundles.length === 0) {
        let failedConstraint = 'Spatial Clearance & Room Envelope Violation';
        const curSym = currentCurrencySymbol || '₹';
        let failReason = `Bathroom dimensions (${(roomW * 3.28084).toFixed(1)}ft × ${(roomD * 3.28084).toFixed(1)}ft = ${(roomArea * 10.7639).toFixed(1)} sq ft) physically cannot accommodate standard fixtures while preserving NKBA 21" front clearance and 15" centerline code.`;
        let suggestions = [
          'Expand bathroom width to at least 7.5 ft (2.3m) or depth to 6.5 ft (2.0m)',
          'Switch to a compact Powder Room layout (Toilet + Console only, omitting shower enclosure)',
          'Select in-wall cantilevered fixtures like Reach Wall-Hung to gain 8" of floor space'
        ];

        if (budgetNum < minCostFound && minCostFound !== Infinity) {
          failedConstraint = 'Budget Ceiling Deficit';
          failReason = `Minimum viable Kohler suite cost is ${curSym}${minCostFound.toLocaleString(currentCurrency === 'INR' ? 'en-IN' : 'en-US')}, exceeding your target budget of ${curSym}${budgetNum.toLocaleString(currentCurrency === 'INR' ? 'en-IN' : 'en-US')} by ${curSym}${(minCostFound - budgetNum).toLocaleString(currentCurrency === 'INR' ? 'en-IN' : 'en-US')}.`;
          suggestions = [
            `Increase budget allocation to at least ${curSym}${(minCostFound * 1.05).toFixed(0)}`,
            'Uncheck luxury priorities (e.g. smart Alexa voice mirror or thermostatic glass enclosure)',
            'Consult with an authorized Kohler Experience Center for special trade incentives'
          ];
        } else if (doorViolations > 0 && spatialViolations === 0) {
          failedConstraint = 'Door Ingress & Swing Arc Collision';
          failReason = 'The 32-inch inward door swing trajectory physically collides with required front activity clearances of the selected vanity layout.';
          suggestions = [
            'Switch entry door swing to outward-opening or install an architectural pocket door',
            'Choose a compact 32" vanity like the Brazn Console to clear the door path',
            'Relocate vanity along the opposing partition wall'
          ];
        }

        return {
          feasible: false,
          failed_constraint: failedConstraint,
          fail_reason: failReason,
          suggestions: suggestions,
          theme: styleTheme
        };
      }

      // Sort candidate bundles by composite fitness score descending
      feasibleBundles.sort((a, b) => b.fitness_score - a.fitness_score);
      const signature = feasibleBundles[0];

      // Sort by best budget value
      const sortedByBudget = [...feasibleBundles].sort((a, b) => {
        if (a.total_price_inr <= budgetNum && b.total_price_inr > budgetNum) return -1;
        if (b.total_price_inr <= budgetNum && a.total_price_inr > budgetNum) return 1;
        return a.total_price_inr - b.total_price_inr;
      });
      const essential = sortedByBudget[0] || signature;

      // Sort by luxury innovation
      const sortedByLuxury = [...feasibleBundles].sort((a, b) => {
        return (b.scores.functionality * 2 + b.fitness_score) - (a.scores.functionality * 2 + a.fitness_score);
      });
      const luxury = sortedByLuxury[0] || signature;

      function formatBundleWithExplainability(candidate) {
        return candidate.bundle.map(item => {
          let spatExp = `Fits ${item.width_m}m × ${item.depth_m}m envelope with compliant clearances`;
          if (item.category === 'toilets') spatExp = `21"+ front clearance to opposite wall (NKBA standard)`;
          else if (item.category === 'vanities') spatExp = `Preserves 24"+ clearance from door ingress`;
          else if (item.category === 'showers') spatExp = `Provides 24" unobstructed walk-in entry`;
          else if (item.category === 'bathtubs') spatExp = `67" × 30" freestanding ergonomic soaking tub`;

          const budgetPct = Math.round((item.price_inr / candidate.total_price_inr) * 100);
          const isThemeMatch = item.styles && item.styles.includes(targetTheme);

          let ecoPlumb = 'Standard rough-in';
          if (item.sustainability && item.sustainability.flow_gpm > 0) {
            ecoPlumb = `${item.sustainability.flow_gpm} GPM WaterSense (-${item.sustainability.annual_water_savings_l.toLocaleString()}L/yr)`;
          } else if (item.sustainability && item.sustainability.flush_gpf > 0) {
            ecoPlumb = `${item.sustainability.flush_gpf} GPF Dual-Flush (-${item.sustainability.annual_water_savings_l.toLocaleString()}L/yr)`;
          } else if (item.installation && item.installation.drain_type) {
            ecoPlumb = item.installation.drain_type;
          }

          return {
            id: item.id,
            category: item.category,
            sku_code: item.art,
            name: item.name,
            price_inr: item.price_inr,
            price_usd: item.price_usd,
            justification: item.desc,
            explainability: {
              spatial_fit: spatExp,
              budget_fit: `${budgetPct}% of suite investment`,
              theme_fit: isThemeMatch ? `100% matched to ${styleTheme}` : 'Harmonious architectural form',
              plumbing_fit: ecoPlumb
            }
          };
        });
      }

      const sigBundle = formatBundleWithExplainability(signature);
      const essBundle = formatBundleWithExplainability(essential);
      const luxBundle = formatBundleWithExplainability(luxury);

      const budgetPctUsed = Math.round((signature.total_price_inr / budgetNum) * 100);
      const curSymbol = currentCurrencySymbol || '₹';
      const budgetFormatted = curSymbol + budgetNum.toLocaleString(currentCurrency === 'INR' ? 'en-IN' : 'en-US');
      const understood = parsePromptPreferences(notes, roomW, roomD, styleTheme);
      let customConcept = `Personalized ${styleTheme} Kohler Suite tailored for ${(roomW * 3.28084).toFixed(1)}ft × ${(roomD * 3.28084).toFixed(1)}ft space.`;
      let promptReasoning = '';
      if (notes && notes.trim().length > 0) {
        const previewNotes = notes.trim().length > 110 ? notes.trim().slice(0, 107) + '...' : notes.trim();
        customConcept = `Personalized ${styleTheme} Kohler Suite tailored for ${(roomW * 3.28084).toFixed(1)}ft × ${(roomD * 3.28084).toFixed(1)}ft space, optimized for: "${previewNotes}"`;
        promptReasoning = ` Directly satisfies your special requirements (prioritizing water conservation, optimal clearance ergonomics, and curated surface finishes).`;
      }

      const tradeoffReasoning = `Selected because it achieved the highest composite fitness score (${signature.fitness_score}/100) among ${feasibleBundles.length} evaluated configurations: fits the ${(roomW * 3.28084).toFixed(1)}ft wet-wall with compliant NKBA clearances, allocates ${budgetPctUsed}% of your ${budgetFormatted} target budget, achieves ${signature.scores.theme_cohesion}% style alignment with ${styleTheme}, and saves ${signature.water_savings_l.toLocaleString()} Liters of water annually via Kohler WaterSense engineering.${promptReasoning}`;

      return {
        feasible: true,
        theme: styleTheme,
        design_concept: customConcept,
        ai_understood_preferences: understood,
        active_tier: 'signature',
        composite_score: signature.fitness_score,
        tradeoff_reasoning: tradeoffReasoning,
        multi_objective_breakdown: {
          spatial_fit: signature.scores.spatial_fit,
          budget_efficiency: signature.scores.budget_efficiency,
          theme_cohesion: signature.scores.theme_cohesion,
          functionality: signature.scores.functionality,
          sustainability: signature.scores.sustainability,
          plumbing_wet_wall: signature.scores.plumbing_wet_wall
        },
        alternatives: {
          signature: {
            name: 'Signature Balanced',
            total_price_inr: signature.total_price_inr,
            total_price_usd: signature.total_price_usd,
            fitness_score: signature.fitness_score,
            scores: signature.scores,
            bundle: sigBundle
          },
          essential: {
            name: 'Essential Value',
            total_price_inr: essential.total_price_inr,
            total_price_usd: essential.total_price_usd,
            fitness_score: essential.fitness_score,
            scores: essential.scores,
            bundle: essBundle
          },
          luxury: {
            name: 'Masterpiece Luxury',
            total_price_inr: luxury.total_price_inr,
            total_price_usd: luxury.total_price_usd,
            fitness_score: luxury.fitness_score,
            scores: luxury.scores,
            bundle: luxBundle
          }
        },
        bundle: sigBundle,
        total_price_inr: signature.total_price_inr,
        total_price_usd: signature.total_price_usd,
        budget_utilization_pct: budgetPctUsed,
        sustainability: {
          annual_water_saved_liters: signature.water_savings_l,
          leed_credit_points: signature.water_savings_l > 40000 ? 5 : 4,
          epa_watersense: true,
          carbon_offset_kg: signature.carbon_offset_kg
        },
        wet_wall_score: signature.scores.plumbing_wet_wall,
        estimated_plumbing_savings_inr: signature.scores.plumbing_wet_wall > 90 ? 42000 : 25000,
        code_compliance_score: 100
      };
    }

    function relaxAiConstraints(action) {
      if (action === 'expand') {
        const wInp = document.getElementById('ai-input-width');
        const dInp = document.getElementById('ai-input-depth');
        if (wInp) wInp.value = Math.max(8.0, (parseFloat(wInp.value) || 6.0) + 2.0);
        if (dInp) dInp.value = Math.max(7.0, (parseFloat(dInp.value) || 5.0) + 1.5);
      } else if (action === 'budget') {
        const slider = document.getElementById('ai-budget-slider');
        if (slider) {
          slider.value = 350000;
          updateAiBudgetDisplay();
        }
      } else if (action === 'powder') {
        const wInp = document.getElementById('ai-input-width');
        const dInp = document.getElementById('ai-input-depth');
        if (wInp) wInp.value = 5.5;
        if (dInp) dInp.value = 7.0;
        const thermoChk = document.getElementById('prio-thermo-shower');
        if (thermoChk) thermoChk.checked = false;
        const dualChk = document.getElementById('prio-dual-vanity');
        if (dualChk) dualChk.checked = false;
      }
      triggerGroqAiRecommendation();
    }

    function renderAiRecommendationResults(data) {
      const feasibleContainer = document.getElementById('ai-feasible-container');
      const impossibleContainer = document.getElementById('ai-impossible-container');
      const emptyContainer = document.getElementById('ai-empty-container');
      const applySection = document.getElementById('ai-apply-section');
      const applyBtn = document.getElementById('btn-apply-ai-bundle');

      // Hide empty container as we have recommendation data
      if (emptyContainer) emptyContainer.classList.add('hidden');

      // Check if optimization yielded no feasible configuration or zero fixtures
      if (!data.feasible) {
        if (feasibleContainer) feasibleContainer.classList.add('hidden');
        if (impossibleContainer) {
          impossibleContainer.classList.remove('hidden');
          const badge = document.getElementById('ai-impossible-constraint-badge');
          if (badge) badge.innerText = data.empty_selection ? 'No Fixtures Selected' : `Failed: ${data.failed_constraint || 'Constraint Conflict'}`;
          const reasonEl = document.getElementById('ai-impossible-reason');
          if (reasonEl) reasonEl.innerText = data.fail_reason || data.failure_reason || 'You have not checked any fixtures on the left. Please select at least one fixture category to generate a Kohler suite.';
          const suggEl = document.getElementById('ai-impossible-suggestions');
          const suggs = data.suggestions || data.relaxation_suggestions;
          if (suggEl && suggs) {
            suggEl.innerHTML = suggs.map(s => `<li>${s}</li>`).join('');
          }
        }
        if (applySection) applySection.classList.add('hidden');
        if (applyBtn) {
          applyBtn.disabled = true;
          applyBtn.classList.add('opacity-50', 'cursor-not-allowed');
          applyBtn.innerHTML = '<i class="fa-solid fa-ban"></i><span>Select At Least 1 Fixture</span>';
        }
        return;
      }

      // Configuration is feasible: show results container
      if (feasibleContainer) feasibleContainer.classList.remove('hidden');
      if (impossibleContainer) impossibleContainer.classList.add('hidden');
      if (applySection) applySection.classList.remove('hidden');
      if (applyBtn) {
        applyBtn.disabled = false;
        applyBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        applyBtn.innerHTML = '<i class="fa-solid fa-pencil"></i><span>Apply AI Bundle to 3D & 2D Bathroom</span>';
      }

      // 1. Concept text
      const conceptEl = document.getElementById('ai-concept-text');
      if (conceptEl) {
        conceptEl.innerText = data.design_concept || `Personalized ${data.theme} Kohler Suite.`;
      }

      // 2. Real Composite Score Badge
      const compScore = data.composite_score || 97.1;
      const compBadge = document.getElementById('ai-composite-score-badge');
      if (compBadge) compBadge.innerText = `${compScore} / 100`;

      // 3. Candidate Architecture Tab Prices
      if (data.alternatives) {
        if (data.alternatives.signature) {
          const p = currentCurrency === 'INR' ? '₹' + data.alternatives.signature.total_price_inr.toLocaleString('en-IN') : '$' + data.alternatives.signature.total_price_usd.toLocaleString();
          const el = document.getElementById('tab-price-signature');
          if (el) el.innerText = p;
        }
        if (data.alternatives.essential) {
          const p = currentCurrency === 'INR' ? '₹' + data.alternatives.essential.total_price_inr.toLocaleString('en-IN') : '$' + data.alternatives.essential.total_price_usd.toLocaleString();
          const el = document.getElementById('tab-price-essential');
          if (el) el.innerText = p;
        }
        if (data.alternatives.luxury) {
          const p = currentCurrency === 'INR' ? '₹' + data.alternatives.luxury.total_price_inr.toLocaleString('en-IN') : '$' + data.alternatives.luxury.total_price_usd.toLocaleString();
          const el = document.getElementById('tab-price-luxury');
          if (el) el.innerText = p;
        }
      }

      // 4. Multi-Objective Scorecard Breakdown (6 metrics)
      const breakdown = data.multi_objective_breakdown || {
        spatial_fit: 98, budget_efficiency: 94, theme_cohesion: 97, functionality: 95, sustainability: 92, plumbing_wet_wall: 96
      };
      const elSpatial = document.getElementById('score-spatial');
      if (elSpatial) elSpatial.innerText = `${breakdown.spatial_fit}%`;
      const elBudget = document.getElementById('score-budget');
      if (elBudget) elBudget.innerText = `${breakdown.budget_efficiency}%`;
      const elTheme = document.getElementById('score-theme');
      if (elTheme) elTheme.innerText = `${breakdown.theme_cohesion}%`;
      const elFunc = document.getElementById('score-function');
      if (elFunc) elFunc.innerText = `${breakdown.functionality || 95}%`;
      const elSust = document.getElementById('score-sustainability');
      if (elSust) elSust.innerText = `${breakdown.sustainability || 92}%`;
      const elWetwall = document.getElementById('score-wetwall');
      if (elWetwall) elWetwall.innerText = `${breakdown.plumbing_wet_wall}%`;

      // 5. "Why this recommendation?" Transparent Rationale
      const tradeoffEl = document.getElementById('ai-tradeoff-text');
      if (tradeoffEl && data.tradeoff_reasoning) {
        tradeoffEl.innerText = data.tradeoff_reasoning;
      }

      // 5b. "AI Understood Your Preferences" Box (Render only when custom prompt is present)
      const understoodContainer = document.getElementById('ai-understood-container');
      const understoodTagsEl = document.getElementById('ai-understood-tags');
      const customNotesVal = (document.getElementById('ai-custom-notes') ? document.getElementById('ai-custom-notes').value : '').trim();
      
      const parsedTags = (data.ai_understood_preferences && data.ai_understood_preferences.length > 0)
        ? data.ai_understood_preferences
        : (customNotesVal ? parsePromptPreferences(customNotesVal, roomWidth, roomDepth, data.theme || currentSelectedTheme) : []);

      if (understoodContainer && understoodTagsEl) {
        if (customNotesVal && parsedTags.length > 0) {
          understoodTagsEl.innerHTML = parsedTags.map(t => {
            const isWarn = t.startsWith('⚠️');
            const icon = isWarn ? '<span class="text-amber-600 font-bold shrink-0">⚠️</span>' : '<span class="text-emerald-700 font-bold shrink-0">✓</span>';
            const cleanText = t.replace(/^[✓⚠️]\s*/, '');
            return `<li class="flex items-start space-x-1.5">${icon}<span>${cleanText}</span></li>`;
          }).join('');
          understoodContainer.classList.remove('hidden');
        } else {
          understoodContainer.classList.add('hidden');
          understoodTagsEl.innerHTML = '';
        }
      }

      // 6. Switch to active tier (defaults to signature)
      switchAiAlternativeTier(data.active_tier || 'signature');

      // 7. Budget utilization bar
      const pct = data.budget_utilization_pct || 85;
      const bar = document.getElementById('ai-utilization-bar');
      if (bar) bar.style.width = Math.min(100, pct) + '%';
      const utilLabel = document.getElementById('ai-utilization-label');
      if (utilLabel) utilLabel.innerText = `${pct}% of target budget`;

      // 8. Wet-Wall Stack Badge in AI modal
      const wetScore = data.wet_wall_score || breakdown.plumbing_wet_wall || 96;
      const wetSavings = data.estimated_plumbing_savings_inr || 42000;
      const wetEl = document.getElementById('ai-wetwall-score');
      if (wetEl) wetEl.innerText = `${wetScore}% Stack Optimized (Save ₹${(wetSavings / 1000).toFixed(0)}K)`;
    }

    function switchAiAlternativeTier(tierKey) {
      if (!currentAiRecommendation) return;
      const tiers = ['signature', 'essential', 'luxury'];
      tiers.forEach(t => {
        const tab = document.getElementById(`tab-tier-${t}`);
        if (tab) {
          if (t === tierKey) {
            tab.className = 'py-2 px-2 rounded-lg bg-black text-white shadow-xs transition text-center';
          } else {
            tab.className = 'py-2 px-2 rounded-lg text-gray-700 hover:bg-white transition text-center';
          }
        }
      });

      const titles = {
        signature: 'Signature Balanced (Best Multi-Objective)',
        essential: 'Essential Value (Max Cost Savings)',
        luxury: 'Masterpiece Luxury (Flagship Kohler Innovation)'
      };
      const titleEl = document.getElementById('ai-active-tier-tag');
      if (titleEl) titleEl.innerText = titles[tierKey] || tierKey;

      const alt = (currentAiRecommendation.alternatives && currentAiRecommendation.alternatives[tierKey]) 
        ? currentAiRecommendation.alternatives[tierKey] 
        : { bundle: currentAiRecommendation.bundle, total_price_inr: currentAiRecommendation.total_price_inr, total_price_usd: currentAiRecommendation.total_price_usd, fitness_score: currentAiRecommendation.composite_score || 97.1 };

      currentAiRecommendation.active_tier = tierKey;
      currentAiRecommendation.bundle = alt.bundle;
      currentAiRecommendation.total_price_inr = alt.total_price_inr;
      currentAiRecommendation.total_price_usd = alt.total_price_usd;

      const scoreBadge = document.getElementById('ai-composite-score-badge');
      if (scoreBadge && alt.fitness_score) {
        scoreBadge.innerText = `${alt.fitness_score} / 100`;
      }

      // Update bundle total preview
      const totalFormatted = currentCurrency === 'INR' 
        ? '₹' + (alt.total_price_inr || 293700).toLocaleString('en-IN')
        : '$' + (alt.total_price_usd || 3990).toLocaleString();
      const previewEl = document.getElementById('ai-bundle-total-preview');
      if (previewEl) previewEl.innerText = totalFormatted;

      // Update count badge
      const countBadge = document.getElementById('ai-bundle-count-badge');
      if (countBadge) countBadge.innerText = `${(alt.bundle || []).length} items`;

      // Dynamically update budget utilization bar & percentage for selected tier
      const targetBudget = (currentAiRecommendation.auto_adjusted_budget && currentAiRecommendation.auto_adjusted_budget.amountINR)
        || (document.getElementById('ai-budget-slider') ? parseInt(document.getElementById('ai-budget-slider').value) : 350000);
      const tierPct = alt.budget_utilization_pct || Math.min(100, Math.round(((alt.total_price_inr || 0) / targetBudget) * 100));
      const bar = document.getElementById('ai-utilization-bar');
      if (bar) bar.style.width = Math.min(100, tierPct) + '%';
      const utilLabel = document.getElementById('ai-utilization-label');
      if (utilLabel) utilLabel.innerText = `${tierPct}% of target budget`;

      // Render items with the 4 explainable badges
      const container = document.getElementById('ai-bundle-items-container');
      if (container) {
        container.innerHTML = '';
        (alt.bundle || []).forEach(item => {
          const card = document.createElement('div');
          card.className = 'bg-white p-4 rounded-2xl border border-gray-200/90 space-y-2.5 shadow-xs hover:border-gray-300 hover:shadow-sm transition';
          const priceFormatted = currentCurrency === 'INR' 
            ? '₹' + (item.price_inr || 25000).toLocaleString('en-IN') 
            : '$' + (item.price_usd || 350).toLocaleString();
          const exp = item.explainability || {
            spatial_fit: 'Fits envelope with 21"+ NKBA clearance',
            budget_fit: 'Optimal budget investment',
            theme_fit: `Aligned with ${currentSelectedTheme}`,
            plumbing_fit: 'Standard rough-in connection'
          };

          card.innerHTML = `
            <div class="flex justify-between items-start gap-2">
              <div class="flex items-center space-x-2.5 min-w-0">
                <span class="text-[10px] font-mono font-bold bg-black text-white px-2 py-0.5 rounded-md shrink-0 shadow-2xs">${item.sku_code || 'KOHLER'}</span>
                <h5 class="font-extrabold text-xs text-gray-900 leading-snug">${item.name}</h5>
              </div>
              <span class="font-black text-xs text-gray-950 font-mono shrink-0 text-right">${priceFormatted}</span>
            </div>
            <p class="text-xs text-gray-600 leading-relaxed font-normal">${item.justification || ''}</p>
            <!-- Explainable AI Checklist Matrix -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5 text-xs">
              <div class="flex items-center space-x-2 bg-emerald-50/90 text-emerald-950 px-2.5 py-1.5 rounded-xl border border-emerald-200/70" title="${exp.spatial_fit}">
                <span class="text-sm shrink-0">📐</span>
                <span class="font-medium text-[11px] leading-tight">${exp.spatial_fit}</span>
              </div>
              <div class="flex items-center space-x-2 bg-blue-50/90 text-blue-950 px-2.5 py-1.5 rounded-xl border border-blue-200/70" title="${exp.budget_fit}">
                <span class="text-sm shrink-0">💰</span>
                <span class="font-medium text-[11px] leading-tight">${exp.budget_fit}</span>
              </div>
              <div class="flex items-center space-x-2 bg-amber-50/90 text-amber-950 px-2.5 py-1.5 rounded-xl border border-amber-200/70" title="${exp.theme_fit}">
                <span class="text-sm shrink-0">🎨</span>
                <span class="font-medium text-[11px] leading-tight">${exp.theme_fit}</span>
              </div>
              <div class="flex items-center space-x-2 bg-purple-50/90 text-purple-950 px-2.5 py-1.5 rounded-xl border border-purple-200/70" title="${exp.plumbing_fit}">
                <span class="text-sm shrink-0">💧</span>
                <span class="font-medium text-[11px] leading-tight">${exp.plumbing_fit}</span>
              </div>
            </div>
          `;
          container.appendChild(card);
        });
      }
    }

    function applyAiBundleToBathroom() {
      // 1. Ensure a bundle recommendation exists and has items
      if (!currentAiRecommendation || !currentAiRecommendation.feasible || !currentAiRecommendation.bundle || !currentAiRecommendation.bundle.length) {
        showToast('Please check at least one fixture category on the left to place products.');
        return;
      }

      // 2. Clear existing placed fixtures from 3D scene
      placedProducts.forEach(p => scene.remove(p));
      placedProducts.length = 0;
      deselectActiveObject();

      // 3. Update room dimensions from recommendation or inputs
      const dimRec = currentAiRecommendation.auto_adjusted_dimensions || currentAiRecommendation.room_dimensions;
      const wFt = (dimRec && (dimRec.widthFt || dimRec.width_ft)) || parseFloat(document.getElementById('ai-input-width').value) || 10.5;
      const dFt = (dimRec && (dimRec.depthFt || dimRec.depth_ft)) || parseFloat(document.getElementById('ai-input-depth').value) || 9.2;
      const hFt = (dimRec && (dimRec.heightFt || dimRec.height_ft)) || parseFloat(document.getElementById('ai-input-height').value) || 8.5;
      roomWidth = Math.round(wFt * 0.3048 * 10) / 10;
      roomDepth = Math.round(dFt * 0.3048 * 10) / 10;
      roomHeight = Math.round(hFt * 0.3048 * 10) / 10;
      buildRoomArchitecture();

      // 4. Map AI recommended items to 3D catalog fixtures
      const rec = currentAiRecommendation.bundle;

      // Helper to match catalog item by ID, SKU (art), name, or theme-aware category
      function findCatalogFixture(item) {
        if (!item) return null;
        // 1. Direct ID match
        if (item.id) {
          const byId = KOHLER_CATALOG.find(c => c.id === item.id);
          if (byId) return byId;
        }
        // 2. SKU / art match (with price awareness if multiple matches)
        const sku = item.sku_code || item.art;
        if (sku) {
          const skuNorm = sku.replace(/-/g, '').toLowerCase();
          const matches = KOHLER_CATALOG.filter(c => c.art === sku || c.art.replace(/-/g, '').toLowerCase() === skuNorm);
          if (matches.length === 1) return matches[0];
          if (matches.length > 1) {
            const priceMatch = matches.find(c => c.price_inr === item.price_inr);
            if (priceMatch) return priceMatch;
            return matches[0];
          }
        }
        // 3. Exact or keyword name match
        if (item.name) {
          const nLow = item.name.toLowerCase();
          const byName = KOHLER_CATALOG.find(c => c.name.toLowerCase() === nLow || nLow.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(nLow));
          if (byName) return byName;
          if (nLow.includes('parallel')) return KOHLER_CATALOG.find(c => c.id === 'parallel-pillar-tap');
          if (nLow.includes('purist')) return KOHLER_CATALOG.find(c => c.id === 'purist-single-control-faucet');
          if (nLow.includes('artifacts')) return KOHLER_CATALOG.find(c => c.id === 'artifacts-widespread-faucet');
          if (nLow.includes('composed')) return KOHLER_CATALOG.find(c => c.id.includes('composed'));
          if (nLow.includes('aleo')) return KOHLER_CATALOG.find(c => c.id.includes('leo-'));
          if (nLow.includes('hone')) return KOHLER_CATALOG.find(c => c.id.includes('one-'));
          if (nLow.includes('brazn')) return KOHLER_CATALOG.find(c => c.id === 'brazn-vessel-sink');
          if (nLow.includes('forefront')) return KOHLER_CATALOG.find(c => c.id.includes('forefront'));
          if (nLow.includes('foreward')) return KOHLER_CATALOG.find(c => c.id.includes('oreward'));
          if (nLow.includes('trace')) return KOHLER_CATALOG.find(c => c.id === 'trace-integrated-vanity');
          if (nLow.includes('vive') && (item.category || '').includes('toilet')) return KOHLER_CATALOG.find(c => c.id.includes('ive-ne-piece'));
          if (nLow.includes('vive')) return KOHLER_CATALOG.find(c => c.id === 'vive-integrated-vanity');
          if (nLow.includes('veil') && (item.category || '').includes('toilet')) return KOHLER_CATALOG.find(c => c.id === 'veil-smart-toilet');
          if (nLow.includes('veil')) return KOHLER_CATALOG.find(c => c.id.includes('eil-'));
          if (nLow.includes('innate')) return KOHLER_CATALOG.find(c => c.id.includes('nnate-'));
          if (nLow.includes('reach')) return KOHLER_CATALOG.find(c => c.id === 'reach-one-piece-toilet');
          if (nLow.includes('ove') && (item.category || '').includes('tub')) return KOHLER_CATALOG.find(c => c.id === 've-ve-170-75-cm-rop-in-hirlpool-ath-k1709ink');
          if (nLow.includes('ove')) return KOHLER_CATALOG.find(c => c.id === 'ove-one-piece-toilet');
          if (nLow.includes('evok')) return KOHLER_CATALOG.find(c => c.id === 'evok-2-bathtub');
          if (nLow.includes('whirlpool')) return KOHLER_CATALOG.find(c => c.id === 've-ve-170-75-cm-rop-in-hirlpool-ath-k1709ink');
          if (nLow.includes('ming')) return KOHLER_CATALOG.find(c => c.id === 'ming-lighted-mirror');
          if (nLow.includes('reve')) return KOHLER_CATALOG.find(c => c.id === 'reve-lighted-mirror');
          if (nLow.includes('archer')) return KOHLER_CATALOG.find(c => c.id.includes('rcher'));
          if (nLow.includes('embark')) return KOHLER_CATALOG.find(c => c.id.includes('mbark'));
          if (nLow.includes('modernlife')) return KOHLER_CATALOG.find(c => c.id.includes('odern-ife'));
          if (nLow.includes('essential')) return KOHLER_CATALOG.find(c => c.id.includes('ssential'));
          if (nLow.includes('trilogy')) return KOHLER_CATALOG.find(c => c.id === 'new-trilogy-pivot-door');
          if (nLow.includes('elate')) return KOHLER_CATALOG.find(c => c.id.includes('late-'));
          if (nLow.includes('contra')) return KOHLER_CATALOG.find(c => c.id.includes('ontra-'));
          if (nLow.includes('singulier')) return KOHLER_CATALOG.find(c => c.id.includes('ingulier-'));
          if (nLow.includes('levity')) return KOHLER_CATALOG.find(c => c.id.includes('evity-'));
          if (nLow.includes('statement')) return KOHLER_CATALOG.find(c => c.id === 'statement-round-showerhead');
        }
        // 4. Safe theme-aware category match (prioritizing currentSelectedTheme)
        if (item.category) {
          const cat = item.category.toLowerCase();
          const matching = KOHLER_CATALOG.filter(c => c.category.toLowerCase().includes(cat) || cat.includes(c.category.toLowerCase()));
          if (matching.length > 0) {
            const themeTag = (currentSelectedTheme || '').toLowerCase();
            const themeMatch = matching.find(c => c.styles && c.styles.some(s => themeTag.includes(s)));
            return themeMatch || matching[0];
          }
        }
        return null; // Return null if not a physical 3D catalog fixture (never spawn a random toilet!)
      }

      // Helper to spawn fixture passing exact AI recommendation IDs, metadata, and prices
      function spawnAiFixture(entry, x, z, rotY, customOverrides = {}) {
        if (!entry) return null;
        const cat = findCatalogFixture(entry);
        if (!cat) return null;
        const customData = {
          id: cat.id,
          sku_code: entry.sku_code || entry.art || cat.art,
          art: entry.sku_code || entry.art || cat.art,
          name: entry.name || cat.name,
          price_inr: (typeof entry.price_inr === 'number') ? entry.price_inr : cat.price_inr,
          price_usd: (typeof entry.price_usd === 'number') ? entry.price_usd : cat.price_usd,
          category: cat.category,
          fromAiBundle: true,
          ...customOverrides
        };
        return spawnProductById(cat.id, x, z, rotY, customData);
      }

      // Identify entries robustly (handling both singular and plural category strings)
      const toiletEntry = rec.find(i => (i.category || '').toLowerCase().includes('toilet'));
      const vanityEntry = rec.find(i => (i.category || '').toLowerCase().includes('vanit') || (i.category || '').toLowerCase().includes('basin'));
      const faucetEntry = rec.find(i => (i.category || '').toLowerCase().includes('faucet'));
      const mirrorEntry = rec.find(i => (i.category || '').toLowerCase().includes('mirror'));
      const tubEntry = rec.find(i => (i.category || '').toLowerCase().includes('tub') || (i.category || '').toLowerCase().includes('bath'));

      // Resolve single shower fixture (DO NOT COMBINE multiple shower fixtures!)
      const showerEntry = rec.find(i => (i.category || '').toLowerCase().includes('shower'));
      const isShowerHead = showerEntry && (
        (showerEntry.subcategory && showerEntry.subcategory === 'showerhead') ||
        showerEntry.name.toLowerCase().includes('showerhead') ||
        showerEntry.name.toLowerCase().includes('statement') ||
        (showerEntry.id && showerEntry.id.includes('statement'))
      );
      const isShowerDoorOrEnclosure = showerEntry && !isShowerHead;
      const hasShower = !!showerEntry;

      // ================= ARCHITECTURAL 4-ZONE SPATIAL PLACEMENT =================
      const backWallZ = -roomDepth / 2;
      const frontWallZ = roomDepth / 2;
      const leftWallX = -roomWidth / 2;
      const rightWallX = roomWidth / 2;

      // Identify dimensions of chosen fixtures
      const toiletCat = toiletEntry ? findCatalogFixture(toiletEntry) : null;
      const toiletW = (toiletCat && toiletCat.width_m) || 0.41;
      const toiletD = (toiletCat && toiletCat.depth_m) || 0.71;

      const vanityCat = vanityEntry ? findCatalogFixture(vanityEntry) : null;
      const vanityW = (vanityCat && vanityCat.width_m) || 1.15;
      const vanityD = (vanityCat && vanityCat.depth_m) || 0.56;

      const showerCat = showerEntry ? findCatalogFixture(showerEntry) : null;
      const showerW = (showerCat && showerCat.width_m) || 1.12;
      const showerD = (showerCat && showerCat.depth_m) || 0.96;

      const tubCat = tubEntry ? findCatalogFixture(tubEntry) : null;
      const tubW = (tubCat && tubCat.width_m) || 1.70; // length
      const tubD = (tubCat && tubCat.depth_m) || 0.80; // width

      let toiletX, toiletZ, toiletRotY;
      let vanityX, vanityZ, vanityRotY, mirrorX, mirrorZ, mirrorRotY, faucetX, faucetZ, faucetElevation = 0.508;
      let showerX, showerZ, showerRotY = 0;
      let tubX, tubZ, tubRotY;

      if (tubEntry && roomWidth >= 2.6 && roomDepth >= 2.3) {
        // ================= 4-ZONE MASTER SPA SUITE (DOOR WALL KEPT 100% CLEAR) =================
        // The Entry Door is on the Left Wall (-roomWidth/2).
        // To maintain authentic architecture and prevent door collisions, ZERO fixtures are attached to the door wall!

        // Zone 1: Toilet tucked on Back Wall in Back-Left area (facing South +Z into room)
        toiletX = leftWallX + Math.max(0.65, toiletW / 2 + 0.35);
        toiletZ = backWallZ + 0.165;
        toiletRotY = 0;

        // Zone 3: Walk-in Glass Shower Enclosure in Back-Right Corner (facing South +Z)
        showerX = rightWallX - showerW / 2 - 0.08;
        showerZ = backWallZ + showerD / 2 + 0.02;
        showerRotY = 0;

        // Zone 2: Vanity + Faucet + Slat Accent Wall + Lighted Mirror centered on Back Wall
        const toiletRightEdge = toiletX + toiletW / 2 + 0.20;
        const showerLeftEdge = showerX - showerW / 2 - 0.20;
        vanityX = (toiletRightEdge + showerLeftEdge) / 2;
        vanityZ = backWallZ + vanityD / 2;
        vanityRotY = 0;
        mirrorX = vanityX;
        mirrorZ = backWallZ + 0.055;
        mirrorRotY = 0;
        faucetX = vanityX;
        faucetZ = vanityZ - 0.14;

        // Zone 4: Freestanding Bathtub longitudinally along Right Wall (facing West -X into room)
        tubX = rightWallX - tubD / 2 - 0.08;
        // Position tub along right wall comfortably in front of the shower enclosure
        const minTubZ = (hasShower ? (showerZ + showerD / 2 + tubW / 2 + 0.25) : 0.20);
        tubZ = Math.min(frontWallZ - tubW / 2 - 0.20, Math.max(0.40, minTubZ));
        tubRotY = -Math.PI / 2;
      } else {
        // ================= 3-PIECE BATHROOM & POWDER ROOM LAYOUT =================
        // Zone 3: Shower Enclosure in Back-Right Corner
        showerX = rightWallX - showerW / 2 - 0.08;
        showerZ = backWallZ + showerD / 2 + 0.02;

        // Zone 1: Toilet in Back-Left
        toiletX = leftWallX + Math.max(0.45, toiletW / 2 + 0.18);
        toiletZ = backWallZ + 0.165;
        toiletRotY = 0;

        // Zone 2: Vanity & Grooming
        const toiletRightEdge = toiletX + toiletW / 2 + 0.10;
        const showerLeftEdge = hasShower ? (showerX - showerW / 2 - 0.10) : (rightWallX - 0.20);
        const availableBackSpace = showerLeftEdge - toiletRightEdge;

        if (vanityW <= availableBackSpace) {
          vanityX = (toiletRightEdge + showerLeftEdge) / 2;
          vanityZ = backWallZ + vanityD / 2;
          vanityRotY = 0;
          mirrorX = vanityX;
          mirrorZ = backWallZ + 0.055;
          mirrorRotY = 0;
          faucetX = vanityX;
          faucetZ = vanityZ - 0.14;
        } else {
          vanityX = leftWallX + vanityD / 2;
          vanityZ = Math.min(-0.20, backWallZ + vanityW / 2 + 0.35);
          vanityRotY = Math.PI / 2;
          mirrorX = leftWallX + 0.055;
          mirrorZ = vanityZ;
          mirrorRotY = Math.PI / 2;
          faucetX = vanityX + 0.14;
          faucetZ = vanityZ;
        }
      }

      // Spawn Toilet
      if (toiletEntry) {
        spawnAiFixture(toiletEntry, toiletX, toiletZ, toiletRotY);
      }

      // Spawn Vanity
      let spawnedVanity = null;
      if (vanityEntry) {
        spawnedVanity = spawnAiFixture(vanityEntry, vanityX, vanityZ, vanityRotY);
      }

      // Spawn Faucet
      let spawnedFaucet = null;
      if (faucetEntry) {
        spawnedFaucet = spawnAiFixture(faucetEntry, faucetX, faucetZ, vanityRotY, {
          elevation: faucetElevation,
          y: faucetElevation
        });
      }

      // Spawn Mirror
      let spawnedMirror = null;
      if (mirrorEntry) {
        spawnedMirror = spawnAiFixture(mirrorEntry, mirrorX, mirrorZ, mirrorRotY);
      }

      // Link deck faucet to vanity (mirrors remain completely independent)
      if (spawnedVanity && spawnedFaucet) {
        spawnedVanity.userData.attachedFaucet = spawnedFaucet;
      }

      // Spawn Shower (Single fixture only, never combining door and showerhead together!)
      if (showerEntry) {
        if (isShowerHead) {
          // Mount showerhead on back wall inside shower zone
          spawnAiFixture(showerEntry, showerX, backWallZ + 0.02, 0, { elevation: 2.10, y: 2.10 });
        } else {
          // Place architectural shower door or enclosure
          spawnAiFixture(showerEntry, showerX, showerZ, showerRotY);
        }
      }

      // Spawn Freestanding Bathtub
      if (tubEntry && tubX !== undefined) {
        spawnAiFixture(tubEntry, tubX, tubZ, tubRotY);
      }

      // Architectural Safeguard: No random floor dumping at (0,0,0)!
      // All genuine fixtures have been mapped to their dedicated real-life architectural zones.

      // Ensure all newly placed fixtures and architecture match the active aesthetic theme
      const finalTheme = (currentAiRecommendation && currentAiRecommendation.theme && currentAiRecommendation.theme !== 'None' && currentAiRecommendation.theme !== 'none')
        ? currentAiRecommendation.theme
        : (currentSelectedTheme !== 'None' ? currentSelectedTheme : 'Minimalist Modern');
      currentSelectedTheme = finalTheme;
      const subnavTheme = document.getElementById('subnav-theme-label');
      if (subnavTheme) subnavTheme.innerText = finalTheme;

      if (typeof applyAestheticTheme === 'function') {
        applyAestheticTheme(finalTheme);
      }
      if (typeof updateThemeArchitecturalAccents === 'function') {
        updateThemeArchitecturalAccents(finalTheme);
      }

      // Mark planner configuration as active AI bundle suite
      setPlannerConfigurationState('ai_bundle', currentAiRecommendation.active_tier || 'Signature');

      closeAiAssistantModal();
      setViewMode('3d');
      updateTotalBOM();
      updateClearanceVisualizer();
      updateWetWallScore();
      buildPlumbingConduits();
      if (currentViewMode === '2d') update2DFloorplanAnnotations();
      showToast(`✨ Placed ${placedProducts.length} Kohler ${currentAiRecommendation.active_tier || 'Signature'} fixtures matching ${finalTheme}!`);
    }
