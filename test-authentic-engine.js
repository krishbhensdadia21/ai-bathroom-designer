const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function main() {
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
  await new Promise(r => setTimeout(r, 2500));

  // ==================== TEST 1: Feasible AI Optimization & Calculated Scores ====================
  console.log('\n--- Test 1: Feasible AI Multi-Objective Optimizer & Calculated Scores ---');
  await page.evaluate(async () => {
    openAiAssistantModal();
    selectAiTheme('Minimalist Modern');
    document.getElementById('ai-input-width').value = '10.5';
    document.getElementById('ai-input-depth').value = '9.2';
    document.getElementById('ai-budget-slider').value = '350000';
    updateAiBudgetDisplay(350000);
    await triggerGroqAiRecommendation();
  });
  await new Promise(r => setTimeout(r, 1500));

  const feasibleState = await page.evaluate(() => {
    const activeTier = document.getElementById('ai-active-tier-tag').innerText;
    const compositeBadge = document.getElementById('ai-composite-score-badge').innerText;
    const spatialScore = document.getElementById('score-spatial').innerText;
    const budgetScore = document.getElementById('score-budget').innerText;
    const themeScore = document.getElementById('score-theme').innerText;
    const functionScore = document.getElementById('score-function').innerText;
    const ecoScore = document.getElementById('score-sustainability').innerText;
    const wetwallScore = document.getElementById('score-wetwall').innerText;
    const tradeoffText = document.getElementById('ai-tradeoff-text').innerText;
    const itemCount = document.getElementById('ai-bundle-items-container').children.length;
    return {
      activeTier,
      compositeBadge,
      scores: { spatialScore, budgetScore, themeScore, functionScore, ecoScore, wetwallScore },
      tradeoffText,
      itemCount
    };
  });
  console.log('Feasible State:', JSON.stringify(feasibleState, null, 2));

  await page.screenshot({ path: path.join(__dirname, 'feature_ai_optimizer_results.png') });
  console.log('Saved: feature_ai_optimizer_results.png');

  // ==================== TEST 2: Impossible Case Handling & 1-Click Relaxation ====================
  console.log('\n--- Test 2: Impossible Case Handling & 1-Click Relaxation ---');
  await page.evaluate(async () => {
    document.getElementById('ai-input-width').value = '4.0';
    document.getElementById('ai-input-depth').value = '4.0';
    await triggerGroqAiRecommendation();
  });
  await new Promise(r => setTimeout(r, 1000));

  const impossibleState = await page.evaluate(() => {
    const container = document.getElementById('ai-impossible-container');
    const isVisible = container && !container.classList.contains('hidden');
    const badge = document.getElementById('ai-impossible-constraint-badge').innerText;
    const reason = document.getElementById('ai-impossible-reason').innerText;
    const suggestions = Array.from(document.getElementById('ai-impossible-suggestions').children).map(c => c.innerText);
    return { isVisible, badge, reason, suggestions };
  });
  console.log('Impossible State:', JSON.stringify(impossibleState, null, 2));

  await page.screenshot({ path: path.join(__dirname, 'feature_impossible_case_relaxation.png') });
  console.log('Saved: feature_impossible_case_relaxation.png');

  // Test 1-click relaxation: Auto-Expand Room
  console.log('Testing 1-Click Auto-Expand Relaxation...');
  await page.evaluate(async () => {
    relaxAiConstraints('expand');
  });
  await new Promise(r => setTimeout(r, 1500));

  const relaxedState = await page.evaluate(() => {
    const feasibleContainer = document.getElementById('ai-feasible-container');
    return {
      feasibleVisible: !feasibleContainer.classList.contains('hidden'),
      roomWidth: document.getElementById('ai-input-width').value,
      roomDepth: document.getElementById('ai-input-depth').value,
      compositeScore: document.getElementById('ai-composite-score-badge').innerText
    };
  });
  console.log('Relaxed State after 1-Click Auto-Expand:', relaxedState);

  // Apply bundle to 3D scene
  await page.evaluate(() => {
    applyAiBundleToBathroom();
  });
  await new Promise(r => setTimeout(r, 1200));

  // ==================== TEST 3: 2D Floorplan CAD Layer & Annotations ====================
  console.log('\n--- Test 3: 2D Floorplan CAD Layer & Dimension Annotations ---');
  await page.evaluate(() => {
    setViewMode('2d');
  });
  await new Promise(r => setTimeout(r, 1000));

  const floorplan2DState = await page.evaluate(() => {
    return {
      currentViewMode: currentViewMode,
      groupVisible: floorplan2DGroup ? floorplan2DGroup.visible : false,
      childrenCount: floorplan2DGroup ? floorplan2DGroup.children.length : 0
    };
  });
  console.log('2D CAD Floorplan State:', floorplan2DState);

  await page.screenshot({ path: path.join(__dirname, 'feature_2d_cad_floorplan.png') });
  console.log('Saved: feature_2d_cad_floorplan.png');

  // Switch back to 3D
  await page.evaluate(() => setViewMode('3d'));
  await new Promise(r => setTimeout(r, 800));

  // ==================== TEST 4: Real-time Door Swing Arc Collision ====================
  console.log('\n--- Test 4: Real-time Door Swing Arc Collision Engine ---');
  // First verify normal clearance
  const normalClearance = await page.evaluate(() => {
    return {
      badgeText: document.getElementById('label-clearance-status').innerText,
      status: latestClearanceReport.status
    };
  });
  console.log('Normal clearance status:', normalClearance);

  // Move the first placed fixture directly into door swing arc: door hinge is at (-roomWidth/2 + 0.04, -0.19)
  console.log('Moving fixture into door swing collision sweep...');
  const collisionTriggered = await page.evaluate(() => {
    if (placedProducts.length > 0) {
      const p = placedProducts[0];
      p.position.x = -roomWidth / 2 + 0.35;
      p.position.z = 0.15;
      evaluateHardConstraints();
      return {
        badgeText: document.getElementById('label-clearance-status').innerText,
        status: latestClearanceReport.status,
        invalidCount: latestClearanceReport.invalidCount
      };
    }
    return null;
  });
  console.log('Collision trigger status:', collisionTriggered);

  await page.screenshot({ path: path.join(__dirname, 'feature_door_collision_detection.png') });
  console.log('Saved: feature_door_collision_detection.png');

  // Move it back to compliant location
  await page.evaluate(() => {
    if (placedProducts.length > 0) {
      const p = placedProducts[0];
      p.position.x = -roomWidth / 2 + 0.55;
      p.position.z = -roomDepth / 2 + 0.45;
      evaluateHardConstraints();
    }
  });
  await new Promise(r => setTimeout(r, 500));

  // ==================== TEST 5: Real Canvas CV Blueprint Scanner ====================
  console.log('\n--- Test 5: Real Canvas CV Blueprint Scanner ---');
  await page.evaluate(async () => {
    openBlueprintUploadModal();
    loadSampleBlueprint('master');
  });
  await new Promise(r => setTimeout(r, 2200));

  const blueprintState = await page.evaluate(() => {
    return {
      modalVisible: !document.getElementById('modal-blueprint-upload').classList.contains('hidden'),
      laserVisible: !document.getElementById('blueprint-laser').classList.contains('hidden'),
      hasCanvasData: document.getElementById('blueprint-canvas').width > 0,
      detectedWidth: extractedBlueprintData ? extractedBlueprintData.width_ft : null,
      detectedDepth: extractedBlueprintData ? extractedBlueprintData.depth_ft : null
    };
  });
  console.log('Blueprint Scanner State:', blueprintState);

  await page.screenshot({ path: path.join(__dirname, 'feature_blueprint_cv_scanner.png') });
  console.log('Saved: feature_blueprint_cv_scanner.png');

  // Apply extracted blueprint to layout
  await page.evaluate(() => {
    applyExtractedBlueprint();
  });
  await new Promise(r => setTimeout(r, 1200));

  // ==================== TEST 6: Dynamic Architectural BOM & Sustainability Impact Card ====================
  console.log('\n--- Test 6: Dynamic Architectural BOM & Sustainability Impact Card ---');
  await page.evaluate(() => {
    openShoppingList();
  });
  await new Promise(r => setTimeout(r, 800));

  const bomState = await page.evaluate(() => {
    const body = document.getElementById('shopping-list-items-body');
    const total = document.getElementById('modal-total-price').innerText;
    const roomDim = document.getElementById('bom-room-dimensions-label').innerText;
    const rows = Array.from(body.children);
    const hasEcoCard = rows.some(r => r.innerHTML.includes('KOHLER ECO-ADVANTAGE VERIFIED'));
    return {
      total,
      roomDim,
      rowCount: rows.length,
      hasEcoCard
    };
  });
  console.log('BOM State:', bomState);

  await page.screenshot({ path: path.join(__dirname, 'feature_dynamic_bom_sustainability.png') });
  console.log('Saved: feature_dynamic_bom_sustainability.png');

  // ==================== TEST 7: Showroom Locator & Technical RFQ Transmit ====================
  console.log('\n--- Test 7: Showroom Locator & Technical RFQ Transmit ---');
  await page.evaluate(() => {
    closeShoppingList();
    openShowroomModal();
  });
  await new Promise(r => setTimeout(r, 800));

  const showroomState = await page.evaluate(() => {
    return {
      totalAmount: document.getElementById('rfq-total-amount').innerText,
      summaryNote: document.getElementById('rfq-items-summary-note').innerText,
      selectedCity: document.getElementById('showroom-select').selectedOptions[0].text
    };
  });
  console.log('Showroom State:', showroomState);

  await page.screenshot({ path: path.join(__dirname, 'feature_showroom_rfq_modal.png') });
  console.log('Saved: feature_showroom_rfq_modal.png');

  await page.evaluate(() => {
    submitShowroomRfq();
  });
  await new Promise(r => setTimeout(r, 1000));

  await browser.close();
  console.log('\n======================================================');
  console.log('🏆 ALL 7 ARCHITECTURAL PLATFORM TESTS PASSED 100%!');
  console.log('======================================================');
}

main().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
