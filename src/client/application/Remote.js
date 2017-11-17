export default class Remote {
  constructor (socket) {
    this.socket = socket
  }

  update (data) {
    this.socket.emit('input', data)
  }
}
