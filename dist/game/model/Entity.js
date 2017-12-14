"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = require("../../lib/Vector2");
const HitBox_1 = require("../collision/HitBox");
class Entity {
    constructor(x, y, width, height, type) {
        this.position = new Vector2_1.Vector2(x, y);
        this.velocity = new Vector2_1.Vector2(0, 0);
        this.acceleration = new Vector2_1.Vector2(0, 0);
        this.type = type;
        this.width = width;
        this.height = height;
        this.collideAbleWith = [];
        this.colliding = false;
    }
    getCollisionBox() {
        return new HitBox_1.HitBox(this.position.x, this.position.y, this.width, this.height);
    }
    draw() {
        throw new Error('Not Implemented!');
    }
    move(game, timeDifference) {
    }
    isCollideAbleWith(object) {
        return this.collideAbleWith.includes(object.type);
    }
    get solid() {
        return this._solid;
    }
    set solid(solid) {
        this._solid = solid;
    }
}
exports.Entity = Entity;
