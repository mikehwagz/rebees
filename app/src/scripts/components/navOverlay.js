import { component } from 'picoapp'
import choozy from 'choozy'
import { on } from '@/util/dom'
import gsap from 'gsap'

export default component((node, ctx) => {
  const refs = choozy(node)
  let tl = createTimeline({ node, ...refs })
  let masterTl = gsap.timeline({ paused: true })

  masterTl.seek('idle')

  ctx.on('navToggle', ({ isNavOpen }) => {
    isNavOpen ? show() : hide()
  })

  on(refs.backdrop, 'click', () => ctx.emit('navToggle', { isNavOpen: false }))

  function show() {
    masterTl
      .clear()
      .to(tl, {
        duration: 1.2,
        time: tl.labels.afterShow,
        ease: 'none',
      })
      .restart()
  }

  function hide() {
    masterTl
      .clear()
      .to(tl, {
        duration: 1.2,
        time: tl.labels.afterHide,
        ease: 'none',
      })
      .restart()
  }
})

function createTimeline({ drawer, cover, backdrop, items }) {
  let tl = gsap.timeline({ paused: true })
  let itemsFromVars = {
    x: 50,
    y: 80,
    rotation: -4,
    autoAlpha: 0,
  }

  tl.set(items, itemsFromVars)

  tl.add('idle')
    .to(
      backdrop,
      {
        duration: 1.2,
        autoAlpha: 1,
        ease: 'expo.inOut',
      },
      'show',
    )
    .to(
      drawer,
      {
        duration: 1.2,
        x: '0%',
        ease: 'expo.inOut',
      },
      'show',
    )
    .to(
      cover,
      {
        duration: 1.2,
        autoAlpha: 0,
        ease: 'expo.inOut',
      },
      'show',
    )
    .to(
      items,
      {
        duration: 1.2,
        stagger: 0.04,
        x: 0,
        y: 0,
        rotation: 0,
        autoAlpha: 1,
        ease: 'expo.inOut',
      },
      'show',
    )

  tl.add('afterShow')

  tl.add('beforeHide')
    .to(
      items,
      {
        duration: 1,
        stagger: -0.04,
        x: itemsFromVars.x,
        y: itemsFromVars.y,
        rotation: itemsFromVars.rotation,
        autoAlpha: itemsFromVars.autoAlpha,
        ease: 'expo.inOut',
      },
      'hide',
    )
    .to(
      drawer,
      {
        duration: 1.2,
        x: '102%',
        ease: 'expo.inOut',
      },
      'hide',
    )
    .to(
      cover,
      {
        duration: 1.2,
        autoAlpha: 1,
        ease: 'expo.inOut',
      },
      'hide',
    )
    .to(
      backdrop,
      {
        duration: 1.2,
        autoAlpha: 0,
        ease: 'expo.inOut',
      },
      'hide',
    )

  tl.add('afterHide')

  return tl
}
