'use strict'
let Game = require('./model/Game')
let Area = require('./model/Area')
let Settings = require('./model/Settings')

let gameSettings = new Settings()
let game = new Game(gameSettings)
let area1 = new Area(game)
let area2 = new Area(game)
let area3 = new Area(game)

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
area1.generateBlocks(blocksList)
area2.generateBlocks(blocksList2)
area3.generateBlocks(blocksList3)
game.areas.push(area1)
game.areas.push(area2)
game.areas.push(area3)

/**
 *
 * @type {module.Game}
 */
module.exports = game
