# Портфолио — разработка сайтов для бизнеса

## Перед deployment заполните в `src/data/site.js`

```js
export const SITE_NAME = 'Иван'
export const SITE_URL = 'https://ваш-домен.ru'   // без слэша в конце
export const TELEGRAM_URL = 'https://t.me/username'
export const EMAIL = 'hello@ваш-домен.ru'
```

Пустые `TELEGRAM_URL` / `EMAIL` на сайте не отображаются.

## Production build

```bash
npm install
npm run build
```

Загрузите на хостинг **содержимое папки `dist/`**.

Локальная проверка production-сборки:

```bash
npm run preview
```

## Публикация

GitHub Pages project site (`/portfolio/`): в `vite.config.js` задано `base: '/portfolio/'`.

```bash
npm run build
```

Workflow: `.github/workflows/deploy.yml` — `npm ci` → `npm run build` → publish `dist` при push в `main`.


## Превью проектов

Файлы в `public/projects/*.webp`. Повторный захват: `npm run capture:previews`.

Бренд-ассеты (OG / favicon): `npm run generate:assets`.
