/**
 * Remote host class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Remote {
  private socket: SocketIOClient.Socket

  constructor (socket: SocketIOClient.Socket) {
    this.socket = socket
  }

  update (data: any): void {
    this.socket.emit('input', data)
  }
}
