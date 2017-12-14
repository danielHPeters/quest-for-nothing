import { Rectangle } from './Rectangle'
import { Vector2 } from '../../../lib/Vector2'

export enum AXIS {
  NONE = 'none',
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  BOTH = 'both'
}

export class Camera {
  position: Vector2
  previousPosition: Vector2
  viewWidth: number
  viewHeight: number
  axis: AXIS
  following
  deadZone: Vector2
  viewportRect: Rectangle
  worldRect: Rectangle

  constructor (x, y, viewWidth, viewHeight, worldWidth, worldHeight) {
    // position of camera (left-top coordinate)
    this.position = new Vector2(x, y)
    this.previousPosition = new Vector2(x, y)
    this.deadZone = new Vector2(0, 0)

    // viewport dimensions
    this.viewWidth = viewWidth
    this.viewHeight = viewHeight

    // allow camera to move in vertical and horizontal axis
    this.axis = AXIS.BOTH

    // object that should be followed
    this.following = null

    // rectangle that represents the viewport
    this.viewportRect = new Rectangle(this.position.x, this.position.y, this.viewWidth, this.viewHeight)

    // rectangle that represents the world's boundary (room's boundary)
    this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight)

  }

  /**
   * Object needs to have "x" and "y" properties (as world(or room) position)
   *
   * @param {} following
   * @param xDeadZone
   * @param yDeadZone
   */
  public follow (following, xDeadZone, yDeadZone): void {
    this.following = following
    this.deadZone.set(xDeadZone, yDeadZone)
  }

  public update (): void {
    this.previousPosition.setVector(this.position)
    // keep following the player (or other desired object)
    if (this.following != null) {
      if (this.axis === AXIS.HORIZONTAL || this.axis === AXIS.BOTH) {
        // moves camera on horizontal axis based on followed object position
        if (this.following.position.x - this.position.x + this.deadZone.x > this.viewWidth) {
          this.position.x = this.following.position.x - (this.viewWidth - this.deadZone.x)
        } else if (this.following.position.x - this.deadZone.x < this.position.x) {
          this.position.x = this.following.position.x - this.deadZone.x
        }
      }
      if (this.axis === AXIS.VERTICAL || this.axis === AXIS.BOTH) {
        // moves camera on vertical axis based on followed object position
        if (this.following.position.y - this.position.y + this.deadZone.y > this.viewHeight) {
          this.position.y = this.following.position.y - (this.viewHeight - this.deadZone.y)
        } else if (this.following.position.y - this.deadZone.y < this.position.y) {
          this.position.y = this.following.position.y - this.deadZone.y
        }
      }
    }

    // update viewportRect
    this.viewportRect.set(this.position.x, this.position.y)

    // don't let camera leaves the world's boundary
    if (!this.viewportRect.within(this.worldRect)) {
      if (this.viewportRect.left < this.worldRect.left) {
        this.position.x = this.worldRect.left
      }
      if (this.viewportRect.top < this.worldRect.top) {
        this.position.y = this.worldRect.top
      }
      if (this.viewportRect.right > this.worldRect.right) {
        this.position.x = this.worldRect.right - this.viewWidth
      }
      if (this.viewportRect.bottom > this.worldRect.bottom) {
        this.position.y = this.worldRect.bottom - this.viewHeight
      }
    }
  }
}
