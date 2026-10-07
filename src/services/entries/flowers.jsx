import { hydrateRoot } from 'react-dom/client'
import '../../styles/global.css'
import ServiceApp from '../ServiceApp.jsx'

const root = document.getElementById('root')
if (root) {
  hydrateRoot(root, <ServiceApp slug="flowers" />)
}
