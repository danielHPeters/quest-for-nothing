import Entity from '../model/Entity'

/**
 * Bullet definition.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Bullet extends Entity {
  /**
   * Default constructor. Sets position and type info.
   *
   * @param x Bullet x coordinate
   * @param y Bullet y coordinate
   * @param width bullet width
   * @param height bullet height
   */
  constructor (x: number, y: number, width: number, height: number) {
    super(x, y, width, height, 'bullet')
  }

  update (): void {
    throw new Error('Not implemented!')
  }
}
