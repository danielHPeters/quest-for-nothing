import Block from './Block'
import Player from './Player'

/**
 * Area / Room definition.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Area {
  id: string
  blocks: Block[]
  players: Player[]
  top: Area
  bottom: Area
  left: Area
  right: Area

  /**
   * Constructor sets id. Exits can be set optionally.
   *
   * @param id Identification of area
   * @param left Left exit
   * @param right Right exit
   * @param top Top exit
   * @param bottom Bottom exit
   */
  constructor (id: string, left: Area = null, right: Area = null, top: Area = null, bottom: Area = null) {
    this.id = id
    this.top = top
    this.bottom = bottom
    this.left = left
    this.right = right
    this.blocks = []
    this.players = []
  }

  /**
   * Check if player wants to leave area. If yes then remove him/her from this area and put it in the
   * desired area.
   */
  checkPlayers (): void {
    this.players.forEach(player => {
      if (player.edges.left && this.hasLeft()) {
        player.edges.left = false
        this.left.add(player)
        this.remove(player)
      } else if (player.edges.right && this.hasRight()) {
        player.edges.right = false
        this.right.add(player)
        this.remove(player)
      } else if (player.edges.bottom && this.hasBottom()) {
        player.edges.bottom = false
        this.bottom.add(player)
        this.remove(player)
      } else if (player.edges.top && this.hasTop()) {
        player.edges.top = false
        this.top.add(player)
        this.remove(player)
      }
    })
  }

  /**
   * Register player int this area.
   * Sets the players viewport to render blocks in this area.
   * The area id is set to hide players who are not in the same room from each other.
   *
   * @param player Player object
   */
  add (player: Player): void {
    this.players.push(player)
    player.viewport.blocks = this.blocks
    player.viewport.areaId = this.id
  }

  /**
   * Remove player from this area when he/she enters another area.
   * @param player Player object
   */
  remove (player: Player): void {
    this.players = this.players.filter(item => item !== player)
  }

  /**
   * Check if the area has a left exit.
   *
   * @returns True if exit not null
   */
  hasLeft (): boolean {
    return this.left !== null
  }

  /**
   * Check if the area has a right exit.
   *
   * @returns True if exit not null
   */
  hasRight (): boolean {
    return this.right !== null
  }

  /**
   * Check if the area has a top exit.
   *
   * @returns True if exit not null
   */
  hasTop (): boolean {
    return this.top !== null
  }

  /**
   * Check if the area has a bottom exit.
   *
   * @returns True if exit not null
   */
  hasBottom (): boolean {
    return this.bottom !== null
  }
}
