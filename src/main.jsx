import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App, { CustomBraceletsLanding } from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    {window.location.pathname === '/pulseiras-personalizadas/'
      ? <CustomBraceletsLanding />
      : <App path={window.location.pathname} />}
  </StrictMode>
)
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
