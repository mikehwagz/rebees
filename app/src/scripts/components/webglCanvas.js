import { component } from 'picoapp'
import gl from '@/webgl'
import Particles from '@/webgl/particles'
import { on } from '@/util/dom'

export default component((node, ctx) => {
  gl.init(node)

  const particles = new Particles(gl)
  gl.scene.add(particles)
  particles.init()

  addBtn(() => particles.animate())

  ctx.on('mousemove', ({ clientX, clientY }) => {
    particles.handlePointerMove({ clientX, clientY })
  })

  ctx.on('resize', gl.resize)
  ctx.on('update', gl.update)
})

function addBtn(fn) {
  let btn = document.createElement('button')
  btn.className += 'fix bottom right bg-slate parchment p10 m20'
  btn.textContent = 'Animate'
  document.body.appendChild(btn)
  on(btn, 'click', fn)
}
