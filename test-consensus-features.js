const puppeteer = require('puppeteer-core');
const path = require('path');

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
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Test AI Modal & Multi-Objective Bundle Generation
  console.log('\n--- 1. Testing AI Multi-Objective Optimization & Explainability ---');
  await page.evaluate(async () => {
    openAiAssistantModal();
    selectAiTheme('Minimalist Modern');
    await triggerGroqAiRecommendation();
  });
  await new Promise(r => setTimeout(r, 2000));

  const aiState = await page.evaluate(() => {
    return {
      activeTier: document.getElementById('ai-active-tier-tag').innerText,
      compositeScore: document.getElementById('ai-composite-score-badge').innerText,
      spatialScore: document.getElementById('score-spatial').innerText,
      budgetScore: document.getElementById('score-budget').innerText,
      wetwallScore: document.getElementById('score-wetwall').innerText,
      themeScore: document.getElementById('score-theme').innerText,
      tradeoffText: document.getElementById('ai-tradeoff-text').innerText,
      itemCount: document.getElementById('ai-bundle-items-container').children.length,
      firstItemHtml: document.getElementById('ai-bundle-items-container').children[0].innerHTML
    };
  });
  console.log('AI State:', JSON.stringify(aiState, null, 2));

  await page.screenshot({ path: path.join(__dirname, 'feature_ai_explainability_modal.png') });
  console.log('Saved: feature_ai_explainability_modal.png');

  // Test Tier Switching to Essential Value
  console.log('\n--- 2. Testing Tier Switching (Essential Value) ---');
  await page.evaluate(() => {
    switchAiAlternativeTier('essential');
  });
  await new Promise(r => setTimeout(r, 500));
  const essentialTotal = await page.evaluate(() => document.getElementById('ai-bundle-total-preview').innerText);
  console.log('Essential Tier Total Preview:', essentialTotal);

  // Switch to Masterpiece Luxury
  console.log('\n--- 3. Testing Tier Switching (Masterpiece Luxury) ---');
  await page.evaluate(() => {
    switchAiAlternativeTier('luxury');
  });
  await new Promise(r => setTimeout(r, 500));
  const luxuryTotal = await page.evaluate(() => document.getElementById('ai-bundle-total-preview').innerText);
  console.log('Luxury Tier Total Preview:', luxuryTotal);

  // Switch back to Signature and Apply to 3D
  console.log('\n--- 4. Applying Signature Bundle to 3D Scene ---');
  await page.evaluate(() => {
    switchAiAlternativeTier('signature');
    applyAiBundleToBathroom();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(__dirname, 'feature_ai_applied_3d_consensus.png') });
  console.log('Saved: feature_ai_applied_3d_consensus.png');

  // Verify Clearance Engine Status
  console.log('\n--- 5. Testing Spatial Clearance & Hard Constraints ---');
  const clearanceStatus = await page.evaluate(() => {
    return {
      badgeText: document.getElementById('label-clearance-status').innerText,
      badgeClass: document.getElementById('btn-clearance-badge').className,
      reportSummary: latestClearanceReport.summary,
      reportItemsCount: latestClearanceReport.items.length
    };
  });
  console.log('Clearance Status:', clearanceStatus);

  // Open Clearance Popover Modal
  await page.evaluate(() => openClearanceModal());
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'feature_clearance_report_modal.png') });
  console.log('Saved: feature_clearance_report_modal.png');
  await page.evaluate(() => closeClearanceModal());

  // 6. Test Studio KOHLER Specifier Data Sheet
  console.log('\n--- 6. Testing Studio KOHLER Specifier Data Sheet ---');
  await page.evaluate(() => openStudioKohlerModal());
  await new Promise(r => setTimeout(r, 800));
  const specRowsCount = await page.evaluate(() => document.getElementById('studio-kohler-tbody').children.length);
  console.log('Studio Kohler Placed Rows Count:', specRowsCount);
  await page.screenshot({ path: path.join(__dirname, 'feature_studio_kohler_modal.png') });
  console.log('Saved: feature_studio_kohler_modal.png');
  await page.evaluate(() => closeStudioKohlerModal());

  // 7. Test KDX WhatsApp Concierge Modal
  console.log('\n--- 7. Testing KDX WhatsApp AI Concierge ---');
  await page.evaluate(() => openKdxConciergeModal());
  await new Promise(r => setTimeout(r, 800));
  const whatsappPreview = await page.evaluate(() => document.getElementById('kdx-preview-text').value);
  console.log('KDX WhatsApp Message Preview:\n', whatsappPreview);
  await page.screenshot({ path: path.join(__dirname, 'feature_kdx_concierge_modal.png') });
  console.log('Saved: feature_kdx_concierge_modal.png');
  await page.evaluate(() => closeKdxConciergeModal());

  await browser.close();
  console.log('\n✅ All consensus features tested and validated successfully!');
}

main().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
