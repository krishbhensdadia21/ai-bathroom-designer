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
  const targetPath = path.join(__dirname, 'index.html');
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

  // Write root index.html (for local node server)
  fs.writeFileSync(targetPath, template, 'utf8');
  console.log(`[✓] Successfully assembled root index.html (${template.length} bytes) from modular components!`);

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write public/index.html (for Vercel static CDN)
  fs.writeFileSync(publicTargetPath, template, 'utf8');
  console.log(`[✓] Synced index.html to public/index.html`);

  // Sync css/ to public/css/
  const cssDir = path.join(__dirname, 'css');
  if (fs.existsSync(cssDir)) {
    copyFolderRecursive(cssDir, path.join(publicDir, 'css'));
    console.log(`[✓] Synced css/ to public/css/`);
  }

  // Sync js/ to public/js/
  const jsDir = path.join(__dirname, 'js');
  if (fs.existsSync(jsDir)) {
    copyFolderRecursive(jsDir, path.join(publicDir, 'js'));
    console.log(`[✓] Synced js/ to public/js/`);
  }

  // Sync root image assets to public/ if missing
  for (const imgName of ['logo.png', 'ai-bot-icon.png']) {
    const srcImg = path.join(__dirname, imgName);
    const destImg = path.join(publicDir, imgName);
    if (fs.existsSync(srcImg) && !fs.existsSync(destImg)) {
      fs.copyFileSync(srcImg, destImg);
      console.log(`[✓] Synced ${imgName} to public/${imgName}`);
    }
  }

  console.log('[✓] All assets fully prepared for both local server and Vercel edge deployment!');
}

if (require.main === module) {
  buildHtml();
}

module.exports = { buildHtml };

