import { pricing, pricingNote } from '../data/site'
import { openTelegram } from '../utils/telegram'
import { useReveal } from '../hooks/useReveal'
import './Pricing.css'

export default function Pricing() {
  const { ref, isVisible } = useReveal()

  return (
    <section
      className="section section--muted"
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Стоимость</span>
          <h2 id="pricing-title">Ориентировочная стоимость</h2>
          <p>Понятные ориентиры по форматам работы.</p>
        </header>

        <div className={`pricing-grid reveal ${isVisible ? 'is-visible' : ''}`}>
          {pricing.map((item) => (
            <article
              key={item.id}
              className={`pricing-card ${item.highlight ? 'pricing-card--highlight' : ''}`}
            >
              <h3>{item.title}</h3>
              <p className="pricing-card__price">{item.price}</p>
            </article>
          ))}
        </div>

        <div className={`pricing-footer reveal ${isVisible ? 'is-visible' : ''}`}>
          <p>{pricingNote}</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => openTelegram('оценку стоимости сайта')}
          >
            Получить оценку
          </button>
        </div>
      </div>
    </section>
  )
}
