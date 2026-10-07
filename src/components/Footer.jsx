import { site, CONTACT_EMAIL, isConfigured } from '../data/site'
import { serviceNav } from '../data/services'
import { appPath } from '../utils/paths'
import './Footer.css'

export default function Footer() {
  const hasEmail = isConfigured(CONTACT_EMAIL)
  const hasGithub = isConfigured(site.github)
  const niches = serviceNav()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__logo">{site.name}</p>
          <p className="footer__tagline">Разработка сайтов для малого бизнеса</p>
        </div>

        <div className="footer__contacts">
          <p className="footer__heading">Услуги</p>
          <ul className="footer__list">
            {niches.map((item) => (
              <li key={item.slug}>
                <span>{item.label}</span>
                <a href={appPath(`/services/${item.slug}/`)}>Страница услуги</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__contacts">
          <p className="footer__heading">Связь</p>
          <ul className="footer__list">
            {hasEmail && (
              <li>
                <span>Email</span>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
            )}
            <li>
              <span>Заявка</span>
              <a href="#contact">Форма на сайте</a>
            </li>
            {hasGithub && (
              <li>
                <span>GitHub</span>
                <a href={site.github} target="_blank" rel="noopener noreferrer">
                  {site.github.replace(/^https?:\/\//, '')}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}
