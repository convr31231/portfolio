import { useState } from 'react'
import { publicUrl } from '../utils/publicUrl'
import './ProjectImage.css'

/**
 * Превью проекта с object-fit: cover и fallback без сломанной иконки.
 */
export default function ProjectImage({
  project,
  className = '',
  priority = false,
  decorative = false,
}) {
  const [failed, setFailed] = useState(false)
  const alt = decorative
    ? ''
    : project.alt || `${project.category} ${project.title}`

  const positionStyle = {
    '--object-position': project.objectPosition || 'center center',
    '--object-position-mobile':
      project.objectPositionMobile || project.objectPosition || 'center top',
  }

  const src = project.image ? publicUrl(project.image) : ''

  if (failed || !src) {
    return (
      <div
        className={`project-image project-image--fallback ${className}`}
        style={{ ...positionStyle, '--preview-accent': project.accent }}
        role={decorative ? 'presentation' : 'img'}
        aria-label={decorative ? undefined : alt}
      >
        <span className="project-image__fallback-label">{project.title}</span>
      </div>
    )
  }

  return (
    <img
      className={`project-image ${className}`}
      src={src}
      alt={alt}
      width={project.imageWidth || 1200}
      height={project.imageHeight || 800}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      style={positionStyle}
      onError={() => setFailed(true)}
    />
  )
}
