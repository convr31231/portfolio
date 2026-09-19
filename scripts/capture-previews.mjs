/**
 * Автоскриншоты проектов портфолио → PNG → WebP
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

const VIEWPORT = { width: 1440, height: 960 }
const CROP = { width: 1600, height: 1067 } // 3:2
const WEBP_QUALITY = 85

const projects = [
  {
    id: 'nova',
    url: 'https://convr31231.github.io/shablon/',
    // Небольшой скролл, если hero слишком «воздушный»
    scrollY: 0,
  },
  {
    id: 'mono',
    url: 'https://convr31231.github.io/barbershop/',
    scrollY: 0,
  },
  {
    id: 'coffee',
    url: 'https://convr31231.github.io/shablon_cofe/',
    scrollY: 0,
  },
  {
    id: 'photo',
    url: 'https://convr31231.github.io/photo/',
    scrollY: 0,
  },
]

async function waitForPageReady(page) {
  await page.waitForLoadState('domcontentloaded')
  await page.waitForLoadState('networkidle').catch(() => {})

  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready
    }

    const images = [...document.images]
    await Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve()
        return new Promise((resolve) => {
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
          setTimeout(resolve, 4000)
        })
      }),
    )
  })

  // Дать CSS/анимациям устояться
  await page.waitForTimeout(800)
}

async function captureProject(page, project) {
  console.log(`→ ${project.id}: ${project.url}`)
  await page.goto(project.url, { waitUntil: 'domcontentloaded', timeout: 60000 })
  await waitForPageReady(page)

  if (project.scrollY > 0) {
    await page.evaluate((y) => window.scrollTo(0, y), project.scrollY)
    await page.waitForTimeout(400)
  }

  const pngPath = path.join(rawDir, `${project.id}.png`)
  await page.screenshot({
    path: pngPath,
    type: 'png',
    fullPage: false,
    animations: 'disabled',
  })

  const webpPath = path.join(outDir, `${project.id}.webp`)
  let quality = WEBP_QUALITY
  let buffer = await sharp(pngPath)
    .resize(CROP.width, CROP.height, {
      fit: 'cover',
      position: project.id === 'nova' ? 'top' : 'centre',
    })
    .webp({ quality, effort: 6 })
    .toBuffer()

  // Ужать до ~400 KB при необходимости
  while (buffer.length > 400 * 1024 && quality > 70) {
    quality -= 3
    buffer = await sharp(pngPath)
      .resize(CROP.width, CROP.height, {
        fit: 'cover',
        position: project.id === 'nova' ? 'top' : 'centre',
      })
      .webp({ quality, effort: 6 })
      .toBuffer()
  }

  await writeFile(webpPath, buffer)

  const pngStat = await stat(pngPath)
  const webpStat = await stat(webpPath)
  const meta = await sharp(buffer).metadata()

  console.log(
    `  PNG ${(pngStat.size / 1024).toFixed(0)} KB → WebP ${(webpStat.size / 1024).toFixed(0)} KB (${meta.width}x${meta.height}, q=${quality})`,
  )

  return {
    id: project.id,
    width: meta.width,
    height: meta.height,
    webpKb: Math.round(webpStat.size / 1024),
    pngKb: Math.round(pngStat.size / 1024),
    quality,
  }
}

async function main() {
  await mkdir(rawDir, { recursive: true })
  await mkdir(outDir, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: 'ru-RU',
  })
  const page = await context.newPage()

  const results = []
  for (const project of projects) {
    results.push(await captureProject(page, project))
  }

  await browser.close()
  console.log('\nГотово:')
  console.table(results)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
