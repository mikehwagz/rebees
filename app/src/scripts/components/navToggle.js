import { component } from '@/lib/picoapp'
import { on } from '@/util/dom'

export default component((node, ctx) => {
  on(node, 'mouseenter', () => ctx.emit('navToggle:mouseenter'))
  on(node, 'focus', () => ctx.emit('navToggle:focus'))
  on(node, 'mouseleave', () => ctx.emit('navToggle:mouseleave'))
  on(node, 'blur', () => ctx.emit('navToggle:blur'))

  on(node, 'click', () =>
    ctx.emit('navToggle:click', ({ isNavOpen }) => ({
      isNavOpen: !isNavOpen,
    })),
  )
})
