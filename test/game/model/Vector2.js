'use strict'
const Vector2 = require('./../../../src/game/model/Vector2')
const should = require('chai').should() // eslint-disable-line no-unused-vars

describe('Vector', () => {
  describe('x', () => {

  })

  describe('#y', () => {
    let vector
    beforeEach(() => {
      // Create a new Rectangle object before every test.
      vector = new Vector2(20, 10)
    })

    it('returns the y value', () => {
      // This will fail if "rectangle.width" does
      // not equal 10.
      vector.y.should.equal(10)
    })

    it('can be changed', () => {
      // Assert that the width can be changed.
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
      // Create a new Rectangle object before every test.
      vector = new Vector2(20, 10)
    })

    it('returns the x value', () => {
      // This will fail if "rectangle.width" does
      // not equal 10.
      vector.x.should.equal(20)
    })

    it('can be changed', () => {
      // Assert that the width can be changed.
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
})
