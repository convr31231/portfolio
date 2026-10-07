import { benefits } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './Benefits.css'

export default function Benefits() {
  const { ref, isVisible } = useReveal()

  return (
    <section
      className="section section--muted section--compact"
      id="benefits"
      aria-labelledby="benefits-title"
    >
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__mark">Польза</span>
          <h2 id="benefits-title">Вся важная информация — в одном месте</h2>
        </header>

        <ul className={`benefits-list reveal ${isVisible ? 'is-visible' : ''}`}>
          {benefits.map((item, index) => (
            <li key={item.id} className="benefit-item">
              <span className="benefit-item__num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
