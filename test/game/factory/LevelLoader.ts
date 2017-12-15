import * as chai from 'chai'
import { GameState } from '../../../src/game/model/GameState'
import { LevelLoader } from '../../../src/game/factory/LevelLoader'
import { Settings } from '../../../src/game/model/Settings'

chai.should()

describe('LevelLoader', () => {
  describe('#loadLevel', () => {
    let levelLoader
    let gameSettings
    let game
    beforeEach(() => {
      gameSettings = new Settings()
      game = new GameState(gameSettings)
      levelLoader = new LevelLoader('./../../levels/')
    })

    it('should loadAudio the game data into the game object', () => {
      levelLoader.loadLevel(game, 'default')
    })
  })
})
