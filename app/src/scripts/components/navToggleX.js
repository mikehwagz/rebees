import { component } from 'picoapp'
import choozy from 'choozy'
import gsap from 'gsap'
import { add, remove } from '@/util/dom'

export default component((node, ctx) => {
  const { lines } = choozy(node)
  let tl = gsap.timeline({ paused: true })

  gsap.set(lines, {
    xPercent: 55,
    yPercent: 55,
  })

  gsap.set(node, { autoAlpha: 1 })

  ctx.on('navToggle', ({ isNavOpen }) => {
    isNavOpen ? show() : hide()
  })

  ctx.on('hideX', hide)
  ctx.on('showX', show)

  function hide() {
    tl.clear()
      .to(lines, {
        duration: 0.8,
        stagger: -0.1,
        xPercent: 55,
        yPercent: 55,
        ease: 'expo',
      })
      .restart()
  }

  function show() {
    if (ctx.getState().route === 'person') {
      remove(lines, 'bg-slate')
      add(lines, 'bg-parchment')
    } else {
      add(lines, 'bg-slate')
      remove(lines, 'bg-parchment')
    }

    tl.clear()
      .to(
        lines,
        {
          duration: 0.8,
          stagger: 0.075,
          xPercent: -50,
          yPercent: -50,
          ease: 'expo',
        },
        0.4,
      )
      .restart()
  }
})
