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
        toilets: 'Smart & Classic Toilets',
        vanities: 'Tailored Vanities & Consoles',
        faucets: 'Luxury Faucets & Brassware',
        showers: 'Thermostatic Showers & Systems',
        bathtubs: 'Freestanding Soaking Bathtubs',
        mirrors: 'Verdera Voice Smart Mirrors'
      };
      document.getElementById('drawer-category-title').innerText = titles[cat] || 'KOHLER Fixtures';

      document.querySelectorAll('#vertical-dock button').forEach(b => b.classList.remove('active'));
      const dockBtn = document.getElementById('dock-' + cat);
      if (dockBtn) dockBtn.classList.add('active');

      renderCatalogDrawerList(cat);
    }

    function closeCatalogDrawer() {
      document.getElementById('catalog-drawer').style.transform = 'translateX(100%)';
      document.getElementById('vertical-dock').style.marginRight = '0px';
      document.querySelectorAll('#vertical-dock button').forEach(b => b.classList.remove('active'));
    }

    function renderCatalogDrawerList(cat, seriesFilter = 'all', searchQuery = '') {
      const container = document.getElementById('catalog-card-container');
      container.innerHTML = '';

      let items = KOHLER_CATALOG.filter(p => p.category === cat);
      if (seriesFilter !== 'all') items = items.filter(p => p.series === seriesFilter);
      if (searchQuery) items = items.filter(p => p.name.toLowerCase().includes(searchQuery) || p.desc.toLowerCase().includes(searchQuery));

      if (items.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-gray-400 font-bold text-xs">No Kohler products match your search.</div>`;
        return;
      }

      items.forEach(p => {
        const card = document.createElement('div');
        card.className = 'group border border-gray-200 rounded-2xl p-4 hover:border-black hover:shadow-xl transition bg-white cursor-pointer transform hover:-translate-y-0.5';
        card.onclick = () => {
          setPlannerConfigurationState('modified');
          spawnProductById(p.id, 0, 0, 0);
        };

        const iconMap = {
          toilets: 'fa-toilet', vanities: 'fa-sink', faucets: 'fa-faucet',
          showers: 'fa-shower', bathtubs: 'fa-bath', mirrors: 'fa-file-image'
        };

        const priceFormatted = formatCurrency(currentCurrency === 'INR' ? p.price_inr : p.price_usd);

        card.innerHTML = `
          <div class="w-full h-24 bg-gray-50 rounded-xl mb-3 flex items-center justify-center p-3 relative overflow-hidden group-hover:bg-amber-50/40 transition">
            <i class="fa-solid ${iconMap[p.category] || 'fa-cube'} text-3xl text-gray-300 group-hover:text-black group-hover:scale-110 transition duration-300"></i>
            <span class="absolute top-2 right-2 bg-black text-white px-2 py-0.5 rounded-full text-[9px] font-bold shadow-sm">${p.series}</span>
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
      const cat = activeDockBtn ? activeDockBtn.id.replace('dock-', '') : 'toilets';
      renderCatalogDrawerList(cat, 'all', q);
    }
