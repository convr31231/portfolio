import { pricing, pricingNote, pricingExtra } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './Pricing.css'

export default function Pricing({ onSelectPackage }) {
  const { ref, isVisible } = useReveal()

  return (
    <section className="section" id="pricing" aria-labelledby="pricing-title">
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__mark">Стоимость</span>
          <h2 id="pricing-title">Выберите формат под свою задачу</h2>
          <p>Два понятных пакета. Состав и цену согласуем до начала разработки.</p>
        </header>

        <div className={`pricing-grid reveal ${isVisible ? 'is-visible' : ''}`}>
          {pricing.map((item) => (
            <article key={item.id} className="pricing-card">
              <div className="pricing-card__top">
                <h3>{item.title}</h3>
                <p className="pricing-card__price">{item.price}</p>
                <p className="pricing-card__diff">{item.difference}</p>
                <p className="pricing-card__desc">{item.description}</p>
              </div>

              <div className="pricing-card__body">
                <p className="pricing-card__label">Базовый состав</p>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="btn btn--primary pricing-card__cta"
                onClick={() => onSelectPackage?.(item.formValue)}
              >
                {item.ctaLabel}
              </button>
            </article>
          ))}
        </div>

        <div className={`pricing-notes reveal ${isVisible ? 'is-visible' : ''}`}>
          <p>{pricingNote}</p>
          <p>{pricingExtra}</p>
        </div>
      </div>
    </section>
  )
}
