'use strict'
const chai = require('chai')
const Block = require('./Block')

chai.should()

describe('Block', () => {
  let block
  beforeEach(() => {
    block = new Block(16, 20, 60, 60)
  })
  describe('#isSolid', () => {
    it('returns the solidity state of the block', () => {
      block.isSolid().should.equal(true)
    })
  })

  describe('#setSolid', () => {
    it('changes the solidity state of the block', () => {
      block.setSolid(false)
      block.isSolid().should.equal(false)
    })
  })
})
