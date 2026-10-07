/** Путь приложения с учётом Vite base (`/portfolio/`). */
export function appPath(path = '/') {
  const base = String(import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (normalized === '/') return `${base}/`
  return `${base}${normalized}`
}

/** Ссылка на якорь главной: `/portfolio/#contact` */
export function homeHash(hash) {
  const h = hash.startsWith('#') ? hash : `#${hash}`
  return `${appPath('/')}${h}`
}
