/**
 * Game class containing objects and player state.
 *
 * @author Daniel Peters
 * @version 1.2
 * @type {module.GameState}
 */
module.exports = class GameState {
  /**
   * Constructor. Requires default settings to calculate size of objects etc.
   * @param {module.Settings} settings
   */
  constructor (settings) {
    this.settings = settings
    this.spawnPoint = null
    this.players = []
    this.running = false
    this.areas = []
    this.blocks = []
  }

  /**
   * Update all game objects
   * @param {number} timeDifference
   */
  update (timeDifference) {
    this.players.forEach(player => player.move(this, timeDifference))
    this.areas.forEach(area => area.checkPlayers())
  }
}
