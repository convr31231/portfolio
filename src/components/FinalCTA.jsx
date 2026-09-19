import { openTelegram, scrollToId } from '../utils/telegram'
import { useReveal } from '../hooks/useReveal'
import './FinalCTA.css'

export default function FinalCTA() {
  const { ref, isVisible } = useReveal()

  return (
    <section className="section final-cta" aria-labelledby="cta-title">
      <div
        className={`container final-cta__box reveal ${isVisible ? 'is-visible' : ''}`}
        ref={ref}
      >
        <div className="final-cta__content">
          <h2 id="cta-title">Нужен современный сайт для вашего бизнеса?</h2>
          <p>
            Расскажите о задаче — я предложу подходящий вариант реализации и
            сориентирую по стоимости.
          </p>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => openTelegram()}
            >
              Написать в Telegram
            </button>
            <button
              type="button"
              className="btn btn--secondary final-cta__secondary"
              onClick={() => scrollToId('works')}
            >
              Посмотреть работы
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
