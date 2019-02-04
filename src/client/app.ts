import GameClient from './application/GameClient'
import Remote from './application/Remote'
import Player from '../game/model/Player'
import Dimension from './graphics/2D/Dimension'

/**
 * Main script.
 *
 * @author Daniel Peters
 * @version 1.0
 */
document.addEventListener('DOMContentLoaded', () => {
  const socket = io()
  const remote = new Remote(socket)
  const gameElement = document.getElementById('game') as HTMLCanvasElement
  const backgroundElement = document.getElementById('background') as HTMLCanvasElement

  if (gameElement && backgroundElement) {
    const context = gameElement.getContext('2d')
    const backgroundContext = backgroundElement.getContext('2d')

    if (context && backgroundContext) {
      const client = new GameClient(
        remote,
        new Dimension(gameElement.width, gameElement.height),
        context,
        backgroundContext
      )

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
      socket.on('state', (players: Player[]) => client.render(players))
    } else {
      const message = 'Please update your browser or download another one which supports HTML5'
      const unsupportedElement = document.getElementById('unsupported')

      if (unsupportedElement) {
        unsupportedElement.textContent = message
      }
    }
  }
})
