/**
 * Sprite class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Sprite {
  id: string
  path: string

  /**
   * Constructor. Sets the id and file path of the sprite.
   *
   * @param id Sprite ID
   * @param path Path to sprite
   */
  constructor (id: string, path: string) {
    this.id = id
    this.path = path
  }
}
