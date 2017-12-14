"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameClient_1 = require("./application/GameClient");
const Remote_1 = require("./application/Remote");
document.addEventListener('DOMContentLoaded', () => {
    let socket = io();
    let remote = new Remote_1.default(socket);
    let client = new GameClient_1.default(remote, document.getElementById('game'));
    console.log('hi');
    socket.on('connect', () => {
        socket.emit('new player');
        client.playerId = socket.io['engine'].id;
    });
    socket.on('state', players => {
        client.render(players);
    });
});
