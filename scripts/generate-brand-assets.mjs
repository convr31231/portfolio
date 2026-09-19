/**
 * Генерация OG-изображения и favicon-набора.
 * node scripts/generate-brand-assets.mjs
 */
import sharp from 'sharp'
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_NAME } from '../src/data/site.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '..', 'public')

function escapeXml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

async function pngToIco(pngBuffer) {
  // Minimal ICO with embedded PNG (Vista+)
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)

  const entry = Buffer.alloc(16)
  entry.writeUInt8(32, 0) // width
  entry.writeUInt8(32, 1) // height
  entry.writeUInt8(0, 2)
  entry.writeUInt8(0, 3)
  entry.writeUInt16LE(1, 4)
  entry.writeUInt16LE(32, 6)
  entry.writeUInt32LE(pngBuffer.length, 8)
  entry.writeUInt32LE(6 + 16, 12)

  return Buffer.concat([header, entry, pngBuffer])
}

async function main() {
  await mkdir(publicDir, { recursive: true })
  const name = escapeXml(SITE_NAME.toUpperCase())

  const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F4F5F7"/>
  <rect width="1200" height="8" fill="#0E7C7B"/>
  <rect x="80" y="120" width="72" height="72" rx="18" fill="#0E7C7B"/>
  <text x="116" y="168" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="700">${name.slice(0, 1)}</text>
  <text x="80" y="250" fill="#0E7C7B" font-family="Arial, sans-serif" font-size="22" font-weight="700">[${name}] / WEB DESIGN &amp; DEVELOPMENT</text>
  <text x="80" y="340" fill="#111318" font-family="Arial, sans-serif" font-size="52" font-weight="700">Создаю современные сайты</text>
  <text x="80" y="410" fill="#111318" font-family="Arial, sans-serif" font-size="52" font-weight="700">для бизнеса</text>
  <text x="80" y="500" fill="#6B7280" font-family="Arial, sans-serif" font-size="24">Лендинги · Сайты услуг · Бизнес-сайты · Редизайн</text>
</svg>`

  const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="8" fill="#0E7C7B"/>
  <text x="16" y="22" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="16" font-weight="700">${name.slice(0, 1)}</text>
</svg>`

  await writeFile(path.join(publicDir, 'favicon.svg'), faviconSvg)

  const ogWebp = await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .webp({ quality: 88, effort: 6 })
    .toBuffer()
  await writeFile(path.join(publicDir, 'og-image.webp'), ogWebp)

  const icon180 = await sharp(Buffer.from(faviconSvg))
    .resize(180, 180)
    .png()
    .toBuffer()
  await writeFile(path.join(publicDir, 'apple-touch-icon.png'), icon180)

  const icon32 = await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toBuffer()
  await writeFile(path.join(publicDir, 'favicon-32x32.png'), icon32)

  const ico = await pngToIco(icon32)
  await writeFile(path.join(publicDir, 'favicon.ico'), ico)

  console.log('Generated: og-image.webp, favicon.svg, favicon.ico, apple-touch-icon.png')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
