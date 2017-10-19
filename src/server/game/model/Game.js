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
    this.players = []
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
    if (this.players.length > 0) {
      this.players.forEach(player => player.move(timeDifference))
    }
  }
}
