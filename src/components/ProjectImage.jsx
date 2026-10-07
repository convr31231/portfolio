import { useState } from 'react'
import { publicUrl } from '../utils/publicUrl'
import './ProjectImage.css'

export default function ProjectImage({
  project,
  className = '',
  priority = false,
  decorative = false,
  variant = 'desktop',
}) {
  const [failed, setFailed] = useState(false)
  const alt = decorative
    ? ''
    : project.alt || `${project.category} ${project.title}`

  const srcPath =
    variant === 'mobile' && project.imageMobile
      ? project.imageMobile
      : variant === 'full' && project.imageFull
        ? project.imageFull
        : project.image

  const src = srcPath ? publicUrl(srcPath) : ''
  const width =
    variant === 'mobile' ? 390 : project.imageWidth || 1440
  const height =
    variant === 'mobile' ? 844 : project.imageHeight || 900

  const positionStyle = {
    '--object-position': project.objectPosition || 'center top',
  }

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
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      style={positionStyle}
      onError={() => setFailed(true)}
    />
  )
}
