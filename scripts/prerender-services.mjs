import { createServer } from 'vite'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const slugs = ['auto', 'beauty', 'flowers']

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { renderService } = await vite.ssrLoadModule('/src/services/entry-server.jsx')

  for (const slug of slugs) {
    const file = path.resolve(root, 'dist/services', slug, 'index.html')
    if (!existsSync(file)) {
      throw new Error(`Не найден собранный файл: ${file}`)
    }

    const appHtml = renderService(slug)
    let html = readFileSync(file, 'utf8')

    if (!html.includes('<div id="root"></div>') && !html.includes('<div id="root">')) {
      throw new Error(`В ${file} нет #root для вставки prerender`)
    }

    // Заменяем пустой root на SSR-разметку (не трогаем уже заполненный повторным запуском)
    html = html.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${appHtml}</div>`,
    )

    // Контрольные маркеры статического контента
    const checks = [
      ['<h1', 'H1'],
      ['id="contact"', 'форма/контакт'],
      ['Частые вопросы', 'FAQ'],
      ['Базовый состав', 'пакеты'],
      ['На главную', 'ссылка на главную'],
    ]
    for (const [needle, label] of checks) {
      if (!html.includes(needle)) {
        throw new Error(`[${slug}] после prerender нет «${label}» (${needle})`)
      }
    }

    writeFileSync(file, html, 'utf8')
    console.log(`[prerender] services/${slug}/ — OK (${appHtml.length} chars)`)
  }
} finally {
  await vite.close()
}
