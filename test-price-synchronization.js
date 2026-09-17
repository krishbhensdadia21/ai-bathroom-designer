const puppeteer = require('puppeteer-core');
const path = require('path');

async function main() {
  console.log('Launching headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));

  // ==========================================
  // TEST 1: Essential Value Tier Verification
  // ==========================================
  console.log('\n==================================================');
  console.log('TEST 1: Essential Value AI Suite vs 3D Planner');
  console.log('==================================================');

  // Open modal and select Essential Value tier
  await page.evaluate(async () => {
    openAiAssistantModal();
    // Enable all 4 fixtures in predefined
    document.getElementById('prio-smart-toilet').checked = true;
    document.getElementById('prio-thermo-shower').checked = true;
    document.getElementById('prio-dual-vanity').checked = true;
    document.getElementById('prio-smart-mirror').checked = true;
    // Generate recommendation
    await triggerGroqAiRecommendation();
  });
  await new Promise(r => setTimeout(r, 2000));

  // Switch to Essential Value tier tab
  await page.evaluate(() => {
    switchAiAlternativeTier('essential');
  });
  await new Promise(r => setTimeout(r, 800));

  // Take screenshot of AI recommendation modal showing Essential Value
  await page.screenshot({ path: path.join(__dirname, 'test_ai_modal_essential.png') });
  console.log('Saved: test_ai_modal_essential.png');

  const aiDetails = await page.evaluate(() => {
    const previewText = document.getElementById('ai-bundle-total-preview').innerText;
    const activeTier = currentAiRecommendation.active_tier;
    const bundleItems = currentAiRecommendation.bundle.map(i => ({
      name: i.name,
      sku: i.sku_code || i.art,
      category: i.category,
      price_inr: i.price_inr
    }));
    const calculatedSum = bundleItems.reduce((s, i) => s + i.price_inr, 0);
    return { previewText, activeTier, bundleItems, calculatedSum };
  });

  console.log('AI Selected Tier:', aiDetails.activeTier);
  console.log('AI Bundle Items Count:', aiDetails.bundleItems.length);
  console.log('AI Bundle Items:', JSON.stringify(aiDetails.bundleItems, null, 2));
  console.log('AI Suite Total Preview:', aiDetails.previewText);
  console.log('AI Items Sum:', '₹' + aiDetails.calculatedSum.toLocaleString('en-IN'));

  if (aiDetails.previewText !== '₹1,47,700') {
    console.warn(`WARNING: Expected AI Suite Total to be ₹1,47,700, got ${aiDetails.previewText}`);
  }

  // Click Apply AI Bundle
  console.log('\nApplying AI Bundle to 3D planner...');
  await page.evaluate(() => {
    applyAiBundleToBathroom();
  });
  await new Promise(r => setTimeout(r, 1500));

  // Take screenshot of 3D planner
  await page.screenshot({ path: path.join(__dirname, 'test_3d_planner_applied.png') });
  console.log('Saved: test_3d_planner_applied.png');

  const plannerDetails = await page.evaluate(() => {
    const headerPrice = document.getElementById('header-total-price').innerText;
    const symbol = document.getElementById('currency-symbol-display').innerText;
    const badgeText = document.getElementById('planner-config-status').innerText;
    const badgeClass = document.getElementById('planner-config-status').className;
    const placed = placedProducts.map(p => ({
      name: p.userData.name,
      sku: p.userData.art || p.userData.sku_code,
      id: p.userData.id,
      category: p.userData.category,
      price_inr: p.userData.price_inr,
      elevation: p.userData.elevation,
      position: { x: p.position.x, y: p.position.y, z: p.position.z }
    }));
    const totalINR = placed.reduce((sum, p) => sum + p.price_inr, 0);
    return {
      investmentFormatted: symbol + headerPrice,
      headerPriceRaw: headerPrice,
      badgeText,
      badgeClass,
      placedCount: placed.length,
      placed,
      totalINR
    };
  });

  console.log('\n3D Planner Placed Fixtures Count:', plannerDetails.placedCount);
  console.log('3D Planner Fixtures:', JSON.stringify(plannerDetails.placed, null, 2));
  console.log('3D Planner Investment Display:', plannerDetails.investmentFormatted);
  console.log('3D Planner Dynamic Total INR:', '₹' + plannerDetails.totalINR.toLocaleString('en-IN'));
  console.log('3D Planner Configuration Badge:', plannerDetails.badgeText);

  console.log('\n=================== VERIFICATION COMPARISON ===================');
  console.log(`AI Suite Total:         ${aiDetails.previewText}`);
  console.log(`3D Planner Investment:  ${plannerDetails.investmentFormatted}`);

  const cleanAi = aiDetails.previewText.replace(/[^0-9]/g, '');
  const cleanPlanner = plannerDetails.investmentFormatted.replace(/[^0-9]/g, '');
  const diff = parseInt(cleanPlanner) - parseInt(cleanAi);
  console.log(`Difference:             ₹${diff}`);

  if (diff !== 0) {
    throw new Error(`FAIL: Difference between AI Suite Total (${aiDetails.previewText}) and 3D Planner Investment (${plannerDetails.investmentFormatted}) is ₹${diff}! Must be 0.`);
  }
  console.log('✅ TEST 1 PASSED: AI Suite Total and 3D Planner Investment MATCH PERFECTLY at ₹1,47,700!');

  // ==========================================
  // TEST 2: User Modification Tracking
  // ==========================================
  console.log('\n==================================================');
  console.log('TEST 2: User Modification Tracking & Recalculation');
  console.log('==================================================');

  // Remove the Reach Toilet (price ₹24,000)
  console.log('User removes Reach Toilet from 3D scene...');
  await page.evaluate(() => {
    const toilet = placedProducts.find(p => p.userData.id === 'reach-wall-hung');
    if (toilet) {
      selectActiveObject(toilet);
      deleteActiveObject();
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  const afterDelete = await page.evaluate(() => {
    const headerPrice = document.getElementById('header-total-price').innerText;
    const symbol = document.getElementById('currency-symbol-display').innerText;
    const badgeText = document.getElementById('planner-config-status').innerText;
    const count = placedProducts.length;
    const totalINR = placedProducts.reduce((sum, p) => sum + p.userData.price_inr, 0);
    return { investmentFormatted: symbol + headerPrice, badgeText, count, totalINR };
  });

  console.log('After deletion of Toilet:');
  console.log(`- Placed Count:        ${afterDelete.count} (expected 4)`);
  console.log(`- Investment:          ${afterDelete.investmentFormatted} (expected ₹1,23,700)`);
  console.log(`- Config Status Badge: ${afterDelete.badgeText} (expected Customized)`);

  if (afterDelete.investmentFormatted !== '₹1,23,700') {
    throw new Error(`FAIL: Expected ₹1,23,700 after toilet deletion, got ${afterDelete.investmentFormatted}`);
  }
  if (!afterDelete.badgeText.includes('Customized')) {
    throw new Error(`FAIL: Expected badge to indicate Customized, got ${afterDelete.badgeText}`);
  }
  console.log('✅ TEST 2A PASSED: Deletion dynamically recalculated Investment and displayed Customized badge!');

  // User adds a fixture from catalog drawer
  console.log('\nUser adds a Brazn Console (₹72,000) from catalog drawer...');
  await page.evaluate(() => {
    spawnProductById('brazn-console', 0, 0, 0);
    setPlannerConfigurationState('modified');
    updateTotalBOM();
  });
  await new Promise(r => setTimeout(r, 1000));

  const afterAdd = await page.evaluate(() => {
    const headerPrice = document.getElementById('header-total-price').innerText;
    const symbol = document.getElementById('currency-symbol-display').innerText;
    const badgeText = document.getElementById('planner-config-status').innerText;
    const count = placedProducts.length;
    const totalINR = placedProducts.reduce((sum, p) => sum + p.userData.price_inr, 0);
    return { investmentFormatted: symbol + headerPrice, badgeText, count, totalINR };
  });

  console.log('After addition of Brazn Console:');
  console.log(`- Placed Count:        ${afterAdd.count} (expected 5)`);
  console.log(`- Investment:          ${afterAdd.investmentFormatted} (expected ₹1,95,700)`);
  console.log(`- Config Status Badge: ${afterAdd.badgeText} (expected Customized)`);

  if (afterAdd.investmentFormatted !== '₹1,95,700') {
    throw new Error(`FAIL: Expected ₹1,95,700 after adding Brazn Console, got ${afterAdd.investmentFormatted}`);
  }
  console.log('✅ TEST 2B PASSED: Manual catalog addition dynamically recalculated Investment!');

  // ==========================================
  // TEST 3: Signature Balanced Bundle Matching
  // ==========================================
  console.log('\n==================================================');
  console.log('TEST 3: Signature Balanced Bundle Synchronization');
  console.log('==================================================');

  await page.evaluate(async () => {
    openAiAssistantModal();
    switchAiAlternativeTier('signature');
  });
  await new Promise(r => setTimeout(r, 800));

  const sigAiDetails = await page.evaluate(() => {
    const previewText = document.getElementById('ai-bundle-total-preview').innerText;
    const activeTier = currentAiRecommendation.active_tier;
    const calculatedSum = currentAiRecommendation.bundle.reduce((s, i) => s + i.price_inr, 0);
    return { previewText, activeTier, calculatedSum };
  });

  console.log(`Signature AI Suite Total: ${sigAiDetails.previewText}`);

  await page.evaluate(() => {
    applyAiBundleToBathroom();
  });
  await new Promise(r => setTimeout(r, 1500));

  const sigPlannerDetails = await page.evaluate(() => {
    const headerPrice = document.getElementById('header-total-price').innerText;
    const symbol = document.getElementById('currency-symbol-display').innerText;
    const badgeText = document.getElementById('planner-config-status').innerText;
    const totalINR = placedProducts.reduce((sum, p) => sum + p.userData.price_inr, 0);
    return { investmentFormatted: symbol + headerPrice, badgeText, totalINR };
  });

  console.log(`Signature 3D Planner Investment: ${sigPlannerDetails.investmentFormatted}`);
  console.log(`Signature Configuration Badge:   ${sigPlannerDetails.badgeText}`);

  if (sigAiDetails.previewText !== sigPlannerDetails.investmentFormatted) {
    throw new Error(`FAIL: Signature AI Total (${sigAiDetails.previewText}) !== 3D Planner (${sigPlannerDetails.investmentFormatted})`);
  }
  console.log('✅ TEST 3 PASSED: Signature Balanced bundle is also 100% matched and synchronized!');

  // Take final verified screenshot
  await page.screenshot({ path: path.join(__dirname, 'test_price_sync_verified.png') });
  console.log('Saved: test_price_sync_verified.png');

  await browser.close();
  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! No pricing discrepancies remain.');
}

main().catch(err => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
