import Entity from './Entity'
import Item from './Item'
import GameState from './GameState'
import { Actions } from '../../client/application/InputManager'
import Area from './Area'
import Block from './Block'

export interface Edges {
  left: boolean
  right: boolean
  top: boolean
  bottom: boolean
}

export interface ViewPort {
  blocks: Block[]
  areaId: string
}

/**
 * Player class containing player information and objects currently visible to him/her.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Player extends Entity {
  id: string
  lives: number
  coins: number
  jumpHeight: number
  speed: number
  running: boolean
  jumping: boolean
  grounded: boolean
  solid: boolean
  registeredInputs
  friction: number
  gravity: number
  viewport: ViewPort
  edges: Edges

  /**
   * Constructor. Initializes position and surroundings information.
   *
   * @param id player id
   * @param x initial x
   * @param y initial y
   * @param width initial width
   * @param height initial height
   * @param type texture and sprite data
   * @param area initial area
   */
  constructor (id: string, x: number, y: number, width: number, height: number, type: string, area: Area) {
    super(x, y, width, height, type)

    this.id = id
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
    this.viewport = { blocks: area.blocks, areaId: area.id }
    // boolean flags to check if player wants to leave from one exit
    this.edges = {
      left: false,
      right: false,
      top: false,
      bottom: false
    }
  }

  /**
   * Players object update method.
   *
   * @param game
   * @param timeDifference
   */
  move (game: GameState, timeDifference: number): void {
    // Jump on 'w' or space keys pressed
    if (this.registeredInputs[Actions.UP] || this.registeredInputs[Actions.JUMP]) {
      // Check if players is not already jumping
      if (!this.jumping && this.grounded) {
        this.jumping = true
        this.grounded = false
        this.velocity.y = -this.jumpHeight * 2
      }
    }

    // Move left on key 'a' pressed
    if (this.registeredInputs[Actions.LEFT]) {
      if (this.velocity.x > -this.speed) {
        this.velocity.x--
      }
    }

    // Move right on key 'd' pressed
    if (this.registeredInputs[Actions.RIGHT]) {
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
    this.position.addVector(this.velocity)

    // Check if player wants to leave current area
    this.checkEdges(game)
  }

  /**
   * Player gain 1 heart.
   */
  gainLife (): void {
    this.lives += 1
  }

  /**
   * Player loses one heart.
   */
  loseLife (): void {
    this.lives -= 1
  }

  /**
   * Toggle this players running state.
   */
  toggleRun (): void {
    this.running = !this.running
  }

  /**
   * Check collision with other game objects.
   *
   * @param object Other object
   * @returns String indicating collision direction
   */
  checkCollision (object): string {
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
      if (object instanceof Item && object.type === 'coin') {
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
   * @param game Instance of the game
   */
  checkEdges (game: GameState) {
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
