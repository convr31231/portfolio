import { useId, useState } from 'react'
import { faqs } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './FAQ.css'

export default function FAQ() {
  const { ref, isVisible } = useReveal()
  const [openIndex, setOpenIndex] = useState(0)
  const baseId = useId()

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq__layout" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__mark">Вопросы</span>
          <h2 id="faq-title">Частые вопросы</h2>
          <p>Коротко о старте работы, оплате сервисов и правках.</p>
        </header>

        <div className={`accordion reveal ${isVisible ? 'is-visible' : ''}`}>
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-button-${index}`

            return (
              <div
                key={item.question}
                className={`accordion__item ${isOpen ? 'is-open' : ''}`}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    className="accordion__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault()
                        document
                          .getElementById(`${baseId}-button-${(index + 1) % faqs.length}`)
                          ?.focus()
                      }
                      if (e.key === 'ArrowUp') {
                        e.preventDefault()
                        document
                          .getElementById(
                            `${baseId}-button-${(index - 1 + faqs.length) % faqs.length}`,
                          )
                          ?.focus()
                      }
                    }}
                  >
                    <span>{item.question}</span>
                    <span className="accordion__icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="accordion__panel"
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
