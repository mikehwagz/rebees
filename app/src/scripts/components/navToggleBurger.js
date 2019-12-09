import { component } from 'picoapp'
import choozy from 'choozy'
import gsap from 'gsap'

export default component((node, ctx) => {
  const { lines } = choozy(node)
  let tl = gsap.timeline({ paused: true })

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
      .to([lines[0], lines[2]], {
        duration: 0.6,
        stagger: 0,
        y: (i) => gsap.utils.wrap([3, -3], i),
        ease: 'expo',
      })
      .restart()
  }

  function leave() {
    if (isHidden) return

    tl.clear()
      .to([lines[0], lines[2]], {
        duration: 0.6,
        y: 0,
        ease: 'expo',
      })
      .restart()
  }

  function hide() {
    isHidden = true

    tl.clear()
      .to(lines, {
        duration: 0.8,
        stagger: -0.05,
        xPercent: -105,
        ease: 'expo',
      })
      .restart()
  }

  function show() {
    tl.clear()
      .to(
        lines,
        {
          duration: 0.8,
          stagger: 0.05,
          xPercent: 0,
          ease: 'expo',
          delay: 0.4,
          onComplete: () => {
            isHidden = false
          },
        },
        'a',
      )
      .to(
        [lines[0], lines[2]],
        {
          duration: 0.8,
          y: 0,
          ease: 'expo',
        },
        'a',
      )
      .restart()
  }
})
