/**
 * Created by Daniel on 2017-09-18.
 */
"use strict";
class GameObject {

    /**
     *
     * @param x
     * @param y
     * @param width
     * @param height
     * @param collisionBox
     */
    constructor(x, y, width, height, collisionBox, material){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.collisionBox = collisionBox;
        this.material = material;
    }
}