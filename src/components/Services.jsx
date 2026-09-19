import { services } from '../data/site'
import { openTelegram } from '../utils/telegram'
import { useReveal } from '../hooks/useReveal'
import './Services.css'

export default function Services() {
  const { ref, isVisible } = useReveal()

  return (
    <section
      className="section section--muted"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Услуги</span>
          <h2 id="services-title">Разработка сайтов для бизнеса</h2>
          <p>
            От одностраничного лендинга до полноценного сайта компании — с прозрачной
            стоимостью и понятным результатом.
          </p>
        </header>

        <div className={`services-grid reveal ${isVisible ? 'is-visible' : ''}`}>
          {services.map((service) => (
            <article key={service.id} className="service-card">
              <div className="service-card__top">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <div className="service-card__bottom">
                <p className="service-card__price">{service.price}</p>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => openTelegram(service.title)}
                >
                  Обсудить проект
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
