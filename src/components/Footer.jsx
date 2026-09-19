import { site, TELEGRAM_URL, EMAIL, isConfigured } from '../data/site'
import { openTelegram, getTelegramHref } from '../utils/telegram'
import './Footer.css'

export default function Footer() {
  const hasTelegram = isConfigured(TELEGRAM_URL)
  const hasEmail = isConfigured(EMAIL)
  const hasGithub = isConfigured(site.github)
  const telegramHref = getTelegramHref()

  return (
    <footer className="footer" id="contact">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__logo">[{site.name}]</p>
          <p className="footer__tagline">Разработка сайтов для бизнеса</p>
          <button
            type="button"
            className="btn btn--primary btn--sm footer__cta"
            onClick={() => openTelegram()}
          >
            Написать в Telegram
          </button>
        </div>

        <div className="footer__contacts">
          <h2 className="footer__heading">Контакты</h2>
          <ul className="footer__list">
            <li>
              <span>Telegram</span>
              {hasTelegram && telegramHref ? (
                <a href={telegramHref} target="_blank" rel="noopener noreferrer">
                  {formatTelegramLabel(TELEGRAM_URL)}
                </a>
              ) : (
                <button
                  type="button"
                  className="footer__text-btn"
                  onClick={() => openTelegram()}
                >
                  Написать в Telegram
                </button>
              )}
            </li>
            {hasEmail && (
              <li>
                <span>Email</span>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            )}
            {hasGithub && (
              <li>
                <span>GitHub</span>
                <a href={site.github} target="_blank" rel="noopener noreferrer">
                  {site.github.replace(/^https?:\/\//, '')}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}

function formatTelegramLabel(url) {
  try {
    const u = new URL(url)
    const path = u.pathname.replace(/^\//, '')
    return path ? `@${path}` : u.host
  } catch {
    return 'Telegram'
  }
}
