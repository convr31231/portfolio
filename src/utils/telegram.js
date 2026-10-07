import {
  TELEGRAM_URL,
  DEFAULT_TELEGRAM_MESSAGE,
  isConfigured,
} from '../data/site'
import { scrollToId } from './scroll'

export { scrollToId }

export function hasTelegram() {
  return isConfigured(TELEGRAM_URL)
}

function buildTelegramUrl(message) {
  if (!hasTelegram()) return null

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
    return `Здравствуйте! Хочу обсудить: ${contextMessage}.`
  }
  return DEFAULT_TELEGRAM_MESSAGE
}

/**
 * Открывает Telegram или прокручивает к контактам, если URL не задан.
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

/** Подпись основной CTA в зависимости от наличия Telegram */
export function getPrimaryCtaLabel(telegramLabel, contactLabel = 'Перейти к контактам') {
  return hasTelegram() ? telegramLabel : contactLabel
}
