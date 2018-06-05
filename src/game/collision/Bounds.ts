/**
 * Collision bounding box.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Bounds {
  x: number
  y: number
  width: number
  height: number

  /**
   * Initializes position and dimension.
   * @param x X coordinate
   * @param y Y coordinate
   * @param width Dimension width
   * @param height Dimension height
   */
  constructor (x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}
