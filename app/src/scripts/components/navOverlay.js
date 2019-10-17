import { component } from '@/lib/picoapp'
import { on } from '@/util/dom'
import Animate, { TimelineMax } from 'gsap'

export default component(
  (node, ctx, { drawer, cover, backdrop, items, email }) => {
    let tl = new TimelineMax({ paused: true })
    let itemsFromVars = {
      x: 50,
      y: 80,
      rotation: -4,
      autoAlpha: 0,
    }

    Animate.set(email, { autoAlpha: 0 })
    Animate.set(items, itemsFromVars)

    ctx.on('navToggle:click', ({ isNavOpen }) => {
      isNavOpen ? show() : hide()
    })

    on(backdrop, 'click', () =>
      ctx.emit('navToggle:click', ({ isNavOpen }) => ({
        isNavOpen: !isNavOpen,
      })),
    )

    function show() {
      tl.clear()
        .to(
          backdrop,
          1.2,
          {
            autoAlpha: 1,
            ease: Expo.easeInOut,
          },
          'a',
        )
        .to(
          drawer,
          1.2,
          {
            x: '0%',
            ease: Expo.easeInOut,
          },
          'a',
        )
        .to(
          cover,
          1.2,
          {
            autoAlpha: 0,
            ease: Expo.easeInOut,
          },
          'a',
        )
        .to(
          email,
          1.2,
          {
            autoAlpha: 1,
            ease: Expo.easeInOut,
          },
          'a',
        )
        .staggerTo(
          items,
          1.2,
          {
            x: 0,
            y: 0,
            rotation: 0,
            autoAlpha: 1,
            ease: Expo.easeInOut,
          },
          0.04,
          'a',
        )
        .set(node, { pointerEvents: 'auto' }, '-=0.8')
        .restart()
    }

    function hide() {
      tl.clear()
        .set(node, { pointerEvents: 'none' })
        .staggerTo(
          items,
          1,
          {
            ...itemsFromVars,
            ease: Expo.easeInOut,
          },
          -0.04,
          'a',
        )
        .to(
          drawer,
          1.2,
          {
            x: '102%',
            ease: Expo.easeInOut,
          },
          'a',
        )
        .to(
          cover,
          1.2,
          {
            autoAlpha: 1,
            ease: Expo.easeInOut,
          },
          'a',
        )
        .to(
          email,
          1.2,
          {
            autoAlpha: 0,
            ease: Expo.easeOut,
          },
          'a',
        )
        .to(
          backdrop,
          1.2,
          {
            autoAlpha: 0,
            ease: Expo.easeInOut,
          },
          'a',
        )
        .restart()
    }
  },
)
