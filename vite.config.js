import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL, isConfigured, getSiteOrigin } from './src/data/site.js'
import { servicePages } from './src/data/services.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
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

      const loc = (p) => {
        if (origin) return `${origin}${p}`
        return `${BASE}${p.replace(/^\//, '')}`
      }

      const urls = [
        { path: '/', changefreq: 'monthly', priority: '1.0' },
        { path: '/auto/', changefreq: 'monthly', priority: '0.9' },
        ...servicePages.map((page) => ({
          path: `/services/${page.slug}/`,
          changefreq: 'monthly',
          priority: '0.85',
        })),
      ]

      const body = urls
        .map(
          (u) => `  <url>
    <loc>${loc(u.path)}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
        )
        .join('\n')

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
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
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        auto: path.resolve(__dirname, 'auto/index.html'),
        servicesAuto: path.resolve(__dirname, 'services/auto/index.html'),
        servicesBeauty: path.resolve(__dirname, 'services/beauty/index.html'),
        servicesFlowers: path.resolve(__dirname, 'services/flowers/index.html'),
      },
    },
  },
})
