import { redesignPoints } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './BeforeAfter.css'

export default function BeforeAfter() {
  const { ref, isVisible } = useReveal()

  return (
    <section className="section" id="redesign" aria-labelledby="redesign-title">
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Редизайн</span>
          <h2 id="redesign-title">Устаревший сайт → Современный сайт</h2>
          <p>Что меняется при обновлении дизайна и структуры.</p>
        </header>

        <div className={`ba reveal ${isVisible ? 'is-visible' : ''}`}>
          <div className="ba__panels">
            <article className="ba__panel ba__panel--before" aria-label="Пример устаревшего сайта">
              <span className="ba__badge">До</span>
              <div className="ba__window">
                <div className="ba__chrome">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="ba__outdated">
                  <div className="ba__outdated-nav" />
                  <div className="ba__outdated-hero" />
                  <div className="ba__outdated-cols">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="ba__outdated-footer" />
                </div>
              </div>
              <p className="ba__caption">Плотная верстка, слабая иерархия, незаметные действия</p>
            </article>

            <div className="ba__arrow" aria-hidden="true">
              →
            </div>

            <article className="ba__panel ba__panel--after" aria-label="Пример современного сайта">
              <span className="ba__badge ba__badge--accent">После</span>
              <div className="ba__window">
                <div className="ba__chrome">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="ba__modern">
                  <div className="ba__modern-nav">
                    <i />
                    <b />
                  </div>
                  <div className="ba__modern-hero">
                    <em />
                    <em />
                    <button type="button" tabIndex={-1} aria-hidden="true">
                      CTA
                    </button>
                  </div>
                  <div className="ba__modern-cards">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
              <p className="ba__caption">Воздух, акцент на оффере, понятный путь к заявке</p>
            </article>
          </div>

          <ul className="ba__points">
            {redesignPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
