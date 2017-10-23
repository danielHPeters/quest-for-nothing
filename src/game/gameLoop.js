'use strict'

/**
 *
 * @type {module.Game|Game}
 */
let game = require('./app')

/**
 *
 * @type {module.Player}
 */
let Player = require('./model/Player')
/**
 *
 * @type {module.Material}
 */
let Material = require('./model/Material')

/**
 * Listen to socket.io events.
 *
 * @param io socket.io instance
 */
module.exports = io => {
  io.on('connection', socket => {
    // Add new connected player and set player location to predefined spawn point
    socket.on('new player', () => {
      let player = new Player(
        game.spawnPoint.position.x,
        game.spawnPoint.position.y,
        game.spawnPoint.width,
        game.spawnPoint.height,
        new Material('player'),
        game.spawnPoint.area.blocks
      )
      // Currently player is identified via socket id. TODO set a unique player name to identify player
      player.name = 'Player'
      game.players[socket.id] = player
      game.spawnPoint.area.add(player)

      console.log('Player connected')
    })

    // Get user input
    socket.on('movement', pressedKeys => {
      let player = game.players[socket.id]
      player.keyActionsRegister = pressedKeys
    })

    // Delete player on disconnect
    socket.on('disconnect', () => {
      let playerName = game.players[socket.id] ? game.players[socket.id].name : ''
      delete game.players[socket.id]
      console.log(playerName + ' disconnected')
    })
  })

  // Send objects state 60 times per second to all connected players
  let lastUpdateTime = (new Date()).getTime()
  setInterval(() => {
    let currentTime = (new Date()).getTime()
    let timeDifference = currentTime - lastUpdateTime
    game.update(timeDifference)
    lastUpdateTime = currentTime
    io.sockets.emit('state', game.players)
  }, 1000 / 60)
}
