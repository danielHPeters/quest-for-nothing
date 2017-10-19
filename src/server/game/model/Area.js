/**
 *
 * @type {module.Material}
 */
let Material = require('./Material')
/**
 *
 * @type {module.Block}
 */
let Block = require('./Block')
/**
 *
 * @type {module.SpawnPoint}
 */
let SpawnPoint = require('./SpawnPoint')

/**
 *
 * @type {module.Area}
 */
module.exports = class Area {
  /**
   *
   * @param {module.Game} game
   * @param {module.Area} top
   * @param {module.Area} bottom
   * @param {module.Area} left
   * @param {module.Area} right
   */
  constructor (game, top = null, bottom = null, left = null, right = null) {
    this.game = game
    this.top = top
    this.bottom = bottom
    this.left = left
    this.right = right
    this.blocks = []
  }

  generateBlocks (blocksList) {
    let objWidth = this.game.settings.canvasWidth / blocksList[0].length
    let objHeight = this.game.settings.canvasHeight / blocksList.length
    let objX = 0
    let objY = 0

    for (let i = 0; i < blocksList.length; i++) {
      for (let j = 0; j < blocksList[i].length; j++) {
        if (blocksList[i][j] === 'block') {
          this.blocks.push(new Block(objX, objY, objWidth, objHeight, new Material('stone-block')))
        } else if (blocksList[i][j] === 'secret') {
          let blk = new Block(objX, objY, objWidth, objHeight, new Material('stone-block'))
          blk.solid = false
          this.blocks.push(blk)
        } else if (blocksList[i][j] === 'spawn' && this.game.spawnPoint === null) {
          this.game.spawnPoint = new SpawnPoint(objX, objY, objWidth, objHeight, this)
        }
        objX += objWidth
      }
      objY += objHeight
      objX = 0
    }
  }

  hasLeft () {
    return this.left !== null
  }

  hasRight () {
    return this.right !== null
  }
}
