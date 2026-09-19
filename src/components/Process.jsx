import { processSteps } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './Process.css'

export default function Process() {
  const { ref, isVisible } = useReveal()

  return (
    <section className="section" id="process" aria-labelledby="process-title">
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Процесс</span>
          <h2 id="process-title">Как проходит работа</h2>
          <p>Пять понятных этапов — от первого сообщения до запуска сайта.</p>
        </header>

        <ol className={`timeline reveal ${isVisible ? 'is-visible' : ''}`}>
          {processSteps.map((item, index) => (
            <li key={item.step} className="timeline__item">
              <div className="timeline__marker" aria-hidden="true">
                <span>{item.step}</span>
                {index < processSteps.length - 1 && <i className="timeline__line" />}
              </div>
              <div className="timeline__content">
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
