/**
 *
 * @type {module.BlockFactory}
 */
let BlockFactory = require('./BlockFactory')

/**
 *
 * @type {module.Area}
 */
let Area = require('./../model/Area')

/**
 *
 * @type {module.LevelLoader}
 */
module.exports = class LevelLoader {
  /**
   *
   * @param {string} levelsPath
   */
  constructor (levelsPath) {
    this.levelsPath = levelsPath
  }

  /**
   *
   * @param {string} level
   */
  loadLevel (game, level = 'default') {
    let levelDefinition = require(this.levelsPath + level)

    let areasDone = 0

    levelDefinition.areas.forEach(function (areaDefinition) {
      let area = new Area(areaDefinition.id)
      areasDone++
      area.blocks = BlockFactory.generateBlocks(game, area, areaDefinition.blocks)
      game.areas.push(area)
      if (areasDone === levelDefinition.areas.length) {
        LevelLoader.setExits(game, levelDefinition)
      }
    })
  }

  static setExits (game, levelDefinition) {
    levelDefinition.areas.forEach(function (areaDefinition) {
      let area = game.areas.filter(area => area.id === areaDefinition.id)[0]
      Object.keys(areaDefinition.exits).forEach(function (key) {
        if (areaDefinition.exits[key] !== null) {
          area[key] = game.areas.filter(area => area.id === areaDefinition.exits[key])[0]
        }
      })
    })
  }
}
