import { renderToString } from 'react-dom/server'
import App, { CustomBraceletsLanding, pages } from './App.jsx'
export { pages }
export function render(path) { return renderToString(path === '/pulseiras-personalizadas/' ? <CustomBraceletsLanding /> : <App path={path} />) }
