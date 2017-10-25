'use strict'
const chai = require('chai')
const Entity = require('./../../../src/game/model/Entity')
const Bounds = require('./../../../src/game/collision/Bounds')
chai.should()

describe('Entity', () => {
  describe('#getCollisionBox', () => {
    let entity
    beforeEach(() => {
      entity = new Entity(10, 20, 50, 50)
    })
    it('returns a Bounds instance', () => {
      entity.getCollisionBox().should.be.an.instanceof(Bounds)
    })

    it('the resulting Bounds instance has the same position and dimension values', () => {
      let bounds = entity.getCollisionBox()
      bounds.x.should.equal(entity.position.x)
      bounds.y.should.equal(entity.position.y)
      bounds.width.should.equal(entity.width)
      bounds.height.should.equal(entity.height)
    })
  })
})
