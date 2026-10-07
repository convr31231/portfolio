import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { publicUrl } from '../utils/publicUrl'
import './ImageLightbox.css'

export default function ImageLightbox({ project, onClose, returnFocusEl }) {
  const titleId = useId()
  const closeRef = useRef(null)
  const src = publicUrl(project.imageFull || project.image)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    const focusReturn = returnFocusEl
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      focusReturn?.focus()
    }
  }, [onClose, returnFocusEl])

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="lightbox__panel">
        <div className="lightbox__top">
          <div>
            <p id={titleId} className="lightbox__title">
              {project.title}
            </p>
            <p className="lightbox__meta">
              {project.category} · {project.statusLabel}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="lightbox__close"
            aria-label="Закрыть просмотр изображения"
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
        <div className="lightbox__frame">
          <img
            src={src}
            alt={project.alt || project.title}
            width={project.imageWidth || 1600}
            height={project.imageHeight || 1000}
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}
