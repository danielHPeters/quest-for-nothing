/**
 *
 * @type {module.Vector2}
 */
let Vector2 = require('./Vector2')
/**
 *
 * @type {module.Bounds}
 */
let Bounds = require('../collision/Bounds')

/**
 *
 * @type {module.Entity}
 */
module.exports = class Entity {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {module.Material} material
   */
  constructor (x, y, width, height, material) {
    this.position = new Vector2(x, y)
    this.velocity = new Vector2(0, 0)
    this.acceleration = new Vector2(0, 0)
    this.width = width
    this.height = height
    this.material = material
    this.collideAbleWith = []
    this.colliding = false
    this.type = ''
  }

  /**
   * Get collision bounds in form of a surrounding rectangle
   *
   * @returns {module.Bounds}
   */
  getCollisionBox () {
    return new Bounds(this.position.x, this.position.y, this.width, this.height)
  }

  draw () {

  }

  move () {

  }

  /**
   * Check if this Entity is collideable with another object
   *
   * @param {module.Entity} object
   * returns boolean
   */
  isCollideAbleWith (object) {
    return this.collideAbleWith.includes(object.type)
  }
}
