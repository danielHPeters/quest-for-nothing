"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameState {
    constructor(settings) {
        this.settings = settings;
        this.spawnPoint = null;
        this.players = [];
        this.running = false;
        this.areas = [];
        this.blocks = [];
    }
    update(timeDifference) {
        this.players.forEach(player => player.move(this, timeDifference));
        this.areas.forEach(area => area.checkPlayers());
    }
}
exports.GameState = GameState;
