/**
 *
 * @type {module.Bounds}
 */
let Bounds = require('./Bounds')

/**
 * Experimental QuadTree implementation to improve collision detection.
 * TODO: Finish implementation
 *
 * @type {module.QuadTree}
 */
module.exports = class QuadTree {
  constructor (boundingBox = null, level = 0) {
    this.maxObjects = 10
    this.bounds = boundingBox || new Bounds()
    this.objects = []
    this.nodes = []
    this.level = level
    this.maxLevels = 5
  }

  /**
   * Clear quad tree.
   */
  clear () {
    this.objects = []
    this.nodes.forEach(node => node.clear())
    this.nodes = []
  }

  /**
   * Get all objects from quad tree.
   */
  getAllObjects () {

  }

  /**
   * Find objects in quad tree.
   */
  findObjects () {

  }

  /**
   * Insert object to quad tree.
   *
   * @param object object to be inserted
   */
  insert (object) {
    if (typeof object === 'undefined') {
      return
    }
    if (object instanceof Array) {
      object.forEach(item => this.insert(item))
    }
  }
}
