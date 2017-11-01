'use strict'
const fs = require('fs')
const levelsSource = 'src/levels'
/**
 * Loader class for levels.
 *
 * @author Daniel Peters
 * @version 1.0
 * @type {module.Loader}
 */
module.exports = class Loader {
  getLevelsList (callback) {
    fs.readdir(levelsSource, callback)
  }

  saveToJson () {
  }

  loadFromJson (level, callback) {
    callback(require(levelsSource + level))
  }
}
