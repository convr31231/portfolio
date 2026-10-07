import { chromium } from 'playwright'

const base = 'http://127.0.0.1:4173/portfolio/'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
await page.goto(base, { waitUntil: 'networkidle' })

async function check(hash, titleSelector) {
  await page.locator('.burger').click()
  await page.waitForTimeout(150)
  await page.locator(`#mobile-menu a[href="${hash}"]`).click()
  await page.waitForTimeout(900)
  return page.evaluate((sel) => {
    const header = document.querySelector('.header').getBoundingClientRect()
    const title = document.querySelector(sel).getBoundingClientRect()
    return {
      gap: Math.round(title.top - header.bottom),
      overlapping: title.top < header.bottom - 2,
    }
  }, titleSelector)
}

const results = {
  works: await check('#works', '#works-title'),
  pricing: await check('#pricing', '#pricing-title'),
  process: await check('#process', '#process-title'),
  faq: await check('#faq', '#faq-title'),
}

console.log(JSON.stringify(results, null, 2))
await browser.close()
