import { chromium } from 'playwright'

const base = 'http://127.0.0.1:4173/portfolio/'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(`pageerror: ${e}`))
page.on('response', (r) => {
  const u = r.url()
  if (u.includes('/portfolio/') && r.status() >= 400) {
    errors.push(`${r.status()} ${u}`)
  }
})

await page.goto(base, { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)

const html = await page.content()
const jsMatch = html.match(/src="([^"]*assets\/[^"]+\.js)"/)
const cssMatch = html.match(/href="([^"]*assets\/[^"]+\.css)"/)

const assetChecks = []
for (const path of [
  jsMatch?.[1],
  cssMatch?.[1],
  '/portfolio/projects/nova.webp',
  '/portfolio/projects/mono.webp',
  '/portfolio/projects/coffee.webp',
  '/portfolio/projects/photo.webp',
  '/portfolio/favicon.ico',
].filter(Boolean)) {
  const url = path.startsWith('http') ? path : `http://127.0.0.1:4173${path}`
  const res = await page.request.get(url)
  assetChecks.push({ url: path, status: res.status() })
}

const imgsOk = await page.evaluate(() =>
  [...document.querySelectorAll('img')].map((i) => ({
    src: i.getAttribute('src'),
    ok: i.complete && i.naturalWidth > 0,
  })),
)

console.log(
  JSON.stringify(
    { js: jsMatch?.[1], css: cssMatch?.[1], assetChecks, imgsOk, errors },
    null,
    2,
  ),
)
await browser.close()
