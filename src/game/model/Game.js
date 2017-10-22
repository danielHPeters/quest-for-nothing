/**
 * Game class containing objects and player state.
 *
 * @author Daniel Peters
 * @version 1.2
 * @type {module.Game}
 */
module.exports = class Game {
  /**
   * Constructor. Requires default settings to calculate size of objects etc.
   * @param {module.Settings} settings
   */
  constructor (settings) {
    this.settings = settings
    this.spawnPoint = null
    this.players = {}
    this.running = false
    this.areas = []
    this.blocks = []
  }

  run () {
    this.running = true
  }

  pause () {
    this.running = false
  }

  /**
   * Update all game objects
   * @param {number} timeDifference
   */
  update (timeDifference) {
    Object.keys(this.players).forEach(key => this.players[key].move(this, timeDifference))
    this.areas.forEach(area => area.checkPlayers())
  }
}
