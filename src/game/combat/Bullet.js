'use strict'
const Entity = require('./../model/Entity')

/**
 * Bullet definition.
 *
 * @type {module.Bullet}
 */
module.exports = class Bullet extends Entity {
  /**
   * Default constructor. Sets position and type info.
   *
   * @param {number} x bullet x position
   * @param {number} y bullet y position
   * @param {number} width bullet width
   * @param {number} height bullet height
   */
  constructor (x, y, width, height) {
    super(x, y, width, height, 'bullet')
  }

  update () {

  }
}
