import * as chai from 'chai'
import GameState from '../../../src/game/model/GameState'
import Settings from '../../../src/game/model/Settings'

const should = chai.should()

describe('GameState', () => {
  describe('#update', () => {
    let game
    beforeEach(() => {
      game = new GameState(new Settings())
    })
    it('returns undefined', () => {
      should.equal(game.update(), undefined)
    })
  })
})
