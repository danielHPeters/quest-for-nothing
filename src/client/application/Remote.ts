export default class Remote {
  private socket

  public constructor (socket) {
    this.socket = socket
  }

  public update (data) {
    this.socket.emit('input', data)
  }
}
