"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("./Entity");
const Item_1 = require("./Item");
const InputManager_1 = require("../../client/application/InputManager");
class Player extends Entity_1.Entity {
    constructor(id, x, y, width, height, type, area) {
        super(x, y, width, height, type);
        this.id = id;
        this.lives = 3;
        this.coins = 0;
        this.jumpHeight = 3.6;
        this.speed = 12;
        this.running = false;
        this.jumping = false;
        this.grounded = false;
        this.solid = false;
        this.registeredInputs = [];
        this.friction = 0.8;
        this.gravity = 0.2;
        this.viewport = { blocks: area.blocks, areaId: area.id };
        this.edges = {
            left: false,
            right: false,
            top: false,
            bottom: false
        };
    }
    move(game, timeDifference) {
        if (this.registeredInputs[InputManager_1.Actions.UP] || this.registeredInputs[InputManager_1.Actions.JUMP]) {
            if (!this.jumping && this.grounded) {
                this.jumping = true;
                this.grounded = false;
                this.velocity.y = -this.jumpHeight * 2;
            }
        }
        if (this.registeredInputs[InputManager_1.Actions.LEFT]) {
            if (this.velocity.x > -this.speed) {
                this.velocity.x--;
            }
        }
        if (this.registeredInputs[InputManager_1.Actions.RIGHT]) {
            if (this.velocity.x < this.speed) {
                this.velocity.x++;
            }
        }
        this.velocity.x *= this.friction;
        this.velocity.y += this.gravity;
        this.grounded = false;
        this.viewport.blocks.forEach(block => {
            const direction = this.checkCollision(block);
            if (direction === 'l' || direction === 'r') {
                this.velocity.x = 0;
                this.jumping = false;
            }
            else if (direction === 'b') {
                this.grounded = true;
                this.jumping = false;
            }
            else if (direction === 't') {
                this.velocity.y *= -1;
            }
        });
        if (this.grounded) {
            this.velocity.y = 0;
        }
        this.position.addVector(this.velocity);
        this.checkEdges(game);
    }
    gainLife() {
        this.lives += 1;
    }
    loseLife() {
        this.lives -= 1;
    }
    toggleRun() {
        this.running = !this.running;
    }
    checkCollision(object) {
        if (!(object instanceof Entity_1.Entity) || !object.solid) {
            return '';
        }
        let vX = (this.position.x + (this.width / 2)) - (object.position.x + (object.width / 2));
        let vY = (this.position.y + (this.height / 2)) - (object.position.y + (object.height / 2));
        let hWidths = (this.width / 2) + (object.width / 2);
        let hHeights = (this.height / 2) + (object.height / 2);
        let colDir = '';
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
            if (object instanceof Item_1.Item && object.type === 'coin') {
                this.coins += 1;
                this.viewport.blocks.splice(this.viewport.blocks.indexOf(object), 1);
                return '';
            }
            let oX = hWidths - Math.abs(vX);
            let oY = hHeights - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = 't';
                    this.position.y += oY;
                }
                else {
                    colDir = 'b';
                    this.position.y -= oY;
                    this.jumping = false;
                }
            }
            else {
                if (vX > 0) {
                    colDir = 'l';
                    this.position.x += oX;
                }
                else {
                    colDir = 'r';
                    this.position.x -= oX;
                }
            }
        }
        return colDir;
    }
    checkEdges(game) {
        if (this.position.x > game.settings.canvasWidth) {
            this.edges.right = true;
            this.position.x = this.viewport.blocks[0].width;
        }
        else if (this.position.x < 0) {
            this.edges.left = true;
            this.position.x = game.settings.canvasWidth - this.viewport.blocks[0].width;
        }
        else if (this.position.y > game.settings.canvasHeight) {
            this.edges.bottom = true;
            this.position.y = this.viewport.blocks[0].height;
        }
        else if (this.position.y < 0) {
            this.edges.top = true;
            this.position.y = game.settings.canvasHeight - this.viewport.blocks[0].height;
        }
    }
}
exports.Player = Player;
