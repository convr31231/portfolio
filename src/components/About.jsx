import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import './About.css'

export default function About() {
  const { ref, isVisible } = useReveal()

  return (
    <section className="section section--muted" id="about" aria-labelledby="about-title">
      <div className="container about__grid" ref={ref}>
        <header className={`about__intro reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Обо мне</span>
          <h2 id="about-title">{site.about.title}</h2>
          {site.about.paragraphs.map((text) => (
            <p key={text.slice(0, 32)}>{text}</p>
          ))}
        </header>

        <div
          className={`about__skills reveal reveal-delay-1 ${isVisible ? 'is-visible' : ''}`}
        >
          <h3 className="about__skills-title">Навыки</h3>
          <ul className="skills-cloud">
            {site.about.skills.map((skill) => (
              <li key={skill} className="skill-chip">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
