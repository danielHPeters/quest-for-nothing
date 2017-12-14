'use strict'
const chai = require('chai')
const Item = require('./Item')
const should = chai.should()

describe('Item', () => {
  let item
  beforeEach(() => {
    item = new Item(10, 10, 20, 20, 'bottle', 'a regular bottle', function () {
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
