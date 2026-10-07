import { useState } from 'react'
import {
  getServicePage,
  getServiceProjects,
  servicePageUrl,
  serviceNav,
  CONTACT_EMAIL,
  SITE_NAME,
  pricing,
  pricingNote,
  pricingExtra,
} from '../data/services'
import { isConfigured } from '../data/site'
import { appPath } from '../utils/paths'
import ProjectImage from '../components/ProjectImage'
import ContactForm from '../components/ContactForm'
import './service.css'

export default function ServiceApp({ slug }) {
  const page = getServicePage(slug)
  const [packagePrefill, setPackagePrefill] = useState('')
  const [prefillNonce, setPrefillNonce] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  if (!page) {
    return (
      <main className="service-page">
        <div className="container service-missing">
          <h1>Страница не найдена</h1>
          <a className="btn btn--primary" href={appPath('/')}>
            На главную
          </a>
        </div>
      </main>
    )
  }

  const examples = getServiceProjects(page)
  const pageUrl = servicePageUrl(slug)
  const nav = serviceNav()

  const selectPackage = (formValue) => {
    setPackagePrefill(formValue)
    setPrefillNonce((n) => n + 1)
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.h1,
    description: page.description,
    provider: {
      '@type': 'Person',
      name: SITE_NAME,
    },
    areaServed: 'RU',
    url: pageUrl,
    offers: pricing.map((item) => ({
      '@type': 'Offer',
      name: item.title,
      price: item.id === 'compact' ? '15000' : '30000',
      priceCurrency: 'RUB',
      description: item.difference,
    })),
  }

  return (
    <div className="service-page" style={{ '--service-accent': page.accent }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <a className="skip-link" href="#content">
        Перейти к содержимому
      </a>
      <ServiceHeader
        nav={nav}
        current={slug}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        onCloseMenu={() => setMenuOpen(false)}
      />
      <main id="content">
        <ServiceHero page={page} />
        <ServiceIncludes page={page} />
        <ServiceExamples examples={examples} />
        <ServicePricing page={page} onSelectPackage={selectPackage} />
        <ServiceFaq faqs={page.faqs} />
        <ServiceContact
          page={page}
          pageUrl={pageUrl}
          packagePrefill={packagePrefill}
          prefillNonce={prefillNonce}
        />
      </main>
      <ServiceFooter nav={nav} />
    </div>
  )
}

function ServiceHeader({ nav, current, menuOpen, onToggleMenu, onCloseMenu }) {
  return (
    <header className={`service-header ${menuOpen ? 'is-open' : ''}`}>
      <div className="container service-header__inner">
        <a href={appPath('/')} className="service-header__logo" onClick={onCloseMenu}>
          <span>{SITE_NAME}</span>
          <span aria-hidden="true">·</span>
          <span>Разработка сайтов</span>
        </a>
        <nav className="service-header__nav" aria-label="Ниши">
          {nav.map((item) => (
            <a
              key={item.slug}
              href={appPath(`/services/${item.slug}/`)}
              className={
                item.slug === current
                  ? 'service-header__link is-active'
                  : 'service-header__link'
              }
              aria-current={item.slug === current ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--primary btn--sm service-header__cta" href="#contact">
          Обсудить сайт
        </a>
        <button
          type="button"
          className={`service-burger ${menuOpen ? 'is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="service-mobile-nav"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={onToggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        id="service-mobile-nav"
        className={`service-mobile ${menuOpen ? 'is-open' : ''}`}
        hidden={!menuOpen}
      >
        <nav aria-label="Мобильная навигация">
          <a href={appPath('/')} onClick={onCloseMenu}>
            На главную
          </a>
          {nav.map((item) => (
            <a
              key={item.slug}
              href={appPath(`/services/${item.slug}/`)}
              onClick={onCloseMenu}
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={onCloseMenu}>
            Оставить заявку
          </a>
        </nav>
      </div>
    </header>
  )
}

function ServiceHero({ page }) {
  return (
    <section className="service-hero" aria-labelledby="service-title">
      <div className="container service-hero__inner">
        <p className="section__mark">Услуга</p>
        <h1 id="service-title">{page.h1}</h1>
        <p className="service-hero__lead">{page.lead}</p>
        <div className="btn-group">
          <a className="btn btn--primary" href="#contact">
            Оставить заявку
          </a>
          <a className="btn btn--secondary" href="#pricing">
            Смотреть стоимость
          </a>
        </div>
        {page.relatedAutoOffer ? (
          <p className="service-hero__note">
            Есть отдельное предложение «сайт для автосервиса за 72 часа» —{' '}
            <a href={appPath('/auto/')}>открыть страницу</a>.
          </p>
        ) : null}
      </div>
    </section>
  )
}

function ServiceIncludes({ page }) {
  return (
    <section className="section section--muted" aria-labelledby="includes-title">
      <div className="container">
        <div className="service-split">
          <div>
            <h2 id="includes-title">Кому подходит</h2>
            <ul className="service-list">
              {page.whoFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Что обычно входит в сайт</h2>
            <ul className="service-list">
              {page.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceExamples({ examples }) {
  if (!examples.length) return null

  return (
    <section className="section" aria-labelledby="examples-title">
      <div className="container">
        <header className="section__header">
          <span className="section__mark">Примеры</span>
          <h2 id="examples-title">Работы и шаблоны по теме</h2>
          <p>Реальные демо и примеры — чтобы оценить подачу до обсуждения задачи.</p>
        </header>
        <div className="service-examples">
          {examples.map((project) => (
            <article key={project.id} className="service-example">
              <div className="service-example__media">
                <ProjectImage project={project} />
              </div>
              <div className="service-example__body">
                <p className="service-example__status">{project.statusLabel}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <a
                  className="btn btn--secondary btn--sm"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Открыть сайт
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicePricing({ page, onSelectPackage }) {
  return (
    <section className="section section--muted" id="pricing" aria-labelledby="price-title">
      <div className="container">
        <header className="section__header">
          <span className="section__mark">Стоимость</span>
          <h2 id="price-title">Два понятных формата</h2>
          <p>{page.pricingIntro}</p>
        </header>
        <div className="service-price-grid">
          {pricing.map((item) => (
            <article key={item.id} className="service-price">
              <h3>{item.title}</h3>
              <p className="service-price__value">{item.price}</p>
              <p className="service-price__diff">{item.difference}</p>
              <p className="service-price__desc">{item.description}</p>
              <p className="service-price__label">Базовый состав</p>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => onSelectPackage(item.formValue)}
              >
                {item.ctaLabel}
              </button>
            </article>
          ))}
        </div>
        <div className="service-price-notes">
          <p>{pricingNote}</p>
          <p>{pricingExtra}</p>
          <p>
            Корзина, онлайн-оплата, CRM, CMS и запись через сторонний сервис не входят в
            базовую цену указанных пакетов и обсуждаются отдельно, если нужны для проекта.
          </p>
        </div>
      </div>
    </section>
  )
}

function ServiceFaq({ faqs }) {
  if (!faqs?.length) return null
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <header className="section__header">
          <span className="section__mark">Вопросы</span>
          <h2 id="faq-title">Частые вопросы</h2>
          <p>Ответы по формату работы и тому, что входит в базовые пакеты.</p>
        </header>
        <div className="service-faq">
          {faqs.map((item) => (
            <details key={item.q} className="service-faq__item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceContact({ page, pageUrl, packagePrefill, prefillNonce }) {
  const hasEmail = isConfigured(CONTACT_EMAIL)
  return (
    <section className="service-cta" id="contact" aria-labelledby="cta-title">
      <div className="container service-cta__inner">
        <h2 id="cta-title">Обсудим сайт под вашу задачу</h2>
        <p>
          Расскажите о бизнесе и задаче — предложу структуру и сориентирую по стоимости.
          Заявку можно отправить прямо на этой странице.
        </p>
        <ContactForm
          packagePrefill={packagePrefill}
          prefillNonce={prefillNonce}
          serviceContext={{
            pageTitle: page.h1,
            pageUrl,
          }}
          submitClassName="btn btn--light contact-form__submit"
        />
        {hasEmail ? (
          <p className="service-cta__mail">
            Или напишите напрямую:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        ) : null}
        <p className="service-cta__home">
          <a href={appPath('/')}>Перейти на главную</a>
        </p>
      </div>
    </section>
  )
}

function ServiceFooter({ nav }) {
  return (
    <footer className="service-footer">
      <div className="container service-footer__inner">
        <a href={appPath('/')}>← На главную</a>
        <nav aria-label="Страницы услуг">
          {nav.map((item) => (
            <a key={item.slug} href={appPath(`/services/${item.slug}/`)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
