/**
 * Collision bounding box.
 * @type {Bounds}
 */
export class Bounds {
  x: number
  y: number
  width: number
  height: number

  /**
   * Initializes position and dimension.
   * @param {number} x position x
   * @param {number} y position y
   * @param {number} width dimension width
   * @param {number} height dimension height
   */
  constructor (x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}
