/**
 * Sprite sheet definition.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class SpriteSheet {
  image: HTMLImageElement
  frameWidth: number
  frameHeight: number
  framesPerRow: number

  /**
   * Constructor. Sets frame dimensions and calculates number of frames.
   *
   * @param image SpriteSheet image
   * @param frameWidth Width of a single frame
   * @param frameHeight Height of a single frame
   */
  constructor (image: HTMLImageElement, frameWidth: number, frameHeight: number) {
    this.image = image
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.framesPerRow = Math.floor(this.image.width / this.frameWidth)
  }
}
