/**
 * KOHLER AI Bathroom Designer — Automated Component Assembler
 * Assembles components/*.html and template into production index.html
 */

const fs = require('fs');
const path = require('path');

function buildHtml() {
  const templatePath = path.join(__dirname, 'index_template.html');
  const targetPath = path.join(__dirname, 'index.html');

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

  fs.writeFileSync(targetPath, template, 'utf8');
  console.log(`[✓] Successfully assembled index.html (${template.length} bytes) from modular components!`);
}

if (require.main === module) {
  buildHtml();
}

module.exports = { buildHtml };
