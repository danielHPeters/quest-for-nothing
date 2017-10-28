/**
 * Sprite sheet definition.
 */
export default class SpriteSheet {
  /**
   * Constructor. Sets frame dimensions and calculates number of frames.
   * @param sourcePath
   * @param frameWidth
   * @param frameHeight
   */
  constructor (sourcePath, frameWidth, frameHeight) {
    this.image = new Image()
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight

    this.image.addEventListener('load', () => {
      this.framesPerRow = Math.floor(this.image.width / this.frameWidth)
    })

    this.image.src = sourcePath
  }
}
