import Vector from './Vector'
import Cloneable from '../util/Cloneable'

/**
 * 2D vector implementation.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Vector2 implements Vector, Cloneable {
  x: number
  y: number

  /**
   * Default constructor. Sets x and y values.
   *
   * @param x Initial x value
   * @param y Initial y value
   */
  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * Static addVector method to combine two vectors into a new one.
   *
   * @param v1 First vector
   * @param v2 Second vector
   * @returns Combined vector
   */
  static addVector (v1: Vector2, v2: Vector2): Vector2 {
    return new Vector2(v1.x + v2.x, v1.y + v2.y)
  }

  /**
   * Subtract two vector from each other and put the result into a new vector.
   *
   * @param v1 First vector
   * @param v2 Second vector
   * @returns Resulting vector
   */
  static subtractVector (v1: Vector2, v2: Vector2): Vector2 {
    return new Vector2(v1.x - v2.x, v1.y - v2.y)
  }

  /**
   * Multiplies a vector with a scalar and returns the resulting vector.
   *
   * @param vector Initial vector
   * @param scalar Scalar to scale the vector
   * @returns The resulting vector
   */
  static multiply (vector: Vector2, scalar: number): Vector2 {
    return new Vector2(vector.x * scalar, vector.y * scalar)
  }

  /**
   * Divides a vector by a scalar and returns the result in a new vector.
   * Throws error if trying to divide by zero.
   *
   * @param vector Vector to divide
   * @param scalar Scalar used to divide vector
   * @returns Resulting vector
   */
  static divide (vector: Vector2, scalar: number): Vector2 {
    if (scalar === 0) {
      throw new Error('cannot divide vector by scalar with value "0"')
    }
    return new Vector2(vector.x / scalar, vector.y / scalar)
  }

  /**
   * Calculate distance between two vectors.
   *
   * @param start
   * @param destination
   * @returns
   */
  static distance (start: Vector2, destination: Vector2): number {
    return Math.sqrt(Math.pow(destination.x - start.x, 2) + Math.pow(destination.y - start.y, 2))
  }

  /**
   * Calculate linear interpolation between to vectors.
   *
   * @param start
   * @param destination
   * @param n
   */
  static lerp (start: Vector2, destination: Vector2, n: number): Vector2 {
    return new Vector2(
      (1 - n) * start.x + n * destination.x,
      (1 - n) * start.y + n * destination.y
    )
  }

  /**
   * Set vector with both x and y values.
   *
   * @param x New x value
   * @param y New y value
   */
  set (x: number, y: number): void {
    this.x = x
    this.y = y
  }

  /**
   * Set vector location to another vector.
   *
   * @param vector Other vector
   */
  setVector (vector: Vector2): void {
    this.x = vector.x
    this.y = vector.y
  }

  /**
   * Add x and y to this vector.
   *
   * @param x X value
   * @param y Y value
   */
  add (x: number, y: number): void {
    this.x += x
    this.y += y
  }

  /**
   * Add vector to this vector.
   *
   * @param vector Other vector
   */
  addVector (vector: Vector2): void {
    this.x += vector.x
    this.y += vector.y
  }

  /**
   * Subtraxt x and y from this vector.
   *
   * @param x X value
   * @param y Y value
   */
  subtract (x: number, y: number): void {
    this.x -= x
    this.y -= y
  }

  /**
   * Subtract a vector from this vector.
   *
   * @param vector Other vector
   */
  subtractVector (vector: Vector2): void {
    this.x -= vector.x
    this.y -= vector.y
  }

  /**
   * Multiply this vector by scalar.
   *
   * @param scalar Scalar to multiply the vector
   */
  multiply (scalar: number): void {
    this.x *= scalar
    this.y *= scalar
  }

  /**
   * Divides this vector by a scalar.
   * Throws error when trying to divide by zero.
   *
   * @param scalar Scalar used to divide this vector
   */
  divide (scalar: number): void {
    if (scalar === 0) {
      throw new Error('cannot divide vector by "0"')
    }
    this.x /= scalar
    this.y /= scalar
  }

  /**
   * Get the magnitude / elementsCount of this vector.
   *
   * @returns Magnitude / elementsCount of this vector
   */
  mag (): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * Negate the x and y values of this vector and return the result as a new Vector2 object.
   *
   * @returns
   */
  negative (): Vector2 {
    return new Vector2(-this.x, -this.y)
  }

  /**
   * Normalize the vector.
   */
  normalize (): void {
    let magnitude = this.mag()
    if (magnitude !== 0) {
      this.divide(magnitude)
    }
  }

  /**
   * Limit the vector to a maximum size.
   *
   * @param max Maximum size
   */
  limit (max: number): void {
    if (Math.floor(this.mag()) > max) {
      this.normalize()
      this.multiply(max)
    }
  }

  /**
   * Get the distance of this vector to another vector.
   *
   * @param vector Other vector
   * @returns Calculated distance
   */
  distanceTo (vector: Vector2): number {
    return Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2))
  }

  /**
   * Get the dot product between this vector and another vector.
   *
   * @param vector
   * @returns The dot product of this vector and the one passed as param
   */
  dot (vector: Vector2): number {
    return this.x * vector.x + this.y * vector.y
  }

  floor (): Vector2 {
    this.x = Math.floor(this.x)
    this.y = Math.floor(this.y)
    return this
  }

  ceil (): void {
    this.x = Math.ceil(this.x)
    this.y = Math.ceil(this.y)
  }

  round (): Vector2 {
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    return this
  }

  /**
   * Linear interpolation method.
   *
   * @param {Vector2} vector Destination vector.
   * @param {number} n Normal value
   */
  lerp (vector: Vector2, n: number): void {
    this.x = (1 - n) * this.x + n * vector.x
    this.y = (1 - n) * this.y + n * vector.y
  }

  equals (vector: Vector2): boolean {
    return this.x === vector.x && this.y === vector.y
  }

  /**
   * Create a clone of this vector.
   *
   * @returns Cloned vector
   */
  clone (): Vector2 {
    return new Vector2(this.x, this.y)
  }
}
