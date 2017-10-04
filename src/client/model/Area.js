import Material from './Material'
import Block from './Block'
import Player from './Player'

export default class Area {
  constructor (game, top = null, bottom = null, left = null, right = null) {
    this.game = game
    this.top = top
    this.bottom = bottom
    this.left = left
    this.right = right
    this.blocks = []
  }

  generateBlocks (blocksList) {
    let objWidth = this.game.canvas.width / blocksList[0].length
    let objHeight = this.game.canvas.height / blocksList.length
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
        } else if (blocksList[i][j] === 'player' && this.game.player === null) {
          this.game.player = new Player(objX, objY, objWidth, objHeight, new Material('player'))
          this.game.current = this
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
