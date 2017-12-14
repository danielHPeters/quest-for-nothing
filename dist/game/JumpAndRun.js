"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Settings_1 = require("./model/Settings");
const GameObjectFactory_1 = require("./factory/GameObjectFactory");
const GameState_1 = require("./model/GameState");
const LevelLoader_1 = require("./factory/LevelLoader");
class JumpAndRun {
    constructor() {
        this.settings = new Settings_1.Settings();
        this.state = new GameState_1.GameState(this.settings);
        this.levelLoader = new LevelLoader_1.LevelLoader('./../../levels/');
        this.levelLoader.loadLevel(this.state, 'default');
    }
    addPlayer(playerId) {
        if (!this.state.players.find(player => { return player.id === playerId; })) {
            let player = GameObjectFactory_1.GameObjectFactory.getPlayer(playerId, this.state.spawnPoint.position.x, this.state.spawnPoint.position.y, this.state.spawnPoint.width, this.state.spawnPoint.height, 'player', this.state.spawnPoint.area);
            this.state.players.push(player);
            this.state.spawnPoint.area.add(player);
        }
    }
    removePlayer(playerId) {
        this.state.players = this.state.players.filter(player => { return player.id !== playerId; });
    }
    registerPlayerAction(playerId, actions) {
        this.state.players.find(player => { return player.id === playerId; }).registeredInputs = actions;
    }
    run(callback) {
        let lastUpdateTime = (new Date()).getTime();
        setInterval(() => {
            let currentTime = (new Date()).getTime();
            let timeDifference = currentTime - lastUpdateTime;
            this.state.update(timeDifference);
            lastUpdateTime = currentTime;
            callback(this.state.players);
        }, 1000 / 60);
    }
}
exports.JumpAndRun = JumpAndRun;
