/**
 *
 * @type {module.Entity}
 */
let Entity = require('./Entity')

/**
 *
 * @type {module.Player}
 */
module.exports = class Player extends Entity {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {Material} material
   * @param {Area} initialArea
   */
  constructor (x, y, width, height, material, initialArea) {
    super(x, y, width, height, material)
    this.lives = 3
    this.speed = 3.6
    this.running = false
    this.jumping = false
    this.grounded = false
    this.solid = true
    this.history = {}
    this.keyActionsRegister = []
    this.friction = 0.8
    this.gravity = 0.2
    this.viewport = {blocks: initialArea.blocks, areaId: initialArea.id}
    this.edges = {
      left: false,
      right: false,
      top: false,
      bottom: false
    }
  }

  /**
   *
   * @param {module.Game} game
   * @param {number} timeDifference
   */
  move (game, timeDifference) {
    if (this.keyActionsRegister['w'] || this.keyActionsRegister[' ']) {
      if (!this.jumping && this.grounded) {
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

    this.viewport.blocks.forEach(block => {
      const direction = this.checkCollision(block)

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

    this.checkEdges(game)
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

  checkCollision (object) {
    if (!(object instanceof Entity) || !object.solid) {
      return
    }

    // get the vectors to check against
    let vX = (this.position.x + (this.width / 2)) - (object.position.x + (object.width / 2))
    let vY = (this.position.y + (this.height / 2)) - (object.position.y + (object.height / 2))
    // add the half widths and half heights of the objects
    let hWidths = (this.width / 2) + (object.width / 2)
    let hHeights = (this.height / 2) + (object.height / 2)
    let colDir = null

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    // figures out on which side we are colliding (top, bottom, left, or right)
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      let oX = hWidths - Math.abs(vX)
      let oY = hHeights - Math.abs(vY)
      if (oX >= oY) {
        if (vY > 0) {
          colDir = 't'
          this.position.y += oY
        } else {
          colDir = 'b'
          this.position.y -= oY
          this.jumping = false
        }
      } else {
        if (vX > 0) {
          colDir = 'l'
          this.position.x += oX
        } else {
          colDir = 'r'
          this.position.x -= oX
        }
      }
    }

    return colDir
  }

  /**
   *
   * @param {module.Game} game
   */
  checkEdges (game) {
    if (this.position.x > game.settings.canvasWidth) {
      this.edges.right = true
      this.position.x = this.viewport.blocks[0].width
    } else if (this.position.x < 0) {
      this.edges.left = true
      this.position.x = game.settings.canvasWidth - this.viewport.blocks[0].width
    } else if (this.position.y > game.settings.canvasHeight) {
      this.edges.bottom = true
      this.position.y = this.viewport.blocks[0].height
    } else if (this.position.y < 0) {
      this.edges.top = true
      this.position.y = game.settings.canvasHeight - this.viewport.blocks[0].height
    }
  }
}
