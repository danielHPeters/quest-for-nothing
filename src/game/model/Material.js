/**
 * Material class containing texture information. May need some refactoring when sprite sheets are implemented.
 *
 * @author Daniel Peters
 * @version 1.0
 * @type {module.Material}
 */
module.exports = class Material {
  /**
   * Constructor. Sets resource name and initializes sprite to null.
   *
   * @param {string} resource name of the resource.
   */
  constructor (resource) {
    this.name = resource
    this.sprite = null
  }
}
