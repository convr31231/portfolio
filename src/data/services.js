import { projects, CONTACT_EMAIL, SITE_NAME, getSiteOrigin } from './site.js'

/**
 * SEO-страницы услуг по нишам.
 * URL: /portfolio/services/{slug}/
 */
export const servicePages = [
  {
    slug: 'auto',
    title: `Сайт для автосервиса и автобизнеса — от 15 000 ₽ | ${SITE_NAME}`,
    description:
      'Разработка сайта для автосервиса, детейлинга и смежных услуг: услуги и цены, примеры работ, удобная запись. Компактные сайты от 15 000 ₽, индивидуальные — от 30 000 ₽.',
    h1: 'Сайт для автосервиса и автобизнеса',
    lead: 'Понятная страница, где клиент сразу видит услуги, цены и способ записаться — с телефона и с компьютера.',
    whoFor: [
      'автосервис и ремонт',
      'детейлинг и мойка',
      'шиномонтаж и кузовной ремонт',
      'узкая специализация (например, вариаторы)',
    ],
    includes: [
      'услуги и ориентиры по ценам',
      'блок работ или сравнение до/после',
      'контакты, карта и кнопки связи',
      'мобильная версия и аккуратная подача',
      'форма заявки или запись',
    ],
    projectIds: ['nova', 'variator'],
    accent: '#0E7C7B',
    relatedAutoOffer: true,
  },
  {
    slug: 'beauty',
    title: `Сайт для салона красоты и студии — от 15 000 ₽ | ${SITE_NAME}`,
    description:
      'Разработка сайта для салона красоты, барбершопа и творческой студии: услуги, прайс, портфолио и запись. От 15 000 ₽ за компактный формат.',
    h1: 'Сайт для салона красоты и студии',
    lead: 'Сайт, который показывает уровень работ и помогает записаться без лишних шагов.',
    whoFor: [
      'салон красоты и барбершоп',
      'студия макияжа и стиля',
      'мастера с портфолио работ',
      'небольшие студии с записью',
    ],
    includes: [
      'услуги и прайс',
      'портфолио работ',
      'блок о мастерах или студии',
      'запись и контакты',
      'мобильная версия',
    ],
    projectIds: ['olga', 'mono'],
    accent: '#2C2A28',
    relatedAutoOffer: false,
  },
  {
    slug: 'flowers',
    title: `Сайт для цветочного магазина и студии — от 15 000 ₽ | ${SITE_NAME}`,
    description:
      'Разработка сайта для цветочной студии и бутика: каталог или подбор букетов, доставка и заказ. Компактные сайты от 15 000 ₽.',
    h1: 'Сайт для цветочного магазина и студии',
    lead: 'Красивая подача ассортимента и простой заказ — чтобы посетитель не терялся между фото и контактами.',
    whoFor: [
      'цветочная студия',
      'магазин букетов',
      'доставка цветов по городу',
      'бутик с сезонными композициями',
    ],
    includes: [
      'витрина букетов или категорий',
      'подбор по поводу или бюджету',
      'условия доставки',
      'заказ через форму или мессенджер',
      'мобильная версия',
    ],
    projectIds: ['fleur', 'artishok', 'kemiflo'],
    accent: '#8B4D5C',
    relatedAutoOffer: false,
  },
]

export function getServicePage(slug) {
  return servicePages.find((p) => p.slug === slug) || null
}

export function getServiceProjects(page) {
  if (!page) return []
  return page.projectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean)
}

export function serviceCanonical(slug) {
  const origin = getSiteOrigin()
  const path = `/services/${slug}/`
  return origin ? `${origin}${path}` : path
}

export function serviceNav() {
  return servicePages.map((p) => ({
    slug: p.slug,
    href: `services/${p.slug}/`,
    label:
      p.slug === 'auto'
        ? 'Автобизнес'
        : p.slug === 'beauty'
          ? 'Красота'
          : 'Цветы',
  }))
}

export { CONTACT_EMAIL, SITE_NAME }
