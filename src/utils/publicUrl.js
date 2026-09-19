/**
 * Путь к файлу из public/ с учётом Vite base (GitHub Pages /portfolio/).
 * @param {string} path например 'projects/nova.webp' или '/projects/nova.webp'
 */
export function publicUrl(path) {
  const base = import.meta.env.BASE_URL || '/'
  const clean = String(path || '').replace(/^\//, '')
  return `${base}${clean}`
}
