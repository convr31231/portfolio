import { benefits } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './Benefits.css'

export default function Benefits() {
  const { ref, isVisible } = useReveal()

  return (
    <section
      className="section section--muted"
      id="benefits"
      aria-labelledby="benefits-title"
    >
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Преимущества</span>
          <h2 id="benefits-title">Что вы получаете</h2>
          <p>Фокус на результате для бизнеса — без лишнего шума.</p>
        </header>

        <div className={`benefits-grid reveal ${isVisible ? 'is-visible' : ''}`}>
          {benefits.map((item, index) => (
            <article key={item.title} className="benefit-card">
              <span className="benefit-card__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
