const puppeteer = require('puppeteer-core');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err));

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Wait 2 seconds for Three.js render loop
  await new Promise(r => setTimeout(r, 2000));

  const screenshotPath = path.join(__dirname, 'actual_render.png');
  await page.screenshot({ path: screenshotPath });
  console.log('Screenshot saved to:', screenshotPath);

  // Check scene state
  const sceneInfo = await page.evaluate(() => {
    return {
      placedCount: window.placedProducts ? window.placedProducts.length : 0,
      canvasWidth: document.querySelector('canvas') ? document.querySelector('canvas').width : 0,
      canvasHeight: document.querySelector('canvas') ? document.querySelector('canvas').height : 0,
      totalBOM: document.getElementById('header-total-price') ? document.getElementById('header-total-price').innerText : null
    };
  });
  console.log('Scene Info:', JSON.stringify(sceneInfo, null, 2));

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
