/**
 * Скриншоты проектов: desktop + mobile → WebP
 * Запуск: node scripts/capture-previews.mjs
 */
import { chromium } from 'playwright'
import sharp from 'sharp'
import { mkdir, writeFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'projects')
const rawDir = path.join(outDir, 'raw')

const DESKTOP = { width: 1440, height: 900 }
const MOBILE = { width: 390, height: 844 }
const DESKTOP_CROP = { width: 1440, height: 900 }
const FULL_MAX = { width: 1600, height: 1000 }
const MOBILE_CROP = { width: 780, height: 1688 }
const WEBP_QUALITY = 82

const projects = [
  { id: 'nova', url: 'https://convr31231.github.io/shablon/', position: 'top' },
  { id: 'olga', url: 'https://convr31231.github.io/olga_salon/', position: 'top' },
  { id: 'mono', url: 'https://convr31231.github.io/barbershop/', position: 'centre' },
  { id: 'fleur', url: 'https://convr31231.github.io/shablonn/', position: 'top' },
  { id: 'artishok', url: 'https://convr31231.github.io/artishok1/', position: 'top' },
  { id: 'kemiflo', url: 'https://convr31231.github.io/kemiflow/', position: 'top' },
  { id: 'variator', url: 'https://convr31231.github.io/variator/', position: 'top' },
  { id: 'coffee', url: 'https://convr31231.github.io/shablon_cofe/', position: 'centre' },
  { id: 'photo', url: 'https://convr31231.github.io/photo/', position: 'centre' },
]

async function waitForPageReady(page) {
  await page.waitForLoadState('domcontentloaded')
  await page.waitForLoadState('networkidle').catch(() => {})

  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready
    await Promise.all(
      [...document.images].map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve()
        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
          setTimeout(resolve, 5000)
        })
      }),
    )
  })

  await page.waitForTimeout(900)
}

async function compressWebp(pngPath, outPath, { width, height, position }) {
  let quality = WEBP_QUALITY
  let buffer = await sharp(pngPath)
    .resize(width, height, { fit: 'cover', position })
    .webp({ quality, effort: 6 })
    .toBuffer()

  while (buffer.length > 320 * 1024 && quality > 65) {
    quality -= 4
    buffer = await sharp(pngPath)
      .resize(width, height, { fit: 'cover', position })
      .webp({ quality, effort: 6 })
      .toBuffer()
  }

  await writeFile(outPath, buffer)
  const meta = await sharp(buffer).metadata()
  const fileStat = await stat(outPath)
  return { kb: Math.round(fileStat.size / 1024), w: meta.width, h: meta.height, q: quality }
}

async function captureVariant(page, project, variant) {
  const isMobile = variant === 'mobile'
  const viewport = isMobile ? MOBILE : DESKTOP
  await page.setViewportSize(viewport)
  await page.goto(project.url, { waitUntil: 'domcontentloaded', timeout: 90000 })
  await waitForPageReady(page)

  const pngName = isMobile ? `${project.id}-mobile.png` : `${project.id}.png`
  const pngPath = path.join(rawDir, pngName)
  await page.screenshot({
    path: pngPath,
    type: 'png',
    fullPage: false,
    animations: 'disabled',
  })

  const results = {}

  if (isMobile) {
    results.mobile = await compressWebp(pngPath, path.join(outDir, `${project.id}-mobile.webp`), {
      width: MOBILE_CROP.width,
      height: MOBILE_CROP.height,
      position: project.position,
    })
  } else {
    results.preview = await compressWebp(pngPath, path.join(outDir, `${project.id}.webp`), {
      width: DESKTOP_CROP.width,
      height: DESKTOP_CROP.height,
      position: project.position,
    })
    results.full = await compressWebp(pngPath, path.join(outDir, `${project.id}-full.webp`), {
      width: FULL_MAX.width,
      height: FULL_MAX.height,
      position: project.position,
    })
  }

  return results
}

async function main() {
  await mkdir(rawDir, { recursive: true })
  await mkdir(outDir, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    locale: 'ru-RU',
  })
  const page = await context.newPage()

  const summary = []
  for (const project of projects) {
    console.log(`→ ${project.id}: ${project.url}`)
    const desktop = await captureVariant(page, project, 'desktop')
    const mobile = await captureVariant(page, project, 'mobile')
    summary.push({ id: project.id, ...desktop.preview, mobileKb: mobile.mobile?.kb })
    console.log(
      `  desktop ${desktop.preview.kb} KB, full ${desktop.full.kb} KB, mobile ${mobile.mobile.kb} KB`,
    )
  }

  await browser.close()
  console.log('\nГотово:')
  console.table(summary)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
