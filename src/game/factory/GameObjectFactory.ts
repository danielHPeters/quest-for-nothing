import { Block } from '../model/Block'
import { SpawnPoint } from '../model/SpawnPoint'
import { Item } from '../model/Item'
import { Player } from '../model/Player'
import { Area } from '../model/Area'

/**
 *
 * @type {GameObjectFactory}
 */
export class GameObjectFactory {
  /**
   * Get a Block instance.
   * @param {number} x - x position
   * @param {number} y - y position
   * @param {number} w - block width
   * @param {number} h - block height
   * @param {string} type block type
   * @returns {Block} new Block
   */
  static getBlock (x: number, y: number, w: number, h: number, type: string): Block {
    return new Block(x, y, w, h, type)
  }

  /**
   * Get a SpawnPoint instance.
   * @param {number} x - x position
   * @param {number} y - y position
   * @param {number} w - spawn point width
   * @param {number} h - spawn point height
   * @param {Area} area containing Area
   * @returns {SpawnPoint} new SpawnPoint
   */
  static getSpawnPoint (x: number, y: number, w: number, h: number, area: Area): SpawnPoint {
    return new SpawnPoint(x, y, w, h, area)
  }

  /**
   * Get an Item instance.
   *
   * @param {number} x - x position
   * @param {number} y - y position
   * @param {number} w - player width
   * @param {number} h - player height
   * @param {string} type item type
   * @param {string} description item description
   * @param {function} action us action
   * @returns {Item} new Item
   */
  static getItem (x: number, y: number, h: number, w: number, type: string, description: string, action): Item {
    return new Item(x, y, w, h, type, description, action)
  }

  /**
   * Get a player instance.
   * @param {string} id - player id
   * @param {number} x - x position
   * @param {number} y - y position
   * @param {number} w - player width
   * @param {number} h - player height
   * @param {string} type name of texture file
   * @param {Area} area starting area
   * @returns {Player} new Player
   */
  static getPlayer (id: string, x: number, y: number, w: number, h: number, type: string, area: Area): Player {
    return new Player(id, x, y, w, h, type, area)
  }
}
