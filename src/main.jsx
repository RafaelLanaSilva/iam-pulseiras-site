import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App, { CustomBraceletsLanding } from './App.jsx'

const root = document.getElementById('root')
const basePath = import.meta.env.BASE_URL
const basePrefix = basePath === '/' ? '' : basePath.replace(/\/$/, '')
const routePath = window.location.pathname.startsWith(basePrefix)
  ? window.location.pathname.slice(basePrefix.length) || '/'
  : window.location.pathname
const app = (
  <StrictMode>
    {routePath === '/pulseiras-personalizadas/'
      ? <CustomBraceletsLanding />
      : <App path={routePath} />}
  </StrictMode>
)
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
