import { Settings } from './model/Settings'
import { GameObjectFactory } from './factory/GameObjectFactory'
import { GameState } from './model/GameState'
import { LevelLoader } from './factory/LevelLoader'

/**
 * Main class of the JumpAndRun game.
 *
 * @type {JumpAndRun}
 */
export class JumpAndRun {
  private settings: Settings
  private state: GameState
  private levelLoader: LevelLoader
  /**
   * Constructor initializes the game state.
   */
  constructor () {
    this.settings = new Settings()
    this.state = new GameState(this.settings)
    this.levelLoader = new LevelLoader('./../../levels/')
    this.levelLoader.loadLevel(this.state, 'default')
  }

  /**
   * Add a new Player.
   *
   * @param playerId id of the player
   */
  addPlayer (playerId) {
    if (!this.state.players.find(player => { return player.id === playerId })) {
      let player = GameObjectFactory.getPlayer(
        playerId,
        this.state.spawnPoint.position.x,
        this.state.spawnPoint.position.y,
        this.state.spawnPoint.width,
        this.state.spawnPoint.height,
        'player',
        this.state.spawnPoint.area
      )
      this.state.players.push(player)
      this.state.spawnPoint.area.add(player)
    }
  }

  /**
   * Remove player from game by id.
   *
   * @param {string} playerId player id
   */
  removePlayer (playerId) {
    this.state.players = this.state.players.filter(player => { return player.id !== playerId })
  }

  /**
   * Register player action to game state.
   *
   * @param playerId id of the player to be updated
   * @param actions player input
   */
  registerPlayerAction (playerId, actions) {
    this.state.players.find(player => { return player.id === playerId }).registeredInputs = actions
  }

  /**
   * Main game loop.
   *
   * @param callback function that sends game state data to destination
   */
  run (callback) {
    let lastUpdateTime = (new Date()).getTime()
    setInterval(() => {
      let currentTime = (new Date()).getTime()
      let timeDifference = currentTime - lastUpdateTime
      this.state.update(timeDifference)
      lastUpdateTime = currentTime
      callback(this.state.players)
    }, 1000 / 60)
  }
}
