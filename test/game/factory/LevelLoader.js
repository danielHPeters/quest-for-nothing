'use strict'
const chai = require('chai')
const LevelLoader = require('./../../../src/game/factory/LevelLoader')
const Game = require('./../../../src/game/model/Game')
const Settings = require('./../../../src/game/model/Settings')

chai.should()

describe('LevelLoader', () => {
  describe('#loadLevel', () => {
    let levelLoader
    let gameSettings
    let game
    beforeEach(() => {
      gameSettings = new Settings()
      game = new Game(gameSettings)
      levelLoader = new LevelLoader('./../../levels/')
    })

    it('should loadAudio the game data into the game object', () => {
      levelLoader.loadLevel(game, 'default')
    })
  })
})
