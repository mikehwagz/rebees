import { component } from '@/lib/picoapp'
import { on, add } from '../util/dom'

export default component((node, ctx, { img, imgWrap, lqip }) => {
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
