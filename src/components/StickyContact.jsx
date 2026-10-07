import { useEffect } from 'react'
import { scrollToId } from '../utils/scroll'
import './StickyContact.css'

export default function StickyContact() {
  useEffect(() => {
    document.documentElement.classList.add('has-sticky-contact')
    document.body.classList.add('has-sticky-cta')
    return () => {
      document.documentElement.classList.remove('has-sticky-contact')
      document.body.classList.remove('has-sticky-cta')
    }
  }, [])

  return (
    <div className="sticky-contact" role="region" aria-label="Оставить заявку">
      <a
        className="btn btn--primary sticky-contact__btn"
        href="#contact"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('contact')
        }}
      >
        Оставить заявку
      </a>
    </div>
  )
}
