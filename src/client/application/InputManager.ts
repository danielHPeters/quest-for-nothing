import { Observable } from '../../lib/observer/Observable'
import { Settings } from '../../game/model/Settings'

export enum Actions {
  UP = 'UP', DOWN = 'DOWN', LEFT = 'LEFT', RIGHT = 'RIGHT', SHOOT = 'SHOOT', RESTART = 'RESTART', JUMP = 'JUMP'
}

/**
 *
 */
export class InputManager extends Observable {
  inputMap
  touches

  /**
   *
   */
  constructor (settings: Settings) {
    super()
    this.inputMap = settings.keyBoard
    this.init()
    this.initializeTouchHandler()
    this.touches = {
      start: [],
      move: []
    }
  }

  /**
   * Register pressed keys and notify observers.
   */
  init (): void {
    window.addEventListener('keydown', event => {
      let key = event.key !== ' ' ? event.key : 'space'
      this.state[this.inputMap[key]] = true
      this.notify()
    })
    window.addEventListener('keyup', event => {
      let key = event.key !== ' ' ? event.key : 'space'
      this.state[this.inputMap[key]] = false
      this.notify()
    })
  }

  /**
   * Maps swipe directions to key press booleans.
   * Allows touch controls on mobile.
   */
  initializeTouchHandler (): void {
    // Register the event listeners
    let button = document.getElementById('move')
    let el = button ? button : window
    el.addEventListener('touchstart', handleTouchStart, false)
    el.addEventListener('touchmove', handleTouchMove, false)
    el.addEventListener('touchend', handleTouchEnd, false)
    el.addEventListener('contextmenu', event => {
      event.preventDefault()
      return false
    })

    let start = []
    let move = []
    let touchstartX = 0
    let touchstartY = 0
    let toucheMoveX = 0
    let touchMoveY = 0
    let thisInstance = this

    function handleTouchStart (evt): void {
      evt.preventDefault()
      start = evt.touches
      touchstartX = evt.touches[0].pageX
      touchstartY = evt.touches[0].pageY
    }

    function handleTouchMove (evt): void {
      thisInstance.reset()
      evt.preventDefault()
      move = evt.changedTouches
      toucheMoveX = evt.touches[0].pageX
      touchMoveY = evt.touches[0].pageY
      for (let i = 0; i < evt.touches.length; i++) {
        // Positive values equals left. Negative values equals right
        if (move[i].pageX < start[i].pageX) {
          thisInstance.state[thisInstance.inputMap['a']] = true
        }
        if (move[i].pageX > start[i].pageX) {
          thisInstance.state[thisInstance.inputMap['d']] = true
        }
        if (move[i].pageY < start[i].pageY) {
          thisInstance.state[thisInstance.inputMap['w']] = true
        }
        if (move[i].pageY > start[i].pageY) {
          thisInstance.state[thisInstance.inputMap['s']] = true
        }
        thisInstance.notify()
      }
    }

    function handleTouchEnd (evt): void {
      evt.preventDefault()
      thisInstance.reset()
    }
  }

  shoot (): void {
    this.state[this.inputMap['space']] = true
  }

  cancelShoot (): void {
    this.state[this.inputMap['space']] = false
  }

  reset (): void {
    this.state[this.inputMap['w']] = false
    this.state[this.inputMap['a']] = false
    this.state[this.inputMap['s']] = false
    this.state[this.inputMap['d']] = false
  }
}
