export class Sprite {
  private _id: string
  private _path: string

  /**
   * Constructor. Sets the id and file path of the sprite.
   *
   * @param {string} id
   * @param {string} path
   */
  constructor (id: string, path: string) {
    this._id = id
    this._path = path
  }

  /**
   * Get sprite id.
   *
   * @returns {string} sprite id
   */
  get id (): string {
    return this._id
  }

  /**
   * Set sprite id.
   *
   * @param {string} id sprite id
   */
  set id (id: string) {
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
  get path (): string {
    return this._path
  }

  /**
   * Set sprite file path.
   *
   * @param {string} path sprite file path
   */
  set path (path: string) {
    if (typeof path !== 'string') {
      throw new Error('Param path must be of type number!')
    }
    this._path = path
  }
}
