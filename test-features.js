const puppeteer = require('puppeteer-core');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 860 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Capture Master Spa Layout with Clearance & Conduits
  console.log('Applying Master Spa Preset...');
  await page.evaluate(() => {
    applyLayoutPreset('master');
    toggleWetWallInspection(true);
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(__dirname, 'feature_master_spa_conduits.png') });
  console.log('Saved: feature_master_spa_conduits.png');

  // 2. Capture Night Ambiance Mode with glowing fixtures
  console.log('Activating Night Mode...');
  await page.evaluate(() => {
    setLightingAmbiance('night');
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, 'feature_night_ambiance.png') });
  console.log('Saved: feature_night_ambiance.png');

  // Switch back to Day mode
  await page.evaluate(() => {
    setLightingAmbiance('day');
    toggleWetWallInspection(false);
  });
  await new Promise(r => setTimeout(r, 800));

  // 3. Open Blueprint Scanner Modal & Trigger Scan
  console.log('Opening Blueprint Scanner Modal...');
  await page.evaluate(() => {
    openBlueprintUploadModal();
    loadSampleBlueprint('master');
  });
  await new Promise(r => setTimeout(r, 1800));
  await page.screenshot({ path: path.join(__dirname, 'feature_blueprint_scanner.png') });
  console.log('Saved: feature_blueprint_scanner.png');

  await page.evaluate(() => closeBlueprintUploadModal());
  await new Promise(r => setTimeout(r, 500));

  // 4. Open AI Assistant Modal to verify Groq prompt & results
  console.log('Opening AI Assistant Modal...');
  await page.evaluate(() => {
    openAiAssistantModal();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, 'feature_ai_assistant_modal.png') });
  console.log('Saved: feature_ai_assistant_modal.png');

  await browser.close();
  console.log('All feature screenshots captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
