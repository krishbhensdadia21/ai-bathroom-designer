    // ==================== 8. WORKFLOW & CATALOG DRAWER HANDLERS ====================
    function setWorkflowStep(step) {
      currentWorkflowStep = step;
      document.querySelectorAll('.step-pill').forEach(p => p.classList.remove('active'));
      const activePill = document.getElementById('step-' + step);
      if (activePill) activePill.classList.add('active');

      if (step === 'room') openDimensionsModal();
      else if (step === 'ai') openAiAssistantModal();
      else if (step === 'furnish') openCatalogCategory('toilets');
      else if (step === 'finishes') openFinishesModal();
      else if (step === 'summary') openShoppingList();
    }

    function openCatalogCategory(cat) {
      document.getElementById('catalog-drawer').style.transform = 'translateX(0)';
      document.getElementById('vertical-dock').style.marginRight = '420px';

      const titles = {
        all: 'All Official KOHLER Products (60)',
        toilets: 'Smart & Classic Toilets (7)',
        vanities: 'Tailored Vanities & Consoles (14)',
        faucets: 'Luxury Faucets & Brassware (17)',
        showers: 'Showers, Enclosures & Doors (11)',
        bathtubs: 'Freestanding & Drop-in Bathtubs (2)',
        mirrors: 'Lighted Smart Mirrors (9)'
      };
      document.getElementById('drawer-category-title').innerText = titles[cat] || 'KOHLER Fixtures';

      document.querySelectorAll('#vertical-dock button').forEach(b => b.classList.remove('active'));
      const dockBtn = document.getElementById('dock-' + cat);
      if (dockBtn) dockBtn.classList.add('active');

      const searchInput = document.getElementById('catalog-search');
      if (searchInput) searchInput.value = '';

      renderCatalogDrawerList(cat);
    }

    function closeCatalogDrawer() {
      document.getElementById('catalog-drawer').style.transform = 'translateX(100%)';
      document.getElementById('vertical-dock').style.marginRight = '0px';
      document.querySelectorAll('#vertical-dock button').forEach(b => b.classList.remove('active'));
    }

    function renderCatalogDrawerList(cat = 'all', seriesFilter = 'all', searchQuery = '') {
      const container = document.getElementById('catalog-card-container');
      const filterStrip = document.getElementById('series-filter-strip');
      container.innerHTML = '';

      // Base pool by category (or all 60 products)
      let pool = (cat === 'all') ? KOHLER_CATALOG : KOHLER_CATALOG.filter(p => p.category === cat);

      // Populate dynamic subcategory or series filter pills
      if (filterStrip) {
        if (cat === 'showers') {
          const subcats = [
            { key: 'all', label: `All (${pool.length})` },
            { key: 'showerhead', label: `🚿 Showerhead (${pool.filter(p => p.subcategory === 'showerhead').length})` },
            { key: 'shower_enclosure', label: `🚪 Shower Enclosure (${pool.filter(p => p.subcategory === 'shower_enclosure').length})` },
            { key: 'shower_door', label: `🚪 Shower Door (${pool.filter(p => p.subcategory === 'shower_door').length})` }
          ];
          let stripHtml = '';
          subcats.forEach(sc => {
            const isSel = (seriesFilter === sc.key);
            stripHtml += `
              <button onclick="renderCatalogDrawerList('${cat}', '${sc.key}', '${searchQuery.replace(/'/g, "\\'")}')" class="px-3 py-1 rounded-full text-xs font-bold transition shrink-0 ${isSel ? 'bg-amber-600 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'}">
                ${sc.label}
              </button>
            `;
          });
          filterStrip.innerHTML = stripHtml;
        } else {
          const seriesSet = new Set();
          pool.forEach(p => { if (p.series) seriesSet.add(p.series); });
          const distinctSeries = Array.from(seriesSet).sort();

          let stripHtml = `
            <button onclick="renderCatalogDrawerList('${cat}', 'all', '${searchQuery.replace(/'/g, "\\'")}')" class="px-2.5 py-1 rounded-full text-xs font-bold transition shrink-0 ${seriesFilter === 'all' ? 'bg-black text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'}">
              All (${pool.length})
            </button>
          `;

          distinctSeries.forEach(s => {
            const count = pool.filter(p => p.series === s).length;
            const isSel = (seriesFilter === s);
            stripHtml += `
              <button onclick="renderCatalogDrawerList('${cat}', '${s.replace(/'/g, "\\'")}', '${searchQuery.replace(/'/g, "\\'")}')" class="px-2.5 py-1 rounded-full text-xs font-bold transition shrink-0 ${isSel ? 'bg-amber-600 text-white shadow-xs' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'}">
                ${s} (${count})
              </button>
            `;
          });
          filterStrip.innerHTML = stripHtml;
        }
      }

      // Filter by subcategory or series, and search query
      let items = pool;
      if (seriesFilter !== 'all') {
        if (cat === 'showers') {
          items = items.filter(p => p.subcategory === seriesFilter);
        } else {
          items = items.filter(p => p.series === seriesFilter);
        }
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        items = items.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.art.toLowerCase().includes(q) ||
          p.series.toLowerCase().includes(q) ||
          (p.subcat_label && p.subcat_label.toLowerCase().includes(q)) ||
          (p.dim && p.dim.toLowerCase().includes(q))
        );
      }

      if (items.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-gray-400 font-bold text-xs">No Kohler products match "${searchQuery}".</div>`;
        return;
      }

      items.forEach(p => {
        const card = document.createElement('div');
        card.className = 'group border border-gray-200 rounded-2xl p-4 hover:border-black hover:shadow-xl transition bg-white cursor-pointer transform hover:-translate-y-0.5';
        card.onclick = () => {
          setPlannerConfigurationState('modified');

          const backWallZ = -roomDepth / 2;
          const leftWallX = -roomWidth / 2;
          const rightWallX = roomWidth / 2;

          if (p.category === 'showers') {
            // If adding a shower product, replace existing shower in room to avoid overlapping collisions!
            const existingShowerIdx = placedProducts.findIndex(item => item.userData && item.userData.category === 'showers');
            if (existingShowerIdx !== -1) {
              const oldShower = placedProducts[existingShowerIdx];
              scene.remove(oldShower);
              placedProducts.splice(existingShowerIdx, 1);
            }
            const showerX = rightWallX - (p.width_m || 0.9) / 2 - 0.08;
            if (p.subcategory === 'showerhead') {
              spawnProductById(p.id, showerX, backWallZ + 0.02, 0);
            } else {
              const showerZ = backWallZ + (p.depth_m || 0.9) / 2 + 0.05;
              spawnProductById(p.id, showerX, showerZ, 0);
            }
            showToast(`Placed ${p.name}`);
          } else if (p.category === 'toilets') {
            // Place in Back-Left toilet zone on back wall
            const tx = leftWallX + Math.max(0.45, (p.width_m || 0.41) / 2 + 0.18);
            const tz = backWallZ + 0.165;
            spawnProductById(p.id, tx, tz, 0);
            showToast(`Placed ${p.name}`);
          } else if (p.category === 'vanities') {
            // Place centered on back wall
            const vz = backWallZ + (p.depth_m || 0.56) / 2;
            spawnProductById(p.id, 0, vz, 0);
            showToast(`Placed ${p.name}`);
          } else if (p.category === 'faucets') {
            // Deck mount onto vanity if present, or at countertop height
            const vanity = placedProducts.find(item => item.userData && item.userData.category === 'vanities');
            if (vanity) {
              const vBox = new THREE.Box3().setFromObject(vanity);
              const fx = vanity.position.x;
              const fz = vanity.position.z - 0.14;
              const fy = vBox.max.y;
              spawnProductById(p.id, fx, fz, vanity.rotation.y, { elevation: fy, y: fy });
            } else {
              spawnProductById(p.id, 0, backWallZ + 0.35, 0, { elevation: 0.85, y: 0.85 });
            }
            showToast(`Placed ${p.name}`);
          } else if (p.category === 'mirrors') {
            // Mount flush to back wall at eye level (y=1.50m built-in), aligned with vanity if present
            const vanity = placedProducts.find(item => item.userData && item.userData.category === 'vanities');
            const mx = vanity ? vanity.position.x : 0;
            const mz = backWallZ + 0.055;
            spawnProductById(p.id, mx, mz, 0);
            showToast(`Placed ${p.name}`);
          } else if (p.category === 'bathtubs') {
            // Place along Right Wall in dedicated bathing zone
            const bx = rightWallX - (p.depth_m || 0.80) / 2 - 0.08;
            spawnProductById(p.id, bx, 0.40, -Math.PI / 2);
            showToast(`Placed ${p.name}`);
          } else {
            spawnProductById(p.id, 0, 0, 0);
            showToast(`Added ${p.name} to room`);
          }
        };

        const iconMap = {
          toilets: 'fa-toilet', vanities: 'fa-sink', faucets: 'fa-faucet',
          showers: 'fa-shower', bathtubs: 'fa-bath', mirrors: 'fa-file-image'
        };

        const priceFormatted = formatCurrency(currentCurrency === 'INR' ? p.price_inr : p.price_usd);
        const subcatBadge = p.subcat_label ? `
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold ${p.subcategory === 'showerhead' ? 'bg-blue-100 text-blue-800' : (p.subcategory === 'shower_enclosure' ? 'bg-purple-100 text-purple-800' : 'bg-teal-100 text-teal-800')} ml-1.5">
            ${p.subcategory === 'showerhead' ? '🚿' : '🚪'} ${p.subcat_label}
          </span>
        ` : '';

        card.innerHTML = `
          <div class="w-full h-24 bg-gray-50 rounded-xl mb-3 flex items-center justify-center p-3 relative overflow-hidden group-hover:bg-amber-50/40 transition">
            <i class="fa-solid ${iconMap[p.category] || 'fa-cube'} text-3xl text-gray-300 group-hover:text-black group-hover:scale-110 transition duration-300"></i>
            <div class="absolute top-2 right-2 flex items-center space-x-1">
              <span class="bg-black text-white px-2 py-0.5 rounded-full text-[9px] font-bold shadow-sm">${p.series}</span>
              ${subcatBadge}
            </div>
          </div>
          <div class="flex justify-between items-start">
            <div>
              <span class="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">${p.art}</span>
              <h4 class="font-extrabold text-xs text-gray-900 leading-snug group-hover:text-amber-800 transition">${p.name}</h4>
              <p class="text-[11px] text-gray-500 line-clamp-2 mt-1">${p.desc}</p>
              <div class="text-[10px] text-gray-400 font-mono mt-1">${p.dim}</div>
            </div>
          </div>
          <div class="mt-3 pt-2.5 border-t border-gray-100 flex justify-between items-center">
            <span class="text-sm font-black text-gray-900">${priceFormatted}</span>
            <button class="bg-black text-white hover:bg-gray-900 text-xs px-3 py-1.5 rounded-full font-bold shadow-sm flex items-center space-x-1 group-hover:bg-amber-600 group-hover:text-white transition">
              <i class="fa-solid fa-plus text-[10px]"></i>
              <span>Add to Room</span>
            </button>
          </div>
        `;
        container.appendChild(card);
      });
    }

    function filterCatalogProducts() {
      const q = document.getElementById('catalog-search').value.toLowerCase();
      const activeDockBtn = document.querySelector('#vertical-dock button.active');
      const cat = activeDockBtn ? activeDockBtn.id.replace('dock-', '') : 'all';
      renderCatalogDrawerList(cat, 'all', q);
    }
