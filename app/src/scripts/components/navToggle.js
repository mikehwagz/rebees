import { component } from 'picoapp'
import { body, on, add, remove } from '@/util/dom'
import router from '@/router'

export default component((node, ctx) => {
  on(node, 'mouseenter', () => ctx.emit('navToggle:mouseenter'))
  on(node, 'focus', () => ctx.emit('navToggle:focus'))
  on(node, 'mouseleave', () => ctx.emit('navToggle:mouseleave'))
  on(node, 'blur', () => ctx.emit('navToggle:blur'))

  on(node, 'click', () => {
    let { route } = ctx.getState()
    if (route === 'person') {
      router.redirect(`${window.location.origin}/people/`)
    } else {
      ctx.emit('navToggle', ({ isNavOpen }) => ({
        isNavOpen: !isNavOpen,
      }))
    }
  })

  ctx.on('navToggle', ({ isNavOpen }) => {
    let cx = 'is-nav-open'
    if (isNavOpen) {
      add(body, cx)
    } else {
      remove(body, cx)
    }
  })
})
