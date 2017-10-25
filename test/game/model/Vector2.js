'use strict'
const chai = require('chai')
const Vector2 = require('./../../../src/game/model/Vector2')

chai.should()

describe('Vector2', () => {
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

  describe('#set', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 10)
    })

    it('changes x and y values', () => {
      vector.set(4, 9)
      vector.x.should.equal(4)
      vector.y.should.equal(9)
    })
  })

  describe('#setVector', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 10)
    })

    it('changes x and y values', () => {
      vector.setVector(new Vector2(4, 9))
      vector.x.should.equal(4)
      vector.y.should.equal(9)
    })

    it('only accepts Vector2 instances', () => {
      let func = () => {
        vector.setVector('foo')
      }
      func.should.throw(Error)
    })
  })

  describe('#add', () => {
    let vector
    let anotherVector
    beforeEach(() => {
      vector = new Vector2(20, 10)
      anotherVector = new Vector2(10, 20)
    })

    it('adds the value of another vector to this vector', () => {
      vector.add(anotherVector)
      vector.x.should.equal(30)
      vector.y.should.equal(30)
    })
  })

  describe('#static add', () => {
    let vector
    let anotherVector
    beforeEach(() => {
      vector = new Vector2(20, 10)
      anotherVector = new Vector2(10, 20)
    })

    it('returns an instance of Vector2', () => {
      let resultingVector = Vector2.add(vector, anotherVector)
      resultingVector.should.be.deep.an.instanceof(Vector2)
    })

    it('combines the values of two vectors into a new vector', () => {
      let resultingVector = Vector2.add(vector, anotherVector)
      resultingVector.x.should.equal(30)
      resultingVector.y.should.equal(30)
    })
  })

  describe('#subtract', () => {
    let vector
    let anotherVector
    beforeEach(() => {
      vector = new Vector2(20, 10)
      anotherVector = new Vector2(20, 10)
    })

    it('subtracts the value of another vector from this vector', () => {
      vector.subtract(anotherVector)
      vector.x.should.equal(0)
      vector.y.should.equal(0)
    })
  })

  describe('#static subtract', () => {
    let vector
    let anotherVector
    beforeEach(() => {
      vector = new Vector2(20, 10)
      anotherVector = new Vector2(20, 10)
    })

    it('returns an instance of Vector2', () => {
      let resultingVector = Vector2.subtract(vector, anotherVector)
      resultingVector.should.be.deep.an.instanceof(Vector2)
    })

    it('subtracts the values of the second vector from the first vector and returns a new vector', () => {
      let resultingVector = Vector2.subtract(vector, anotherVector)
      resultingVector.x.should.equal(0)
      resultingVector.y.should.equal(0)
    })
  })

  describe('multiply', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 10)
    })

    it('only accepts numbers as parameter', () => {
      let func = () => {
        vector.multiply('foo')
      }
      func.should.throw(Error)
    })

    it('multiplies the vector x and y values by scalar', () => {
      vector.multiply(2)
      vector.x.should.equal(40)
      vector.y.should.equal(20)
    })
  })

  describe('#clone', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 10)
    })

    it('returns an instance of Vector2', () => {
      let cloned = vector.clone()
      cloned.should.be.an.instanceof(Vector2)
    })

    it('returns a copy of the vector', () => {
      let cloned = vector.clone()
      cloned.should.be.deep.equal(vector)
    })
  })
})
