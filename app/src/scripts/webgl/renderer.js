import { WebGLRenderer } from 'three'

class Renderer extends WebGLRenderer {
  constructor() {
    super({
      powerPreference: 'high-performance',
      antialiasing: false,
      alpha: true,
    })

    // this.gammaFactor = 2.2
    // this.gammaInput = true
    // this.gammaOutput = true
  }

  resize({ width, height, dpr }) {
    this.setPixelRatio(dpr)
    this.setSize(width, height)
  }
}

export default new Renderer()
