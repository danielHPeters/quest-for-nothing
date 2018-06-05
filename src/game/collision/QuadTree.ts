import HitBox from './HitBox'

/**
 * QuadTree class used to improve collision checking.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class QuadTree {
  level: number
  maxObjects: number
  maxLevels: number
  hitBox: HitBox
  objects
  nodes: QuadTree[]

  /**
   * Constructor.
   *
   * @param hitBox Bounding box
   * @param level Layer level
   */
  constructor (hitBox: HitBox = new HitBox(0, 0, 0, 0), level: number = 0) {
    this.level = level
    this.maxObjects = 10
    this.maxLevels = 5
    this.hitBox = hitBox
    this.objects = []
    this.nodes = []
  }

  /**
   * Clears the QuadTree and its sub nodes from all game objects.
   */
  clear (): void {
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

  /**
   * Insert an object into the QuadTree.
   *
   * @param object
   */
  insert (object): void {
    if (typeof object === 'undefined') {
      return
    }
    if (object instanceof Array) {
      object.forEach(element => this.insert(element))
      return
    }
    if (this.nodes.length > 0) {
      let index = this.getIndex(object)
      // Only addVector the object to a sub node if it can fit completely within one
      if (index !== -1) {
        this.nodes[index].insert(object)
        return
      }
    }
    this.objects.push(object)

    if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
      if (typeof this.nodes[0] === 'undefined') {
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

  /**
   * Get the index of an object from the QuadTree.
   *
   * @param object
   * @returns Index of the object
   */
  getIndex (object): number {
    let index = -1
    let verticalMidpoint = this.hitBox.position.x + this.hitBox.width / 2
    let horizontalMidpoint = this.hitBox.position.y + this.hitBox.height / 2
    // Object can fit completely within the top quadrant
    let topQuadrant = (object.position.y < horizontalMidpoint && object.position.y + object.height < horizontalMidpoint)
    // Object can fit completely within the bottom quadrant
    let bottomQuadrant = (object.position.y > horizontalMidpoint)
    // Object can fit completely within the left quadrants
    if (object.position.x < verticalMidpoint && object.position.x + object.width < verticalMidpoint) {
      if (topQuadrant) {
        index = 1
      } else if (bottomQuadrant) {
        index = 2
      }
    } else if (object.position.x > verticalMidpoint) { // Object can fix completely within the right quadrants
      if (topQuadrant) {
        index = 0
      } else if (bottomQuadrant) {
        index = 3
      }
    }
    return index
  }

  /**
   * Split the tree on demand.
   */
  split (): void {
    let subWidth = (this.hitBox.width / 2) | 0
    let subHeight = (this.hitBox.height / 2) | 0
    this.nodes[0] = new QuadTree(
      new HitBox(this.hitBox.position.x + subWidth, this.hitBox.position.y, subWidth, subHeight), this.level + 1)
    this.nodes[1] = new QuadTree(
      new HitBox(this.hitBox.position.x, this.hitBox.position.y, subWidth, subHeight), this.level + 1)
    this.nodes[2] = new QuadTree(
      new HitBox(this.hitBox.position.x, this.hitBox.position.y + subHeight, subWidth, subHeight), this.level + 1)
    this.nodes[3] = new QuadTree(
      new HitBox(this.hitBox.position.x + subWidth, this.hitBox.position.y + subHeight, subWidth, subHeight), this.level + 1)
  }
}
