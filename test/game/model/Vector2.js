'use strict'
const chai = require('chai')
const Vector2 = require('../../../src/lib/Vector2')

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

    it('only accepts Vector2 instances as parameter', () => {
      let func = () => {
        vector.add('vector')
      }
      func.should.throw(Error)
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

    it('only accepts Vector2 instances as parameter', () => {
      let func = () => {
        Vector2.add(vector, 'foo')
      }
      let func2 = () => {
        Vector2.add('foo', anotherVector)
      }
      func.should.throw(Error)

      func2.should.throw(Error)
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

  describe('#multiply', () => {
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

  describe('#static multiply', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 10)
    })

    it('only accepts Vector2 instances as vector parameter', () => {
      let func = () => {
        Vector2.multiply('foo', 2)
      }
      func.should.throw(Error)
    })

    it('only accepts numbers as scalar parameter', () => {
      let func = () => {
        Vector2.multiply(vector, 'foo')
      }
      func.should.throw(Error)
    })

    it('returns an instance of Vector2', () => {
      let resultingVector = Vector2.multiply(vector, 2)
      resultingVector.should.be.deep.an.instanceof(Vector2)
    })

    it('multiplies the vector x and y values by scalar', () => {
      let resultingVector = Vector2.multiply(vector, 2)
      resultingVector.x.should.equal(40)
      resultingVector.y.should.equal(20)
    })
  })

  describe('#divide', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 10)
    })

    it('only accepts Vector2 instances as vector parameter', () => {
      let func = () => {
        Vector2.divide('foo', 2)
      }
      func.should.throw(Error)
    })

    it('only accepts numbers as parameter', () => {
      let func = () => {
        vector.divide('foo')
      }
      func.should.throw(Error)
    })

    it('does not allow division by zero', () => {
      let func = () => {
        vector.divide(0)
      }
      func.should.throw(Error)
    })

    it('divides the vector x and y values by scalar', () => {
      vector.divide(2)
      vector.x.should.equal(10)
      vector.y.should.equal(5)
    })
  })

  describe('#static divide', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 10)
    })

    it('only accepts numbers as parameter scalar', () => {
      let func = () => {
        Vector2.divide(vector, 'foo')
      }
      func.should.throw(Error)
    })

    it('does not allow division by zero', () => {
      let func = () => {
        Vector2.divide(vector, 0)
      }
      func.should.throw(Error)
    })

    it('returns an instance of Vector2', () => {
      let resultingVector = Vector2.divide(vector, 2)
      resultingVector.should.be.deep.an.instanceof(Vector2)
    })

    it('divides the vector x and y values by scalar', () => {
      let resultingVector = Vector2.divide(vector, 2)
      resultingVector.x.should.equal(10)
      resultingVector.y.should.equal(5)
    })
  })

  describe('#mag', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 15)
    })

    it('returns a number', () => {
      vector.mag().should.be.a('number')
    })

    it('returns square root of "x * x + y * y"', () => {
      vector.mag().should.equal(25)
    })
  })

  describe('#negative', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 10)
    })

    it('returns an instance of Vector2', () => {
      let negatedVector = vector.negative()
      negatedVector.should.be.an.instanceof(Vector2)
    })

    it('return a vector with the inverted values of the calling vector', () => {
      let negatedVector = vector.negative()
      negatedVector.x.should.equal(-vector.x)
      negatedVector.y.should.equal(-vector.y)
    })
  })

  describe('#normalize', () => {
    let vector
    beforeEach(() => {
      vector = new Vector2(20, 10)
    })

    it('should normalize the vector to a magnitude of approximately 1', () => {
      vector.normalize()
      vector.mag().should.be.within(0.999999, 1.111111)
    })

    it('should do nothing when normalizing a zero vector', () => {
      vector.set(0, 0)
      vector.normalize()
      vector.x.should.equal(0)
      vector.y.should.equal(0)
    })
  })

  describe('#limit', () => {
    let max
    let vector
    beforeEach(() => {
      max = 25
      vector = new Vector2(200, 150)
    })

    it('should normalize the vector to a magnitude of approximately 1 and raise it to 25', () => {
      vector.limit(max)
      vector.x.should.equal(20)
      vector.y.should.equal(15)
      vector.mag().should.equal(max)
    })

    it('should do nothing when magnitude is below max', () => {
      vector.set(8, 6)
      vector.limit(max)
      vector.x.should.equal(8)
      vector.y.should.equal(6)
      vector.mag().should.equal(10)
    })
  })

  describe('#distanceTo', () => {
    let vector
    let anotherVector
    beforeEach(() => {
      vector = new Vector2(20, 10)
      anotherVector = new Vector2(20, 10)
    })

    it('only accepts Vector2 instances as parameter', () => {
      let func = () => {
        vector.distanceTo('foo')
      }
      func.should.throw(Error)
    })

    it('returns a number', () => {
      vector.distanceTo(anotherVector).should.be.a('number')
    })
  })

  describe('#dot', () => {
    let vector
    let anotherVector
    beforeEach(() => {
      vector = new Vector2(20, 10)
      anotherVector = new Vector2(20, 10)
    })

    it('only accepts Vector2 instances as parameter', () => {
      let func = () => {
        vector.dot('foo')
      }
      func.should.throw(Error)
    })

    it('returns a number', () => {
      vector.dot(anotherVector).should.be.a('number')
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
