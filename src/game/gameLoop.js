'use strict'

/**
 *
 * @type {module.JumpAndRun}
 */
const JumpAndRun = require('./JumpAndRun')
const game = new JumpAndRun()

/**
 * Listen to socket.io events and run update loop.
 *
 * @param io socket.io instance
 */
module.exports = io => {
  io.on('connection', socket => {
    socket.on('new player', () => {
      game.addPlayer(socket.id)
    })
    socket.on('input', playerActions => {
      game.registerPlayerAction(socket.id, playerActions)
    })
    socket.on('disconnect', () => {
      game.removePlayer(socket.id)
      console.log('A player disconnected')
    })
  })
  game.run(players => io.sockets.emit('state', players))
}
