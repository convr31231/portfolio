import { useEffect, useState } from 'react'
import { site, TELEGRAM_URL, isConfigured, getSiteOrigin } from '../data/site'
import {
  autoPage,
  AUTO_TELEGRAM_MESSAGE,
  getAutoExampleProject,
} from '../data/auto'
import { openTelegram, getTelegramHref } from '../utils/telegram'
import { publicUrl } from '../utils/publicUrl'
import { useTheme } from '../hooks/useTheme'
import { useReveal } from '../hooks/useReveal'
import ProjectImage from '../components/ProjectImage'

const telegramOpts = {
  message: AUTO_TELEGRAM_MESSAGE,
  fallbackId: 'final-cta',
}

function openAutoTelegram() {
  openTelegram(undefined, telegramOpts)
}

function getAutoTelegramHref() {
  return getTelegramHref(undefined, telegramOpts)
}

export default function AutoApp() {
  const { theme, toggleTheme } = useTheme()
  const origin = getSiteOrigin()
  const example = getAutoExampleProject()
  const pageUrl = origin ? `${origin}/auto/` : undefined

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: autoPage.pricing.title,
    description: autoPage.seo.description,
    provider: {
      '@type': 'Person',
      name: site.name,
    },
    areaServed: 'RU',
    offers: {
      '@type': 'Offer',
      price: '50000',
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
    },
  }

  if (pageUrl) schema.url = pageUrl

  return (
    <div className="auto-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <a className="skip-link" href="#top">
        Перейти к содержимому
      </a>
      <AutoHeader theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <AutoHero example={example} />
        <AutoProblem />
        <AutoFeatures />
        <AutoExample example={example} />
        <AutoCompare />
        <AutoProcess />
        <AutoPricing />
        <AutoFinalCta />
      </main>
      <AutoFooter />
      <AutoStickyCta />
    </div>
  )
}

function AutoHeader({ theme, onToggleTheme }) {
  const [compact, setCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`auto-header ${compact ? 'auto-header--compact' : ''} ${menuOpen ? 'auto-header--menu-open' : ''}`}
    >
      <div className="container auto-header__inner">
        <a href={publicUrl('')} className="auto-header__logo">
          <span className="auto-header__name">[{site.name}]</span>
          <span className="auto-header__sep" aria-hidden="true">
            /
          </span>
          <span className="auto-header__brand">Автобизнес</span>
        </a>

        <nav className="auto-header__nav" aria-label="Навигация страницы">
          {autoPage.nav.map((link) => (
            <a key={link.href} href={link.href} className="auto-header__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="auto-header__actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={
              theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'
            }
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className="btn btn--primary btn--sm auto-header__cta"
            onClick={openAutoTelegram}
          >
            Написать в Telegram
          </button>

          <button
            type="button"
            className={`burger ${menuOpen ? 'burger--open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="auto-mobile-menu"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="auto-mobile-menu"
        className={`auto-mobile-menu ${menuOpen ? 'auto-mobile-menu--open' : ''}`}
        hidden={!menuOpen}
      >
        <nav className="auto-mobile-menu__nav" aria-label="Мобильная навигация">
          {autoPage.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="auto-mobile-menu__link"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            closeMenu()
            openAutoTelegram()
          }}
        >
          Написать в Telegram
        </button>
      </div>
    </header>
  )
}

function AutoHero({ example }) {
  const { ref, isVisible } = useReveal()
  const { hero, audiences } = autoPage

  return (
    <section className="auto-hero" id="top" aria-labelledby="auto-hero-title">
      <div className="container auto-hero__grid" ref={ref}>
        <div className={`auto-hero__content ${isVisible ? 'is-visible' : ''}`}>
          <ul className="auto-hero__audiences reveal-item" aria-label="Для кого">
            {audiences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h1 id="auto-hero-title" className="reveal-item reveal-delay-1">
            {hero.title}
          </h1>

          <p className="auto-hero__subtitle reveal-item reveal-delay-2">
            {hero.subtitle}
          </p>

          <div className="btn-group reveal-item reveal-delay-3">
            <button
              type="button"
              className="btn btn--primary"
              onClick={openAutoTelegram}
            >
              {hero.primaryCta}
            </button>
            <a
              className="btn btn--secondary"
              href={example.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {hero.secondaryCta}
            </a>
          </div>

          <p className="auto-hero__trust reveal-item reveal-delay-3">
            {hero.trust}
          </p>
        </div>

        <div
          className={`auto-hero__visual ${isVisible ? 'is-visible' : ''}`}
          aria-hidden="true"
        >
          <div className="auto-hero-stage">
            <div className="auto-browser">
              <div className="auto-browser__bar">
                <span />
                <span />
                <span />
                <div className="auto-browser__url">{example.title}</div>
              </div>
              <div className="auto-browser__body">
                <ProjectImage project={example} priority decorative />
              </div>
            </div>
            <div className="auto-hero-badge">
              <strong>72 часа</strong>
              <span>до готового сайта</span>
            </div>
            <div className="auto-hero-price">
              <span>Фиксированная цена</span>
              <strong>50 000 ₽</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AutoProblem() {
  const { ref, isVisible } = useReveal()
  const { problem } = autoPage

  return (
    <section
      className="section section--muted auto-problem"
      id="problem"
      aria-labelledby="auto-problem-title"
    >
      <div className="container" ref={ref}>
        <header
          className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}
        >
          <span className="section__eyebrow">Задача сайта</span>
          <h2 id="auto-problem-title">{problem.lead}</h2>
        </header>

        <ol
          className={`auto-problem__grid reveal ${isVisible ? 'is-visible' : ''}`}
        >
          {problem.points.map((point, index) => (
            <li key={point.id} className="auto-problem__card">
              <span className="auto-problem__num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p>{point.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function AutoFeatures() {
  const { ref, isVisible } = useReveal()

  return (
    <section
      className="section"
      id="features"
      aria-labelledby="auto-features-title"
    >
      <div className="container" ref={ref}>
        <header
          className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}
        >
          <span className="section__eyebrow">Состав</span>
          <h2 id="auto-features-title">Что будет на сайте</h2>
          <p>
            Всё, что нужно клиенту автосервиса, чтобы понять услуги и записаться.
          </p>
        </header>

        <ul
          className={`auto-features reveal ${isVisible ? 'is-visible' : ''}`}
        >
          {autoPage.features.map((item) => (
            <li key={item.id} className="auto-feature">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function AutoExample({ example }) {
  const { ref, isVisible } = useReveal()
  const { example: copy } = autoPage

  return (
    <section
      className="section section--muted"
      id="example"
      aria-labelledby="auto-example-title"
    >
      <div className="container" ref={ref}>
        <div className={`auto-example reveal ${isVisible ? 'is-visible' : ''}`}>
          <div className="auto-example__media">
            <div className="auto-example__frame">
              <ProjectImage project={example} priority={false} />
            </div>
          </div>

          <div className="auto-example__content">
            <span className="section__eyebrow">{copy.eyebrow}</span>
            <h2 id="auto-example-title">{copy.title}</h2>
            <p className="auto-example__name">{example.title}</p>
            <ul className="auto-example__list">
              {copy.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              className="btn btn--primary"
              href={example.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function AutoCompare() {
  const { ref, isVisible } = useReveal()
  const { compare } = autoPage

  return (
    <section
      className="section"
      id="compare"
      aria-labelledby="auto-compare-title"
    >
      <div className="container" ref={ref}>
        <header
          className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}
        >
          <span className="section__eyebrow">Разница</span>
          <h2 id="auto-compare-title">До и после</h2>
          <p>
            Смысловое сравнение: что мешает клиенту на старом сайте и как выглядит
            понятная структура.
          </p>
        </header>

        <div
          className={`auto-compare reveal ${isVisible ? 'is-visible' : ''}`}
        >
          <article className="auto-compare__panel auto-compare__panel--before">
            <h3>{compare.before.title}</h3>
            <ul>
              {compare.before.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>

          <article className="auto-compare__panel auto-compare__panel--after">
            <h3>{compare.after.title}</h3>
            <ul>
              {compare.after.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

function AutoProcess() {
  const { ref, isVisible } = useReveal()
  const { process } = autoPage

  return (
    <section
      className="section section--muted"
      id="process"
      aria-labelledby="auto-process-title"
    >
      <div className="container" ref={ref}>
        <header
          className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}
        >
          <span className="section__eyebrow">Процесс</span>
          <h2 id="auto-process-title">Как проходит работа</h2>
          <p className="auto-process__note">{process.note}</p>
        </header>

        <ol
          className={`auto-process reveal ${isVisible ? 'is-visible' : ''}`}
        >
          {process.steps.map((item, index) => (
            <li key={item.step} className="auto-process__item">
              <div className="auto-process__marker" aria-hidden="true">
                <span>{item.step}</span>
                {index < process.steps.length - 1 && (
                  <i className="auto-process__line" />
                )}
              </div>
              <div className="auto-process__content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function AutoPricing() {
  const { ref, isVisible } = useReveal()
  const { pricing } = autoPage

  return (
    <section
      className="section"
      id="pricing"
      aria-labelledby="auto-pricing-title"
    >
      <div className="container" ref={ref}>
        <header
          className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}
        >
          <span className="section__eyebrow">Стоимость</span>
          <h2 id="auto-pricing-title">Один пакет — всё включено</h2>
        </header>

        <article
          className={`auto-pricing reveal ${isVisible ? 'is-visible' : ''}`}
        >
          <div className="auto-pricing__top">
            <div>
              <h3>{pricing.title}</h3>
              <p className="auto-pricing__term">Срок: {pricing.term}</p>
            </div>
            <p className="auto-pricing__price">{pricing.price}</p>
          </div>

          <ul className="auto-pricing__list">
            {pricing.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <button
            type="button"
            className="btn btn--primary"
            onClick={openAutoTelegram}
          >
            Получить бесплатный первый экран
          </button>
        </article>
      </div>
    </section>
  )
}

function AutoFinalCta() {
  const { ref, isVisible } = useReveal()
  const { cta } = autoPage

  return (
    <section
      className="section auto-final"
      id="final-cta"
      aria-labelledby="auto-cta-title"
    >
      <div
        className={`container auto-final__box reveal ${isVisible ? 'is-visible' : ''}`}
        ref={ref}
      >
        <div className="auto-final__content">
          <h2 id="auto-cta-title">{cta.title}</h2>
          <p>{cta.text}</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={openAutoTelegram}
          >
            {cta.button}
          </button>
        </div>
      </div>
    </section>
  )
}

function AutoFooter() {
  const hasTelegram = isConfigured(TELEGRAM_URL)
  const telegramHref = getAutoTelegramHref()

  return (
    <footer className="auto-footer" id="contact">
      <div className="container auto-footer__inner">
        <div>
          <p className="auto-footer__logo">[{site.name}]</p>
          <p className="auto-footer__tagline">Сайты для автобизнеса</p>
        </div>
        <div className="auto-footer__actions">
          {hasTelegram && telegramHref ? (
            <a
              className="btn btn--primary btn--sm"
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Написать в Telegram
            </a>
          ) : (
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={openAutoTelegram}
            >
              Написать в Telegram
            </button>
          )}
          <a className="auto-footer__back" href={publicUrl('')}>
            ← К портфолио
          </a>
        </div>
      </div>
      <div className="container auto-footer__bottom">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}

function AutoStickyCta() {
  return (
    <div className="auto-sticky" role="region" aria-label="Быстрая связь">
      <button
        type="button"
        className="btn btn--primary auto-sticky__btn"
        onClick={openAutoTelegram}
      >
        Написать в Telegram
      </button>
    </div>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}
