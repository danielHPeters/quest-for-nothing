/**
 * Created by Daniel on 2017-09-18.
 */
export default class KeyboardEventHandler {
  constructor () {
    this.initializeKeyHandler()
    this.keyActionsRegister = {}
  }

  initializeKeyHandler () {
    window.addEventListener('keydown', event => { this.keyActionsRegister[event.key] = true })
    window.addEventListener('keyup', event => { this.keyActionsRegister[event.key] = false })
  }

  getKeyActionsRegister () {
    return this.keyActionsRegister
  }
}
