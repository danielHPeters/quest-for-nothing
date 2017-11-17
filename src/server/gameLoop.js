'use strict'

const logger = require('./utils/logger')
/**
 *
 * @type {module.JumpAndRun}
 */
const JumpAndRun = require('../game/JumpAndRun')
const game = new JumpAndRun()

/**
 * Listen to remote.io events and run update loop.
 *
 * @param io remote.io instance
 */
module.exports = io => {
  io.on('connection', socket => {
    socket.on('new player', () => {
      game.addPlayer(socket.id)
      logger.log('info', 'Player ' + socket.id + ' connected.')
    })
    socket.on('input', playerActions => {
      game.registerPlayerAction(socket.id, playerActions)
    })
    socket.on('disconnect', () => {
      game.removePlayer(socket.id)
      logger.log('info', 'Player ' + socket.id + ' disconnected.')
    })
  })
  game.run(players => io.sockets.emit('state', players))
}
