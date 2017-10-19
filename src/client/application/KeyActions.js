/**
 * Keyboard actions definition.
 *
 * @author Daniel Peters
 */
export default class KeyActions {
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
