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
let Material = require('./model/Material')

module.exports = function (io) {
  io.on('connection', function (socket) {
    socket.on('new player', () => {
      let player = new Player(
        game.spawnPoint.position.x,
        game.spawnPoint.position.y,
        game.spawnPoint.width,
        game.spawnPoint.height,
        new Material('player'),
        game.spawnPoint.area
      )
      player.name = 'Player' + (game.players.length + 1)
      game.players[socket.id] = player

      console.log('Player connected')
      socket.emit('registered player', socket.id)
    })

    socket.on('movement', pressedKeys => {
      let player = game.players[socket.id]
      player.keyActionsRegister = pressedKeys
    })

    socket.on('disconnect', () => {
      let playerName = game.players[socket.id] ? game.players[socket.id].name : ''
      game.players.splice(socket.id, 1)
      console.log(playerName + ' disconnected')
    })
  })

  let lastUpdateTime = (new Date()).getTime()
  let interval = setInterval(function () {
    let currentTime = (new Date()).getTime()
    let timeDifference = currentTime - lastUpdateTime
    game.update(timeDifference)
    lastUpdateTime = currentTime
    io.sockets.emit('state', game)
  }, 1000 / 60)

  clearInterval(interval)
}
