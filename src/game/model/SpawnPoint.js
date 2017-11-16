/**
 *
 * @type {module.Vector2}
 */
let Vector2 = require('./../../lib/Vector2')

/**
 * Defines position and area of spawn location.
 * Specify spawn location in json level files by adding object type: spawn
 *
 * @author Daniel Peters
 * @version 1.0
 * @type {module.SpawnPoint}
 */
module.exports = class SpawnPoint {
  /**
   * Constructor. Sets position and dimension data. Also sets the area in which it is located.
   *
   * @param {number} x initial x
   * @param {number} y initial y
   * @param {number} width initial width
   * @param {number} height initial height
   * @param {module.Area} area containing Area
   */
  constructor (x, y, width, height, area) {
    this.position = new Vector2(x, y)
    this.width = width
    this.height = height
    this.area = area
  }
}
