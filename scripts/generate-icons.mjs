// Generate raster favicons from SVG logo variants (light/dark)
// Outputs to static/icons to be served 1:1 by Hugo

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const assetsDir = path.join(root, 'assets');
const staticRoot = path.join(root, 'static');
const outDir = path.join(staticRoot, 'icons');

const sizes = [16, 32, 48];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function makeVariant(svgText, hex) {
  // naive fill replacement: if explicit fills exist, replace them; else inject a top-level fill via CSS
  let out = svgText;
  if (/fill="[#A-Za-z0-9() ,\.]+"/i.test(out)) {
    out = out.replace(/fill="[#A-Za-z0-9() ,\.]+"/gi, `fill="${hex}"`);
  } else {
    out = out.replace(
      /<svg([^>]+)>/i,
      (m, attrs) => `<svg${attrs}><style>:root svg, :root path, :root g { fill: ${hex}; }</style>`
    );
  }
  return out;
}

function makeCurrentColor(svgText) {
  // Replace fills with currentColor or inject CSS
  let out = svgText;
  if (/fill="[#A-Za-z0-9() ,\.]+"/i.test(out)) {
    out = out.replace(/fill="[#A-Za-z0-9() ,\.]+"/gi, 'fill="currentColor"');
  } else {
    out = out.replace(
      /<svg([^>]+)>/i,
      (m, attrs) => `<svg${attrs}><style>:root svg, :root path, :root g { fill: currentColor; }</style>`
    );
  }
  return out;
}

async function writeFileIfChanged(filePath, content) {
  try {
    const existing = await fs.readFile(filePath, 'utf8');
    if (existing === content) return;
  } catch {}
  await fs.writeFile(filePath, content, 'utf8');
  console.log('wrote', path.relative(root, filePath));
}

async function generate() {
  await ensureDir(outDir);
  await ensureDir(staticRoot);

  const srcPath = path.join(assetsDir, 'logo-src.svg');
  const src = await fs.readFile(srcPath, 'utf8');

  // SVG variants
  const svgDark = makeVariant(src, '#2A2A2A');
  const svgLight = makeVariant(src, '#FFFFFF');
  const svgCurrent = makeCurrentColor(src);

  // Write SVG variants to assets (for dev) and static (for direct use)
  await writeFileIfChanged(path.join(assetsDir, 'logo-dark.svg'), svgDark);
  await writeFileIfChanged(path.join(assetsDir, 'logo-light.svg'), svgLight);
  await writeFileIfChanged(path.join(assetsDir, 'logo.svg'), svgCurrent);
  await writeFileIfChanged(path.join(staticRoot, 'logo.svg'), svgCurrent);

  // Safari pinned tab mask icon (monochrome). Use dark (black) variant.
  await writeFileIfChanged(path.join(outDir, 'safari-pinned-tab.svg'), makeVariant(src, '#000000'));

  // Raster favicons from dark/light
  for (const [name, svgText] of [
    ['light', svgLight],
    ['dark', svgDark],
  ]) {
    for (const size of sizes) {
      const out = path.join(outDir, `favicon-${name}-${size}.png`);
      await sharp(Buffer.from(svgText)).resize(size, size, { fit: 'contain' }).png({ compressionLevel: 9 }).toFile(out);
      console.log('wrote', path.relative(root, out));
    }
  }

  // Apple touch icon from dark (works on light background)
  const appleOut = path.join(outDir, 'apple-touch-icon.png');
  await sharp(Buffer.from(svgDark)).resize(180, 180, { fit: 'contain' }).png({ compressionLevel: 9 }).toFile(appleOut);
  console.log('wrote', path.relative(root, appleOut));

  // Fallback favicon.ico: assemble with external tool not available; use 48px PNG copy instead
  // Many browsers accept PNG at /favicon.ico path as fallback
  const icoOut = path.join(staticRoot, 'favicon.ico');
  const png48 = await sharp(Buffer.from(svgDark)).resize(48, 48, { fit: 'contain' }).png().toBuffer();
  await fs.writeFile(icoOut, png48);
  console.log('wrote', path.relative(root, icoOut), '(PNG fallback)');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});

