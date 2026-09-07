import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { InventarioApp } from './inventarioApp.jsx'
import './assets/inventario.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InventarioApp />
  </StrictMode>,
)
