import GameClient from './application/GameClient'
import Remote from './application/Remote'

/**
 * modern browser equivalent of jQuery $(document).ready()
 */
document.addEventListener('DOMContentLoaded', () => {
  const socket = io()
  const remote = new Remote(socket)
  const client = new GameClient(remote, document.getElementById('game') as HTMLCanvasElement)

  /**
   * Initialize player id on remote connection
   */
  socket.on('connect', () => {
    socket.emit('new player')
    client.playerId = socket.io['engine'].id
  })

  /**
   * Listen to remote sending objects to draw.
   * Contains the drawing loop
   */
  socket.on('state', players => client.render(players))
})
