import Entity from './Entity'

/**
 * Block class. Used as obstacles or hidden doors.
 *
 * @author Daniel peters
 * @version 1.0
 */
export default class Block extends Entity {
  /**
   * Constructor. Set position information and material.
   *
   * @param x X coordinate
   * @param y Y coordinate
   * @param width Initial width
   * @param height Initial Height
   * @param type Entity type
   */
  constructor (x: number, y: number, width: number, height: number, type: string) {
    super(x, y, width, height, type)
    this.solid = true
  }
}
