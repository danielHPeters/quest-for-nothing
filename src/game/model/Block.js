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
   * Constructor. Set position information and material
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {module.Material} material
   */
  constructor (x, y, width, height, material) {
    super(x, y, width, height, material)
    this.solid = true
  }

  /**
   * check if this block is solid. Players can travel through non solid ones.
   * @returns {boolean}
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
