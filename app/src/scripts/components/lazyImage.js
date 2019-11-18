import { component } from 'picoapp'
import choozy from 'choozy'
import { on, add } from '../util/dom'

export default component((node, ctx) => {
  const { img, imgWrap, lqip } = choozy(node)

  img.onload = () => {
    img.onload = null
    requestAnimationFrame(() => {
      add(node, 'is-loaded')
      let off = on(imgWrap, 'transitionend', () => {
        off()
        lqip.remove()
      })
      img.removeAttribute('data-lazy')
    })
  }

  img.src = img.dataset.lazy
})
