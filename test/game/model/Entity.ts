import * as chai from 'chai'
import HitBox from '../../../src/game/collision/HitBox'
import Entity from '../../../src/game/model/Entity'

chai.should()

describe('Entity', () => {
  describe('#getCollisionBox', () => {
    let entity
    beforeEach(() => {
      entity = new Entity(10, 20, 50, 50, 'entity')
    })
    it('returns a Bounds instance', () => {
      entity.getCollisionBox().should.be.an.instanceof(HitBox)
    })

    it('the resulting Bounds instance has the same position and dimension values', () => {
      let bounds = entity.getCollisionBox()
      bounds.position.x.should.equal(entity.position.x)
      bounds.position.y.should.equal(entity.position.y)
      bounds.width.should.equal(entity.width)
      bounds.height.should.equal(entity.height)
    })
  })
})
