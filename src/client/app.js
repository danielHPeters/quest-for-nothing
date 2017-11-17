'use strict'

import GameClient from './application/GameClient'
import Remote from './application/Remote'

let socket = io()
let remote = new Remote(socket)
let client = new GameClient(remote, document.getElementById('game'))

/**
 * modern browser equivalent of jQuery $(document).ready()
 */
document.addEventListener('DOMContentLoaded', () => {
  client.init()
})

/**
 * Initialize player id on remote connection
 */
socket.on('connect', () => {
  socket.emit('new player')
  client.playerId = socket.io.engine.id
})

/**
 * Listen to remote sending objects to draw.
 * Contains the drawing loop
 */
socket.on('state', players => {
  client.render(players)
})
