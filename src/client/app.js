'use strict'

import AudioManager from './application/AudioManager'
import AssetManager from './application/AssetManager'
import KeyboardEventHandler from './application/KeyboardEventHandler'

let socket = io()
let canvas = document.getElementById('game')
let keyEventHandler = new KeyboardEventHandler(canvas)
let audioManager = new AudioManager()
let assetManager = new AssetManager()
let playerId
let ctx

socket.on('state', game => {
  console.log('changed state')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  console.log(game)
  game.players.forEach(player => {
    if (player.currentArea === game.players[playerId].currentArea) {
      ctx.drawImage(assetManager.getAsset(player.material.name), player.position.x, player.position.y, player.width, player.height)
    }
  })
  game.players[playerId].currentArea.blocks.forEach(block => {
    ctx.drawImage(assetManager.getAsset(block.material.name), block.position.x, block.position.y, block.width, block.height)
  })
})

/**
 *
 * @param ctx
 * @param canvas
 */
function animate () {
  // Clear game before drawing new animation
  socket.emit('movement', keyEventHandler.keyActionsRegister)

  // Request new frame when ready. Allows the game to play in a loop
  window.requestAnimationFrame(() => animate())
}

/**
 * Initializes all game Objects
 */
function init () {
  audioManager.queueDownload('ambient', 'assets/audio/ambient/ambient.mp3')
  audioManager.queueDownload('jump', 'assets/audio/effects/jump.wav')
  audioManager.loadAll(() => {
    audioManager.playSound('ambient', true)

    // Add all sprites to the download queue
    assetManager.queueDownload('background', 'assets/textures/background.jpg')
    assetManager.queueDownload('player', 'assets/textures/player.png')
    assetManager.queueDownload('stone-block', 'assets/textures/stone-block.jpg')
    assetManager.queueDownload('heart', 'assets/textures/heart.png')
    // Start playing ambient music

    // Download all sprites
    assetManager.downLoadAll(() => {
      socket.emit('new player')
    })
  })
}

document.addEventListener('DOMContentLoaded', init())

socket.on('message', function (data) {
  console.log(data)
})

socket.on('registered player', data => {
  if (canvas.getContext) {
    ctx = canvas.getContext('2d')
    animate()
  } else {
    document.getElementById('unsupported').textContent = 'Please update your browser or download another one which supports HTML5'
  }
})
