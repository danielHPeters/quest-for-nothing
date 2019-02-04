import * as chai from 'chai'
import Item from '../../../src/game/model/Item'

const should = chai.should()

describe('Item', () => {
  let item: Item

  beforeEach(() => {
    item = new Item(10, 10, 20, 20, 'bottle', 'a regular bottle', () => {
      console.log('I am an Item')
    })
  })
  describe('#action', () => {
    it('should be a function', () => {
      item.action.should.be.a('function')
    })
  })

  describe('#use', () => {
    it('should not return anything', () => {
      should.equal(item.use(), undefined)
    })
  })

  describe('#description', () => {
    it('should return the description of the item', () => {
      item.description.should.equal('a regular bottle')
    })
  })
})
