/**
 * Sprite sheet definition.
 */
export class SpriteSheet {
  private _image
  private _frameWidth
  private _frameHeight
  private _framesPerRow

  /**
   * Constructor. Sets frame dimensions and calculates number of frames.
   *
   * @param image
   * @param frameWidth
   * @param frameHeight
   */
  constructor (image: HTMLImageElement, frameWidth, frameHeight) {
    this._image = image
    this._frameWidth = frameWidth
    this._frameHeight = frameHeight
    this._framesPerRow = Math.floor(this._image.width / this._frameWidth)
  }

  /**
   *
   * @returns {Image}
   */
  get image (): HTMLImageElement {
    return this._image
  }

  /**
   *
   * @param {Image} image
   */
  set image (image: HTMLImageElement) {
    if (!(image instanceof Image)) {
      throw new Error('Param tileSetImage must be of type Image!')
    }
    this._image = image
  }

  /**
   *
   * @returns {number}
   */
  get frameWidth (): number {
    return this._frameWidth
  }

  /**
   *
   * @param {number} frameWidth
   */
  set frameWidth (frameWidth: number) {
    this._frameWidth = frameWidth
  }

  /**
   *
   * @returns {number}
   */
  get frameHeight (): number {
    return this._frameHeight
  }

  /**
   *
   * @param {number} frameHeight
   */
  set frameHeight (frameHeight: number) {
    this._frameHeight = frameHeight
  }

  /**
   *
   * @returns {number}
   */
  get framesPerRow (): number {
    return this._framesPerRow
  }

  /**
   *
   * @param {number} framesPerRow
   */
  set framesPerRow (framesPerRow: number) {
    this._framesPerRow = framesPerRow
  }
}
