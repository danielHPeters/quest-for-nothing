import GameObjectFactory from './GameObjectFactory'
import Area from '../model/Area'
import Entity from '../model/Entity'
import GameState from '../model/GameState'
import { LevelDataBlocK } from '../../editor/backend/LevelLoader'

/**
 * Generate blocks and other game objects from json level files.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class BlockGenerator {
  /**
   * Static factory method to generate game objects and spawn points for players.
   * @param game Game instance
   * @param area Game area
   * @param blocksList Array containing block definitions
   * @returns Array containing the generated block
   */
  static generateBlocks (game: GameState, area: Area, blocksList: (LevelDataBlocK | null)[][]): Entity[] {
    let objWidth = game.settings.canvasWidth / blocksList[0].length
    let objHeight = game.settings.canvasHeight / blocksList.length
    let objX = 0
    let objY = 0
    let blocks = []

    for (let i = 0; i < blocksList.length; i++) {
      for (let j = 0; j < blocksList[i].length; j++) {
        const blockDef = blocksList[i][j]
        if (blockDef !== null) {
          if (blockDef.type === 'stone') {
            let block = GameObjectFactory.getBlock(objX, objY, objWidth, objHeight, 'stone')

            block.solid = blockDef.solid
            blocks.push(block)
            // Currently only one spawn point is allowed. May change later
          } else if (blockDef.type === 'spawn') {
            game.spawnPoint = GameObjectFactory.getSpawnPoint(objX, objY, objWidth, objHeight, area)
          } else if (blockDef.type === 'coin') {
            let coin = GameObjectFactory.getItem(objX, objY, objWidth, objHeight, 'coin', 'A coin', function () {
              console.log('You got monies!')
            })
            blocks.push(coin)
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
