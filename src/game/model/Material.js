/**
 * Material class containing texture information. May need some refactoring when sprite sheets are implemented.
 * @type {module.Material}
 */
module.exports = class Material {
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
   * @param {AssetManager} assetManager
   */
  setSprite (assetManager) {
    this.sprite = assetManager.getAsset(this.name)
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
