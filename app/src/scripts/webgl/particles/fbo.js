import {
  Scene,
  OrthographicCamera,
  WebGLRenderTarget,
  NearestFilter,
  RGBAFormat,
  FloatType,
  HalfFloatType,
  BufferGeometry,
  BufferAttribute,
  Mesh,
  Points,
} from 'three'

/* prettier-ignore */

class FBO {
  constructor({
    width,
    height,
    renderer,
    simulationMaterial,
    renderMaterial,
    onError,
  }) {
    try {
      this.checkSupport(renderer)
    } catch (e) {
      // TODO: handle error
      if (typeof onError === 'function') {
        onError(e)
      } else {
        console.error(e)
      }
    }

    this.width = width
    this.height = height
    this.renderer = renderer
    this.simulationMaterial = simulationMaterial
    this.renderMaterial = renderMaterial
    this.scene = new Scene()
    this.orthoCamera = new OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1)
    this.renderTargets = [this.createRenderTarget(), this.createRenderTarget()]
    this.index = 0
    this.copyData = true
    this.points = null

    this.setupSimulation()
    this.setupParticles()
  }

  update(frameCount) {
    const destIndex = this.index === 0 ? 1 : 0
    const old = this.renderTargets[this.index]
    const dest = this.renderTargets[destIndex]

    this.points.material.uniforms.positions.value = this.copyData ? dest.texture : old.texture

    const oldMainTarget = this.renderer.getRenderTarget()
    this.renderer.setRenderTarget(dest)
    this.renderer.render(this.scene, this.orthoCamera)
    this.renderer.setRenderTarget(oldMainTarget)

    this.index = destIndex
    this.copyData = false

    this.points.material.uniforms.time.value = frameCount
  }

  setupSimulation() {
    const geom = new BufferGeometry()
    geom.setAttribute('position', new BufferAttribute(
      new Float32Array([
        -1, -1, 0,
         1, -1, 0,
         1,  1, 0,
        -1, -1, 0,
         1,  1, 0,
        -1,  1, 0
      ]), 
      3
    ))
    
    geom.setAttribute('uv', new BufferAttribute(
      new Float32Array([
        0, 1,
        1, 1,
        1, 0,
        0, 1,
        1, 0, 
        0, 0
      ]),
      2
    ))
  
    this.scene.add(new Mesh(geom, this.simulationMaterial))
  }

  setupParticles() {
    const l = (this.width * this.height)
    const vertices = new Float32Array(l * 3)
    for (let i = 0; i < l; i++) {
      const i3 = i * 3
      vertices[i3] = (i % this.width) / this.width
      vertices[i3 + 1] = (i / this.height) / this.height
      vertices[i3 + 2] = i
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(vertices, 3))
    geometry.computeBoundingSphere()

    this.points = new Points(geometry, this.renderMaterial)
    // this.add(this.points)
  }

  createRenderTarget() {
    return new WebGLRenderTarget(this.width, this.height, {
      minFilter: NearestFilter,
      magFilter: NearestFilter,
      format: RGBAFormat,
      stencilBuffer: false,
      depthBuffer: false,
      depthWrite: false,
      depthTest: false,
      type: HalfFloatType, // TODO: half float for ios maybe?
    })
  }

  checkSupport(renderer) {
    const gl = renderer.getContext()
    if (!gl.getExtension('OES_texture_float')) {
      throw new Error('float textures no supported')
    }

    if (gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) == 0) {
      throw new Error('vertex shader cannot read textures')
    }
  }
}

export default FBO
