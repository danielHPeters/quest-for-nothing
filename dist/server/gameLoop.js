'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./utils/logger");
const JumpAndRun_1 = require("../game/JumpAndRun");
const game = new JumpAndRun_1.JumpAndRun();
module.exports = io => {
    io.on('connection', socket => {
        socket.on('new player', () => {
            game.addPlayer(socket.id);
            logger_1.logger.log('info', 'Player ' + socket.id + ' connected.');
        });
        socket.on('input', playerActions => {
            game.registerPlayerAction(socket.id, playerActions);
        });
        socket.on('disconnect', () => {
            game.removePlayer(socket.id);
            logger_1.logger.log('info', 'Player ' + socket.id + ' disconnected.');
        });
    });
    game.run(players => io.sockets.emit('state', players));
};
