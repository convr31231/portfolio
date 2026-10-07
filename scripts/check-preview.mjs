import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const base = 'http://127.0.0.1:4173/portfolio/'
await mkdir('audit-shots', { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage()

await page.goto(base, { waitUntil: 'networkidle' })

const desktop = await page.evaluate(() => {
  const cards = [...document.querySelectorAll('.project-card h3')].map((el) => el.textContent)
  return {
    title: document.title,
    h1: document.querySelector('h1')?.innerText,
    cardsDefault: cards,
    moreBtn: document.querySelector('.projects-more button')?.textContent?.trim(),
    sticky: !!document.querySelector('.sticky-telegram'),
    serviceNote: [...document.querySelectorAll('p,li')].some((el) =>
      /TELEGRAM_URL|не подключен/i.test(el.textContent || ''),
    ),
    pricingAfterWorks:
      document.querySelector('#pricing').compareDocumentPosition(document.querySelector('#works')) &
      Node.DOCUMENT_POSITION_FOLLOWING,
    benefitsAfterPricing:
      document.querySelector('#benefits').compareDocumentPosition(document.querySelector('#pricing')) &
      Node.DOCUMENT_POSITION_FOLLOWING,
    githubInFinal: !!document.querySelector('#contact a[href*="github"]'),
    pricingLink: document.querySelector('.hero__pricing-link')?.getAttribute('href'),
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  }
})

await page.setViewportSize({ width: 1440, height: 900 })
await page.screenshot({ path: 'audit-shots/final-desktop.png' })

await page.locator('.projects-more button').click()
await page.waitForTimeout(200)
const expandedCount = await page.locator('.project-card').count()
await page.locator('.projects-more button').click()
await page.waitForTimeout(250)
const collapsedCount = await page.locator('.project-card').count()
const focusTag = await page.evaluate(() => document.activeElement?.tagName)

await page.locator('.project-filters__btn').nth(3).click()
await page.waitForTimeout(150)
const shopsCount = await page.locator('.project-card').count()
const moreHidden = await page.locator('.projects-more').count()

await page.locator('.project-filters__btn').first().click()
await page.waitForTimeout(150)
const backToAll = await page.locator('.project-card').count()

await page.locator('.project-card__media').first().click()
await page.waitForSelector('[role="dialog"]')
await page.keyboard.press('Escape')
await page.waitForTimeout(150)
const lightboxClosed = (await page.locator('[role="dialog"]').count()) === 0

await page.setViewportSize({ width: 390, height: 844 })
await page.goto(base, { waitUntil: 'networkidle' })
await page.waitForTimeout(200)
const mobile = await page.evaluate(() => {
  const hero = document.querySelector('.hero')
  const media = document.querySelector('.hero-main__media')
  const hr = hero?.getBoundingClientRect()
  const mr = media?.getBoundingClientRect()
  return {
    heroHeight: Math.round(hr?.height || 0),
    previewVisible: mr ? mr.top < window.innerHeight - 40 && mr.bottom > 0 : false,
    previewTop: Math.round(mr?.top || 0),
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    sticky: !!document.querySelector('.sticky-telegram'),
  }
})
await page.screenshot({ path: 'audit-shots/final-mobile.png' })

await page.locator('.burger').click()
await page.locator('#mobile-menu a[href="#pricing"]').click()
await page.waitForTimeout(400)
const pricingUnderHeader = await page.evaluate(() => {
  const header = document.querySelector('.header')
  const title = document.querySelector('#pricing-title')
  const hb = header.getBoundingClientRect().bottom
  const tt = title.getBoundingClientRect().top
  return { gap: Math.round(tt - hb), titleText: title.textContent }
})

await page.setViewportSize({ width: 360, height: 800 })
await page.goto(base, { waitUntil: 'domcontentloaded' })
const narrowOverflow = await page.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
)
await page.screenshot({ path: 'audit-shots/final-narrow.png' })

await page.goto(`${base}auto/`, { waitUntil: 'domcontentloaded' })
const autoOk = (await page.locator('h1').count()) > 0

console.log(
  JSON.stringify(
    {
      desktop,
      expandedCount,
      collapsedCount,
      focusTag,
      shopsCount,
      moreHidden,
      backToAll,
      lightboxClosed,
      mobile,
      pricingUnderHeader,
      narrowOverflow,
      autoOk,
    },
    null,
    2,
  ),
)

await browser.close()
