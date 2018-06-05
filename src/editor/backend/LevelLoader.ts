import { logger } from '../../server/utils/logger'
import * as fs from 'fs'

/**
 * Loader class for levels.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LevelLoader {
  static levelsSource: string = 'src/levels'

  static getLevelsList (callback) {
    fs.readdir(LevelLoader.levelsSource, callback)
  }

  static saveToJson (data) {
    let jsonString = JSON.stringify(data)
    fs.writeFile('src/levels/newLevel.json', jsonString, 'utf8', (err) => {
      if (err) {
        return logger.log('debug', err.toString())
      }

      logger.log('info', 'Successfully wrote level data to JSON!')
    })
  }

  static loadFromJson (level: string, callback) {
    callback(require(LevelLoader.levelsSource + level))
  }
}
