/**
 * Created by Daniel on 2017-09-18.
 */
export default class Material {
  /**
   *
   * @param {string} resource
   */
  constructor (resource) {
    this.name = resource
    this.sprite = null
  }

  /**
   *
   * @param {Image} sprite
   */
  setSprite (sprite) {
    this.sprite = sprite
  }

  /**
   *
   * @returns {Image | null}
   */
  getSprite () {
    return this.sprite
  }

  getName () {
    return this.name
  }
}
