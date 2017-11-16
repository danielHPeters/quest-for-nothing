'use strict'
import AssetManager from './AssetManager'
import InputManager from './InputManager'
import Animation from './../graphics/2D/Animation'

export default class GameClient {
  constructor (socket, canvas) {
    this.socket = socket
    this.canvas = canvas
    this.inputManager = new InputManager(canvas)
    this.assetManager = new AssetManager()
    this.spritesLoaded = false
    this.ctx = null
    this.playerId = null
    this.animations = {}
    this.registerLoop()
  }

  /**
   * Shim for animation loop.
   * Selects one that's available or uses fallback with setTimeout.
   */
  registerLoop () {
    window.requestAnimFrame = (() => {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
          window.setTimeout(callback, 1000 / 60)
        }
    })()
  }

  init () {
    // check if canvas is supported by browser
    if (this.canvas.getContext) {
      this.socket.emit('new player')
      this.ctx = this.canvas.getContext('2d')
      // Add all sprites and music files to the download queue
      this.assetManager.queueDownload('ambient', 'assets/audio/ambient/ambient.mp3', 'audio')
      this.assetManager.queueDownload('jump', 'assets/audio/effects/jump.wav', 'audio')
      this.assetManager.queueDownload('background', 'assets/textures/background.png', 'texture')
      this.assetManager.queueDownload('player', 'assets/textures/player.png', 'texture')
      this.assetManager.queueDownload('stone-block', 'assets/textures/stone-block.jpg', 'texture')
      this.assetManager.queueDownload('heart', 'assets/textures/heart.png', 'texture')
      this.assetManager.queueDownload('coin', 'assets/textures/coin.png', 'texture')
      this.assetManager.queueDownload('playerSheet', 'assets/textures/test.png', 'spriteSheet', {
        frameWidth: 32,
        frameHeight: 64
      })
      this.assetManager.queueDownload('coinSheet', 'assets/textures/coin-sprite-animation-sprite-sheet.png', 'spriteSheet', {
        frameWidth: 44, frameHeight: 44
      })
      this.assetManager.loadAll(() => {
        this.animations.right = new Animation(this.assetManager.getSpriteSheet('playerSheet'), 3, 3, 6, 12)
        this.animations.left = new Animation(this.assetManager.getSpriteSheet('playerSheet'), 3, 3, 6, 12)
        this.animations.idle = new Animation(this.assetManager.getSpriteSheet('playerSheet'), 10, 0, 2, 12)
        this.animations.coin = new Animation(this.assetManager.getSpriteSheet('coinSheet'), 3, 0, 9)
        this.animations.current = this.animations.left
        // Play ambient sound
        this.assetManager.playSound('ambient', true)
        this.update()
        // Draw Background only once to improve performance
        document.getElementById('background').getContext('2d').drawImage(this.assetManager.getSprite('background'), 0, 0, this.canvas.width, this.canvas.height)
        // tells socket.on(state) that all sprites needed for drawing are downloaded
        this.spritesLoaded = true
      })
    } else {
      document.getElementById('unsupported').textContent = 'Please update your browser or download another one which supports HTML5'
    }
  }

  update () {
    this.socket.emit('movement', this.inputManager.registeredInputs)
    // Request new frame when ready. Allows the game to play in a loop in approximately 60fps
    window.requestAnimationFrame(() => this.update())
  }

  /**
   * Draw all objects.
   * @param players player objects with objects within their viewport
   */
  render (players) {
    if (this.playerId && players[this.playerId] && this.spritesLoaded) {
      let currentPlayer = players[this.playerId]
      if (this.inputManager.registeredInputs['w'] || this.inputManager.registeredInputs[' ']) {
        // Check if players is not already jumping
        if (!currentPlayer.jumping && currentPlayer.grounded) {
          this.assetManager.playSound('jump')
        }
      }
      this.animations.current.update()
      this.animations.coin.update()
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      Object.keys(players).forEach(key => {
        const player = players[key]
        // Make sure to only draw players in the same area
        if (player.viewport.areaId === currentPlayer.viewport.areaId) {
          if (player.registeredInputs['a']) {
            this.animations.current = this.animations.left
          }
          if (player.registeredInputs['d']) {
            this.animations.current = this.animations.right
          }
          if (!player.registeredInputs['d'] && !player.registeredInputs['a']) {
            this.animations.current = this.animations.idle
          }
          this.animations.current.draw(this.ctx, player.position._x, player.position._y, player.width, player.height)
        }
      })
      // Draw all blocks
      players[this.playerId].viewport.blocks.forEach(block => {
        if (block.material.name === 'stone-block') {
          this.ctx.drawImage(this.assetManager.getSprite(block.material.name), block.position._x, block.position._y, block.width, block.height)
        } else if (block.material.name === 'coin') {
          this.animations.coin.draw(this.ctx, block.position._x, block.position._y, block.width, block.height)
        }
      })
      // Display health
      let x = this.canvas.width - 35
      for (let i = 0; i < players[this.playerId].lives; i++) {
        this.ctx.drawImage(this.assetManager.getSprite('heart'), x, 5, 30, 30)
        x -= 30
      }
      this.ctx.drawImage(this.assetManager.getSprite('coin'), 5, 5, 30, 30)
      this.ctx.font = '30px serif'
      this.ctx.fillStyle = 'red'
      this.ctx.fillText(players[this.playerId].coins.toString(), 35, 30)
    }
  }
}
