import { renderToString } from 'react-dom/server'
import App, { pages } from './App.jsx'
export { pages }
export function render(path) { return renderToString(<App path={path} />) }
