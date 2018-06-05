import Vector2 from '../../lib/math/Vector2'
import Area from './Area'

/**
 * Defines position and area of spawn location.
 * Specify spawn location in json level files by adding object type: spawn.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class SpawnPoint {
  position: Vector2
  width: number
  height: number
  area: Area

  /**
   * Constructor. Sets position and dimension data. Also sets the area in which it is located.
   *
   * @param x Initial x
   * @param y Initial y
   * @param width Initial width
   * @param height Initial height
   * @param area Containing Area
   */
  constructor (x: number, y: number, width: number, height: number, area: Area) {
    this.position = new Vector2(x, y)
    this.width = width
    this.height = height
    this.area = area
  }
}
