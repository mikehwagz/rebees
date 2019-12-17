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
import MagicShader, { gui } from '@/lib/magicShader'
import gsap from 'gsap'
import FBO from './fbo'
import simulationVert from './simulation.vert'
import simulationFrag from './simulation.frag'
import renderVert from './render.vert'
import renderFrag from './render.frag'
import QuadTree, { Point, Rectangle } from './quadtree'
import { randomPointsInGeometry, lerp, map, wrap } from '@/util/math'
// import { toggleVisibilityOnKey } from '@/util/misc'
import app from '@/app'

gui.destroy()
// toggleVisibilityOnKey('.dg.ac', 'g')

class Particles extends Object3D {
  constructor(gl) {
    super()

    this.gl = gl
    this.size = 400

    this.tl = gsap.timeline()
    this.isAnimating = false
    this.duration = 3

    this.raycaster = new Raycaster()
    this.mouse = new Vector2()
    this.targetHit = new Vector3()
    this.currentHit = new Vector3()
    this.maxRadius = 100

    this.cache = []
    this.seedIndex = 0
    this.seedCount = 4
  }

  // GETTERS

  get activeTextureIndex() {
    return this.seedIndex % 2
  }

  get activeTextureUniformName() {
    return this.activeTextureIndex ? 'textureB' : 'textureA'
  }

  get idleTextureUniformName() {
    return this.activeTextureIndex ? 'textureA' : 'textureB'
  }

  get activeMesh() {
    return this.cache[this.seedIndex].mesh
  }

  get activeTexture() {
    return this.cache[this.seedIndex].texture
  }

  get isHome() {
    return app.getState().route === 'home'
  }

  // INITIALIZE

  init() {
    for (let i = 0; i < this.seedCount; i++) {
      this.cache.push(this.getSeed(this.size))
    }

    const textureC = this.getPlaneTexture(this.size)

    this.fbo = new FBO({
      width: this.size,
      height: this.size,
      renderer: this.gl.renderer,
      simulationMaterial: new MagicShader({
        name: '🎮 Particle FBO Simulation',
        uniforms: {
          textureA: { value: this.cache[this.seedIndex].texture },
          textureB: {
            value: this.cache[wrap(this.seedIndex + 1, this.seedCount)].texture,
          },
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
    this.add(this.activeMesh)

    if (this.isHome) {
      this.resizeCity(window.innerWidth, window.innerHeight)
    } else {
      this.showPlane()
    }
  }

  // EVENTS

  handlePointerMove(ev) {
    this.mouse.x = (ev.clientX / this.width) * 2 - 1
    this.mouse.y = (ev.clientY / this.height) * -2 + 1
  }

  resize({ width, height }) {
    this.width = width
    this.height = height

    this.resizeCity(width, height)
  }

  resizeCity(width, height) {
    this.posX = (31.25 * width) / 100
    this.posY = (-16.25 * height) / 100
    this.s = map(width, 0, 1440, 0.5, 1)

    if (this.isHome) {
      this.position.x = this.posX
      this.position.y = this.posY

      this.scale.x = this.s
      this.scale.y = this.s
      this.scale.z = this.s
    }
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

    let hits = this.raycaster.intersectObject(this.activeMesh)
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

  animateToNextSeed() {
    if (this.isAnimating) return

    this.isAnimating = true

    this.tl
      .clear()
      .to(
        this.fbo.simulationMaterial.uniforms.cityTransition,
        {
          value: this.activeTextureIndex ? 0 : 1,
          duration: this.duration,
          ease: 'quint.inOut',
          onComplete: () => {
            this.isAnimating = false

            this.remove(this.activeMesh)
            this.seedIndex = wrap(this.seedIndex + 1, this.seedCount)
            this.add(this.activeMesh)

            this.fbo.simulationMaterial.uniforms[
              this.idleTextureUniformName
            ].value = this.cache[
              wrap(this.seedIndex + 1, this.seedCount)
            ].texture
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
  }

  showPlane() {
    this.tl
      .clear()
      .set(this.fbo.simulationMaterial.uniforms.cityTransition, {
        value: this.activeTextureIndex,
      })
      .set(this.fbo.simulationMaterial.uniforms.planeTransition, {
        value: 0.9,
      })
      .set(this.scale, {
        x: 20,
        y: 20,
        z: 20,
      })
      .set(this.position, {
        x: 0,
        y: 0,
      })
      .set(this.fbo.renderMaterial.uniforms.speed, {
        value: 0.0001,
      })
      .set(this.fbo.renderMaterial.uniforms.frequency, {
        value: 0.04,
      })
      .set(this.fbo.renderMaterial.uniforms.amplitude, {
        value: 1,
      })
      .set(this.fbo.renderMaterial.uniforms.alpha, {
        value: 0.6,
      })
      .set(this.fbo.renderMaterial.uniforms.size, {
        value: 2.5,
      })
  }

  animateFromCityToPlane(duration = 2) {
    this.tl
      .clear()
      .to(
        this.fbo.simulationMaterial.uniforms.cityTransition,
        {
          value: this.activeTextureIndex,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.fbo.simulationMaterial.uniforms.planeTransition,
        {
          value: 0.9,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.scale,
        {
          x: 20,
          y: 20,
          z: 20,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.position,
        {
          x: 0,
          y: 0,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.fbo.renderMaterial.uniforms.speed,
        {
          value: 0.0001,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.fbo.renderMaterial.uniforms.frequency,
        {
          value: 0.04,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.fbo.renderMaterial.uniforms.amplitude,
        {
          value: 1,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.fbo.renderMaterial.uniforms.alpha,
        {
          value: 0.6,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.fbo.renderMaterial.uniforms.size,
        {
          value: 2.5,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
  }

  animateFromPlaneToCity(duration = 2) {
    this.tl
      .clear()
      .to(
        this.fbo.simulationMaterial.uniforms.planeTransition,
        {
          value: 0,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.scale,
        {
          x: this.s,
          y: this.s,
          z: this.s,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.position,
        {
          x: this.posX,
          y: this.posY,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.fbo.renderMaterial.uniforms.speed,
        {
          value: 0.01,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.fbo.renderMaterial.uniforms.frequency,
        {
          value: 0.011,
          duration: 2,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.fbo.renderMaterial.uniforms.amplitude,
        {
          value: 0.5,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.fbo.renderMaterial.uniforms.alpha,
        {
          value: 1,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        this.fbo.renderMaterial.uniforms.size,
        {
          value: 2,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
  }

  // TEXTURE GENERATION

  getSeed(size) {
    let qtree = new QuadTree({
      boundary: new Rectangle(size / 2, size / 2, size / 2, size / 2),
      capacity: 1,
    })

    for (let i = 0; i < 40; i++) {
      qtree.insert(new Point(size * Math.random(), size * Math.random()))
    }

    let geom = new Geometry()
    qtree.show(geom, size)

    let mesh = new Mesh(
      geom,
      new MeshNormalMaterial({ opacity: 0.0, transparent: true }),
    )

    mesh.renderOrder = 1

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

    let texture = new DataTexture(data, size, size, RGBFormat, FloatType)
    texture.needsUpdate = true

    return {
      texture,
      mesh,
    }
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

    let texture = new DataTexture(data, size, size, RGBFormat, FloatType)
    texture.needsUpdate = true

    return texture
  }
}

export default Particles
