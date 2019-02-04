import QuadTree from './QuadTree'

export default class CollisionManager {
  quadTree: QuadTree

  constructor (quadTree: QuadTree) {
    this.quadTree = quadTree
  }

  detectCollision (): void {
    let objects: any[] = []
    this.quadTree.getAllObjects(objects)

    for (let i = 0; i < objects.length; i++) {
      let obj: any = []
      this.quadTree.findObjects(obj, objects[i])

      for (let j = 0; j < obj.length; j++) {
        // DETECT COLLISION ALGORITHM
        if (objects[i].isCollideAbleWith(obj[j]) &&
          (Math.floor(objects[i].position.x) < Math.floor(obj[j].position.x) + obj[j].width &&
            Math.floor(objects[i].position.x) + objects[i].width > Math.floor(obj[j].position.x) &&
            Math.floor(objects[i].position.y) < Math.floor(obj[j].position.y) + obj[j].height &&
            Math.floor(objects[i].position.y) + objects[i].height > Math.floor(obj[j].position.y))) {
          objects[i].colliding = true
          obj[j].colliding = true
        }
      }
    }
  }
}
