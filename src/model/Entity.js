/**
 * Created by Daniel on 2017-09-18.
 */
"use strict";

class Entity {

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {Material} material
     */
    constructor(x, y, width, height, material) {

        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.width = width;
        this.height = height;
        this.material = material;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    getX(){
        return this.x;
    }

    setX(x){
        this.x = x;
    }

    getY(){
        return this.y;
    }

    setY(y){
        this.y = y;
    }

    getWidth(){
        return this.width;
    }

    setWidth(width){
        this.width = width;
    }

    getCollisionBox() {
        return new CollisionBounds(this.position.x, this.position.y, this.width, this.height);
    }

    render(ctx){
        ctx.drawImage(this.material.getSprite(), this.position.x, this.position.y, this.width, this.height)
    }
}