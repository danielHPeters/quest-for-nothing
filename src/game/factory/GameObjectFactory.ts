import Block from '../model/Block'
import SpawnPoint from '../model/SpawnPoint'
import Item, { ItemAction } from '../model/Item'
import Player from '../model/Player'
import Area from '../model/Area'

/**
 *  Game entity factory class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class GameObjectFactory {
  /**
   * Get a Block instance.
   *
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param w - Block width
   * @param h - Block height
   * @param type Block type
   * @returns New Block
   */
  static getBlock (x: number, y: number, w: number, h: number, type: string): Block {
    return new Block(x, y, w, h, type)
  }

  /**
   * Get a SpawnPoint instance.
   *
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param w - SpawnPoint width
   * @param h - SpawnPoint height
   * @param area Containing Area
   * @returns Anew SpawnPoint
   */
  static getSpawnPoint (x: number, y: number, w: number, h: number, area: Area): SpawnPoint {
    return new SpawnPoint(x, y, w, h, area)
  }

  /**
   * Get an Item instance.
   *
   * @param x X coordinate
   * @param y Y coordinate
   * @param w Player width
   * @param h Player height
   * @param type Item type
   * @param description Item description
   * @param action Use action
   * @returns New Item
   */
  static getItem (x: number, y: number, h: number, w: number, type: string, description: string, action: ItemAction): Item {
    return new Item(x, y, w, h, type, description, action)
  }

  /**
   * Get a player instance.
   *
   * @param id - Player id
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param w - Player width
   * @param h - Player height
   * @param type Name of texture file
   * @param area Starting area
   * @returns New Player
   */
  static getPlayer (id: string, x: number, y: number, w: number, h: number, type: string, area: Area): Player {
    return new Player(id, x, y, w, h, type, area)
  }
}
