"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("./Entity");
class Block extends Entity_1.Entity {
    constructor(x, y, width, height, type) {
        super(x, y, width, height, type);
        this.solid = true;
    }
}
exports.Block = Block;
