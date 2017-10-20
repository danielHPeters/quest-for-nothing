/**
 *
 * @type {module.Bounds}
 */
let Bounds = require('./Bounds')

/**
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

  clear () {
    this.objects = []
    this.nodes.forEach(node => node.clear())
    this.nodes = []
  }

  getAllObjects () {

  }

  findObjects () {

  }

  insert (object) {
    if (typeof object === 'undefined') {
      return
    }
    if (object instanceof Array) {
      object.forEach(item => this.insert(item))
    }
  }
}
