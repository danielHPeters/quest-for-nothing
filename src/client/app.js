'use strict'

import AudioManager from './application/AudioManager'
import AssetManager from './application/AssetManager'
import KeyboardEventHandler from './application/KeyboardEventHandler'

let socket = io.connect()
let canvas = document.getElementById('game')
let keyEventHandler = new KeyboardEventHandler(canvas)
let audioManager = new AudioManager()
let assetManager = new AssetManager()
let playerId
let ctx
let spritesLoaded = false

function animate () {
  socket.emit('movement', keyEventHandler.keyActionsRegister)
  // Request new frame when ready. Allows the game to play in a loop
  window.requestAnimationFrame(() => animate())
}

socket.on('state', players => {
  if(playerId && players[playerId] && spritesLoaded) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    Object.keys(players).forEach(key => {
      console.log('hello')
      const player = players[key]
      if (player.currentArea === players[playerId].currentArea) {
        ctx.drawImage(assetManager.getAsset(player.material.name), player.position.x, player.position.y, player.width, player.height)
      }
    })
    players[playerId].currentArea.blocks.forEach(block => {
      ctx.drawImage(assetManager.getAsset(block.material.name), block.position.x, block.position.y, block.width, block.height)
    })
  }
})


/**
 * Initializes all game Objects
 */
function init () {
  if (canvas.getContext) {
    socket.emit('new player')
    ctx = canvas.getContext('2d')
    audioManager.queueDownload('ambient', 'assets/audio/ambient/ambient.mp3')
    audioManager.queueDownload('jump', 'assets/audio/effects/jump.wav')
    audioManager.loadAll(() => {
      //audioManager.playSound('ambient', true)

      // Add all sprites to the download queue
      assetManager.queueDownload('background', 'assets/textures/background.jpg')
      assetManager.queueDownload('player', 'assets/textures/player.png')
      assetManager.queueDownload('stone-block', 'assets/textures/stone-block.jpg')
      assetManager.queueDownload('heart', 'assets/textures/heart.png')
      // Start playing ambient music

      // Download all sprites
      assetManager.downLoadAll(() => {
        animate()
        spritesLoaded = true
      })
    })
  } else {
    document.getElementById('unsupported').textContent = 'Please update your browser or download another one which supports HTML5'
  }
}

socket.on('connect', function () {
  socket.emit('new player')
  playerId = socket.io.engine.id
})

document.addEventListener('DOMContentLoaded', init())
