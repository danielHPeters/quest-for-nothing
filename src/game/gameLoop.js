'use strict'

/**
 *
 * @type {module.Game|Game}
 */
const game = require('./app')
/**
 *
 * @type {module.GameObjectFactory}
 */
const GameObjectFactory = require('./factory/GameObjectFactory')

/**
 * Add player on "new player" event.
 *
 * @param {{}} socket socket.io socket
 */
function addPlayer (socket) {
  // Add new connected player and set player location to predefined spawn point
  socket.on('new player', () => {
    let player = GameObjectFactory.getPlayer(
      game.spawnPoint.position.x,
      game.spawnPoint.position.y,
      game.spawnPoint.width,
      game.spawnPoint.height,
      'player',
      game.spawnPoint.area.blocks
    )
    // Currently player is identified via socket id. TODO set a unique player name to identify player
    // player.name = 'Player'
    game.players[socket.id] = player
    game.spawnPoint.area.add(player)

    console.log('Player connected')
  })
}

/**
 * Receive player input and pass to player object.
 *
 * @param {{}} socket socket.io socket
 */
function handlePlayerInput (socket) {
  socket.on('movement', pressedKeys => {
    let player = game.players[socket.id]
    player.registeredInputs = pressedKeys
  })
}

/**
 * Delete player object on disconnect.
 *
 * @param {{}} socket socket.io socket
 */
function handleDisconnect (socket) {
  socket.on('disconnect', () => {
    delete game.players[socket.id]
    console.log('A player disconnected')
  })
}

/**
 * Send objects state 60 times per second to all connected players
 * @param {{}} io socket.io instance
 */
function loopUpdate (io) {
  let lastUpdateTime = (new Date()).getTime()
  setInterval(() => {
    let currentTime = (new Date()).getTime()
    let timeDifference = currentTime - lastUpdateTime
    game.update(timeDifference)
    lastUpdateTime = currentTime
    io.sockets.emit('state', game.players)
  }, 1000 / 60)
}

/**
 * Listen to socket.io events and run update loop.
 *
 * @param io socket.io instance
 */
module.exports = io => {
  io.on('connection', socket => {
    addPlayer(socket)
    handlePlayerInput(socket)
    handleDisconnect(socket)
  })
  loopUpdate(io)
}
