const puppeteer = require('puppeteer-core');

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

  // 1. Open AI Assistant Modal
  console.log('Opening AI Assistant Modal...');
  await page.evaluate(() => openAiAssistantModal());
  await new Promise(r => setTimeout(r, 600));

  // 2. Switch to Custom AI Prompt tab
  console.log('Switching to Custom AI Prompt tab...');
  await page.evaluate(() => switchInputMode('natural'));
  await new Promise(r => setTimeout(r, 500));

  // 3. Set prompt text
  const promptText = 'Design a minimalist modern bathroom for 2 people under ₹2.5 lakh. Keep the vanity on the wet wall and include a walk-in shower.';
  console.log('Entering prompt:', promptText);
  await page.evaluate(async (txt) => {
    const el = document.getElementById('ai-custom-notes');
    el.value = txt;
    updateAiCustomNotesCount();
    await triggerGroqAiRecommendation();
  }, promptText);

  // 4. Wait for recommendation generation and UI render
  await new Promise(r => setTimeout(r, 2500));

  // 5. Screenshot AI Modal
  await page.screenshot({ path: 'budget_enforced_ai_modal.png' });
  console.log('Saved: budget_enforced_ai_modal.png');

  // 6. Verify details
  const details = await page.evaluate(() => {
    const total = document.getElementById('ai-bundle-total-preview')?.innerText;
    const count = document.getElementById('ai-bundle-count-badge')?.innerText;
    const budgetBadgeVisible = !document.getElementById('ai-auto-budget-badge')?.classList.contains('hidden');
    const budgetAmount = document.getElementById('ai-auto-budget-amount')?.innerText;
    const budgetReason = document.getElementById('ai-auto-budget-reason')?.innerText;
    const roomBadgeVisible = !document.getElementById('ai-auto-room-badge')?.classList.contains('hidden');
    const roomDim = document.getElementById('ai-auto-room-dimensions')?.innerText;
    const understoodTags = Array.from(document.querySelectorAll('#ai-understood-tags li span')).map(s => s.innerText);
    const items = Array.from(document.querySelectorAll('#ai-bundle-items-container h4, #ai-bundle-items-container .font-black.text-sm')).map(el => el.innerText);

    return { total, count, budgetBadgeVisible, budgetAmount, budgetReason, roomBadgeVisible, roomDim, understoodTags, items };
  });

  console.log('EXTRACTED DETAILS:', JSON.stringify(details, null, 2));

  // 7. Apply AI bundle to 3D & 2D room
  console.log('Applying AI bundle to room...');
  await page.evaluate(() => applyAiBundleToBathroom());
  await new Promise(r => setTimeout(r, 1500));

  // 8. Screenshot 3D room
  await page.screenshot({ path: 'budget_enforced_3d_applied.png' });
  console.log('Saved: budget_enforced_3d_applied.png');

  await browser.close();
}

main().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
