"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Area {
    constructor(id, left = null, right = null, top = null, bottom = null) {
        this._id = id;
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
        this._blocks = [];
        this._players = [];
    }
    checkPlayers() {
        this._players.forEach(player => {
            if (player.edges.left && this.hasLeft()) {
                player.edges.left = false;
                this._left.add(player);
                this.remove(player);
            }
            else if (player.edges.right && this.hasRight()) {
                player.edges.right = false;
                this._right.add(player);
                this.remove(player);
            }
            else if (player.edges.bottom && this.hasBottom()) {
                player.edges.bottom = false;
                this._bottom.add(player);
                this.remove(player);
            }
            else if (player.edges.top && this.hasTop()) {
                player.edges.top = false;
                this._top.add(player);
                this.remove(player);
            }
        });
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get blocks() {
        return this._blocks;
    }
    set blocks(value) {
        this._blocks = value;
    }
    get players() {
        return this._players;
    }
    set players(value) {
        this._players = value;
    }
    set left(left) {
        if (!(left instanceof Area || left === null)) {
            throw new Error('"left" must be an instance of Area or null.');
        }
        this._left = left;
    }
    set right(right) {
        if (!(right instanceof Area || right === null)) {
            throw new Error('"right" must be an instance of Area or null.');
        }
        this._right = right;
    }
    set top(top) {
        if (!(top instanceof Area || top === null)) {
            throw new Error('"top" must be an instance of Area or null.');
        }
        this._top = top;
    }
    set bottom(bottom) {
        if (!(bottom instanceof Area || bottom === null)) {
            throw new Error('"bottom" must be an instance of Area or null.');
        }
        this._bottom = bottom;
    }
    get left() {
        return this._left;
    }
    get right() {
        return this._right;
    }
    get top() {
        return this._top;
    }
    get bottom() {
        return this._bottom;
    }
    add(player) {
        this._players.push(player);
        player.viewport.blocks = this._blocks;
        player.viewport.areaId = this._id;
    }
    remove(player) {
        this._players = this._players.filter(item => item !== player);
    }
    hasLeft() {
        return this.left !== null;
    }
    hasRight() {
        return this._right !== null;
    }
    hasTop() {
        return this._top !== null;
    }
    hasBottom() {
        return this._bottom !== null;
    }
}
exports.Area = Area;
