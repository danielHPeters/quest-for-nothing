import { Vector2 } from '../../lib/Vector2'
import { GameState } from './GameState'
import { HitBox } from '../collision/HitBox'

/**
 *
 * @type {Entity}
 */
export class Entity {
  position: Vector2
  velocity: Vector2
  acceleration: Vector2
  type: string
  width: number
  height: number
  collideAbleWith
  colliding: boolean
  private _solid: boolean

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {string} type
   */
  constructor (x, y, width, height, type) {
    this.position = new Vector2(x, y)
    this.velocity = new Vector2(0, 0)
    this.acceleration = new Vector2(0, 0)
    this.type = type
    this.width = width
    this.height = height
    this.collideAbleWith = []
    this.colliding = false
  }

  /**
   * Get collision bounds in form of a surrounding rectangle
   *
   * @returns {HitBox}
   */
  public getCollisionBox () {
    return new HitBox(this.position.x, this.position.y, this.width, this.height)
  }

  public draw (): void {
    throw new Error('Not Implemented!')
  }

  public move (game: GameState, timeDifference: number): void {
    throw new Error('Not Implemented!')
  }

  /**
   * Check if this Entity is collideable with another object
   *
   * @param {Entity} object
   * returns boolean
   */
  public isCollideAbleWith (object) {
    return this.collideAbleWith.includes(object.type)
  }

  /**
   * Check if this block is solid. Players can travel through non solid ones.
   *
   * @returns {boolean} boolean flag telling if the block is solid
   */
  get solid (): boolean {
    return this._solid
  }

  /**
   * Set block state to solid
   * @param {boolean} solid
   */
  set solid (solid: boolean) {
    this._solid = solid
  }
}
