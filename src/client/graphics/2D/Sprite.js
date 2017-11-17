export default class Sprite {
  /**
   * Constructor. Sets the id and file path of the sprite.
   *
   * @param {string} id
   * @param {string} path
   */
  constructor (id, path) {
    this._id = id
    this._path = path
  }

  /**
   * Get sprite id.
   *
   * @returns {string} sprite id
   */
  get id () {
    return this._id
  }

  /**
   * Set sprite id.
   *
   * @param {string} id sprite id
   */
  set id (id) {
    if (typeof id !== 'string') {
      throw new Error('Param id must be of type number!')
    }
    this._id = id
  }

  /**
   * Get sprite file path.
   *
   * @returns {string} sprite file path
   */
  get path () {
    return this._path
  }

  /**
   * Set sprite file path.
   *
   * @param {string} path sprite file path
   */
  set path (path) {
    if (typeof path !== 'string') {
      throw new Error('Param path must be of type number!')
    }
    this._path = path
  }
}
