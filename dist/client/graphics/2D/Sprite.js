"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sprite {
    constructor(id, path) {
        this._id = id;
        this._path = path;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        if (typeof id !== 'string') {
            throw new Error('Param id must be of type number!');
        }
        this._id = id;
    }
    get path() {
        return this._path;
    }
    set path(path) {
        if (typeof path !== 'string') {
            throw new Error('Param path must be of type number!');
        }
        this._path = path;
    }
}
exports.Sprite = Sprite;
