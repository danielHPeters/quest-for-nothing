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
    this._image = new Image()
    this._image.addEventListener('load', () => {
      this._framesPerRow = Math.floor(this._image.width / this._frameWidth)
    })
    this._image.src = sourcePath
    this._sourcePath = sourcePath
    this._frameWidth = frameWidth
    this._frameHeight = frameHeight
  }

  /**
   *
   * @returns {string}
   */
  get sourcePath () {
    return this._sourcePath
  }

  /**
   *
   * @param {string} sourcePath
   */
  set sourcePath (sourcePath) {
    if (typeof sourcePath !== 'string') {
      throw new Error('Param sourcePath must be of type number!')
    }
    this._sourcePath = sourcePath
  }

  /**
   *
   * @returns {number}
   */
  get frameWidth () {
    return this._frameWidth
  }

  /**
   *
   * @param {number} frameWidth
   */
  set frameWidth (frameWidth) {
    if (typeof frameWidth !== 'number') {
      throw new Error('Param frameWidth must be of type number!')
    }
    this._frameWidth = frameWidth
  }

  /**
   *
   * @returns {number}
   */
  get frameHeight () {
    return this._frameHeight
  }

  /**
   *
   * @param {number} frameHeight
   */
  set frameHeight (frameHeight) {
    if (typeof frameHeight !== 'number') {
      throw new Error('Param frameHeight must be of type number!')
    }
    this._frameHeight = frameHeight
  }

  /**
   *
   * @returns {Image}
   */
  get image () {
    return this._image
  }

  /**
   *
   * @param {Image} image
   */
  set image (image) {
    if (!(image instanceof Image)) {
      throw new Error('Param image must be of type Image!')
    }
    this._image = image
  }

  /**
   *
   * @returns {number}
   */
  get framesPerRow () {
    return this._framesPerRow
  }

  /**
   *
   * @param {number} framesPerRow
   */
  set framesPerRow (framesPerRow) {
    this._framesPerRow = framesPerRow
  }
}
