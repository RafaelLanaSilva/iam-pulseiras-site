import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { render, pages } from '../dist-ssr/entry-server.js'
const template = await readFile('dist/index.html', 'utf8')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
for (const [path, [title, description]] of Object.entries(pages)) {
  const dir = `dist${path}`
  await mkdir(dir, { recursive: true })
  const html = template.replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`).replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`).replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escape(description)}" />`)
  await writeFile(`${dir}index.html`, html)
}
await writeFile('dist/404.html', template.replace('<div id="root"></div>', `<div id="root">${render('/404/')}</div>`).replace(/<title>.*?<\/title>/, '<title>Página não encontrada | I’am Pulseiras</title>'))
console.log(`Pré-renderizadas ${Object.keys(pages).length} páginas e a página 404.`)
