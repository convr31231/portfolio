import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../styles/global.css'
import ServiceApp from '../ServiceApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ServiceApp slug="flowers" />
  </StrictMode>,
)
