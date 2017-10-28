/**
 * Input manager.
 *
 * @author Daniel Peters
 * @version 2.0
 */
export default class InputManager {
  constructor () {
    this.initializeKeyHandler()
    this.initializeTouchHandler()

    // All keystrokes and touch swipes are registered here
    // This object is then sent to the server to process player movement
    this.registeredInputs = {}
  }

  /**
   * Handle keyboard key presses.
   * Only booleans are set to express the movement direction intention
   * This allows the separation of keystrokes from actual movement.
   */
  initializeKeyHandler () {
    window.addEventListener('keydown', event => { this.registeredInputs[event.key] = true }, false)
    window.addEventListener('keyup', event => { this.registeredInputs[event.key] = false }, false)
  }

  /**
   * Maps swipe directions to key press booleans.
   * Allows touch controls on mobile.
   */
  initializeTouchHandler () {
    // Register the event listeners
    window.addEventListener('touchstart', handleTouchStart, false)
    window.addEventListener('touchmove', handleTouchMove, false)
    window.addEventListener('touchend', handleTouchEnd, false)

    let xDown = null
    let yDown = null
    let handlerInstance = this

    function handleTouchStart (evt) {
      // Prevent divide scrolling
      evt.preventDefault()
      xDown = evt.touches[0].clientX
      yDown = evt.touches[0].clientY
    }

    function handleTouchMove (evt) {
      // Prevent divide scrolling
      evt.preventDefault()
      // do nothing if no touch direction is registered
      if (!xDown || !yDown) {
        return
      }

      let xUp = evt.touches[0].clientX
      let yUp = evt.touches[0].clientY

      // Subtract start currently touched location from start location
      let xDiff = xDown - xUp
      let yDiff = yDown - yUp

      // Positive values equals left. Negative values equals right
      if (xDiff > 0) {
        handlerInstance.registeredInputs['a'] = true
      } else {
        handlerInstance.registeredInputs['d'] = true
      }

      // Positive = up. Negative = down
      if (yDiff > 0) {
        handlerInstance.registeredInputs['w'] = true
      } else {
        /* down swipe */
      }
      /* reset values */
      xDown = null
      yDown = null
    }

    function handleTouchEnd (evt) {
      // Prevent divide scrolling
      evt.preventDefault()
      Object.keys(handlerInstance.registeredInputs).forEach(key => { handlerInstance.registeredInputs[key] = false })
    }
  }
}
