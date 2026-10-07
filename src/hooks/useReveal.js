import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Появление блока при скролле.
 * Fallback: если observer не сработал — показываем контент через timeout.
 */
export function useReveal() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const node = ref.current
    if (!node || isVisible) return undefined

    let done = false
    const show = () => {
      if (done) return
      done = true
      setIsVisible(true)
    }

    const fallback = window.setTimeout(show, 1200)

    if (typeof IntersectionObserver === 'undefined') {
      show()
      return () => window.clearTimeout(fallback)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
    )

    observer.observe(node)
    return () => {
      window.clearTimeout(fallback)
      observer.disconnect()
    }
  }, [isVisible])

  return { ref, isVisible }
}
