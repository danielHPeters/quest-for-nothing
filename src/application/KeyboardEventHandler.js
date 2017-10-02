/**
 * Created by Daniel on 2017-09-18.
 */
export default class KeyboardEventHandler {
  /**
   *
   * @param canvas
   */
  constructor (canvas) {
    this.canvas = canvas
    this.initializeKeyHandler()
    this.keyActionsRegister = []
  }

  initializeKeyHandler () {
    this.canvas.addEventListener('keydown', event => { this.keyActionsRegister[event.key] = true })
    this.canvas.addEventListener('keyup', event => { this.keyActionsRegister[event.key] = false })
  }

  getKeyActionsRegister () {
    return this.keyActionsRegister
  }
}
