import { useEffect, useState } from 'react'
import { navLinks, site } from '../data/site'
import { scrollToId } from '../utils/scroll'
import './Header.css'

export default function Header() {
  const [compact, setCompact] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 32)
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

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const onCta = () => {
    closeMenu()
    scrollToId('contact')
  }

  return (
    <header
      className={`header ${compact ? 'header--compact' : ''} ${menuOpen ? 'header--menu-open' : ''}`}
    >
      <div className="container header__inner">
        <a href="#top" className="header__logo" onClick={closeMenu}>
          <span className="header__logo-name">{site.name}</span>
          <span className="header__logo-sep" aria-hidden="true">
            ·
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
          <a className="btn btn--primary btn--sm header__cta" href="#contact">
            Обсудить сайт
          </a>

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
        <button type="button" className="btn btn--primary" onClick={onCta}>
          Обсудить сайт
        </button>
      </div>
    </header>
  )
}
