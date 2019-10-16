import { on, toggle } from './dom'

export default function() {
  const overlay = create()
  document.body.appendChild(overlay)

  on(document, 'keydown', (ev) => {
    const isCtrlG = ev.ctrlKey && ev.code === 'KeyG'
    isCtrlG && toggle(overlay, 'dn')
  })

  function create() {
    const container = document.createElement('div')
    container.innerHTML = template()
    container.className = 'fix fill dn'
    return container
  }

  function template() {
    const columnCount = 12
    const html = new Array(columnCount)
      .fill()
      .map(() => '<div class="x y"></div>')
      .join('')
    return html
  }
}
