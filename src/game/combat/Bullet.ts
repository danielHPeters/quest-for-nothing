import { Entity } from '../model/Entity'

/**
 * Bullet definition.
 *
 * @type {Bullet}
 */
export class Bullet extends Entity {
  /**
   * Default constructor. Sets position and type info.
   *
   * @param {number} x bullet x position
   * @param {number} y bullet y position
   * @param {number} width bullet width
   * @param {number} height bullet height
   */
  constructor (x: number, y: number, width: number, height: number) {
    super(x, y, width, height, 'bullet')
  }

  update (): void {
    throw new Error('Not implemented!')
  }
}
