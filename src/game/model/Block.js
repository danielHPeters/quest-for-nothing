/**
 *
 * @type {module.Entity}
 */
let Entity = require('./Entity')

/**
 *
 * @type {module.Block}
 */
module.exports = class Block extends Entity {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {Material} material
   */
  constructor (x, y, width, height, material) {
    super(x, y, width, height, material)
    this.solid = true
  }

  /**
   *
   * @returns {boolean}
   */
  isSolid () {
    return this.solid
  }

  /**
   *
   * @param {boolean} solid
   */
  setSolid (solid) {
    this.solid = solid
  }
}
