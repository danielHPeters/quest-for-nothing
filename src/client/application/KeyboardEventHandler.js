/**
 * Created by Daniel on 2017-09-18.
 */
export default class KeyboardEventHandler {
  /**
   *
   * @param canvas
   */
  constructor (canvas) {
    this.game = canvas
    this.initializeKeyHandler()
    this.keyActionsRegister = {}
  }

  initializeKeyHandler () {
    this.game.addEventListener('keydown', event => { this.keyActionsRegister[event.key] = true })
    this.game.addEventListener('keyup', event => { this.keyActionsRegister[event.key] = false })
  }

  getKeyActionsRegister () {
    return this.keyActionsRegister
  }
}
