const Vector2 = require('./../../../lib/Vector2')
export default class Camera {
  constructor (x, y, width, height) {
    this.postition = new Vector2(x, y)
    this.velocity = new Vector2(0, 0)
    this.width = width
    this.height = height
    this.speed = 256
  }

  move (delta, x, y) {
    this.velocity.set(x, y)
    this.velocity.multiply(this.speed * delta)
    this.postition.add(this.velocity)
  }
}
