'use strict'
const logger = require('./../../server/utils/logger')
const fs = require('fs')
const levelsSource = 'src/levels'
/**
 * Loader class for levels.
 *
 * @author Daniel Peters
 * @version 1.0
 * @type {module.LevelLoader}
 */
module.exports = class LevelLoader {
  static getLevelsList (callback) {
    fs.readdir(levelsSource, callback)
  }

  static saveToJson (data) {
    let jsonString = JSON.stringify(data)
    fs.writeFile('src/levels/newLevel.json', jsonString, 'utf8', (err) => {
      if (err) {
        return logger.log('debug', err)
      }

      logger.log('info', 'Successfully wrote level data to JSON!')
    })
  }

  static loadFromJson (level, callback) {
    callback(require(levelsSource + level))
  }
}
