"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HitBox_1 = require("./HitBox");
class QuadTree {
    constructor(hitBox = new HitBox_1.HitBox(0, 0, 0, 0), level = 0) {
        this.level = level;
        this.maxObjects = 10;
        this.maxLevels = 5;
        this.hitBox = hitBox;
        this.objects = [];
        this.nodes = [];
    }
    clear() {
        this.objects = [];
        this.nodes.forEach(node => node.clear());
        this.nodes = [];
    }
    getAllObjects(returnedObjects) {
        this.nodes.forEach(node => node.getAllObjects(returnedObjects));
        this.objects.forEach(object => returnedObjects.push(object));
        return returnedObjects;
    }
    findObjects(returnedObjects, object) {
        if (typeof object === 'undefined') {
            console.log('UNDEFINED OBJECT');
            return;
        }
        let index = this.getIndex(object);
        if (index !== -1 && this.nodes.length) {
            this.nodes[index].findObjects(returnedObjects, object);
        }
        this.objects.forEach(obj => returnedObjects.push(obj));
        return returnedObjects;
    }
    insert(object) {
        if (typeof object === 'undefined') {
            return;
        }
        if (object instanceof Array) {
            object.forEach(element => this.insert(element));
            return;
        }
        if (this.nodes.length > 0) {
            let index = this.getIndex(object);
            if (index !== -1) {
                this.nodes[index].insert(object);
                return;
            }
        }
        this.objects.push(object);
        if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
            if (typeof this.nodes[0] === 'undefined') {
                this.split();
            }
            let i = 0;
            while (i < this.objects.length) {
                let index = this.getIndex(this.objects[i]);
                if (index !== -1) {
                    this.nodes[index].insert((this.objects.splice(i, 1))[0]);
                }
                else {
                    i++;
                }
            }
        }
    }
    getIndex(object) {
        let index = -1;
        let verticalMidpoint = this.hitBox.position.x + this.hitBox.width / 2;
        let horizontalMidpoint = this.hitBox.position.y + this.hitBox.height / 2;
        let topQuadrant = (object.position.y < horizontalMidpoint && object.position.y + object.height < horizontalMidpoint);
        let bottomQuadrant = (object.position.y > horizontalMidpoint);
        if (object.position.x < verticalMidpoint && object.position.x + object.width < verticalMidpoint) {
            if (topQuadrant) {
                index = 1;
            }
            else if (bottomQuadrant) {
                index = 2;
            }
        }
        else if (object.position.x > verticalMidpoint) {
            if (topQuadrant) {
                index = 0;
            }
            else if (bottomQuadrant) {
                index = 3;
            }
        }
        return index;
    }
    split() {
        let subWidth = (this.hitBox.width / 2) | 0;
        let subHeight = (this.hitBox.height / 2) | 0;
        this.nodes[0] = new QuadTree(new HitBox_1.HitBox(this.hitBox.position.x + subWidth, this.hitBox.position.y, subWidth, subHeight), this.level + 1);
        this.nodes[1] = new QuadTree(new HitBox_1.HitBox(this.hitBox.position.x, this.hitBox.position.y, subWidth, subHeight), this.level + 1);
        this.nodes[2] = new QuadTree(new HitBox_1.HitBox(this.hitBox.position.x, this.hitBox.position.y + subHeight, subWidth, subHeight), this.level + 1);
        this.nodes[3] = new QuadTree(new HitBox_1.HitBox(this.hitBox.position.x + subWidth, this.hitBox.position.y + subHeight, subWidth, subHeight), this.level + 1);
    }
}
exports.QuadTree = QuadTree;
