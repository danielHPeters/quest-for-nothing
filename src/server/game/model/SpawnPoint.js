/**
 *
 * @type {module.Vector}
 */
let Vector = require('./Vector')

/**
 *
 * @type {module.SpawnPoint}
 */
module.exports = class SpawnPoint {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {module.Area} area
   */
  constructor (x, y, width, height, area) {
    this.position = new Vector(x, y)
    this.width = width
    this.height = height
    this.area = area
  }
}