import SpriteSheet from './SpriteSheet'

/**
 * Implements sprite animation using sprite sheet.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Animation {
  private spriteSheet: SpriteSheet
  private speed: number
  private sequence: number[]
  private currentFrame: number
  private counter: number
  private offsetBottom: number

  /**
   * Constructor Sets all animation data.
   *
   * @param spriteSheet corresponding sprite sheet
   * @param speed Animation speed
   * @param start Animation start frame
   * @param end Animation end frame
   * @param offsetBottom Drawing offset at the bottom of source image
   */
  constructor (spriteSheet: SpriteSheet, speed: number, start: number, end: number, offsetBottom: number = 0) {
    this.spriteSheet = spriteSheet
    this.speed = speed
    this.sequence = []
    this.currentFrame = 0
    this.counter = 0
    this.offsetBottom = offsetBottom

    // Initialize sequence.
    for (let frame = start; frame <= end; frame++) {
      this.sequence.push(frame)
    }
  }

  /**
   * Update animation frames.
   */
  update (): void {
    if (this.counter === (this.speed - 1)) {
      this.currentFrame = (this.currentFrame + 1) % this.sequence.length
    }
    this.counter = (this.counter + 1) % this.speed
  }

  /**
   * Draw current frame.
   *
   * @param ctx Canvas context
   * @param x X Coordinate
   * @param y Y Coordinate
   * @param width Display width
   * @param height Display height
   */
  public draw (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    const row = Math.floor(this.sequence[this.currentFrame] / this.spriteSheet.framesPerRow)
    const col = Math.floor(this.sequence[this.currentFrame] % this.spriteSheet.framesPerRow)

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
