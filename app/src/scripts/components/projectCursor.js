import { component } from 'picoapp'
import choozy from 'choozy'
import { on } from '@/util/dom'
import { lerp, round } from '@/util/math'
import gsap from 'gsap'

export default component((node, ctx) => {
  const { arrow, counter } = choozy(node)
  let ease = 0.2
  let tx = 0
  let ty = 0
  let cx = 0
  let cy = 0
  let isWaitingForFirstMouseMoveEvent = true

  let offMove = on(document, 'mousemove', ({ clientX, clientY }) => {
    tx = clientX
    ty = clientY

    if (isWaitingForFirstMouseMoveEvent) {
      cx = tx
      cy = ty

      isWaitingForFirstMouseMoveEvent = false
    }
  })

  let offClick = on(document, 'click', (ev) => {
    if (
      ctx.getState().width < 650 ||
      ev.target.closest('.nav, .project__pagination')
    ) {
      return
    }

    if (tx < ctx.getState().width / 2) {
      ctx.emit('slider:decrement')
    } else {
      ctx.emit('slider:increment')
    }
  })

  ctx.on('slider:update', ({ sliderIndex, sliderLength }) => {
    counter.innerHTML = `${sliderIndex + 1}/${sliderLength}`
  })

  ctx.on('update', ({ width, sliderIndex, sliderLength, isNavOpen }) => {
    if (isNavOpen) return

    cx = round(lerp(cx, tx, ease))
    cy = round(lerp(cy, ty, ease))

    gsap.set(node, {
      x: cx,
      y: cy,
    })

    gsap.to(arrow, {
      duration: 0.5,
      rotation: tx < width / 2 ? -180 : 0,
    })

    gsap.to(node, {
      duration: 0.5,
      opacity:
        isWaitingForFirstMouseMoveEvent || sliderIndex + 1 === sliderLength
          ? 0
          : 1,
    })
  })

  return () => {
    offMove()
    offClick()
  }
})
