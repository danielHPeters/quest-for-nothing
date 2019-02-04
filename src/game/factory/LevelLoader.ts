import Area from '../model/Area'
import BlockGenerator from './BlockGenerator'
import GameState from '../model/GameState'
import { LevelData } from '../../editor/backend/LevelLoader'

/**
 * LevelLoader class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LevelLoader {
  private levelsPath: string

  /**
   * Default constructor. Sets the path to level definition files.
   *
   * @param levelsPath Path to level files
   */
  constructor (levelsPath: string) {
    this.levelsPath = levelsPath
  }

  /**
   * Loads level file.
   *
   * @param game
   * @param level Level name
   */
  loadLevel (game: GameState, level: string): void {
    const levelDefinition = require(this.levelsPath + level) as LevelData

    let areasDone = 0

    levelDefinition.areas.forEach(areaDefinition => {
      let area = new Area(areaDefinition.id)
      areasDone++
      area.blocks = BlockGenerator.generateBlocks(game, area, areaDefinition.blocks)
      game.areas.push(area)
      if (areasDone === levelDefinition.areas.length) {
        this.setExits(game, levelDefinition)
      }
    })
  }

  /**
   * After loading level. The areas need to be set to allow travelling between them.
   *
   * @param game GameState instance
   * @param levelDefinition Level definition data loaded from file
   */
  setExits (game: GameState, levelDefinition: LevelData): void {
    levelDefinition.areas.forEach(areaDefinition => {
      let area = game.areas.filter(area => area.id === areaDefinition.id)[0]
      Object.keys(areaDefinition.exits).forEach((key) => {
        if (areaDefinition.exits[key] !== null) {
          area[key] = game.areas.filter(area => area.id === areaDefinition.exits[key])[0]
        }
      })
    })
  }
}
