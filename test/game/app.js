'use strict'
const chai = require('chai')
const game = require('./../../src/game/app')
const Game = require('./../../src/game/model/Game')
chai.should()

describe('game/app.js', () => {
  it('creates a game instance', () => {
    game.should.be.an.instanceof(Game)
  })
})
