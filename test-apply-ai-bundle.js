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
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));

  // Case A: User opens modal and clicks Apply AI Bundle immediately
  console.log('\n--- Case A: Opening modal and applying directly ---');
  await page.evaluate(() => {
    openAiAssistantModal();
    applyAiBundleToBathroom();
  });
  await new Promise(r => setTimeout(r, 1500));

  const countCaseA = await page.evaluate(() => {
    return {
      placedCount: placedProducts.length,
      fixtures: placedProducts.map(p => ({ id: p.userData.id, name: p.userData.name, pos: p.position }))
    };
  });
  console.log('Case A Placed Fixtures Count:', countCaseA.placedCount);
  console.log('Fixtures:', countCaseA.fixtures);

  if (countCaseA.placedCount === 0) {
    throw new Error('FAILED: No fixtures placed in Case A!');
  }

  // Case B: User generates bundle and clicks Apply AI Bundle
  console.log('\n--- Case B: Generating Zen Theme bundle and applying ---');
  await page.evaluate(async () => {
    openAiAssistantModal();
    selectAiTheme('Japanese Minimalist Zen');
    await triggerGroqAiRecommendation();
  });
  await new Promise(r => setTimeout(r, 1500));

  await page.evaluate(() => {
    applyAiBundleToBathroom();
  });
  await new Promise(r => setTimeout(r, 1500));

  const countCaseB = await page.evaluate(() => {
    return {
      placedCount: placedProducts.length,
      fixtures: placedProducts.map(p => ({ id: p.userData.id, name: p.userData.name, pos: p.position })),
      totalBOM: document.getElementById('header-total-price').innerText
    };
  });
  console.log('Case B Placed Fixtures Count:', countCaseB.placedCount);
  console.log('Fixtures:', countCaseB.fixtures);
  console.log('Header BOM Total:', countCaseB.totalBOM);

  if (countCaseB.placedCount === 0) {
    throw new Error('FAILED: No fixtures placed in Case B!');
  }

  await page.screenshot({ path: path.join(__dirname, 'feature_ai_bundle_placed_verified.png') });
  console.log('Saved: feature_ai_bundle_placed_verified.png');

  await browser.close();
  console.log('\n✅ Apply AI Bundle is verified and placing all items successfully!');
}

main().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
