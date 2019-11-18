import * as THREE from 'three'

/**
 * Clamp a value between two bounds
 *
 * @param  {number} v   Value to clamp
 * @param  {number} min Minimum boundary
 * @param  {number} max Maximum boundary
 * @return {number}     Clamped value
 */
export function clamp(value, min = 0, max = 1) {
  return value < min ? min : value > max ? max : value
}

/**
 * Diagonal of a rectangle
 *
 * @param  {number} w Width
 * @param  {number} h Height
 * @return {number}   Diagonal length
 */
export function diagonal(w, h) {
  return Math.sqrt(w * w + h * h)
}

/**
 * Distance between two points
 *
 * @param  {number} x1 X coord of the first point
 * @param  {number} y1 Y coord of the first point
 * @param  {number} x2 X coord of the second point
 * @param  {number} y2 Y coord of the second point
 * @return {number}    Computed distance
 */
export function distance(x1, y1, x2, y2) {
  const dx = x1 - x2
  const dy = y1 - y2
  return Math.sqrt(dx * dx + dy * dy)
}

/**
 * Linear interpolation (lerp)
 *
 * @param  {number} v0 current value
 * @param  {number} y1 target value
 * @param  {number} t  progress
 * @return {number}    Interpolated value
 */
export function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t
}

/**
 * Re-maps a number from one range to another
 *
 * @param  {number} value  The incoming value to be converted
 * @param  {number} start1 Lower bound of the value's current range
 * @param  {number} stop1  Upper bound of the value's current range
 * @param  {number} start2 Lower bound of the value's target range
 * @param  {number} stop2  Upper bound of the value's target range
 * @return {number}        Remapped number
 */
export function map(value, start1, stop1, start2, stop2) {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

/**
 * Normalize a value between two bounds
 *
 * @param  {number} value Value to normalize
 * @param  {number} min   Minimum boundary
 * @param  {number} max   Maximum boundary
 * @return {number}       Normalized value
 */
export function norm(value, min, max) {
  return (value - min) / (max - min)
}

/**
 * Rounds a value
 *
 * @param  {number} v  Value to round
 * @param  {number} p  Precision
 * @return {number}    Rounded value
 */
export function round(v, p = 1000) {
  return Math.round(v * p) / p
}

/**
 * Wrap a value around the given length using the modulo operator
 *
 * e.g. wrap(1, 3) // 1
 *      wrap(3, 3) // 0
 *      wrap(-1, 3) // 2
 *
 * @param  {number} index  Index
 * @param  {number} length Length
 * @return {number}        Looped index
 */
export function wrap(index, length) {
  if (index < 0) {
    index = length + (index % length)
  }
  if (index >= length) {
    return index % length
  }
  return index
}

export function toRadians(degrees) {
  return degrees * (Math.PI / 180)
}

export function randomPointsInGeometry(geometry, n) {
  var face,
    i,
    faces = geometry.faces,
    vertices = geometry.vertices,
    il = faces.length,
    totalArea = 0,
    cumulativeAreas = [],
    vA,
    vB,
    vC

  // precompute face areas

  for (i = 0; i < il; i++) {
    face = faces[i]

    vA = vertices[face.a]
    vB = vertices[face.b]
    vC = vertices[face.c]

    face._area = triangleArea(vA, vB, vC)

    totalArea += face._area

    cumulativeAreas[i] = totalArea
  }

  // binary search cumulative areas array

  function binarySearchIndices(value) {
    function binarySearch(start, end) {
      // return closest larger index
      // if exact number is not found

      if (end < start) return start

      var mid = start + Math.floor((end - start) / 2)

      if (cumulativeAreas[mid] > value) {
        return binarySearch(start, mid - 1)
      } else if (cumulativeAreas[mid] < value) {
        return binarySearch(mid + 1, end)
      } else {
        return mid
      }
    }

    var result = binarySearch(0, cumulativeAreas.length - 1)
    return result
  }

  // pick random face weighted by face area

  var r,
    index,
    result = []

  var stats = {}

  for (i = 0; i < n; i++) {
    r = Math.random() * totalArea

    index = binarySearchIndices(r)

    result[i] = randomPointInFace(faces[index], geometry)

    if (!stats[index]) {
      stats[index] = 1
    } else {
      stats[index] += 1
    }
  }

  return result
}

export function triangleArea(vectorA, vectorB, vectorC) {
  let vector1 = new THREE.Vector3()
  let vector2 = new THREE.Vector3()

  vector1.subVectors(vectorB, vectorA)
  vector2.subVectors(vectorC, vectorA)
  vector1.cross(vector2)

  return 0.5 * vector1.length()
}

export function randomPointInFace(face, geometry) {
  var vA, vB, vC

  vA = geometry.vertices[face.a]
  vB = geometry.vertices[face.b]
  vC = geometry.vertices[face.c]

  return randomPointInTriangle(vA, vB, vC)
}

export function randomPointInTriangle(vectorA, vectorB, vectorC) {
  var vector = new THREE.Vector3()
  var point = new THREE.Vector3()

  var a = Math.random()
  var b = Math.random()

  if (a + b > 1) {
    a = 1 - a
    b = 1 - b
  }

  var c = 1 - a - b

  point.copy(vectorA)
  point.multiplyScalar(a)

  vector.copy(vectorB)
  vector.multiplyScalar(b)

  point.add(vector)

  vector.copy(vectorC)
  vector.multiplyScalar(c)

  point.add(vector)

  return point
}
