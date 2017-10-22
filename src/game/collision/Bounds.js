/**
 * Collision bounding box.
 * @type {module.Bounds}
 */
module.exports = class Bounds {
  /**
   * Initializes position and dimension.
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor (x = 0, y = 0, width = 0, height = 0) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}
