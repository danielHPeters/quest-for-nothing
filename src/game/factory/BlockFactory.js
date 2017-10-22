let Block = require('./../model/Block')
let SpawnPoint = require('./../model/SpawnPoint')
let Material = require('./../model/Material')

/**
 * Generate blocks and other game objects from json level files
 * @type {module.BlockFactory}
 */
module.exports = class BlockFactory {
  /**
   * Static factory method to generate game objects and spawn points for players.
   * @param {module.Game} game
   * @param {Array} blocksList
   * @returns {Array}
   */
  static generateBlocks (game, area, blocksList) {
    let objWidth = game.settings.canvasWidth / blocksList[0].length
    let objHeight = game.settings.canvasHeight / blocksList.length
    let objX = 0
    let objY = 0
    let blocks = []

    for (let i = 0; i < blocksList.length; i++) {
      for (let j = 0; j < blocksList[i].length; j++) {
        if (blocksList[i][j] !== null) {
          if (blocksList[i][j].type === 'stone') {
            let block = new Block(objX, objY, objWidth, objHeight, new Material('stone-block'))

            if (!blocksList[i][j].solid) {
              block.setSolid(false)
            }
            blocks.push(block)
            // Currently only one spawn point is allowed. May change later
          } else if (blocksList[i][j].type === 'spawn' && game.spawnPoint === null) {
            game.spawnPoint = new SpawnPoint(objX, objY, objWidth, objHeight, area)
          }
        }
        objX += objWidth
      }
      objY += objHeight
      objX = 0
    }
    return blocks
  }
}
