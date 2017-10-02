/**
 * Created by Daniel on 2017-09-18.
 */
class KeyActions {

  /**
   *
   * @param {Game} game
   */
  constructor (game) {
    this.game = game
  }

  enterAction () {

  }

  shiftAction () {
    this.game.player.toggleRun()
  }

  escapeAction () {

  }

  keyPAction () {
    if (this.game.running) {
      this.game.pause()
    } else {
      this.game.run()
    }
  }

}