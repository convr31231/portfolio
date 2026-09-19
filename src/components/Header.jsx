import { useEffect, useState } from 'react'
import { navLinks, site } from '../data/site'
import { openTelegram } from '../utils/telegram'
import './Header.css'

export default function Header({ theme, onToggleTheme }) {
  const [compact, setCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`header ${compact ? 'header--compact' : ''} ${menuOpen ? 'header--menu-open' : ''}`}
    >
      <div className="container header__inner">
        <a href="#top" className="header__logo" onClick={closeMenu}>
          <span className="header__logo-name">[{site.name}]</span>
          <span className="header__logo-sep" aria-hidden="true">
            /
          </span>
          <span className="header__logo-brand">{site.brand}</span>
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="header__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={
              theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'
            }
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className="btn btn--primary btn--sm header__cta"
            onClick={() => openTelegram()}
          >
            Обсудить проект
          </button>

          <button
            type="button"
            className={`burger ${menuOpen ? 'burger--open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        hidden={!menuOpen}
      >
        <nav className="mobile-menu__nav" aria-label="Мобильная навигация">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu__link"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            closeMenu()
            openTelegram()
          }}
        >
          Обсудить проект
        </button>
      </div>
    </header>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}
