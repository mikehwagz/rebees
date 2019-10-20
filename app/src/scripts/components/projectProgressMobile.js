import { component } from '@/lib/picoapp'
import { body } from '@/util/dom'
import { map, lerp, round } from '@/util/math'
import Animate from 'gsap'

export default component((node, ctx) => {
  let ty = 0
  let cy = 0
  let sh = null

  ctx.on('resize', resize)
  requestIdleCallback(() => resize(ctx.getState()))

  ctx.on('update', ({ height }) => {
    ty = map(pageYOffset, 0, sh, 0, 1)
    cy = round(lerp(cy, ty, 0.3), 1000)
    Animate.set(node, { scaleX: cy })
  })

  function resize({ height }) {
    sh = body.clientHeight - height
  }

  return () => {}
})
