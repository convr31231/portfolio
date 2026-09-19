/**
 * ============================================================
 *  КОНФИГУРАЦИЯ САЙТА — заполните перед deployment
 * ============================================================
 */

/** Имя для логотипа, SEO title и Schema.org */
export const SITE_NAME = 'Иван'

/**
 * Публичный HTTPS-адрес сайта без слэша в конце.
 * GitHub Pages project site:
 */
export const SITE_URL = 'https://convr31231.github.io/portfolio'

/** Пример: 'https://t.me/username' */
export const TELEGRAM_URL = ''

/** Пример: 'hello@domain.ru' — пустое значение не показывается на сайте */
export const EMAIL = ''

export const DEFAULT_TELEGRAM_MESSAGE =
  'Здравствуйте! Посмотрел ваше портфолио. Хочу обсудить разработку сайта.'

export const site = {
  name: SITE_NAME,
  brand: 'WEB DESIGN & DEVELOPMENT',
  email: EMAIL,
  github: 'https://github.com/convr31231',
  status: 'Открыт к новым проектам',

  seo: {
    title: `Разработка сайтов для бизнеса | ${SITE_NAME}`,
    description:
      'Создание современных адаптивных сайтов для бизнеса: лендинги, сайты услуг, редизайн и доработка.',
    ogImage: 'og-image.webp',
  },

  hero: {
    title: 'Создаю современные сайты для бизнеса',
    subtitle:
      'Продумываю структуру, дизайн и разработку — от первого экрана до готового запуска.',
    line: 'Лендинги • Сайты услуг • Бизнес-сайты • Редизайн',
    trust: 'Можно начать с небольшой задачи или редизайна существующего сайта.',
  },

  about: {
    title: 'Разработка с вниманием к деталям',
    paragraphs: [
      'Я занимаюсь созданием современных сайтов для бизнеса.',
      'Мне важно, чтобы сайт не только хорошо выглядел, но и был понятным для посетителя: четкая структура, заметные действия, удобная мобильная версия и быстрая работа.',
      'Разрабатываю проекты под конкретную задачу, а не просто меняю текст в готовом шаблоне.',
      'Использую современные инструменты разработки, чтобы работать быстрее, но каждый готовый сайт проверяю вручную.',
    ],
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Responsive Design',
      'UI Implementation',
      'Git',
      'Forms',
      'Animations',
      'SEO Basics',
      'Web Performance',
    ],
  },
}

/** Проверка: значение задано и не является служебной заглушкой */
export function isConfigured(value) {
  if (!value || typeof value !== 'string') return false
  const v = value.trim()
  if (!v) return false
  return !/ВСТАВИТЬ|YOUR_|CHANGE_ME|example\.com|placeholder|localhost|127\.0\.0\.1/i.test(
    v,
  )
}

/** Нормализованный SITE_URL без завершающего слэша, либо '' */
export function getSiteOrigin() {
  if (!isConfigured(SITE_URL)) return ''
  return SITE_URL.trim().replace(/\/$/, '')
}


/**
 * Проекты.
 * Превью: public/projects/*.webp
 * objectPosition — фокус кадра при object-fit: cover
 */
export const projects = [
  {
    id: 'nova',
    title: 'NOVA Detail',
    category: 'Сайт детейлинг-студии',
    url: 'https://convr31231.github.io/shablon/',
    description:
      'Сайт для детейлинг-студии: услуги, цены, портфолио, сравнение до/после, подбор услуги и запись.',
    features: [
      'Услуги и прайс',
      'Портфолио до/после',
      'Калькулятор стоимости',
      'Форма записи',
    ],
    tags: ['Landing Page', 'Responsive', 'Calculator', 'UI/UX'],
    image: 'projects/nova.webp',
    imageWidth: 1600,
    imageHeight: 1067,
    objectPosition: 'center top',
    objectPositionMobile: 'center top',
    alt: 'Сайт детейлинг-студии NOVA Detail',
    accent: '#0E7C7B',
    featured: true,
  },
  {
    id: 'mono',
    title: 'MONO Studio',
    category: 'Сайт beauty-студии',
    url: 'https://convr31231.github.io/barbershop/',
    description:
      'Сайт студии услуг с мастерами, портфолио, прайсом, отзывами и формой записи.',
    features: [
      'Услуги и мастера',
      'Портфолио работ',
      'Прайс и отзывы',
      'Онлайн-запись',
    ],
    tags: ['Business Website', 'Responsive', 'Booking', 'UI Design'],
    image: 'projects/mono.webp',
    imageWidth: 1600,
    imageHeight: 1067,
    objectPosition: 'center center',
    objectPositionMobile: 'center 15%',
    alt: 'Сайт beauty-студии MONO Studio',
    accent: '#1A1A1A',
    featured: false,
  },
  {
    id: 'coffee',
    title: 'FORM Coffee',
    category: 'Сайт кофейни',
    url: 'https://convr31231.github.io/shablon_cofe/',
    description:
      'Визуальный сайт кофейни с брендом, меню, интерьером, отзывами и бронированием.',
    features: [
      'Презентация бренда',
      'Меню и атмосфера',
      'Отзывы и контакты',
      'Бронирование',
    ],
    tags: ['Brand Website', 'Responsive', 'Visual Design', 'Landing'],
    image: 'projects/coffee.webp',
    imageWidth: 1600,
    imageHeight: 1067,
    objectPosition: 'center center',
    objectPositionMobile: 'center 30%',
    alt: 'Сайт кофейни FORM Coffee',
    accent: '#6F4E37',
    featured: false,
  },
  {
    id: 'photo',
    title: 'Photo Studio',
    category: 'Сайт фотостудии',
    url: 'https://convr31231.github.io/photo/',
    description:
      'Минималистичный сайт фотостудии с акцентом на фотографии, залы и бронирование.',
    features: [
      'Галерея и залы',
      'Условия аренды',
      'Минимальный UI',
      'Бронирование',
    ],
    tags: ['Portfolio', 'Responsive', 'Gallery', 'Minimal Design'],
    image: 'projects/photo.webp',
    imageWidth: 1600,
    imageHeight: 1067,
    objectPosition: 'center 40%',
    objectPositionMobile: 'center 35%',
    alt: 'Сайт фотостудии Photo Studio',
    accent: '#4A5568',
    featured: false,
  },
]

export const services = [
  {
    id: 'landing',
    title: 'Лендинг',
    description:
      'Одностраничный сайт для услуги, продукта или компании с фокусом на заявку.',
    price: 'от 15 000 ₽',
  },
  {
    id: 'business',
    title: 'Сайт для бизнеса',
    description:
      'Полноценная презентация компании, услуг, преимуществ и работ.',
    price: 'от 25 000 ₽',
  },
  {
    id: 'services-site',
    title: 'Сайт услуг',
    description:
      'Сайт для локального бизнеса: салона, студии, автосервиса, ремонта, специалистов и других услуг.',
    price: 'от 20 000 ₽',
  },
  {
    id: 'redesign',
    title: 'Редизайн сайта',
    description:
      'Обновление устаревшего дизайна, структуры и мобильной версии существующего сайта.',
    price: 'от 15 000 ₽',
  },
  {
    id: 'rework',
    title: 'Доработка сайта',
    description:
      'Новые блоки, формы, адаптив, HTML/CSS/JavaScript и исправление ошибок.',
    price: 'от 1 500 ₽',
  },
]

export const niches = [
  'Автобизнес',
  'Beauty',
  'Ремонт и строительство',
  'Мебель',
  'Кафе и рестораны',
  'Фотостудии',
  'Специалисты',
  'Услуги',
]

export const processSteps = [
  {
    step: '01',
    title: 'Обсуждение',
    description: 'Вы рассказываете о бизнесе, задаче и желаемом результате.',
  },
  {
    step: '02',
    title: 'Структура',
    description: 'Определяю необходимые блоки и пользовательский путь.',
  },
  {
    step: '03',
    title: 'Дизайн и разработка',
    description: 'Собираю сайт и показываю промежуточный результат.',
  },
  {
    step: '04',
    title: 'Правки и тестирование',
    description: 'Вношу согласованные изменения и проверяю мобильную версию.',
  },
  {
    step: '05',
    title: 'Запуск',
    description: 'Размещаем готовый сайт и проверяем его работу.',
  },
]

export const benefits = [
  {
    title: 'Сайт под вашу задачу',
    description: 'Структура адаптируется под конкретный бизнес.',
  },
  {
    title: 'Адаптивность',
    description:
      'Корректное отображение на компьютерах, планшетах и смартфонах.',
  },
  {
    title: 'Современный интерфейс',
    description: 'Чистый дизайн без визуального шума.',
  },
  {
    title: 'Понятный процесс',
    description: 'До начала работы согласовываем стоимость, сроки и объем.',
  },
  {
    title: 'Помощь с запуском',
    description: 'Помогу разместить сайт на хостинге и подключить домен.',
  },
]

export const redesignPoints = [
  'Современная типографика',
  'Понятная структура',
  'Нормальная мобильная версия',
  'Заметные CTA',
  'Визуальная иерархия',
  'Аккуратная презентация услуг',
]

export const pricing = [
  {
    id: 'price-landing',
    title: 'Лендинг',
    price: 'от 15 000 ₽',
  },
  {
    id: 'price-business',
    title: 'Сайт для бизнеса',
    price: 'от 25 000 ₽',
  },
  {
    id: 'price-custom',
    title: 'Индивидуальный проект',
    price: 'от 35 000 ₽',
    highlight: true,
  },
  {
    id: 'price-rework',
    title: 'Доработка сайта',
    price: 'от 1 500 ₽',
  },
]

export const pricingNote =
  'Точная стоимость зависит от структуры, количества страниц, функционала и исходных материалов.'

export const faqs = [
  {
    question: 'Сколько стоит сайт?',
    answer:
      'Стоимость зависит от задачи. Лендинг начинается примерно от 15 000 ₽. Более крупные проекты оцениваются индивидуально.',
  },
  {
    question: 'Сколько времени занимает разработка?',
    answer:
      'Срок зависит от объема проекта. После обсуждения задачи фиксируем конкретный срок.',
  },
  {
    question: 'Можно ли переделать мой существующий сайт?',
    answer:
      'Да. Могу провести редизайн, исправить мобильную версию или доработать отдельные элементы.',
  },
  {
    question: 'Что нужно от меня для начала?',
    answer:
      'Информация о компании, список услуг, контакты, фотографии и примеры сайтов, которые вам нравятся, если они есть.',
  },
  {
    question: 'Поможете разместить сайт?',
    answer:
      'Да. Могу помочь с размещением сайта на хостинге и подключением домена.',
  },
  {
    question: 'Можно начать с небольшой доработки?',
    answer: 'Да. Не обязательно сразу заказывать сайт целиком.',
  },
]

export const navLinks = [
  { href: '#works', label: 'Работы' },
  { href: '#services', label: 'Услуги' },
  { href: '#about', label: 'Обо мне' },
  { href: '#process', label: 'Процесс' },
  { href: '#contact', label: 'Контакты' },
]
