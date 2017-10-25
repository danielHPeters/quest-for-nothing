'use strict'
const chai = require('chai')
const Vector2 = require('./../../../src/game/model/Vector2')

chai.should()

describe('Vector2', () => {
  describe('x', () => {

  })

  describe('#y', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 10)
    })

    it('returns the y value', () => {
      vector.y.should.equal(10)
    })

    it('can be changed', () => {
      vector.y = 30
      vector.y.should.equal(30)
    })

    it('only accepts numerical values', () => {
      let func = () => {
        vector.y = 'foo'
      }
      func.should.throw(Error)
    })
  })

  describe('#x', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 10)
    })

    it('returns the x value', () => {
      vector.x.should.equal(20)
    })

    it('can be changed', () => {
      vector.x = 30
      vector.x.should.equal(30)
    })

    it('only accepts numerical values', () => {
      let func = () => {
        vector.x = 'foo'
      }
      func.should.throw(Error)
    })
  })

  describe('#clone', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 10)
    })

    it('returns an instance of Vector2', () => {
      let cloned = vector.clone()
      cloned.should.to.be.an.instanceof(Vector2)
    })

    it('returns a copy of the vector', () => {
      let cloned = vector.clone()
      cloned.should.to.deep.equal(vector)
    })
  })
})
