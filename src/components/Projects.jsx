import { projects } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import ProjectImage from './ProjectImage'
import './Projects.css'

export default function Projects() {
  const { ref, isVisible } = useReveal()

  return (
    <section className="section" id="works" aria-labelledby="works-title">
      <div className="container" ref={ref}>
        <header className={`section__header reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Портфолио</span>
          <h2 id="works-title">Избранные проекты</h2>
          <p>
            Концепты сайтов для разных сфер бизнеса — подход к дизайну, структуре и
            пользовательскому опыту.
          </p>
          <p className="projects__note">
            Демонстрационные концепты, созданные для разных сфер бизнеса.
          </p>
        </header>

        <div className={`projects-list reveal ${isVisible ? 'is-visible' : ''}`}>
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`project-case ${project.featured ? 'project-case--featured' : ''}`}
            >
              <div className="project-case__media">
                <ProjectImage
                  project={project}
                  className="project-case__img"
                  priority={index === 0}
                />
              </div>

              <div className="project-case__body">
                <span className="project-case__category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <ul className="project-case__features">
                  {project.features.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-case__actions">
                  <a
                    href={project.url}
                    className="btn btn--primary project-case__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Открыть сайт
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
