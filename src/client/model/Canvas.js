import Entity from './Entity'

/**
 * Created by Daniel on 2017-09-18.
 */
export default class Canvas extends Entity {
  /**
   *
   * @param x
   * @param y
   * @param width
   * @param height
   * @param {Material} material
   */
  constructor (x, y, width, height, material) {
    super(x, y, width, height, material)
    this.name = 'default'
  }
}
