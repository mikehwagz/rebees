import { component } from '@/lib/picoapp'
import { TimelineMax } from 'gsap'

export default component((node, ctx, { lines }) => {
  let tl = new TimelineMax({ paused: true })

  let isHidden = false

  ctx.on('navToggle:mouseenter', enter)
  ctx.on('navToggle:focus', enter)

  ctx.on('navToggle:mouseleave', leave)
  ctx.on('navToggle:blur', leave)

  ctx.on('navToggle', ({ isNavOpen }) => {
    isNavOpen ? hide() : show()
  })

  function enter() {
    if (isHidden) return

    tl.clear()
      .staggerTo(
        [lines[0], lines[2]],
        0.6,
        {
          cycle: {
            y: [3, -3],
          },
          ease: Expo.easeOut,
        },
        0,
      )
      .restart()
  }

  function leave() {
    if (isHidden) return

    tl.clear()
      .to([lines[0], lines[2]], 0.6, {
        y: 0,
        ease: Expo.easeOut,
      })
      .restart()
  }

  function hide() {
    isHidden = true

    tl.clear()
      .staggerTo(
        lines,
        0.8,
        {
          xPercent: -105,
          ease: Expo.easeOut,
        },
        -0.05,
      )
      .restart()
  }

  function show() {
    tl.clear()
      .staggerTo(
        lines,
        0.8,
        {
          xPercent: 0,
          ease: Expo.easeOut,
          delay: 0.4,
        },
        0.05,
        'a',
        () => {
          isHidden = false
        },
      )
      .to(
        [lines[0], lines[2]],
        0.8,
        {
          y: 0,
          ease: Expo.easeOut,
        },
        'a',
      )
      .restart()
  }
})
