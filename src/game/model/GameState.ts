import { Settings } from './Settings'
import { SpawnPoint } from './SpawnPoint'
import { Player } from './Player'
import { Area } from './Area'
import { Block } from './Block'

/**
 * Game class containing objects and player state.
 *
 * @author Daniel Peters
 * @version 1.2
 * @type {GameState}
 */
export class GameState {
  settings: Settings
  spawnPoint: SpawnPoint
  players: Player[]
  running: boolean
  areas: Area[]
  blocks: Block[]

  /**
   * Constructor. Requires default settings to calculate size of objects etc.
   *
   * @param {module.Settings} settings
   */
  constructor (settings: Settings) {
    this.settings = settings
    this.spawnPoint = null
    this.players = []
    this.running = false
    this.areas = []
    this.blocks = []
  }

  /**
   * Update all game objects
   *
   * @param {number} timeDifference
   */
  public update (timeDifference: number): void {
    this.players.forEach(player => player.move(this, timeDifference))
    this.areas.forEach(area => area.checkPlayers())
  }
}
