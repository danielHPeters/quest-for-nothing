'use strict'
const chai = require('chai')
const GameState = require('./GameState')
const Settings = require('./Settings')
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
