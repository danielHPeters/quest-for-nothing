import { Entity } from './Entity'

/**
 * Block class. Used as obstacles or hidden doors.
 *
 * @author Daniel peters
 * @version 1.0
 * @type {Block}
 */
export class Block extends Entity {
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
}
