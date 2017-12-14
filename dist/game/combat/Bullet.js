"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../model/Entity");
class Bullet extends Entity_1.Entity {
    constructor(x, y, width, height) {
        super(x, y, width, height, 'bullet');
    }
    update() {
        throw new Error('Not implemented!');
    }
}
exports.Bullet = Bullet;
