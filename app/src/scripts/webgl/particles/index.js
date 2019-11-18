import * as THREE from 'three'
import MagicShader from 'magicshader'
import FBO from '@/webgl/fbo'
import simulationVert from './simulation.vert'
import simulationFrag from './simulation.frag'
import renderVert from './render.vert'
import renderFrag from './render.frag'
import { randomPointsInGeometry } from '@/util/math'
import QuadTree, { Point, Rectangle } from '@/webgl/quadtree'

class Particles extends THREE.Object3D {
  constructor(gl) {
    super()
    this.gl = gl
  }

  init() {
    const width = 256
    const height = 256

    const textureA = this.getTexture(width)
    textureA.needsUpdate = true

    const textureB = this.getTexture(width)
    textureB.needsUpdate = true

    this.fbo = new FBO({
      width,
      height,
      renderer: this.gl.renderer,
      // Simulation material
      simulationMaterial: new MagicShader({
        name: '🎮 Particle FBO Simulation',
        uniforms: {
          textureA: { value: textureA },
          textureB: { value: textureB },
        },
        vertexShader: simulationVert,
        fragmentShader: simulationFrag,
      }),
      // Render material
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
    qtree.show(geom)

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

  resize({ width, height }) {
    this.width = width
    this.height = height
  }

  update({ frameCount }) {
    this.fbo.update(frameCount)
  }
}

export default Particles
