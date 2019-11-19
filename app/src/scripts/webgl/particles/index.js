import * as THREE from 'three'
import MagicShader from 'magicshader'
import gsap from 'gsap'
import FBO from './fbo'
import simulationVert from './simulation.vert'
import simulationFrag from './simulation.frag'
import renderVert from './render.vert'
import renderFrag from './render.frag'
import QuadTree, { Point, Rectangle } from './quadtree'
import { randomPointsInGeometry } from '@/util/math'

class Particles extends THREE.Object3D {
  constructor(gl) {
    super()

    this.gl = gl
    this.tl = gsap.timeline({ paused: true })
    this.activeTexture = 0
    this.isAnimating = false
    this.duration = 3
    this.size = 256
  }

  init() {
    const textureA = this.getTexture(this.size)
    textureA.needsUpdate = true

    const textureB = this.getTexture(this.size)
    textureB.needsUpdate = true

    this.fbo = new FBO({
      width: this.size,
      height: this.size,
      renderer: this.gl.renderer,
      simulationMaterial: new MagicShader({
        name: '🎮 Particle FBO Simulation',
        uniforms: {
          textureA: { value: textureA },
          textureB: { value: textureB },
        },
        vertexShader: simulationVert,
        fragmentShader: simulationFrag,
      }),
      renderMaterial: new MagicShader({
        name: '✨ Particle FBO Render',
        transparent: true,
        blending: THREE.AdditiveBlending,
        vertexShader: renderVert,
        fragmentShader: renderFrag,
      }),
    })

    this.add(this.fbo.points)
  }

  animate() {
    if (this.isAnimating) return

    this.isAnimating = true

    this.tl
      .clear()
      .to(
        this.fbo.simulationMaterial.uniforms.transition,
        {
          value: this.activeTexture ? 0.0 : 1.0,
          duration: this.duration,
          ease: 'quint.inOut',
          onComplete: () => {
            this.isAnimating = false

            this.fbo.simulationMaterial.uniforms[
              this.activeTexture ? 'textureB' : 'textureA'
            ].value = this.getTexture(this.size)

            this.activeTexture = this.activeTexture ? 0 : 1
          },
        },
        'a',
      )
      .to(
        this.fbo.renderMaterial.uniforms.amplitude,
        {
          value: 20.0,
          duration: this.duration / 2,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
        },
        'a',
      )
      .restart()
  }

  getTexture(size) {
    return new THREE.DataTexture(
      this.getData(size),
      size,
      size,
      THREE.RGBFormat,
      THREE.FloatType,
    )
  }

  getData(size) {
    let qtree = new QuadTree({
      boundary: new Rectangle(size / 2, size / 2, size / 2, size / 2),
      capacity: 1,
    })

    for (let i = 0; i < 40; i++) {
      qtree.insert(new Point(size * Math.random(), size * Math.random()))
    }

    let geom = new THREE.Geometry()
    qtree.show(geom, this.size)

    let vertices = randomPointsInGeometry(geom, size * size)
    let len = vertices.length
    let data = new Float32Array(len * 3)

    for (let i = 0; i < len; i++) {
      let v = vertices[i]
      let i3 = i * 3
      data[i3] = v.x
      data[i3 + 1] = v.y
      data[i3 + 2] = v.z
    }

    return data
  }

  update({ frameCount }) {
    this.fbo.update(frameCount)
  }
}

export default Particles
