import {
  getServicePage,
  getServiceProjects,
  serviceCanonical,
  serviceNav,
  CONTACT_EMAIL,
  SITE_NAME,
} from '../data/services'
import { pricing, isConfigured } from '../data/site'
import { appPath, homeHash } from '../utils/paths'
import { useReveal } from '../hooks/useReveal'
import ProjectImage from '../components/ProjectImage'
import './service.css'

export default function ServiceApp({ slug }) {
  const page = getServicePage(slug)
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
  const canonical = serviceCanonical(slug)
  const nav = serviceNav()

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
    url: canonical,
    offers: [
      {
        '@type': 'Offer',
        name: 'Компактный сайт',
        price: '15000',
        priceCurrency: 'RUB',
      },
      {
        '@type': 'Offer',
        name: 'Индивидуальный сайт',
        price: '30000',
        priceCurrency: 'RUB',
      },
    ],
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
      <ServiceHeader nav={nav} current={slug} />
      <main id="content">
        <ServiceHero page={page} />
        <ServiceIncludes page={page} />
        <ServiceExamples examples={examples} />
        <ServicePricing />
        <ServiceCta />
      </main>
      <ServiceFooter nav={nav} />
    </div>
  )
}

function ServiceHeader({ nav, current }) {
  return (
    <header className="service-header">
      <div className="container service-header__inner">
        <a href={appPath('/')} className="service-header__logo">
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
        <a className="btn btn--primary btn--sm" href={homeHash('#contact')}>
          Обсудить сайт
        </a>
      </div>
    </header>
  )
}

function ServiceHero({ page }) {
  const { ref, isVisible } = useReveal()
  return (
    <section className="service-hero" aria-labelledby="service-title">
      <div
        className={`container service-hero__inner reveal ${isVisible ? 'is-visible' : ''}`}
        ref={ref}
      >
        <p className="section__mark">Услуга</p>
        <h1 id="service-title">{page.h1}</h1>
        <p className="service-hero__lead">{page.lead}</p>
        <div className="btn-group">
          <a className="btn btn--primary" href={homeHash('#contact')}>
            Оставить заявку
          </a>
          <a className="btn btn--secondary" href={homeHash('#pricing')}>
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
  const { ref, isVisible } = useReveal()
  return (
    <section className="section section--muted" aria-labelledby="includes-title">
      <div className="container" ref={ref}>
        <div className={`service-split reveal ${isVisible ? 'is-visible' : ''}`}>
          <div>
            <h2 id="includes-title">Кому подходит</h2>
            <ul className="service-list">
              {page.whoFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Что обычно входит</h2>
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
  const { ref, isVisible } = useReveal()
  if (!examples.length) return null

  return (
    <section className="section" aria-labelledby="examples-title">
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__mark">Примеры</span>
          <h2 id="examples-title">Работы и шаблоны по теме</h2>
          <p>Реальные демо и примеры — чтобы оценить подачу до обсуждения задачи.</p>
        </header>
        <div className={`service-examples reveal ${isVisible ? 'is-visible' : ''}`}>
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

function ServicePricing() {
  const { ref, isVisible } = useReveal()
  return (
    <section className="section section--muted" aria-labelledby="price-title">
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__mark">Стоимость</span>
          <h2 id="price-title">Два понятных формата</h2>
          <p>Состав и цену согласуем до начала разработки.</p>
        </header>
        <div className={`service-price-grid reveal ${isVisible ? 'is-visible' : ''}`}>
          {pricing.map((item) => (
            <article key={item.id} className="service-price">
              <h3>{item.title}</h3>
              <p className="service-price__value">{item.price}</p>
              <p>{item.difference}</p>
              <a className="btn btn--primary" href={homeHash('#contact')}>
                {item.ctaLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCta() {
  const { ref, isVisible } = useReveal()
  const hasEmail = isConfigured(CONTACT_EMAIL)
  return (
    <section className="service-cta" aria-labelledby="cta-title">
      <div
        className={`container service-cta__inner reveal ${isVisible ? 'is-visible' : ''}`}
        ref={ref}
      >
        <h2 id="cta-title">Обсудим сайт под вашу задачу</h2>
        <p>
          Расскажите о бизнесе — предложу структуру и сориентирую по стоимости.
          Можно начать с заявки на главной.
        </p>
        <a className="btn btn--light" href={homeHash('#contact')}>
          Перейти к форме заявки
        </a>
        {hasEmail ? (
          <p className="service-cta__mail">
            Или напишите напрямую:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        ) : null}
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
