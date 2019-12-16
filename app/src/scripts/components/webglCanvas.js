import { component } from 'picoapp'
import gl from '@/webgl'

export default component((node, ctx) => {
  if (!ctx.getState().isDevice) {
    ctx.hydrate({ glEnabled: true })

    gl.init(node)

    ctx.on('mousemove', ({ clientX, clientY }) => {
      gl.particles.handlePointerMove({ clientX, clientY })
    })

    ctx.on('resize', gl.resize)
    ctx.on('update', gl.update)
  }
})

// addBtn(() => gl.particles.animateToPlane())
// function addBtn(fn) {
//   let btn = document.createElement('button')
//   btn.className += 'fix bottom right bg-slate parchment p10 m20'
//   btn.style.zIndex = 9999999
//   btn.textContent = 'Animate'
//   document.body.appendChild(btn)
//   on(btn, 'click', fn)
// }
