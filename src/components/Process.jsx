import { processSteps } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './Process.css'

export default function Process() {
  const { ref, isVisible } = useReveal()

  return (
    <section
      className="section section--muted"
      id="process"
      aria-labelledby="process-title"
    >
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__mark">Как работаю</span>
          <h2 id="process-title">От первой переписки до готового сайта</h2>
        </header>

        <ol className={`process-list reveal ${isVisible ? 'is-visible' : ''}`}>
          {processSteps.map((item) => (
            <li key={item.step} className="process-list__item">
              <span className="process-list__num" aria-hidden="true">
                {item.step}
              </span>
              <div>
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
