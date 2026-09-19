import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { SITE_URL, isConfigured, getSiteOrigin } from './src/data/site.js'

const BASE = '/portfolio/'

/** Пишет robots.txt и sitemap.xml в dist на основе SITE_URL */
function seoFilesPlugin() {
  return {
    name: 'portfolio-seo-files',
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
  plugins: [react(), seoFilesPlugin()],
  base: BASE,
})
