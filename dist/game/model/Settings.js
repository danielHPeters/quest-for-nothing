"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InputManager_1 = require("../../client/application/InputManager");
class Settings {
    constructor() {
        this.canvasWidth = 900;
        this.canvasHeight = 480;
        this.keyBoard = {
            'w': InputManager_1.Actions.UP,
            's': InputManager_1.Actions.DOWN,
            'a': InputManager_1.Actions.LEFT,
            'd': InputManager_1.Actions.RIGHT,
            'space': InputManager_1.Actions.JUMP,
            'r': InputManager_1.Actions.RESTART
        };
        this.player = {
            maxVelocity: 15,
            fireDelay: 15,
            friction: 0.7,
            acceleration: 3
        };
        this.audio = {
            master: 1,
            ambient: 1,
            effects: 1
        };
    }
}
exports.Settings = Settings;
