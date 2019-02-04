import * as chai from 'chai'
import GameState from '../../../src/game/model/GameState'
import Settings from '../../../src/game/model/Settings'

const should = chai.should()

describe('GameState', () => {
  describe('#update', () => {
    let game: GameState
    let settings = new Settings()

    beforeEach(() => {
      game = new GameState(settings)
    })
    it('has settings', () => {
      should.equal(game.settings, settings)
    })
  })
})
