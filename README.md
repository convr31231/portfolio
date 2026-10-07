# Разработка сайтов для малого бизнеса

Главная страница — услуги и портфолио. Отдельная страница `/auto/` сохранена.

## Перед deployment заполните в `src/data/site.js`

```js
export const SITE_NAME = 'Иван'
export const SITE_URL = 'https://convr31231.github.io/portfolio'   // без слэша в конце
export const TELEGRAM_URL = 'https://t.me/username' // обязателен для рабочих кнопок
export const EMAIL = 'hello@ваш-домен.ru' // необязательно
```

Пустой `EMAIL` на сайте не показывается. Без `TELEGRAM_URL`:
- кнопки подписываются «Перейти к контактам»;
- закреплённая кнопка Telegram на мобильном скрыта;
- после указания URL подписи и ссылки переключаются автоматически.

## Портфолио на главной

9 проектов из GitHub Pages: NOVA, Olga Salon, MONO, Fleur, Артишок, Кеми Фло, Variator, FORM Coffee, Photo Studio.

Превью: `npm run capture:previews` → `public/projects/*.{webp,-full.webp,-mobile.webp}`.

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
