import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import {
  SITE_NAME,
  SITE_URL,
  site,
  isConfigured,
  getSiteOrigin,
} from './src/data/site.js'

const BASE = '/portfolio/'

function joinUrl(origin, assetPath) {
  const originClean = String(origin || '').replace(/\/$/, '')
  const pathClean = String(assetPath || '').replace(/^\//, '')
  if (!originClean) return `${BASE}${pathClean}`
  return `${originClean}/${pathClean}`
}

function seoPlugin() {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      const origin = getSiteOrigin()
      const title = site.seo.title
      const description = site.seo.description
      const ogImage = joinUrl(origin, site.seo.ogImage || 'og-image.webp')
      const pageUrl = origin ? `${origin}/` : BASE

      const canonicalTag = `<link rel="canonical" href="${pageUrl}" />`
      const ogUrlTag = `<meta property="og:url" content="${pageUrl}" />`

      return html
        .replaceAll('%SITE_TITLE%', title)
        .replaceAll('%SITE_DESCRIPTION%', description)
        .replaceAll('%SITE_NAME%', SITE_NAME)
        .replaceAll('%OG_IMAGE%', ogImage)
        .replaceAll('%BASE_URL%', BASE)
        .replace('%CANONICAL%', canonicalTag)
        .replace('%OG_URL%', ogUrlTag)
    },
    closeBundle() {
      const origin = getSiteOrigin()
      const dist = path.resolve('dist')
      mkdirSync(dist, { recursive: true })

      const robots = origin
        ? `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`
        : `User-agent: *\nAllow: /\n`

      writeFileSync(path.join(dist, 'robots.txt'), robots, 'utf8')

      const loc = origin ? `${origin}/` : BASE
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${loc}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

      writeFileSync(path.join(dist, 'sitemap.xml'), sitemap, 'utf8')

      if (!isConfigured(SITE_URL)) {
        console.warn('\n[portfolio-seo] SITE_URL пуст.\n')
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), seoPlugin()],
  base: BASE,
})
