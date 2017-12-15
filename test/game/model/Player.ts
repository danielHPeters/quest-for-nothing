import * as chai from 'chai'
import { Player } from '../../../src/game/model/Player'
import { Area } from '../../../src/game/model/Area'

chai.should()

describe('Player', () => {
  let player
  beforeEach(() => {
    player = new Player('p1', 10, 20, 30, 30, 'Player', new Area('area1'))
  })
  describe('#gainLife', () => {
    it('should add only one life to player', () => {
      player.gainLife()
      player.lives.should.equal(4)
    })
  })

  describe('#loseLife', () => {
    it('should remove only one life from player', () => {
      player.loseLife()
      player.lives.should.equal(2)
    })
  })

  describe('#toggleRun', () => {
    it('change flag running to true', () => {
      player.toggleRun()
      player.running.should.equal(true)
    })
  })
})
