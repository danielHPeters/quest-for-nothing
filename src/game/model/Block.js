/**
 *
 * @type {module.Entity}
 */
const Entity = require('./Entity')

/**
 * Block class. Used as obstacles or hidden doors.
 *
 * @author Daniel peters
 * @version 1.0
 * @type {module.Block}
 */
module.exports = class Block extends Entity {
  /**
   * Constructor. Set position information and material
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {string} type
   */
  constructor (x, y, width, height, type) {
    super(x, y, width, height, type)
    this.solid = true
  }

  /**
   * Check if this block is solid. Players can travel through non solid ones.
   *
   * @returns {boolean} boolean flag telling if the block is solid
   */
  isSolid () {
    return this.solid
  }

  /**
   * Set block state to solid
   * @param {boolean} solid
   */
  setSolid (solid) {
    this.solid = solid
  }
}
