/**
 *
 * @type {module.Entity}
 */
const Entity = require('./Entity')
/**
 *
 * @type {module.Item}
 */
const Item = require('./Item')

/**
 * Player class containing player information and objects currently visible to him/her.
 *
 * @author Daniel Peters
 * @version 1.0
 * @type {module.Player}
 */
module.exports = class Player extends Entity {
  /**
   * Constructor. Initializes position and surroundings information.
   *
   * @param {number} x initial x
   * @param {number} y initial y
   * @param {number} width initial width
   * @param {number} height initial height
   * @param {module.Material} material texture and sprite data
   * @param {module.Area} area initial area
   */
  constructor (x, y, width, height, material, area) {
    super(x, y, width, height, material)
    this.lives = 3
    this.coins = 0
    this.jumpHeight = 3.6
    this.speed = 12
    this.running = false
    this.jumping = false
    this.grounded = false
    this.solid = false
    this.registeredInputs = []
    this.friction = 0.8
    this.gravity = 0.2
    // Information about players current surroundings
    this.viewport = {blocks: area.blocks, areaId: area.id}
    // boolean flags to check if player wants to leave from one exit
    this.edges = {
      left: false,
      right: false,
      top: false,
      bottom: false
    }
  }

  /**
   * Players object update method
   *
   * @param {module.Game} game
   * @param {number} timeDifference
   */
  move (game, timeDifference) {
    // Jump on 'w' or space keys pressed
    if (this.registeredInputs['w'] || this.registeredInputs[' ']) {
      // Check if players is not already jumping
      if (!this.jumping && this.grounded) {
        this.jumping = true
        this.grounded = false
        this.velocity.y = -this.jumpHeight * 2
      }
    }

    // Move left on key 'a' pressed
    if (this.registeredInputs['a']) {
      if (this.velocity.x > -this.speed) {
        this.velocity.x--
      }
    }

    // Move right on key 'd' pressed
    if (this.registeredInputs['d']) {
      if (this.velocity.x < this.speed) {
        this.velocity.x++
      }
    }

    // Apply friction and gravity to movement
    this.velocity.x *= this.friction
    this.velocity.y += this.gravity

    this.grounded = false

    // Check collision with blocks
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

    // Set y velocity to 0 when on ground
    if (this.grounded) {
      this.velocity.y = 0
    }

    // add velocity vector to position vector
    this.position.add(this.velocity)

    // Check if player wants to leave current area
    this.checkEdges(game)
  }

  /**
   * Player gain 1 heart.
   */
  gainLife () {
    this.lives += 1
  }

  /**
   * Player loses one heart.
   */
  loseLife () {
    this.lives -= 1
  }

  /**
   * Toggle this players running state.
   */
  toggleRun () {
    this.running = !this.running
  }

  /**
   * Check collision with other game objects.
   *
   * @param object other object
   * @returns {string} string indicating collision direction
   */
  checkCollision (object) {
    if (!(object instanceof Entity) || !object.solid) {
      return ''
    }

    // get the vectors to check against
    let vX = (this.position.x + (this.width / 2)) - (object.position.x + (object.width / 2))
    let vY = (this.position.y + (this.height / 2)) - (object.position.y + (object.height / 2))
    // add the half widths and half heights of the objects
    let hWidths = (this.width / 2) + (object.width / 2)
    let hHeights = (this.height / 2) + (object.height / 2)
    let colDir = ''

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    // figures out on which side we are colliding (top, bottom, left, or right)
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      if (object instanceof Item && object.name === 'coin') {
        console.log('coin')
        this.coins += 1
        this.viewport.blocks.splice(this.viewport.blocks.indexOf(object), 1)
        return ''
      }
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
   * Check if players is at the edge of an area.
   * If yes the player object expresses intent to switch to next area.
   * The switching is handled by Area objects.
   *
   * @param {module.Game} game instance of the game
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
