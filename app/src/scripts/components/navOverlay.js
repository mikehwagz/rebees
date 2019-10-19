import { component } from '@/lib/picoapp'
import { on } from '@/util/dom'
import { TimelineMax } from 'gsap'

export default component((node, ctx, refs) => {
  let tl = createTimeline({ node, ...refs })
  let masterTl = new TimelineMax({ paused: true })

  masterTl.seek('idle')

  ctx.on('navToggle:click', ({ isNavOpen }) => {
    isNavOpen ? show() : hide()
  })

  on(refs.backdrop, 'click', () =>
    ctx.emit('navToggle:click', { isNavOpen: false }),
  )

  function show() {
    masterTl
      .clear()
      .to(tl, 1.2, {
        time: tl.getLabelTime('afterShow'),
        ease: Linear.easeNone,
      })
      .restart()
  }

  function hide() {
    masterTl
      .clear()
      .to(tl, 1.2, {
        time: tl.getLabelTime('afterHide'),
        ease: Linear.easeNone,
      })
      .restart()
  }
})

function createTimeline({ drawer, cover, backdrop, items }) {
  let tl = new TimelineMax({ paused: true })
  let itemsFromVars = {
    x: 50,
    y: 80,
    rotation: -4,
    autoAlpha: 0,
  }

  tl.set(items, itemsFromVars)

  tl.addLabel('idle')
    .to(
      backdrop,
      1.2,
      {
        autoAlpha: 1,
        ease: Expo.easeInOut,
      },
      'show',
    )
    .to(
      drawer,
      1.2,
      {
        x: '0%',
        ease: Expo.easeInOut,
      },
      'show',
    )
    .to(
      cover,
      1.2,
      {
        autoAlpha: 0,
        ease: Expo.easeInOut,
      },
      'show',
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
      'show',
    )

  tl.addLabel('afterShow')

  tl.addLabel('beforeHide')
    .staggerTo(
      items,
      1,
      {
        ...itemsFromVars,
        ease: Expo.easeInOut,
      },
      -0.04,
      'hide',
    )
    .to(
      drawer,
      1.2,
      {
        x: '102%',
        ease: Expo.easeInOut,
      },
      'hide',
    )
    .to(
      cover,
      1.2,
      {
        autoAlpha: 1,
        ease: Expo.easeInOut,
      },
      'hide',
    )
    .to(
      backdrop,
      1.2,
      {
        autoAlpha: 0,
        ease: Expo.easeInOut,
      },
      'hide',
    )

  tl.addLabel('afterHide')

  return tl
}
