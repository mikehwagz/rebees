import { component } from '@/lib/picoapp'
import { easedGradient } from '@/util/misc'

export default component((node) => {
  let theme = node.dataset.theme || 'parchment'
  let colors = {
    parchment: [255, 252, 245],
    crimson: [101, 45, 48],
    slate: [59, 59, 59],
  }

  node.style.backgroundImage = easedGradient({
    direction: '180deg',
    rgb: colors[theme],
    steps: 20,
    // bezier: [0.81, 0.01, 0.35, 0.68],
    bezier: [0.3, 0.0, 0.7, 1.0],
  })
})
