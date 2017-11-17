'use strict'

/**
 *
 * @type {module.GameState}
 */
const GameState = require('./model/GameState')

/**
 *
 * @type {module.Settings}
 */
const Settings = require('./model/Settings')

/**
 *
 * @type {module.LevelLoader}
 */
const LevelLoader = require('./factory/LevelLoader')

/**
 *
 * @type {module.GameObjectFactory}
 */
const GameObjectFactory = require('./factory/GameObjectFactory')
/**
 *
 * @type {module.JumpAndRun}
 */
module.exports = class JumpAndRun {
  constructor () {
    this.settings = new Settings()
    this.state = new GameState(this.settings)
    this.levelLoader = new LevelLoader('./../../levels/')
    this.levelLoader.loadLevel(this.state, 'newLevel')
  }

  addPlayer (playerId) {
    let player = GameObjectFactory.getPlayer(
      this.state.spawnPoint.position.x,
      this.state.spawnPoint.position.y,
      this.state.spawnPoint.width,
      this.state.spawnPoint.height,
      'player',
      this.state.spawnPoint.area.blocks
    )
    // Currently player is identified via socket id. TODO set a unique player name to identify player
    // player.name = 'Player'
    this.state.players[playerId] = player
    this.state.spawnPoint.area.add(player)

    console.log('Player connected')
  }

  removePlayer (playerId) {
    delete this.state.players[playerId]
  }

  registerPlayerAction (playerId, actions) {
    this.state.players[playerId].registeredInputs = actions
  }

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
