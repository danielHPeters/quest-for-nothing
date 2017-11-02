'use strict'
const Material = require('./../../../src/game/model/Material')
const chai = require('chai')
const Item = require('./../../../src/game/model/Item')
const should = chai.should()

describe('Item', () => {
  let item
  beforeEach(() => {
    item = new Item(10, 10, 20, 20, new Material('bottle'), 'bottle', 'a regular bottle', function () {
      console.log('I am an Item')
    })
  })
  describe('#action', () => {
    it('should be a function', () => {
      item.action.should.be.a('function')
    })

    it('should only accept functions', () => {
      let func = () => {
        item.action = 'function'
      }
      func.should.throw(Error)
    })
  })

  describe('#use', () => {
    it('should not return anything', () => {
      should.equal(item.use(), undefined)
    })
  })

  describe('#name', () => {
    it('should only accept strings', () => {
      let func = () => {
        item.name = 0
      }
      func.should.throw(Error)
    })
    it('should return the name of the item', () => {
      item.name.should.equal('bottle')
    })
  })

  describe('#description', () => {
    it('should only accept strings', () => {
      let func = () => {
        item.description = 0
      }
      func.should.throw(Error)
    })
    it('should return the description of the item', () => {
      item.description.should.equal('a regular bottle')
    })
  })
})
