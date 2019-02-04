import Vector2 from '../../lib/math/Vector2'
import GameState from './GameState'
import HitBox from '../collision/HitBox'

/**
 * Entity base class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Entity {
  position: Vector2
  velocity: Vector2
  acceleration: Vector2
  type: string
  width: number
  height: number
  collideAbleWith: string[]
  colliding: boolean
  solid: boolean

  /**
   * Constructor.
   *
   * @param x X coordinate
   * @param y Y coordinate
   * @param width Initial width
   * @param height Initial Height
   * @param type Entity type
   */
  constructor (x: number, y: number, width: number, height: number, type: string) {
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
   * Get collision bounds in form of a surrounding rectangle.
   *
   * @returns A hitbox representing a rectangle around this Entity
   */
  getCollisionBox (): HitBox {
    return new HitBox(this.position.x, this.position.y, this.width, this.height)
  }

  draw (): void {
    throw new Error('Not Implemented!')
  }

  move (game: GameState, timeDifference: number): void {
    throw new Error('Not Implemented!')
  }

  /**
   * Check if this Entity is collideable with another object
   *
   * @param other Other Entity
   * @returns True if this Entity is collideable with other Entity
   */
  isCollideAbleWith (other: Entity): boolean {
    return this.collideAbleWith.includes(other.type)
  }
}
