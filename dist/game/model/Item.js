"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("./Entity");
class Item extends Entity_1.Entity {
    constructor(x, y, width, height, type, description, action) {
        super(x, y, width, height, type);
        this.description = description;
        this.action = action;
        this.solid = true;
    }
    set description(description) {
        if (typeof description !== 'string') {
            throw new Error('item description must be of type string');
        }
        this._description = description;
    }
    set action(action) {
        if (typeof action !== 'function') {
            throw new Error('item action must be of type function');
        }
        this._action = action;
    }
    get description() {
        return this._description;
    }
    get action() {
        return this._action;
    }
    use() {
        this.action();
    }
}
exports.Item = Item;
