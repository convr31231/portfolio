import { niches } from '../data/site'
import { openTelegram } from '../utils/telegram'
import { useReveal } from '../hooks/useReveal'
import './Niches.css'

export default function Niches() {
  const { ref, isVisible } = useReveal()

  return (
    <section className="section" id="niches" aria-labelledby="niches-title">
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Сферы</span>
          <h2 id="niches-title">Сайты для разных сфер бизнеса</h2>
          <p>
            Если вашей сферы нет в списке — это не проблема. Структура и дизайн
            разрабатываются под конкретный бизнес и задачу.
          </p>
        </header>

        <ul className={`niches-grid reveal ${isVisible ? 'is-visible' : ''}`}>
          {niches.map((niche) => (
            <li key={niche} className="niche-card">
              {niche}
            </li>
          ))}
        </ul>

        <div className={`niches-cta reveal ${isVisible ? 'is-visible' : ''}`}>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => openTelegram()}
          >
            Обсудить проект
          </button>
        </div>
      </div>
    </section>
  )
}
