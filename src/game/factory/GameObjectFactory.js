/**
 *
 * @type {module.Block}
 */
const Block = require('./../model/Block')
/**
 *
 * @type {module.SpawnPoint}
 */
const SpawnPoint = require('./../model/SpawnPoint')
/**
 *
 * @type {module.Material}
 */
const Material = require('./../model/Material')

/**
 *
 * @type {module.Item}
 */
const Item = require('./../model/Item')

/**
 *
 * @type {module.Player}
 */
const Player = require('./../model/Player')

/**
 *
 * @type {module.GameObjectFactory}
 */
module.exports = class GameObjectFactory {
  /**
   * Get a Block instance.
   * @param {number} x - x position
   * @param {number} y - y position
   * @param {number} w - block width
   * @param {number} h - block height
   * @param {string} type block type
   * @returns {module.Block} new Block
   */
  static getBlock (x, y, w, h, type) {
    return new Block(x, y, w, h, new Material(type))
  }

  /**
   * Get a SpawnPoint instance.
   * @param {number} x - x position
   * @param {number} y - y position
   * @param {number} w - spawn point width
   * @param {number} h - spawn point height
   * @param {module.Area} area containing Area
   * @returns {module.SpawnPoint} new SpawnPoint
   */
  static getSpawnPoint (x, y, w, h, area) {
    return new SpawnPoint(x, y, w, h, area)
  }

  /**
   * Get an Item instance.
   *
   * @param {number} x - x position
   * @param {number} y - y position
   * @param {number} w - player width
   * @param {number} h - player height
   * @param {string} name item name
   * @param {string} description item description
   * @param {function} action us action
   * @returns {module.Item} new Item
   */
  static getItem (x, y, h, w, name, description, action) {
    return new Item(x, y, w, h, new Material(name), name, description, action)
  }

  /**
   * Get a player instance.
   * @param {number} x - x position
   * @param {number} y - y position
   * @param {number} w - player width
   * @param {number} h - player height
   * @param {string} materialName name of texture file
   * @param {module.Area} area starting area
   * @returns {module.Player} new Player
   */
  static getPlayer (x, y, w, h, materialName, area) {
    return new Player(x, y, w, h, new Material(materialName), area)
  }
}
