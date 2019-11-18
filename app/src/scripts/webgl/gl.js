import * as THREE from 'three'

export default class GL {
  constructor(renderer, scene, camera) {
    this.renderer = renderer
    this.camera = camera
    this.scene = scene

    // this.helper = new THREE.CameraHelper(this.camera)
    // this.scene.add(this.helper)
  }

  init = (node) => {
    node.appendChild(this.renderer.domElement)
  }

  resize = (state) => {
    this.camera.resize(state)
    this.renderer.resize(state)
    this.traverse('resize', state)
  }

  update = (state) => {
    this.traverse('update', state)
    this.camera.orbitControls.update()
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
