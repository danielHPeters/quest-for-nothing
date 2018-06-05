import Vector2 from '../../lib/math/Vector2'
import Collideable, { EntityType } from '../../lib/interfaces/Collideable'

/**
 * Bounding box used for collision detection on objects.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class HitBox implements Collideable {
  type: EntityType
  collidesWith: EntityType[]
  colliding: boolean
  position: Vector2
  width: number
  height: number

  /**
   * Initializes position and dimension.
   *
   * @param x X coordinate
   * @param y Y coordinate
   * @param width Dimension width
   * @param height Dimension height
   */
  constructor (x: number, y: number, width: number, height: number) {
    this.position = new Vector2(x, y)
    this.width = width
    this.height = height
    this.colliding = false
    this.collidesWith = []
    this.type = EntityType.BOX
    this.collidesWith.push(EntityType.PLAYER)
  }

  isCollideAbleWith (other: Collideable): boolean {
    return this.collidesWith.includes(other.type)
  }
}
