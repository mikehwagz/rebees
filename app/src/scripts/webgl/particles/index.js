import {
  Object3D,
  AdditiveBlending,
  DataTexture,
  RGBFormat,
  FloatType,
  Geometry,
  Vector2,
  Vector3,
  Raycaster,
  Mesh,
  MeshNormalMaterial,
  PlaneGeometry,
} from 'three'
import MagicShader, { gui } from 'magicshader'
import gsap from 'gsap'
import FBO from './fbo'
import simulationVert from './simulation.vert'
import simulationFrag from './simulation.frag'
import renderVert from './render.vert'
import renderFrag from './render.frag'
import QuadTree, { Point, Rectangle } from './quadtree'
import { randomPointsInGeometry, lerp, map } from '@/util/math'
import { add, on, toggle } from '@/util/dom'

gui.destroy()
// let guiEl = document.querySelector('.dg.ac')
// guiEl.style.zIndex = '99999'
// add(guiEl, 'dn')
// on(window, 'keyup', ({ key }) => {
//   key === 'g' && toggle(guiEl, 'dn')
// })

class Particles extends Object3D {
  constructor(gl) {
    super()

    this.gl = gl
    this.size = 320

    this.tl = gsap.timeline({ paused: true })
    this.isAnimating = false
    this.duration = 3
    this.hiddenMeshes = []
    this.hiddenMeshIndex = 0

    this.raycaster = new Raycaster()
    this.mouse = new Vector2()
    this.targetHit = new Vector3()
    this.currentHit = new Vector3()
    this.maxRadius = 100
  }

  init() {
    const textureA = this.getTexture(this.size)
    textureA.needsUpdate = true

    const textureB = this.getTexture(this.size)
    textureB.needsUpdate = true

    const textureC = this.getPlaneTexture(this.size)
    textureC.needsUpdate = true

    this.fbo = new FBO({
      width: this.size,
      height: this.size,
      renderer: this.gl.renderer,
      simulationMaterial: new MagicShader({
        name: '🎮 Particle FBO Simulation',
        uniforms: {
          textureA: { value: textureA },
          textureB: { value: textureB },
          textureC: { value: textureC },
        },
        vertexShader: simulationVert,
        fragmentShader: simulationFrag,
      }),
      renderMaterial: new MagicShader({
        name: '✨ Particle FBO Render',
        uniforms: {
          mouse: { value: new Vector3() },
          radius: { value: 0.0 },
        },
        transparent: true,
        blending: AdditiveBlending,
        vertexShader: renderVert,
        fragmentShader: renderFrag,
      }),
    })

    this.add(this.fbo.points)
    this.add(this.hiddenMeshes[this.hiddenMeshIndex])

    this.position.x = 450
    this.position.y = -130
  }

  // EVENTS

  handlePointerMove(ev) {
    this.mouse.x = (ev.clientX / this.width) * 2 - 1
    this.mouse.y = (ev.clientY / this.height) * -2 + 1
  }

  resize({ width, height }) {
    this.width = width
    this.height = height
  }

  update({ frameCount }) {
    let tx = map(this.mouse.y, -1, 1, 0.1, 0.5) * -1
    let ty = this.mouse.x * 0.5

    this.rotation.x = lerp(this.rotation.x, tx, 0.05)
    this.rotation.y = lerp(this.rotation.y, ty, 0.05)

    this.fbo.update(frameCount)

    this.updateRaycaster()
  }

  updateRaycaster() {
    this.raycaster.setFromCamera(this.mouse, this.gl.camera)

    let hits = this.raycaster.intersectObject(this.hiddenMesh)
    let hit = hits.length ? hits[0] : null

    let targetRadius = 0.0

    if (hit) {
      this.currentHit.lerp(hit.point, 0.1)
      this.fbo.renderMaterial.uniforms.mouse.value.copy(this.currentHit)

      targetRadius = this.maxRadius
    } else {
      targetRadius = 0.0
    }

    this.fbo.renderMaterial.uniforms.radius.value = lerp(
      this.fbo.renderMaterial.uniforms.radius.value,
      targetRadius,
      0.05,
    )
  }

  // ANIMATIONS

  animate() {
    if (this.isAnimating) return

    this.isAnimating = true

    return this.tl
      .clear()
      .to(
        this.fbo.simulationMaterial.uniforms.cityTransition,
        {
          value: this.activeTextureIndex ? 0.0 : 1.0,
          duration: this.duration,
          ease: 'quint.inOut',
          onComplete: () => {
            this.isAnimating = false

            this.fbo.simulationMaterial.uniforms[
              this.activeTextureIndex ? 'textureB' : 'textureA'
            ].value = this.getTexture(this.size)

            this.remove(this.hiddenMesh)
            this.hiddenMeshIndex = this.hiddenMeshIndex + 1
            this.add(this.hiddenMesh)

            this.fbo.simulationMaterial.uniforms.activeTextureIndex = this.activeTextureIndex
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

  animateToPlane() {
    return new Promise((resolve) => {
      this.tl
        .clear()
        .to(
          this.fbo.simulationMaterial.uniforms.planeTransition,
          {
            value: 1,
            duration: 2,
            ease: 'quart.inOut',
          },
          'a',
        )
        .to(
          this.scale,
          {
            x: 20.0,
            y: 20.0,
            z: 20.0,
            duration: 2,
            ease: 'quart.inOut',
          },
          'a',
        )
        .to(
          this.position,
          {
            x: 0,
            y: 0,
            duration: 2,
            ease: 'quart.inOut',
          },
          'a',
        )
        .to(
          this.fbo.renderMaterial.uniforms.speed,
          {
            value: 0.0001,
            duration: 2,
            ease: 'quart.inOut',
          },
          'a',
        )
        .to(
          this.fbo.renderMaterial.uniforms.frequency,
          {
            value: 0.04,
            duration: 2,
            ease: 'quart.inOut',
          },
          'a',
        )
        .to(
          this.fbo.renderMaterial.uniforms.size,
          {
            value: 2.5,
            duration: 2,
            ease: 'quart.inOut',
          },
          'a',
        )
        .add(() => resolve())
        .restart()
    })
  }

  // GETTERS

  get activeTextureIndex() {
    return this.hiddenMeshIndex % 2
  }

  get hiddenMesh() {
    return this.hiddenMeshes[this.hiddenMeshIndex]
  }

  // TEXTURE GENERATION

  getTexture(size) {
    let qtree = new QuadTree({
      boundary: new Rectangle(size / 2, size / 2, size / 2, size / 2),
      capacity: 1,
    })

    for (let i = 0; i < 40; i++) {
      qtree.insert(new Point(size * Math.random(), size * Math.random()))
    }

    let geom = new Geometry()
    qtree.show(geom, this.size)

    let mesh = new Mesh(
      geom,
      new MeshNormalMaterial({ opacity: 0.0, transparent: true }),
    )

    mesh.renderOrder = 1
    this.hiddenMeshes.push(mesh)

    let points = randomPointsInGeometry(geom, size * size)
    let len = points.length
    let data = new Float32Array(len * 3)

    for (let i = 0; i < len; i++) {
      let v = points[i]
      let i3 = i * 3
      data[i3] = v.x
      data[i3 + 1] = v.y
      data[i3 + 2] = v.z
    }

    return new DataTexture(data, size, size, RGBFormat, FloatType)
  }

  getPlaneTexture(size) {
    let geom = new PlaneGeometry(size, size)
    let points = randomPointsInGeometry(geom, size * size)
    let len = points.length
    let data = new Float32Array(len * 3)

    for (let i = 0; i < len; i++) {
      let v = points[i]
      let i3 = i * 3
      data[i3] = v.x
      data[i3 + 1] = v.y
      data[i3 + 2] = v.z
    }

    return new DataTexture(data, size, size, RGBFormat, FloatType)
  }
}

export default Particles
