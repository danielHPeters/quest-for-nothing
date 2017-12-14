"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Remote {
    constructor(socket) {
        this.socket = socket;
    }
    update(data) {
        this.socket.emit('input', data);
    }
}
exports.default = Remote;
