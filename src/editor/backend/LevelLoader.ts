import { logger } from '../../server/utils/logger'
import * as fs from 'fs'

export type LevelDataBlocK = {
  type: string
  solid: boolean
}

export type LevelDataArea = {
  id: string
  exits: {
    left: string | null,
    right: string | null,
    top: string | null,
    bottom: string | null
  }
  blocks: (LevelDataBlocK | null)[][]
}

export interface LevelData {
  id: string
  areas: LevelDataArea[]
}

/**
 * Loader class for levels.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LevelLoader {
  static levelsSource: string = 'src/levels'

  static getLevelsList (callback: (err: NodeJS.ErrnoException, files: string[]) => void) {
    fs.readdir(LevelLoader.levelsSource, callback)
  }

  static saveToJson (data: LevelData) {
    let jsonString = JSON.stringify(data)
    fs.writeFile('src/levels/newLevel.json', jsonString, 'utf8', (err: NodeJS.ErrnoException) => {
      if (err) {
        logger.log('debug', err.toString())
      }

      logger.log('info', 'Successfully wrote level data to JSON!')
    })
  }

  static loadFromJson (level: string, callback: any) {
    callback(require(LevelLoader.levelsSource + level))
  }
}
