import { component } from 'picoapp'
import { map, clamp, lerp, round } from '@/util/math'
import gsap from 'gsap'

export default component((node, ctx) => {
  let t = 0
  let c = 0
  let sh = null
  let isInit = false

  ctx.on('resize', resize)
  requestIdleCallback(() => resize(ctx.getState()))

  ctx.on('update', () => {
    if (!isInit) return

    t = clamp(map(pageYOffset, 0, sh, 0, 1))
    c = round(lerp(c, t, 0.3))

    let d = c - t
    if (d < 0) d *= -1
    if (d < 0.01) c = t

    gsap.set(node, { scaleX: c })
  })

  function resize({ width, height }) {
    isInit = width < 650

    if (isInit) {
      sh = node.parentNode.clientHeight - height
    }
  }

  return () => {}
})
