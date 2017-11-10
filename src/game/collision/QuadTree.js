const Bounds = require('./Bounds')
/**
 *
 * @type {module.QuadTree}
 */
module.exports = class QuadTree {
  /**
   * Constructor.
   * @param {module.Bounds} boundingBox
   * @param {number} level
   */
  constructor (boundingBox = new Bounds(0, 0, 0, 0), level = 0) {
    this.bounds = boundingBox
    this.objects = []
    this.nodes = []
    this.level = level
    this.maxObjects = 10
    this.maxLevels = 5
  }

  /**
   * Clears the QuadTree and its sub nodes from all game objects.
   */
  clear () {
    this.objects = []
    this.nodes.forEach(node => node.clear())
    this.nodes = []
  }

  getAllObjects (returnedObjects) {
    this.nodes.forEach(node => node.getAllObjects(returnedObjects))
    this.objects.forEach(object => returnedObjects.push(object))
    return returnedObjects
  }

  findObjects (returnedObjects, object) {
    if (typeof object === 'undefined') {
      console.log('UNDEFINED OBJECT')
      return
    }
    let index = this.getIndex(object)
    if (index !== -1 && this.nodes.length) {
      this.nodes[index].findObjects(returnedObjects, object)
    }
    this.objects.forEach(obj => returnedObjects.push(obj))
    return returnedObjects
  }

  insert (object) {
    if (typeof object === 'undefined') {
      return
    }
    if (object instanceof Array) {
      object.forEach(element => this.insert(element))
      return
    }
    if (this.nodes.length) {
      let index = this.getIndex(object)
      // Only add the object to a sub node if it can fit completely within one
      if (index !== -1) {
        this.nodes[index].insert(object)
        return
      }
    }
    this.objects.push(object)

    if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
      if (this.nodes[0] === null) {
        this.split()
      }
      let i = 0
      while (i < this.objects.length) {
        let index = this.getIndex(this.objects[i])
        if (index !== -1) {
          this.nodes[index].insert((this.objects.splice(i, 1))[0])
        } else {
          i++
        }
      }
    }
  }

  getIndex (object) {
    let index = -1
    let verticalMidpoint = this.bounds.x + this.bounds.width / 2
    let horizontalMidpoint = this.bounds.y + this.bounds.height / 2
    // Object can fit completely within the top quadrant
    let topQuadrant = (object.y < horizontalMidpoint && object.y + object.height < horizontalMidpoint)
    // Object can fit completely within the bottom quadrant
    let bottomQuadrant = (object.y > horizontalMidpoint)
    // Object can fit completely within the left quadrants
    if (object.x < verticalMidpoint && object.x + object.width < verticalMidpoint) {
      if (topQuadrant) {
        index = 1
      } else if (bottomQuadrant) {
        index = 2
      }
    } else if (object.x > verticalMidpoint) { // Object can fix completely within the right quadrants
      if (topQuadrant) {
        index = 0
      } else if (bottomQuadrant) {
        index = 3
      }
    }
    return index
  }

  split () {
    let subWidth = (this.bounds.width / 2) | 0
    let subHeight = (this.bounds.height / 2) | 0
    this.nodes[0] = new QuadTree(
      new Bounds(this.bounds.x + subWidth, this.bounds.y, subWidth, subHeight), this.level + 1)
    this.nodes[1] = new QuadTree(
      new Bounds(this.bounds.x, this.bounds.y, subWidth, subHeight), this.level + 1)
    this.nodes[2] = new QuadTree(
      new Bounds(this.bounds.x, this.bounds.y + subHeight, subWidth, subHeight), this.level + 1)
    this.nodes[3] = new QuadTree(
      new Bounds(this.bounds.x + subWidth, this.bounds.y + subHeight, subWidth, subHeight), this.level + 1)
  }
}
