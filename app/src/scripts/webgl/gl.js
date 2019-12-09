// import { CameraHelper, AxesHelper } from 'three'
import Particles from '@/webgl/particles'

export default class GL {
  constructor(renderer, scene, camera) {
    this.renderer = renderer
    this.camera = camera
    this.scene = scene

    // var cameraHelper = new CameraHelper(this.camera)
    // this.scene.add(cameraHelper)

    // var axesHelper = new AxesHelper(500)
    // this.scene.add(axesHelper)
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