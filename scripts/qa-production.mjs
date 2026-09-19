import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push(`pageerror: ${e}`))
page.on('response', (r) => {
  if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`)
})

await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

const checks = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('img')].map((i) => ({
    src: i.currentSrc || i.src,
    ok: i.complete && i.naturalWidth > 0,
    alt: i.alt,
  }))
  const projectLinks = [...document.querySelectorAll('#works a[target="_blank"]')].map(
    (a) => ({ href: a.href, rel: a.rel }),
  )
  return {
    imgs,
    projectLinks,
    title: document.title,
    ogImage: document.querySelector('meta[property="og:image"]')?.content,
    favicon: document.querySelector('link[rel="icon"]')?.href,
  }
})

await page.setViewportSize({ width: 375, height: 812 })
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(500)
const mobileOk = await page.evaluate(() =>
  [...document.querySelectorAll('#works img')].every((i) => i.complete && i.naturalWidth > 0),
)

const projectUrls = [
  'https://convr31231.github.io/shablon/',
  'https://convr31231.github.io/barbershop/',
  'https://convr31231.github.io/shablon_cofe/',
  'https://convr31231.github.io/photo/',
]
const linkStatuses = []
for (const url of projectUrls) {
  const res = await page.request.head(url)
  linkStatuses.push({ url, status: res.status() })
}

console.log(JSON.stringify({ checks, mobileOk, linkStatuses, errors }, null, 2))
await browser.close()
