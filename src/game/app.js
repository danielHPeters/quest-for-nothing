'use strict'

/**
 * This module loads game state and level data and passes it on to the calling script.
 */

/**
 *
 * @type {module.Game}
 */
let Game = require('./model/Game')

/**
 *
 * @type {module.Settings}
 */
let Settings = require('./model/Settings')

/**
 *
 * @type {module.LevelLoader}
 */
let LevelLoader = require('./factory/LevelLoader')

let gameSettings = new Settings()
let game = new Game(gameSettings)
let levelLoader = new LevelLoader('./../../levels/')
levelLoader.loadLevel(game, 'newLevel')

/**
 *
 * @type {module.Game}
 */
module.exports = game
