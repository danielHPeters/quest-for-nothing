/**
 * Collision bounding box.
 * @type {module.Bounds}
 */
module.exports = class Bounds {
  /**
   * Initializes position and dimension.
   * @param {number} x position x
   * @param {number} y position y
   * @param {number} width dimension width
   * @param {number} height dimension height
   */
  constructor (x = 0, y = 0, width = 0, height = 0) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}
