/**
 * Register default game settings here.
 *
 * @author Daniel Peters
 * @version 1.0
 * @type {module.Settings}
 */
import { Actions } from '../../client/application/InputManager'

export class Settings {
  canvasWidth: number
  canvasHeight: number
  keyBoard
  player
  audio

  /**
   * Constructor. Sets default settings.
   */
  constructor () {
    this.canvasWidth = 900
    this.canvasHeight = 480
    this.keyBoard = {
      'w': Actions.UP,
      's': Actions.DOWN,
      'a': Actions.LEFT,
      'd': Actions.RIGHT,
      'space': Actions.JUMP,
      'r': Actions.RESTART
    }
    this.player = {
      maxVelocity: 15,
      fireDelay: 15,
      friction: 0.7,
      acceleration: 3
    }
    this.audio = {
      master: 1,
      ambient: 1,
      effects: 1
    }
  }
}
