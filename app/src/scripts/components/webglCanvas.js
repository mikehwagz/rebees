import { component } from 'picoapp'
import gl from '@/webgl'
import Particles from '@/webgl/particles'
import { on } from '@/util/dom'
import gsap from 'gsap'

export default component((node, ctx) => {
  gl.init(node)

  const particles = new Particles(gl)
  gl.scene.add(particles)
  particles.init()

  let btn = document.createElement('button')
  btn.className += 'fix bottom right bg-slate parchment p10 m20'
  btn.textContent = 'Animate'
  document.body.appendChild(btn)

  let tl = gsap.timeline({ paused: true })

  let index = 1

  on(btn, 'click', () => {
    // frequency 0.02 -> 0.0130
    // amplitude 1.0 -> 20.0

    let duration = 3

    tl.clear()

    tl.to(
      particles.fbo.simulationMaterial.uniforms.transition,
      {
        value: index ? 1.0 : 0.0,
        duration,
        ease: 'quint.inOut',
      },
      'a',
    )

    tl.to(
      particles.fbo.renderMaterial.uniforms.frequency,
      {
        value: 0.011,
        duration: duration / 2,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      },
      'a',
    )

    tl.to(
      particles.fbo.renderMaterial.uniforms.amplitude,
      {
        value: 20.0,
        duration: duration / 2,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      },
      'a',
    )

    tl.restart()

    index = index ? 0 : 1
  })

  ctx.on('resize', gl.resize)
  ctx.on('update', gl.update)
})
