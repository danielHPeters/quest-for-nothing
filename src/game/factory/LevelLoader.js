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
   * Default constructor. Sets the path to level definition files
   * @param {string} levelsPath
   */
  constructor (levelsPath) {
    this.levelsPath = levelsPath
  }

  /**
   * Loads level file.
   * @param {string} level
   */
  loadLevel (game, level = 'default') {
    let levelDefinition = require(this.levelsPath + level)

    let areasDone = 0

    levelDefinition.areas.forEach(areaDefinition => {
      let area = new Area(areaDefinition.id)
      areasDone++
      area.blocks = BlockFactory.generateBlocks(game, area, areaDefinition.blocks)
      game.areas.push(area)
      if (areasDone === levelDefinition.areas.length) {
        this.setExits(game, levelDefinition)
      }
    })
  }

  /**
   * After loading level. The areas need to be set to allow travelling between them.
   * @param {module.Game} game
   * @param {{}} levelDefinition
   */
  setExits (game, levelDefinition) {
    levelDefinition.areas.forEach(areaDefinition => {
      let area = game.areas.filter(area => area.id === areaDefinition.id)[0]
      Object.keys(areaDefinition.exits).forEach(function (key) {
        if (areaDefinition.exits[key] !== null) {
          area[key] = game.areas.filter(area => area.id === areaDefinition.exits[key])[0]
        }
      })
    })
  }
}
