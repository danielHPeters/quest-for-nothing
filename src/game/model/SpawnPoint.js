/**
 *
 * @type {module.Vector2}
 */
let Vector2 = require('./Vector2')

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
    this.position = new Vector2(x, y)
    this.width = width
    this.height = height
    this.area = area
  }
}
