/**
 *
 * @type {module.Vector}
 */
module.exports = class Vector {
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  set (x, y) {
    this.x = x
    this.y = y
  }

  setVector (vector) {
    this.x = vector.x
    this.y = vector.y
  }

  add (vector) {
    this.x += vector.x
    this.y += vector.y
  }

  static add (v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y)
  }

  sub (vector) {
    this.x -= vector.x
    this.y -= vector.y
  }

  static sub (v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y)
  }

  mult (scalar) {
    this.x *= scalar
    this.y *= scalar
  }

  static mult (vector, scalar) {
    return new Vector(vector.x * scalar, vector.y * scalar)
  }

  div (scalar) {
    this.x /= scalar
    this.y /= scalar
  }

  static div (vector, scalar) {
    return new Vector(vector.x / scalar, vector.y / scalar)
  }

  mag () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  negative () {
    return new Vector(-this.x, -this.y)
  }

  normalize () {
    let magnitude = this.mag()
    if (magnitude !== 0) {
      this.div(magnitude)
    }
  }

  limit (max) {
    if (this.mag() > max) {
      this.normalize()
      this.mult(max)
    }
  }

  heading () {

  }

  rotate () {

  }

  lerp () {

  }

  distanceTo (to) {
    return Math.sqrt(Math.pow(to.x - this.x, 2) + Math.pow(to.y - this.y, 2))
  }

  angleBetween () {

  }

  dot () {

  }

  cross () {

  }

  random2D () {

  }

  random3D () {

  }

  clone () {
    return new Vector(this.x, this.y)
  }
}
