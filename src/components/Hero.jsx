import { site, projects } from '../data/site'
import { openTelegram, scrollToId } from '../utils/telegram'
import { useReveal } from '../hooks/useReveal'
import ProjectImage from './ProjectImage'
import './Hero.css'

export default function Hero() {
  const { ref, isVisible } = useReveal()
  const featured = projects.find((p) => p.featured) || projects[0]
  const side = projects.filter((p) => p.id !== featured.id).slice(0, 2)

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__grid" ref={ref}>
        <div className={`hero__content ${isVisible ? 'is-visible' : ''}`}>
          <div className="status-pill hero__status reveal-item">
            <span className="status-pill__dot" aria-hidden="true" />
            {site.status}
          </div>

          <h1 id="hero-title" className="reveal-item reveal-delay-1">
            {site.hero.title}
          </h1>

          <p className="hero__subtitle reveal-item reveal-delay-2">
            {site.hero.subtitle}
          </p>

          <p className="hero__line reveal-item reveal-delay-2">{site.hero.line}</p>

          <div className="btn-group reveal-item reveal-delay-3">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => openTelegram()}
            >
              Обсудить проект
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => scrollToId('works')}
            >
              Посмотреть работы
            </button>
          </div>

          <p className="hero__trust reveal-item reveal-delay-3">{site.hero.trust}</p>
        </div>

        <div
          className={`hero__visual ${isVisible ? 'is-visible' : ''}`}
          aria-hidden="true"
        >
          <div className="hero-stage">
            <div className="browser-mock">
              <div className="browser-mock__bar">
                <span />
                <span />
                <span />
                <div className="browser-mock__url">{featured.title}</div>
              </div>
              <div className="browser-mock__body">
                <ProjectImage project={featured} priority decorative />
              </div>
            </div>

            <div className="phone-mock">
              <div className="phone-mock__notch" />
              <div className="phone-mock__screen">
                <ProjectImage project={side[0] || featured} decorative />
              </div>
            </div>

            {side.slice(0, 1).map((project) => (
              <div key={project.id} className="hero-card">
                <div className="hero-card__preview">
                  <ProjectImage project={project} decorative />
                </div>
                <div className="hero-card__meta">
                  <span>{project.category}</span>
                  <strong>{project.title}</strong>
                </div>
              </div>
            ))}

            <div className="hero-float">
              <span className="hero-float__label">UI</span>
              <span className="hero-float__bars">
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
