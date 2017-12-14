"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("../../lib/observer/Observable");
var Actions;
(function (Actions) {
    Actions["UP"] = "UP";
    Actions["DOWN"] = "DOWN";
    Actions["LEFT"] = "LEFT";
    Actions["RIGHT"] = "RIGHT";
    Actions["SHOOT"] = "SHOOT";
    Actions["RESTART"] = "RESTART";
    Actions["JUMP"] = "JUMP";
})(Actions = exports.Actions || (exports.Actions = {}));
class InputManager extends Observable_1.Observable {
    constructor(settings) {
        super();
        this.inputMap = settings.keyBoard;
        this.init();
        this.initializeTouchHandler();
        this.touches = {
            start: [],
            move: []
        };
    }
    init() {
        window.addEventListener('keydown', event => {
            let key = event.key !== ' ' ? event.key : 'space';
            this.state[this.inputMap[key]] = true;
            this.notify();
        });
        window.addEventListener('keyup', event => {
            let key = event.key !== ' ' ? event.key : 'space';
            this.state[this.inputMap[key]] = false;
            this.notify();
        });
    }
    initializeTouchHandler() {
        let button = document.getElementById('move');
        let el = button ? button : window;
        el.addEventListener('touchstart', handleTouchStart, false);
        el.addEventListener('touchmove', handleTouchMove, false);
        el.addEventListener('touchend', handleTouchEnd, false);
        el.addEventListener('contextmenu', event => {
            event.preventDefault();
            return false;
        });
        let start = [];
        let move = [];
        let touchstartX = 0;
        let touchstartY = 0;
        let toucheMoveX = 0;
        let touchMoveY = 0;
        let thisInstance = this;
        function handleTouchStart(evt) {
            evt.preventDefault();
            start = evt.touches;
            touchstartX = evt.touches[0].pageX;
            touchstartY = evt.touches[0].pageY;
        }
        function handleTouchMove(evt) {
            thisInstance.reset();
            evt.preventDefault();
            move = evt.changedTouches;
            toucheMoveX = evt.touches[0].pageX;
            touchMoveY = evt.touches[0].pageY;
            for (let i = 0; i < evt.touches.length; i++) {
                if (move[i].pageX < start[i].pageX) {
                    thisInstance.state[thisInstance.inputMap['a']] = true;
                }
                if (move[i].pageX > start[i].pageX) {
                    thisInstance.state[thisInstance.inputMap['d']] = true;
                }
                if (move[i].pageY < start[i].pageY) {
                    thisInstance.state[thisInstance.inputMap['w']] = true;
                }
                if (move[i].pageY > start[i].pageY) {
                    thisInstance.state[thisInstance.inputMap['s']] = true;
                }
                thisInstance.notify();
            }
        }
        function handleTouchEnd(evt) {
            evt.preventDefault();
            thisInstance.reset();
        }
    }
    shoot() {
        this.state[this.inputMap['space']] = true;
    }
    cancelShoot() {
        this.state[this.inputMap['space']] = false;
    }
    reset() {
        this.state[this.inputMap['w']] = false;
        this.state[this.inputMap['a']] = false;
        this.state[this.inputMap['s']] = false;
        this.state[this.inputMap['d']] = false;
    }
}
exports.InputManager = InputManager;
