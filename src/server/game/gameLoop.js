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

module.exports = function (io) {
  io.on('connection', function (socket) {
    socket.on('new player', () => {
      game.players[socket.id] = new Player()
      console.log('Player connected')
    })

    socket.on('movement', data => {
      let player = game.players ? game.players[socket.id] : {}
      player.keyActionsRegister = data
    })

    socket.on('disconnect', () => {
      let playerName = game.players[socket.id] ? game.players[socket.id].name : ''
      game.players.splice(socket.id, 1)
      console.log(playerName + ' disconnected')
    })
  })

  setInterval(function () {
    io.sockets.emit('state', game.players)
  }, 1000 / 60)
}

let lastUpdateTime = (new Date()).getTime()
setInterval(function () {
  let currentTime = (new Date()).getTime()
  let timeDifference = currentTime - lastUpdateTime
  game.update(timeDifference)
  lastUpdateTime = currentTime
}, 1000 / 60)
