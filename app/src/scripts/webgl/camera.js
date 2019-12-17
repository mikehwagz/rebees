import { OrthographicCamera, Vector3 } from 'three'

export default class Camera extends OrthographicCamera {
  constructor() {
    super(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      -10000,
      10000,
    )

    this.position.z = 500

    this.lookAt(new Vector3())
    this.updateMatrix()
  }

  calculateUnitSize(distance = this.position.z) {
    const vFov = (this.fov * Math.PI) / 180
    const height = 2 * Math.tan(vFov / 2) * distance
    const width = height * this.aspect

    return {
      width,
      height,
    }
  }

  resize({ width, height }) {
    this.left = -width / 2
    this.right = width / 2
    this.top = height / 2
    this.bottom = -height / 2

    this.unit = this.calculateUnitSize()
    this.updateProjectionMatrix()
  }
}
