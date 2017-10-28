/**
 * Implements sprite animation using sprite sheet.
 *
 * @author Daniel Peters
 * @version 0.3
 */
export default class Animation {
  /**
   * Constructor Sets all animation data.
   *
   * @param {SpriteSheet} spriteSheet corresponding sprite sheet
   * @param {number} speed animation speed
   * @param {number} start animation start frame
   * @param {number} end animation end frame
   * @param {number} offsetBottom drawing offset at the bottom of source image
   */
  constructor (spriteSheet, speed, start, end, offsetBottom = 0) {
    this.spriteSheet = spriteSheet
    this.speed = speed
    this.sequence = []
    this.currentFrame = 0
    this.counter = 0
    this.offsetBottom = offsetBottom

    for (let frame = start; frame <= end; frame++) {
      this.sequence.push(frame)
    }
  }

  /**
   * Update animation frames.
   */
  update () {
    if (this.counter === (this.speed - 1)) {
      this.currentFrame = (this.currentFrame + 1) % this.sequence.length
    }
    this.counter = (this.counter + 1) % this.speed
  }

  /**
   * Draw current frame
   * @param ctx canvas context
   * @param x location x
   * @param y location y
   * @param width display width
   * @param height display height
   */
  draw (ctx, x, y, width, height) {
    let row = Math.floor(this.sequence[this.currentFrame] / this.spriteSheet.framesPerRow)
    let col = Math.floor(this.sequence[this.currentFrame] % this.spriteSheet.framesPerRow)
    ctx.drawImage(
      this.spriteSheet.image,
      col * this.spriteSheet.frameWidth,
      row * this.spriteSheet.frameHeight,
      this.spriteSheet.frameWidth,
      this.spriteSheet.frameHeight - this.offsetBottom,
      x,
      y,
      width,
      height
    )
  }
}
