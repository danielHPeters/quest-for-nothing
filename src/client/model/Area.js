import Material from './Material'
import Block from './Block'

export default class Area {
  constructor (canvas, top = null, bottom = null, left = null, right = null) {
    this.canvas = canvas
    this.top = top
    this.bottom = bottom
    this.left = left
    this.right = right
    this.blocks = []
  }

  generateBlocks (blocksList) {
    let blockWidth = this.canvas.width / blocksList[0].length
    let blockHeight = this.canvas.height / blocksList.length
    let blockX = 0
    let blockY = 0

    for (let i = 0; i < blocksList.length; i++) {
      for (let j = 0; j < blocksList[i].length; j++) {
        if (blocksList[i][j] === 'block') {
          this.blocks.push(new Block(blockX, blockY, blockWidth, blockHeight, new Material('stone-block')))
        } else if (blocksList[i][j] === 'secret') {
          let blk = new Block(blockX, blockY, blockWidth, blockHeight, new Material('stone-block'))
          blk.solid = false
          this.blocks.push(blk)
        }
        blockX += blockWidth
      }
      blockY += blockHeight
      blockX = 0
    }
  }

  hasLeft () {
    return this.left !== null
  }

  hasRight () {
    return this.right !== null
  }
}