import Entity from './Entity'
import Block from './Block'
import Vector from './Vector'

/**
 * Created by Daniel on 2017-09-18.
 */
export default class Player extends Entity {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {CollisionBounds} collisionBox
   * @param {Material} material
   */
  constructor (x, y, width, height, material) {
    super(x, y, width, height, material)
    this.lives = 3
    this.speed = 3.6
    this.running = false
    this.jumping = false
    this.grounded = false
    this.history = []
    this.friction = 0.8
    this.gravity = 0.2
  }

  /**
   *
   * @param game
   */
  move (game) {
    if (this.keyActionsRegister['w'] || this.keyActionsRegister[' ']) {
      if (!this.jumping && this.grounded) {
        game.audioManager.playSound('jump')
        this.jumping = true
        this.grounded = false
        this.velocity.y = -this.speed * 2
      }
    }

    if (this.keyActionsRegister['a']) {
      if (this.velocity.x > -this.speed) {
        this.velocity.x--
      }
    }

    if (this.keyActionsRegister['d']) {
      if (this.velocity.x < this.speed) {
        this.velocity.x++
      }
    }
    this.velocity.x *= this.friction
    this.velocity.y += this.gravity

    this.grounded = false

    game.current.blocks.forEach(block => {
      const direction = this.checkCollision(this, block)

      if (direction === 'l' || direction === 'r') {
        this.velocity.x = 0
        this.jumping = false
      } else if (direction === 'b') {
        this.grounded = true
        this.jumping = false
      } else if (direction === 't') {
        this.velocity.y *= -1
      }
    })

    if (this.grounded) {
      this.velocity.y = 0
    }

    this.position.add(this.velocity)
  }

  goBack () {
    if (this.history.length !== 0) {
      this.position.set(this.history[this.history.length - 1])
    }
  }

  gainLife () {
    this.lives += 1
  }

  loseLife () {
    this.lives -= 1
  }

  toggleRun () {
    this.running = !this.running
  }

  checkCollision (player, object) {
    if (object instanceof Block && !object.solid) {
      return
    }

    // get the vectors to check against
    let vX = (player.position.x + (player.width / 2)) - (object.position.x + (object.width / 2))
    let vY = (player.position.y + (player.height / 2)) - (object.position.y + (object.height / 2))
    // add the half widths and half heights of the objects
    let hWidths = (player.width / 2) + (object.width / 2)
    let hHeights = (player.height / 2) + (object.height / 2)
    let colDir = null

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    // figures out on which side we are colliding (top, bottom, left, or right)
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      let oX = hWidths - Math.abs(vX)
      let oY = hHeights - Math.abs(vY)
      if (oX >= oY) {
        if (vY > 0) {
          colDir = 't'
          player.position.y += oY
        } else {
          colDir = 'b'
          player.position.y -= oY
          player.jumping = false
        }
      } else {
        if (vX > 0) {
          colDir = 'l'
          player.position.x += oX
        } else {
          colDir = 'r'
          player.position.x -= oX
        }
      }
    }

    return colDir
  }

  /**
   *
   * @param {Game} game
   */
  checkEdges (game) {
    if (this.position.x > game.canvas.width && game.current.hasRight()) {
      game.current = game.current.right
      this.position.x = game.current.blocks[0].width
    } else if (this.position.x < 0 && game.current.hasLeft()) {
      game.current = game.current.left
      this.position.x = game.canvas.width - game.current.blocks[0].width
    } else if (this.position.y > game.canvas.height) {
      game.current = game.current.bottom
      this.position.y = game.current.blocks[0].height
    } else if (this.position.y < 0) {
      game.current = game.current.top
      this.position.y = game.canvas.height - game.current.blocks[0].height
    }
  }

  drawHearts (game) {
    let pos = new Vector(game.canvas.width - 35, 5)
    for (let i = 0; i < game.player.lives; i++) {
      game.ctx.drawImage(game.assetManager.cache['heart'], pos.x, pos.y, 30, 30)
      pos.x -= 30
    }
  }
}
