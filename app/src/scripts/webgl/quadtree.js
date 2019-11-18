import * as THREE from 'three'
import { colors } from '@/settings'

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  contains(point) {
    return (
      point.x >= this.x - this.w &&
      point.x < this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y < this.y + this.h
    )
  }
}

class QuadTree {
  constructor({ boundary, capacity, depth = 0 }) {
    this.boundary = boundary
    this.capacity = capacity
    this.depth = depth
    this.points = []
    this.subdivisions = []
  }

  subdivide() {
    let { x, y, w, h } = this.boundary

    this.subdivisions = [
      new QuadTree({
        boundary: new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2),
        capacity: this.capacity,
        depth: this.depth + 1,
      }),
      new QuadTree({
        boundary: new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2),
        capacity: this.capacity,
        depth: this.depth + 1,
      }),
      new QuadTree({
        boundary: new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2),
        capacity: this.capacity,
        depth: this.depth + 1,
      }),
      new QuadTree({
        boundary: new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2),
        capacity: this.capacity,
        depth: this.depth + 1,
      }),
    ]
  }

  insert(point) {
    if (!this.boundary.contains(point)) return

    if (this.points.length < this.capacity) {
      this.points.push(point)
    } else {
      !this.subdivisions.length && this.subdivide()

      for (let i = 0; i < this.subdivisions.length; i++) {
        this.subdivisions[i].insert(point)
      }
    }
  }

  show(geom) {
    const { x, y, w, h } = this.boundary

    let depth = Math.random() * 256
    let gap = Math.random() * 20

    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w * 2 - gap, depth, h * 2 - gap),
    )
    mesh.position.x = x - 128
    mesh.position.y = depth / 2 - 128
    mesh.position.z = y - 128

    if (Math.random() > 0.5 && this.depth > 1) {
      mesh.updateMatrix()
      geom.merge(mesh.geometry, mesh.matrix)
    }

    if (this.subdivisions.length) {
      for (let i = 0; i < this.subdivisions.length; i++) {
        this.subdivisions[i].show(geom)
      }
    }
  }
}

export { Point, Rectangle, QuadTree as default }
