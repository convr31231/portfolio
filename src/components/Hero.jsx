import { useState } from 'react'
import { site, projects, SHOWCASE_IDS } from '../data/site'
import { scrollToId } from '../utils/scroll'
import { useReveal } from '../hooks/useReveal'
import ProjectImage from './ProjectImage'
import ImageLightbox from './ImageLightbox'
import './Hero.css'

export default function Hero() {
  const { ref, isVisible } = useReveal()
  const featured =
    projects.find((p) => p.id === SHOWCASE_IDS[0]) || projects[0]
  const secondary =
    projects.find((p) => p.id === SHOWCASE_IDS[1]) ||
    projects.find((p) => p.id !== featured.id)
  const [lightbox, setLightbox] = useState(null)
  const [returnFocusEl, setReturnFocusEl] = useState(null)

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__grid" ref={ref}>
        <div className={`hero__content ${isVisible ? 'is-visible' : ''}`}>
          <h1 id="hero-title" className="reveal-item">
            {site.hero.titleLines.map((line) => (
              <span key={line} className="hero__line">
                {line}
              </span>
            ))}
          </h1>

          <p className="hero__subtitle reveal-item reveal-delay-1">
            {site.hero.subtitle}
          </p>

          <div className="btn-group reveal-item reveal-delay-2">
            <a className="btn btn--primary" href="#contact">
              Обсудить сайт
            </a>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => scrollToId('works')}
            >
              Посмотреть работы
            </button>
          </div>

          <div className="hero__meta reveal-item reveal-delay-3">
            <p className="hero__price">{site.hero.priceLine}</p>
            <a className="hero__pricing-link" href="#pricing">
              {site.hero.pricingLink}
            </a>
          </div>
        </div>

        <div className={`hero__visual ${isVisible ? 'is-visible' : ''}`}>
          <div className="hero-showcase">
            <figure className="hero-main">
              <button
                type="button"
                className="hero-main__media"
                onClick={(e) => {
                  setReturnFocusEl(e.currentTarget)
                  setLightbox(featured)
                }}
                aria-label={`Увеличить изображение: ${featured.title}`}
              >
                <ProjectImage project={featured} priority />
              </button>
              <figcaption className="hero-main__cap">
                <span>{featured.statusLabel}</span>
                <strong>{featured.title}</strong>
                <em>{featured.category}</em>
              </figcaption>
            </figure>

            {secondary && (
              <figure className="hero-side">
                <div className="hero-side__media">
                  <ProjectImage project={secondary} />
                </div>
                <figcaption>
                  <strong>{secondary.title}</strong>
                  <span>{secondary.category}</span>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>

      {lightbox && (
        <ImageLightbox
          project={lightbox}
          onClose={() => setLightbox(null)}
          returnFocusEl={returnFocusEl}
        />
      )}
    </section>
  )
}
