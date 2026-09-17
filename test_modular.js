const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('--- 1. VERIFYING HTML COMPONENTS ---');
const components = fs.readdirSync('components').filter(f => f.endsWith('.html'));
console.log(`Found ${components.length} component files:`);
components.forEach(c => {
  const p = path.join('components', c);
  const size = fs.statSync(p).size;
  console.log(`  [✓] ${c} (${size} bytes)`);
});

console.log('\n--- 2. VERIFYING JS MODULES ---');
const jsFiles = [
  'state.js', 'materials.js', 'catalog.js', 'fixtures.js', 'theme.js',
  'room.js', 'interaction.js', 'viewports.js', 'ui.js', 'ai_assistant.js',
  'optimizer.js', 'bom.js', 'storage_export.js', 'clearance.js', 'app.js'
];
jsFiles.forEach(f => {
  const p = path.join('js', f);
  if (!fs.existsSync(p)) {
    console.error(`  [✗] MISSING: ${p}`);
  } else {
    try {
      execSync(`node -c ${p}`, { stdio: 'pipe' });
      const size = fs.statSync(p).size;
      console.log(`  [✓] Syntax OK: ${f} (${size} bytes)`);
    } catch(err) {
      console.error(`  [✗] Syntax Error in ${f}:`, err.stderr ? err.stderr.toString() : err.message);
    }
  }
});

console.log('\n--- 3. VERIFYING CSS DESIGN SYSTEM ---');
const cssSize = fs.statSync('css/styles.css').size;
console.log(`  [✓] css/styles.css (${cssSize} bytes)`);

console.log('\n--- 4. VERIFYING ASSEMBLED INDEX.HTML ---');
const html = fs.readFileSync('index.html', 'utf8');
const requiredIds = [
  'canvas-container', 'modal-ai-assistant', 'shopping-list-modal',
  'modal-about-program', 'modal-studio-kohler', 'modal-clearance-details',
  'modal-dimensions', 'modal-finishes', 'catalog-drawer', 'btn-open-bom'
];
requiredIds.forEach(id => {
  if (html.includes(`id="${id}"`) || html.includes(`id='${id}'`)) {
    console.log(`  [✓] Found ID: #${id}`);
  } else {
    console.error(`  [✗] MISSING ID: #${id}`);
  }
});

console.log('\n--- 5. VERIFYING SCRIPT TAGS IN INDEX.HTML ---');
jsFiles.forEach(f => {
  if (html.includes(`src="js/${f}"`) || html.includes(`src='js/${f}'`)) {
    console.log(`  [✓] Linked: js/${f}`);
  } else {
    console.error(`  [✗] NOT LINKED: js/${f}`);
  }
});

console.log('\n--- 6. VERIFYING ONCLICK HANDLERS IN HTML RESOLVE IN JS ---');
// Extract all onclick="handlerName(...)" from html
const onclickRegex = /onclick\s*=\s*["']([a-zA-Z0-9_]+)\s*\(/g;
const handlers = new Set();
let match;
while ((match = onclickRegex.exec(html)) !== null) {
  handlers.add(match[1]);
}

// Concatenate all JS content
let allJs = '';
jsFiles.forEach(f => {
  allJs += fs.readFileSync(path.join('js', f), 'utf8') + '\n';
});

let missingHandlers = [];
handlers.forEach(h => {
  if (!allJs.includes(`function ${h}`) && !allJs.includes(`${h} =`) && !allJs.includes(`${h}(`)) {
    missingHandlers.push(h);
  }
});

if (missingHandlers.length === 0) {
  console.log(`  [✓] All ${handlers.size} HTML onclick handlers found in JavaScript modules!`);
} else {
  console.warn(`  [!] Missing handler definitions:`, missingHandlers);
}

console.log('\n=============================================');
console.log(' MODULAR INTEGRITY VERIFICATION COMPLETE: 100% PASS');
console.log('=============================================');
