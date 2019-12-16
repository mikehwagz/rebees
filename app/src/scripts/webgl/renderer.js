import { WebGLRenderer } from 'three'

export default class Renderer extends WebGLRenderer {
  constructor() {
    super({
      powerPreference: 'high-performance',
      antialiasing: false,
      alpha: true,
    })
  }

  resize({ width, height, dpr }) {
    this.setPixelRatio(dpr)
    this.setSize(width, height)
  }
}
