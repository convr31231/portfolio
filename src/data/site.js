/**
 * ============================================================
 *  КОНФИГУРАЦИЯ САЙТА — заполните перед deployment
 * ============================================================
 */

export const SITE_NAME = 'Иван'

export const SITE_URL = 'https://convr31231.github.io/portfolio'

/**
 * Почта для заявок (FormSubmit) и прямого контакта на сайте.
 * Не храните здесь пароли почты — для FormSubmit они не нужны.
 */
export const CONTACT_EMAIL = 'malinovsergejmalinov@yandex.ru'

/** @deprecated оставлен для страницы /auto/; на главной не используется */
export const TELEGRAM_URL = ''

export const DEFAULT_TELEGRAM_MESSAGE =
  'Здравствуйте! Хочу обсудить разработку сайта для моего бизнеса.'

export const EMAIL = CONTACT_EMAIL

export const FORMSUBMIT_AJAX_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

export const FORM_SUBJECT = 'Новая заявка на разработку сайта'

export const site = {
  name: SITE_NAME,
  brand: 'Разработка сайтов',
  email: CONTACT_EMAIL,
  github: 'https://github.com/convr31231',

  seo: {
    title: 'Разработка сайтов для малого бизнеса — от 15 000 ₽',
    description:
      'Разработка сайтов для малого бизнеса: услуги, цены, примеры работ и форма заявки. Компактные сайты от 15 000 ₽, индивидуальные — от 30 000 ₽.',
    ogImage: 'og-image.webp',
  },

  hero: {
    titleLines: [
      'Разрабатываю сайты,',
      'которые показывают',
      'уровень вашего бизнеса',
    ],
    subtitle:
      'Услуги, цены, примеры работ и удобная связь — в одном понятном сайте.',
    priceLine: 'От 15 000 ₽ · Стоимость согласуем до начала работы',
    pricingLink: 'Что входит в стоимость',
  },
}

export function isConfigured(value) {
  if (!value || typeof value !== 'string') return false
  const v = value.trim()
  if (!v) return false
  return !/ВСТАВИТЬ|YOUR_|CHANGE_ME|МОЙ_TELEGRAM|example\.com|placeholder|localhost|127\.0\.0\.1|^\[.*\]$/i.test(
    v,
  )
}

/** Стартовая витрина на «Все»: крупный + два компактных */
export const SHOWCASE_IDS = ['nova', 'olga', 'fleur']

export function getSiteOrigin() {
  if (!isConfigured(SITE_URL)) return ''
  return SITE_URL.trim().replace(/\/$/, '')
}

const STATUS = {
  demo: 'Демонстрационный концепт',
  template: 'Шаблон',
  example: 'Пример сайта',
}

/**
 * Проекты. Превью: public/projects/{id}.webp
 * Полный кадр для lightbox: {id}-full.webp
 * Мобильный кадр (реальный viewport): {id}-mobile.webp
 */
export const projects = [
  {
    id: 'nova',
    title: 'NOVA Detail',
    category: 'Детейлинг-студия',
    filter: 'auto',
    status: 'demo',
    statusLabel: STATUS.demo,
    url: 'https://convr31231.github.io/shablon/',
    summary: 'Услуги, прайс, сравнение до/после, подбор услуги и запись.',
    image: 'projects/nova.webp',
    imageFull: 'projects/nova-full.webp',
    imageMobile: 'projects/nova-mobile.webp',
    imageWidth: 1440,
    imageHeight: 900,
    objectPosition: 'center top',
    alt: 'Демонстрационный концепт сайта детейлинг-студии NOVA Detail',
    accent: '#0E7C7B',
  },
  {
    id: 'olga',
    title: 'Студия Ольги Адельбаевой',
    category: 'Студия красоты',
    filter: 'beauty',
    status: 'example',
    statusLabel: STATUS.example,
    url: 'https://convr31231.github.io/olga_salon/',
    summary: 'Услуги и цены, портфолио, запись и контакты студии в Рязани.',
    image: 'projects/olga.webp',
    imageFull: 'projects/olga-full.webp',
    imageMobile: 'projects/olga-mobile.webp',
    imageWidth: 1440,
    imageHeight: 900,
    objectPosition: 'center top',
    alt: 'Пример сайта творческой студии красоты Ольги Адельбаевой',
    accent: '#2C2A28',
  },
  {
    id: 'fleur',
    title: 'Fleur',
    category: 'Цветочная студия',
    filter: 'shops',
    status: 'demo',
    statusLabel: STATUS.demo,
    url: 'https://convr31231.github.io/shablonn/',
    summary: 'Авторские букеты, подбор по бюджету и заказ в мессенджере.',
    image: 'projects/fleur.webp',
    imageFull: 'projects/fleur-full.webp',
    imageMobile: 'projects/fleur-mobile.webp',
    imageWidth: 1440,
    imageHeight: 900,
    objectPosition: 'center top',
    alt: 'Демонстрационный концепт сайта цветочной студии Fleur',
    accent: '#8B4D5C',
  },
  {
    id: 'mono',
    title: 'MONO Studio',
    category: 'Студия красоты',
    filter: 'beauty',
    status: 'demo',
    statusLabel: STATUS.demo,
    url: 'https://convr31231.github.io/barbershop/',
    summary: 'Мастера, портфолио работ, прайс и онлайн-запись.',
    image: 'projects/mono.webp',
    imageFull: 'projects/mono-full.webp',
    imageMobile: 'projects/mono-mobile.webp',
    imageWidth: 1440,
    imageHeight: 900,
    objectPosition: 'center center',
    alt: 'Демонстрационный концепт сайта студии красоты MONO Studio',
    accent: '#1A1A1A',
  },
  {
    id: 'artishok',
    title: 'Артишок',
    category: 'Студия цветов',
    filter: 'shops',
    status: 'example',
    statusLabel: STATUS.example,
    url: 'https://convr31231.github.io/artishok1/',
    summary: 'Букеты, доставка по городу и контакты студии в Тольятти.',
    image: 'projects/artishok.webp',
    imageFull: 'projects/artishok-full.webp',
    imageMobile: 'projects/artishok-mobile.webp',
    imageWidth: 1440,
    imageHeight: 900,
    objectPosition: 'center top',
    alt: 'Пример сайта студии цветов Артишок',
    accent: '#3D6B4F',
  },
  {
    id: 'kemiflo',
    title: 'Кеми Фло',
    category: 'Цветочный бутик',
    filter: 'shops',
    status: 'example',
    statusLabel: STATUS.example,
    url: 'https://convr31231.github.io/kemiflow/',
    summary: 'Премиальные композиции, доставка и оформление заказа.',
    image: 'projects/kemiflo.webp',
    imageFull: 'projects/kemiflo-full.webp',
    imageMobile: 'projects/kemiflo-mobile.webp',
    imageWidth: 1440,
    imageHeight: 900,
    objectPosition: 'center top',
    alt: 'Пример сайта цветочного бутика Кеми Фло',
    accent: '#6B2D5B',
  },
  {
    id: 'coffee',
    title: 'FORM Coffee',
    category: 'Кофейня',
    filter: 'other',
    status: 'demo',
    statusLabel: STATUS.demo,
    url: 'https://convr31231.github.io/shablon_cofe/',
    summary: 'Бренд, меню, атмосфера и бронирование столика.',
    image: 'projects/coffee.webp',
    imageFull: 'projects/coffee-full.webp',
    imageMobile: 'projects/coffee-mobile.webp',
    imageWidth: 1440,
    imageHeight: 900,
    objectPosition: 'center center',
    alt: 'Демонстрационный концепт сайта кофейни FORM Coffee',
    accent: '#6F4E37',
  },
  {
    id: 'photo',
    title: 'Photo Studio',
    category: 'Фотостудия',
    filter: 'other',
    status: 'demo',
    statusLabel: STATUS.demo,
    url: 'https://convr31231.github.io/photo/',
    summary: 'Залы, условия аренды и бронирование съёмки.',
    image: 'projects/photo.webp',
    imageFull: 'projects/photo-full.webp',
    imageMobile: 'projects/photo-mobile.webp',
    imageWidth: 1440,
    imageHeight: 900,
    objectPosition: 'center 35%',
    alt: 'Демонстрационный концепт сайта фотостудии Photo Studio',
    accent: '#4A5568',
  },
  {
    id: 'variator',
    title: 'Ремонт вариаторов',
    category: 'Автосервис',
    filter: 'auto',
    status: 'template',
    statusLabel: STATUS.template,
    url: 'https://convr31231.github.io/variator/',
    summary: 'Услуги CVT/АКПП, диагностика, запчасти и обращение.',
    image: 'projects/variator.webp',
    imageFull: 'projects/variator-full.webp',
    imageMobile: 'projects/variator-mobile.webp',
    imageWidth: 1440,
    imageHeight: 900,
    objectPosition: 'center top',
    alt: 'Шаблон сайта автосервиса по ремонту вариаторов',
    accent: '#1E3A5F',
  },
]

export const projectFilters = [
  { id: 'all', label: 'Все' },
  { id: 'auto', label: 'Автобизнес' },
  { id: 'beauty', label: 'Красота' },
  { id: 'shops', label: 'Магазины' },
  { id: 'other', label: 'Другие' },
]

export const benefits = [
  {
    id: 'services',
    title: 'Услуги и цены рядом',
    description: 'Посетитель сразу видит, чем вы занимаетесь и сколько это стоит.',
  },
  {
    id: 'works',
    title: 'Примеры работ на виду',
    description: 'Галерея или сравнение до/после помогают оценить уровень сервиса.',
  },
  {
    id: 'contact',
    title: 'Понятный следующий шаг',
    description: 'Запись, заявка или переход в мессенджер — без лишних экранов.',
  },
]

export const processSteps = [
  {
    step: '01',
    title: 'Обсуждаем задачу',
    description:
      'Вы рассказываете о бизнесе, услугах и пожеланиях. Можно общаться в переписке.',
  },
  {
    step: '02',
    title: 'Согласуем структуру и стоимость',
    description: 'Определяем страницы, содержание, функции и итоговую цену.',
  },
  {
    step: '03',
    title: 'Разрабатываю сайт',
    description: 'Показываю промежуточный результат и вношу согласованные правки.',
  },
  {
    step: '04',
    title: 'Проверяем и запускаем',
    description:
      'Проверяем мобильную версию, ссылки и способы обращения. Размещаем сайт и передаём доступы.',
  },
]

export const pricing = [
  {
    id: 'compact',
    title: 'Компактный сайт',
    price: 'от 15 000 ₽',
    difference: 'Готовая структура и адаптация под ваш бизнес',
    description:
      'Для бизнеса, которому нужна аккуратная страница с основной информацией и удобным способом связи.',
    features: [
      'одна страница на основе готовой структуры',
      'адаптация оформления под бизнес',
      'информация о компании',
      'услуги и цены',
      'фотографии или примеры работ',
      'контакты и карта',
      'кнопки мессенджеров',
      'мобильная версия',
      'подключение домена и размещение на согласованном хостинге',
    ],
    formValue: 'Компактный сайт — от 15 000 ₽',
    ctaLabel: 'Обсудить этот вариант',
  },
  {
    id: 'custom',
    title: 'Индивидуальный сайт',
    price: 'от 30 000 ₽',
    difference: 'Индивидуальная структура и дизайн под задачу',
    description:
      'Для бизнеса, которому нужна более подробная подача услуг и индивидуальное оформление.',
    features: [
      'разработка структуры под задачу',
      'индивидуальный дизайн',
      'помощь с оформлением текстов на основе материалов заказчика',
      'подробные блоки услуг',
      'портфолио или галерея',
      'блоки отзывов и вопросов при наличии материалов',
      'мобильная версия',
      'согласованные анимации',
      'настройка формы обращения',
      'подключение домена и размещение на согласованном хостинге',
    ],
    formValue: 'Индивидуальный сайт — от 30 000 ₽',
    ctaLabel: 'Обсудить этот вариант',
  },
]

export const formFormats = [
  { value: '', label: 'Выберите формат' },
  { value: 'Компактный сайт — от 15 000 ₽', label: 'Компактный сайт — от 15 000 ₽' },
  {
    value: 'Индивидуальный сайт — от 30 000 ₽',
    label: 'Индивидуальный сайт — от 30 000 ₽',
  },
  { value: 'Пока не уверен(а)', label: 'Пока не уверен(а)' },
]

export const contactMethods = [
  { value: 'email', label: 'Ответ на email' },
  { value: 'call', label: 'Звонок' },
]

export const pricingNote =
  'Точная стоимость зависит от объёма страниц и функций. Состав работ и цену согласуем до начала разработки. Домен, платный хостинг и сторонние сервисы оплачиваются отдельно, если нужны для проекта.'

export const pricingExtra =
  'Каталог, редактирование контента, интеграции и дополнительные страницы — по отдельной оценке.'

export const faqs = [
  {
    question: 'Что нужно от меня для начала?',
    answer:
      'Кратко рассказать о бизнесе и передать доступные материалы: услуги, цены, контакты, фотографии и логотип, если он есть. Список уточним после обсуждения задачи.',
  },
  {
    question: 'Можно обойтись без созвона?',
    answer: 'Да, задачу, структуру и правки можно обсудить в переписке.',
  },
  {
    question: 'Есть ли обязательная абонентская плата?',
    answer:
      'Обязательную ежемесячную плату за мою работу не предусматриваю. Домен нужно продлевать, а расходы на хостинг и платные сервисы зависят от выбранного решения. Эти условия согласуем заранее.',
  },
  {
    question: 'Смогу ли я менять информацию самостоятельно?',
    answer:
      'Если нужно самостоятельно обновлять цены, тексты или фотографии, обсудим подходящий способ редактирования и включим его в оценку.',
  },
  {
    question: 'Поможете с текстами?',
    answer:
      'Помогу оформить информацию о бизнесе в понятные тексты. Факты, цены и условия согласуем с вами.',
  },
  {
    question: 'Будут ли заявки после запуска?',
    answer:
      'Сайт помогает представить предложение и принять обращения. Количество заявок зависит также от источников посетителей, спроса, цены и работы с обращениями. Сам по себе запуск сайта не гарантирует поток клиентов.',
  },
]

export const navLinks = [
  { href: '#works', label: 'Работы' },
  { href: '#pricing', label: 'Стоимость' },
  { href: '#process', label: 'Как работаю' },
  { href: '#faq', label: 'Вопросы' },
]
