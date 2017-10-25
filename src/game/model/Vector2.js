/**
 * Simple 2D vector implementation used for position, movement etc.
 * TODO implement unfinished or missing methods.
 *
 * @author Daniel Peters
 * @version 2.0
 * @type {module.Vector2}
 */
module.exports = class Vector2 {
  /**
   * Default constructor. Sets x and y values.
   * @param {number} x
   * @param {number} y
   */
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  /**
   * Set vector with both x and y values.
   *
   * @param x new x value
   * @param y new y value
   */
  set (x, y) {
    this.x = x
    this.y = y
  }

  /**
   * Set x value of this vector.
   * Throws error if parameter is not a number.
   * @param {number} x new x value
   */
  set x (x) {
    if (typeof x !== 'number') {
      throw new Error('"x" must be a number.')
    }
    this._x = x
  }

  /**
   * Set y value of this vector.
   * Throws error if parameter is not a number.
   * @param {number} y new y value
   */
  set y (y) {
    if (typeof y !== 'number') {
      throw new Error('"y" must be a number.')
    }
    this._y = y
  }

  /**
   * Getter for x value
   * @returns {number} x value
   */
  get x () {
    return this._x
  }

  /**
   * Getter for y value
   * @returns {number} y value
   */
  get y () {
    return this._y
  }

  /**
   * Set vector location to another vector.
   *
   * @param vector other vector
   */
  setVector (vector) {
    this.x = vector.x
    this.y = vector.y
  }

  /**
   * Add vector to this vector.
   *
   * @param vector other vector
   */
  add (vector) {
    this.x += vector.x
    this.y += vector.y
  }

  /**
   * Static add method to combine two vectors into a new one.
   *
   * @param v1 first vector
   * @param v2 second vector
   * @returns {module.Vector2} combined vector
   */
  static add (v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y)
  }

  /**
   * Subtract a vector from this vector.
   *
   * @param vector other vector
   */
  sub (vector) {
    this.x -= vector.x
    this.y -= vector.y
  }

  /**
   * Subtract two vector from each other and put the result into a new vector.
   *
   * @param v1 first vector
   * @param v2 second vector
   * @returns {module.Vector2} resulting vector
   */
  static subtract (v1, v2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y)
  }

  /**
   * Multiply this vector by scalar.
   * @param scalar scalar to multiply the vector
   */
  multiply (scalar) {
    this.x *= scalar
    this.y *= scalar
  }

  /**
   * Multiplies a vector with a scalar and returns the resulting vector.
   *
   * @param vector initial vector
   * @param scalar scalar to scale the vector
   * @returns {module.Vector2} the resulting vector
   */
  static multiply (vector, scalar) {
    return new Vector2(vector.x * scalar, vector.y * scalar)
  }

  /**
   * Divides this vector by a scalar.
   *
   * @param scalar scalar used to divide this vector
   */
  divide (scalar) {
    this.x /= scalar
    this.y /= scalar
  }

  /**
   * Divides a vector by a scalar and returns the result in a new vector.
   *
   * @param vector vector to divide
   * @param scalar scalar used to divide vector
   * @returns {module.Vector2} resulting vector
   */
  static divide (vector, scalar) {
    return new Vector2(vector.x / scalar, vector.y / scalar)
  }

  /**
   * Get the magnitude / length of this vector.
   *
   * @returns {number} magnitude / length of this vector
   */
  mag () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * Negate the x and y values of this vector.
   *
   * @returns {module.Vector2}
   */
  negative () {
    return new Vector2(-this.x, -this.y)
  }

  /**
   * Normalize the vector.
   */
  normalize () {
    let magnitude = this.mag()
    if (magnitude !== 0) {
      this.divide(magnitude)
    }
  }

  /**
   * Limit the vector to a maximum length.
   *
   * @param max maximum lenght
   */
  limit (max) {
    if (this.mag() > max) {
      this.normalize()
      this.multiply(max)
    }
  }

  /**
   * Get the distance of this vector to another vector.
   *
   * @param {module.Vector2} vector other vector
   * @returns {number} calculated distance
   */
  distanceTo (vector) {
    return Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2))
  }

  /**
   *
   * @param {module.Vector2} vector
   * @returns {number}
   */
  dot (vector) {
    return this.x * vector.x + this.y * vector.y
  }

  /**
   * Create a clone of this vector.
   *
   * @returns {module.Vector2} cloned vector
   */
  clone () {
    return new Vector2(this.x, this.y)
  }
}
