import { logger } from './utils/logger'
import JumpAndRun from '../game/JumpAndRun'

/**
 * GameLoop class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class GameLoop {
  private server: SocketIO.Server
  private game: JumpAndRun

  constructor (server: SocketIO.Server) {
    this.server = server
    this.game = new JumpAndRun()
  }

  /**
   * Start the game loop.
   */
  start (): void {
    this.server.on('connection', socket => {
      socket.on('new player', () => {
        this.game.addPlayer(socket.id)
        logger.log('info', 'Player ' + socket.id + ' connected.')
      })
      socket.on('input', playerActions => this.game.registerPlayerAction(socket.id, playerActions))
      socket.on('disconnect', () => {
        this.game.removePlayer(socket.id)
        logger.log('info', 'Player ' + socket.id + ' disconnected.')
      })
    })
    this.game.run(players => this.server.sockets.emit('state', players))
  }
}
