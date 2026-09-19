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

function resolveTelegramMessage(contextMessage, options = {}) {
  if (options.message) return options.message
  if (contextMessage) {
    return `Здравствуйте! Посмотрел ваше портфолио. Хочу обсудить: ${contextMessage}.`
  }
  return DEFAULT_TELEGRAM_MESSAGE
}

/**
 * Открывает Telegram с готовым текстом сообщения.
 * Если ссылка не задана — плавный скролл к контактам (или fallbackId).
 * @param {string} [contextMessage]
 * @param {{ message?: string, fallbackId?: string }} [options]
 */
export function openTelegram(contextMessage, options = {}) {
  const message = resolveTelegramMessage(contextMessage, options)
  const url = buildTelegramUrl(message)

  if (!url) {
    scrollToId(options.fallbackId || 'contact')
    return
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}

export function getTelegramHref(contextMessage, options = {}) {
  const message = resolveTelegramMessage(contextMessage, options)
  return buildTelegramUrl(message)
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
