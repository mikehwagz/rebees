import { Scene } from 'three'
import Renderer from '@/webgl/renderer'
import Camera from '@/webgl/camera'
import Particles from '@/webgl/particles'

class GL {
  constructor() {
    this.renderer = new Renderer()
    this.camera = new Camera()
    this.scene = new Scene()
  }

  init = (node) => {
    node.appendChild(this.renderer.domElement)

    this.particles = new Particles(this)
    this.particles.init()
    this.scene.add(this.particles)
  }

  resize = (state) => {
    this.camera.resize(state)
    this.renderer.resize(state)
    this.traverse('resize', state)
  }

  update = (state) => {
    this.traverse('update', state)
    this.camera.orbitControls && this.camera.orbitControls.update()
    this.renderer.render(this.scene, this.camera)
  }

  traverse = (fn, ...args) => {
    this.scene.traverse((child) => {
      if (typeof child[fn] === 'function') {
        child[fn].apply(child, args)
      }
    })
  }
}

export default new GL()
