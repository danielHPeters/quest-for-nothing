/**
 *
 * @type {module.Game}
 */
module.exports = class Game {
  /**
   *
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
   *
   * @param {number} timeDifference
   */
  update (timeDifference) {
    Object.keys(this.players).forEach(key => this.players[key].move(this, timeDifference))
    this.areas.forEach(area => area.checkPlayers())
  }
}
