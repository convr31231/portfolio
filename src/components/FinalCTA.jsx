import { CONTACT_EMAIL, isConfigured } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import ContactForm from './ContactForm'
import './FinalCTA.css'

export default function FinalCTA({ packagePrefill = '', prefillNonce = 0 }) {
  const { ref, isVisible } = useReveal()
  const hasEmail = isConfigured(CONTACT_EMAIL)

  return (
    <section className="final-cta" id="contact" aria-labelledby="cta-title">
      <div
        className={`container final-cta__inner reveal ${isVisible ? 'is-visible' : ''}`}
        ref={ref}
      >
        <div className="final-cta__content">
          <h2 id="cta-title">Давайте обсудим ваш сайт</h2>
          <p>
            Расскажите о бизнесе и задаче — предложу подходящую структуру и
            сориентирую по стоимости.
          </p>

          <ContactForm
            packagePrefill={packagePrefill}
            prefillNonce={prefillNonce}
          />

          {hasEmail && (
            <div className="final-cta__direct">
              <p className="final-cta__direct-label">Или напишите напрямую</p>
              <ul className="final-cta__links">
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
