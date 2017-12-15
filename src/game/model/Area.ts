import { Block } from './Block'
import { Player } from './Player'

/**
 * Area / Room definition.
 * @type {Area}
 */
export class Area {
  private _id: string
  private _blocks: Block[]
  private _players: Player[]
  private _top: Area
  private _bottom: Area
  private _left: Area
  private _right: Area

  /**
   * Constructor sets id. Exits can be set optionally.
   *
   * @param {string} id identification of area
   * @param {Area} left left exit
   * @param {Area} right right exit
   * @param {Area} top top exit
   * @param {Area} bottom bottom exit
   */
  constructor (id, left = null, right = null, top = null, bottom = null) {
    this._id = id
    this.top = top
    this.bottom = bottom
    this.left = left
    this.right = right
    this._blocks = []
    this._players = []
  }

  /**
   * Check if player wants to leave area. If yes then remove him/her from this area and put it in the
   * desired area.
   */
  checkPlayers () {
    this._players.forEach(player => {
      if (player.edges.left && this.hasLeft()) {
        player.edges.left = false
        this._left.add(player)
        this.remove(player)
      } else if (player.edges.right && this.hasRight()) {
        player.edges.right = false
        this._right.add(player)
        this.remove(player)
      } else if (player.edges.bottom && this.hasBottom()) {
        player.edges.bottom = false
        this._bottom.add(player)
        this.remove(player)
      } else if (player.edges.top && this.hasTop()) {
        player.edges.top = false
        this._top.add(player)
        this.remove(player)
      }
    })
  }

  get id (): string {
    return this._id
  }

  set id (value: string) {
    this._id = value
  }

  get blocks (): Block[] {
    return this._blocks
  }

  set blocks (value: Block[]) {
    this._blocks = value
  }

  get players (): Player[] {
    return this._players
  }

  set players (value: Player[]) {
    this._players = value
  }

  set left (left) {
    if (!(left instanceof Area || left === null)) {
      throw new Error('"left" must be an instance of Area or null.')
    }
    this._left = left
  }

  set right (right) {
    if (!(right instanceof Area || right === null)) {
      throw new Error('"right" must be an instance of Area or null.')
    }
    this._right = right
  }

  set top (top) {
    if (!(top instanceof Area || top === null)) {
      throw new Error('"top" must be an instance of Area or null.')
    }
    this._top = top
  }

  set bottom (bottom) {
    if (!(bottom instanceof Area || bottom === null)) {
      throw new Error('"bottom" must be an instance of Area or null.')
    }
    this._bottom = bottom
  }

  get left () {
    return this._left
  }

  get right () {
    return this._right
  }

  get top () {
    return this._top
  }

  get bottom () {
    return this._bottom
  }

  /**
   * Register player int this area.
   * Sets the players viewport to render blocks in this area
   * The area id is set to hide players who are not in the same room from each other
   * @param {Player} player
   */
  add (player: Player) {
    this._players.push(player)
    player.viewport.blocks = this._blocks
    player.viewport.areaId = this._id
  }

  /**
   * Remove player from this area when he/she enters another area
   * @param player
   */
  remove (player) {
    // let index = this.players.indexOf(player)
    this._players = this._players.filter(item => item !== player)
  }

  /**
   * Check if the area has a left exit.
   *
   * @returns {boolean} true if exit not null
   */
  hasLeft () {
    return this.left !== null
  }

  /**
   * Check if the area has a right exit.
   *
   * @returns {boolean} true if exit not null
   */
  hasRight () {
    return this._right !== null
  }

  /**
   * Check if the area has a top exit.
   *
   * @returns {boolean} true if exit not null
   */
  hasTop () {
    return this._top !== null
  }

  /**
   * Check if the area has a bottom exit.
   *
   * @returns {boolean} true if exit not null
   */
  hasBottom () {
    return this._bottom !== null
  }
}
