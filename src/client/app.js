'use strict'

import GameClient from './application/GameClient'

let socket = io()
let client = new GameClient(socket, document.getElementById('game'))

/**
 * modern browser equivalent of jQuery $(document).ready()
 */
document.addEventListener('DOMContentLoaded', client.init())

/**
 * Initialize player id on socket connection
 */
socket.on('connect', () => {
  // Tell server to add this player
  socket.emit('new player')
  // remember socket id to identify current player when drawing
  client.playerId = socket.io.engine.id
})

/**
 * Listen to server sending objects to draw.
 * Contains the drawing loop
 */
socket.on('state', players => {
  client.render(players)
})
