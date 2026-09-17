const puppeteer = require('puppeteer-core');
const path = require('path');
const os = require('os');

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--user-data-dir=' + path.join(os.tmpdir(), 'chrome-test-' + Date.now())]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: path.join(__dirname, 'test_immersive_before.png') });

  // Click the 3D View checkbox
  await page.click('#toggle-immersive-view');
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: path.join(__dirname, 'test_immersive_active.png') });

  const state = await page.evaluate(() => ({
    headerHidden: document.getElementById('main-header').classList.contains('hidden'),
    subnavHidden: document.getElementById('workspace-subnav').classList.contains('hidden'),
    catalogHidden: document.getElementById('catalog-sidebar').classList.contains('hidden'),
    rightToolsHidden: document.getElementById('bottom-right-tools').classList.contains('hidden'),
    canvasW: document.querySelector('canvas') ? document.querySelector('canvas').width : 0,
    canvasH: document.querySelector('canvas') ? document.querySelector('canvas').height : 0
  }));
  console.log('Immersive Active State:', JSON.stringify(state, null, 2));

  // Click again to uncheck and restore
  await page.click('#toggle-immersive-view');
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: path.join(__dirname, 'test_immersive_restored.png') });
  console.log('Restored screenshot captured successfully');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
