'use strict'

/**
 *
 * @type {module.Game}
 */
let Game = require('./model/Game')

/**
 *
 * @type {module.Area}
 */
let Area = require('./model/Area')

/**
 *
 * @type {module.Settings}
 */
let Settings = require('./model/Settings')

/**
 *
 * @type {module.BlockFactory}
 */
let BlockFactory = require('./factory/BlockFactory')

/**
 *
 * @type {module.LevelLoader}
 */
let LevelLoader = require('./factory/LevelLoader')

let gameSettings = new Settings()
let game = new Game(gameSettings)
let levelLoader = new LevelLoader('./../../../levels/')
levelLoader.loadLevel(game)
/*let area1 = new Area('area1')
let area2 = new Area('area2')
let area3 = new Area('area3')

let pl = 'spawn'
let bl = 'block'
let se = 'secret'
let no = null
let blocksList = [
  [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl],
  [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
  [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
  [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
  [bl, no, no, no, no, no, no, no, no, bl, bl, no, no, no, bl],
  [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl],
  [bl, bl, bl, bl, bl, bl, bl, bl, no, no, no, no, no, no, se],
  [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl]
]

let blocksList2 = [
  [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl],
  [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
  [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
  [bl, no, no, no, no, bl, no, no, no, no, no, no, no, pl, bl],
  [bl, no, no, no, no, no, no, no, no, bl, bl, bl, bl, bl, bl],
  [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl],
  [se, no, no, no, no, no, bl, bl, no, no, no, no, no, no, bl],
  [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, no, no, bl]
]

let blocksList3 = [
  [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, no, no, bl],
  [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl],
  [bl, no, no, no, no, no, no, no, no, no, no, no, no, bl, bl],
  [bl, no, no, no, no, no, no, no, no, no, no, no, bl, bl, bl],
  [bl, bl, bl, bl, bl, no, no, no, no, bl, bl, bl, bl, bl, bl],
  [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl],
  [bl, no, no, no, no, no, bl, bl, no, no, no, no, no, no, bl],
  [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl]
]

area1.right = area2
area2.left = area1
area2.bottom = area3
area3.top = area2
area1.blocks = BlockFactory.generateBlocks(game, area1, blocksList)
area2.blocks = BlockFactory.generateBlocks(game, area2, blocksList2)
area3.blocks = BlockFactory.generateBlocks(game, area3, blocksList3)
game.areas.push(area1)
game.areas.push(area2)
game.areas.push(area3)*/

/**
 *
 * @type {module.Game}
 */
module.exports = game
