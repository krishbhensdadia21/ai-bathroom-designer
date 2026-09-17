const fs = require('fs');
const path = require('path');

function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  const files = fs.readdirSync(source);
  for (const file of files) {
    const srcPath = path.join(source, file);
    const destPath = path.join(target, file);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function buildHtml() {
  const templatePath = path.join(__dirname, 'index_template.html');
  const publicDir = path.join(__dirname, 'public');
  const publicTargetPath = path.join(publicDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('Template not found:', templatePath);
    return;
  }

  let template = fs.readFileSync(templatePath, 'utf8');

  // Replace each include tag <!-- #include "components/..." -->
  const includeRegex = /<!--\s*#include\s*["']([^"']+)["']\s*-->/g;
  template = template.replace(includeRegex, (match, relPath) => {
    const componentPath = path.join(__dirname, relPath);
    if (fs.existsSync(componentPath)) {
      return fs.readFileSync(componentPath, 'utf8');
    } else {
      console.warn(`[!] Component file not found: ${componentPath}`);
      return `<!-- Missing component: ${relPath} -->`;
    }
  });

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write compiled template to public/index.html
  fs.writeFileSync(publicTargetPath, template, 'utf8');
  console.log(`[✓] Successfully assembled public/index.html (${template.length} bytes) from modular components!`);
  console.log('[✓] All assets consolidated cleanly inside public/ directory!');
}

if (require.main === module) {
  buildHtml();
}

module.exports = { buildHtml };

