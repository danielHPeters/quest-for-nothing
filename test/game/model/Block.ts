import * as chai from 'chai'
import Block from '../../../src/game/model/Block'

chai.should()

describe('Block', () => {
  let block
  beforeEach(() => {
    block = new Block(16, 20, 60, 60, 'stone')
  })
  describe('#isSolid', () => {
    it('returns the solidity state of the block', () => {
      block.solid.should.equal(true)
    })
  })

  describe('#setSolid', () => {
    it('changes the solidity state of the block', () => {
      block.solid = false
      block.solid.should.equal(false)
    })
  })
})
