import { renderToString } from 'react-dom/server'
import ServiceApp from './ServiceApp.jsx'

/** SSR-рендер страницы услуги для prerender при сборке */
export function renderService(slug) {
  return renderToString(<ServiceApp slug={slug} />)
}
