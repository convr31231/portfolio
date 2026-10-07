import { useMemo, useRef, useState } from 'react'
import { projects, projectFilters, SHOWCASE_IDS } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import ProjectImage from './ProjectImage'
import ImageLightbox from './ImageLightbox'
import './Projects.css'

export default function Projects() {
  const { ref, isVisible } = useReveal()
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [returnFocusEl, setReturnFocusEl] = useState(null)
  const toggleRef = useRef(null)

  const activeFilters = useMemo(() => {
    const present = new Set(projects.map((p) => p.filter))
    return projectFilters.filter((f) => f.id === 'all' || present.has(f.id))
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter((p) => p.filter === filter)
  }, [filter])

  const showcase = useMemo(
    () => SHOWCASE_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean),
    [],
  )

  const isAll = filter === 'all'
  const spotlight = isAll ? showcase[0] : filtered[0]
  const secondary = isAll
    ? showcase.slice(1)
    : filtered.slice(1)
  const extra = isAll
    ? projects.filter((p) => !SHOWCASE_IDS.includes(p.id))
    : []
  const showExtras = isAll && expanded
  const hiddenCount = extra.length

  const openZoom = (project, el) => {
    setReturnFocusEl(el)
    setLightbox(project)
  }

  const onFilter = (id) => {
    setFilter(id)
    if (id === 'all') setExpanded(false)
  }

  const onToggleExtra = () => {
    if (expanded) {
      setExpanded(false)
      requestAnimationFrame(() => {
        toggleRef.current?.focus({ preventScroll: true })
        toggleRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      })
    } else {
      setExpanded(true)
    }
  }

  return (
    <section className="section" id="works" aria-labelledby="works-title">
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__mark">Работы</span>
          <h2 id="works-title">Разные бизнесы. Разные решения.</h2>
          <p>
            Примеры сайтов и шаблонов: от компактной страницы услуг до подробной
            презентации бизнеса.
          </p>
        </header>

        {activeFilters.length > 2 && (
          <div
            className={`project-filters reveal ${isVisible ? 'is-visible' : ''}`}
            role="group"
            aria-label="Фильтр работ"
          >
            {activeFilters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`project-filters__btn ${filter === item.id ? 'is-active' : ''}`}
                aria-pressed={filter === item.id}
                onClick={() => onFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {spotlight && (
          <div className={`projects-showcase reveal ${isVisible ? 'is-visible' : ''}`}>
            <ProjectCard
              project={spotlight}
              large
              priority
              onZoom={openZoom}
            />
          </div>
        )}

        {secondary.length > 0 && (
          <div className={`projects-grid reveal ${isVisible ? 'is-visible' : ''}`}>
            {secondary.map((project) => (
              <ProjectCard key={project.id} project={project} onZoom={openZoom} />
            ))}
          </div>
        )}

        {showExtras && (
          <div className="projects-grid projects-grid--extra">
            {extra.map((project) => (
              <ProjectCard key={project.id} project={project} onZoom={openZoom} />
            ))}
          </div>
        )}

        {isAll && hiddenCount > 0 && (
          <div className="projects-more">
            <button
              ref={toggleRef}
              type="button"
              className="btn btn--secondary"
              onClick={onToggleExtra}
              aria-expanded={expanded}
            >
              {expanded
                ? 'Свернуть дополнительные работы'
                : `Показать ещё ${hiddenCount} работ`}
            </button>
          </div>
        )}
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

function ProjectCard({ project, large = false, priority = false, onZoom }) {
  return (
    <article className={`project-card ${large ? 'project-card--large' : ''}`}>
      <button
        type="button"
        className="project-card__media"
        aria-label={`Увеличить изображение: ${project.title}`}
        onClick={(e) => onZoom(project, e.currentTarget)}
      >
        <ProjectImage project={project} priority={priority} className="project-card__img" />
      </button>

      <div className="project-card__body">
        <p className="project-card__status">{project.statusLabel}</p>
        <h3>{project.title}</h3>
        <p className="project-card__category">{project.category}</p>
        <p className="project-card__summary">{project.summary}</p>

        <div className="project-card__actions">
          {project.url ? (
            <a
              href={project.url}
              className="btn btn--primary btn--sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Посмотреть сайт
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={(e) => onZoom(project, e.currentTarget)}
          >
            Увеличить
          </button>
        </div>
      </div>
    </article>
  )
}
