import { component } from '@/lib/picoapp'
import Animate, { TimelineMax } from 'gsap'

export default component((node, ctx, { lines }) => {
  let tl = new TimelineMax({ paused: true })

  Animate.set(lines, {
    xPercent: 55,
    yPercent: 55,
  })

  Animate.set(node, { autoAlpha: 1 })

  ctx.on('navToggle:click', ({ isNavOpen }) => {
    isNavOpen ? show() : hide()
  })

  function hide() {
    tl.clear()
      .staggerTo(
        lines,
        0.8,
        {
          xPercent: 55,
          yPercent: 55,
          ease: Expo.easeOut,
        },
        -0.1,
      )
      .restart()
  }

  function show() {
    tl.clear()
      .staggerTo(
        lines,
        0.8,
        {
          xPercent: -50,
          yPercent: -50,
          ease: Expo.easeOut,
        },
        0.075,
        0.4,
      )
      .restart()
  }
})
