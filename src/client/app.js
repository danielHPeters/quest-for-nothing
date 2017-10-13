'use strict'
import Game from './model/Game'
import Canvas from './model/Canvas'
import Area from './model/Area'
import AudioManager from './application/AudioManager'
import AssetManager from './application/AssetManager'
import KeyboardEventHandler from './application/KeyboardEventHandler'
import Material from './model/Material'

/**
 *
 * @param game
 */
function animate (game) {
  // Clear game before drawing new animation
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)

  // Update game logic
  game.update()

  // Render objects
  game.render()

  // Request new frame when ready. Allows the game to play in a loop
  window.requestAnimationFrame(() => animate(game))
}

/**
 * Initializes all game Objects
 */
function init () {
  let canvas = document.getElementById('game')

  if (canvas.getContext) {
    let ctx = canvas.getContext('2d')
    let map = new Canvas(0, 0, canvas.width, canvas.height, new Material('background'))
    let audioManager = new AudioManager()
    let game = new Game(map, ctx, audioManager)
    let area1 = new Area(game)
    let area2 = new Area(game)
    let area3 = new Area(game)
    let gameObjects = []
    let assetManager = new AssetManager()
    let keyEventHandler = new KeyboardEventHandler(canvas)

    let pl = 'player'
    let bl = 'block'
    let se = 'secret'
    let no = null
    let blocksList = [
      [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl],
      [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
      [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
      [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
      [bl, no, no, no, no, no, no, no, no, bl, bl, no, no, no, bl],
      [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl],
      [bl, bl, bl, bl, bl, bl, bl, bl, no, no, no, no, no, no, se],
      [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl]
    ]

    let blocksList2 = [
      [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl],
      [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
      [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
      [bl, no, no, no, no, bl, no, no, no, no, no, no, no, pl, bl],
      [bl, no, no, no, no, no, no, no, no, bl, bl, bl, bl, bl, bl],
      [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl],
      [se, no, no, no, no, no, bl, bl, no, no, no, no, no, no, bl],
      [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, no, no, bl]
    ]

    let blocksList3 = [
      [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, no, no, bl],
      [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl],
      [bl, no, no, no, no, no, no, no, no, no, no, no, no, bl, bl],
      [bl, no, no, no, no, no, no, no, no, no, no, no, bl, bl, bl],
      [bl, bl, bl, bl, bl, no, no, no, no, bl, bl, bl, bl, bl, bl],
      [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl],
      [bl, no, no, no, no, no, bl, bl, no, no, no, no, no, no, bl],
      [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl]
    ]
    area1.right = area2
    area2.left = area1
    area2.bottom = area3
    area3.top = area2
    area1.generateBlocks(blocksList)
    area2.generateBlocks(blocksList2)
    area3.generateBlocks(blocksList3)
    game.areas.push(area1)
    game.areas.push(area2)
    game.areas.push(area3)
    game.player.keyActionsRegister = keyEventHandler.getKeyActionsRegister()
    game.assetManager = assetManager
    game.audioManager.queueDownload('ambient', 'assets/audio/ambient/ambient.mp3')
    game.audioManager.queueDownload('jump', 'assets/audio/effects/jump.wav')
    game.audioManager.loadAll(() => {
      game.audioManager.playSound('ambient', true)
      gameObjects.push(map)
      gameObjects.push(game.player)
      gameObjects = gameObjects.concat(area1.blocks)
      gameObjects = gameObjects.concat(area2.blocks)
      gameObjects = gameObjects.concat(area3.blocks)

      // Add all sprites to the download queue
      assetManager.queueDownload('background', 'assets/textures/background.jpg')
      assetManager.queueDownload('player', 'assets/textures/player.png')
      assetManager.queueDownload('stone-block', 'assets/textures/stone-block.jpg')
      assetManager.queueDownload('heart', 'assets/textures/heart.png')
      // Start playing ambient music

      // Download all sprites
      assetManager.downLoadAll(() => {
        // Assign the sprites to the correct material
        gameObjects.forEach((obj) => obj.material.setSprite(assetManager))

        // After the sprites are initialized start drawing
        animate(game)
      })
    })
  } else {
    document.getElementById('unsupported').textContent = 'Please update your browser or download another one which supports HTML5'
  }
}

document.addEventListener('DOMContentLoaded', init())
