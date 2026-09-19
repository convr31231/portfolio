import {
  TELEGRAM_URL,
  DEFAULT_TELEGRAM_MESSAGE,
  isConfigured,
} from '../data/site'

function buildTelegramUrl(message) {
  if (!isConfigured(TELEGRAM_URL)) return null

  const base = TELEGRAM_URL.trim().replace(/\/$/, '')
  const text = encodeURIComponent(message || DEFAULT_TELEGRAM_MESSAGE)

  try {
    const url = new URL(base.startsWith('http') ? base : `https://${base}`)
    if (url.protocol !== 'https:') {
      url.protocol = 'https:'
    }
    url.searchParams.set('text', text)
    return url.toString()
  } catch {
    const normalized = base.startsWith('http') ? base : `https://${base}`
    const sep = normalized.includes('?') ? '&' : '?'
    return `${normalized}${sep}text=${text}`
  }
}

/**
 * Открывает Telegram с готовым текстом сообщения.
 * Если ссылка не задана — плавный скролл к контактам.
 */
export function openTelegram(contextMessage) {
  const message = contextMessage
    ? `Здравствуйте! Посмотрел ваше портфолио. Хочу обсудить: ${contextMessage}.`
    : DEFAULT_TELEGRAM_MESSAGE

  const url = buildTelegramUrl(message)

  if (!url) {
    scrollToId('contact')
    return
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}

export function getTelegramHref(contextMessage) {
  const message = contextMessage
    ? `Здравствуйте! Посмотрел ваше портфолио. Хочу обсудить: ${contextMessage}.`
    : DEFAULT_TELEGRAM_MESSAGE
  return buildTelegramUrl(message)
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
