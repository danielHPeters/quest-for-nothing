'use strict'
const chai = require('chai')
const Game = require('./../../../src/game/model/Game')
const Settings = require('./../../../src/game/model/Settings')
const should = chai.should()

describe('Game', () => {
  describe('#update', () => {
    let game
    beforeEach(() => {
      game = new Game(new Settings())
    })
    it('returns undefined', () => {
      should.equal(game.update(), undefined)
    })
  })
})
