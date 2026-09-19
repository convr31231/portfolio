import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/global.css'
import AutoApp from './AutoApp.jsx'
import './auto.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AutoApp />
  </StrictMode>,
)
