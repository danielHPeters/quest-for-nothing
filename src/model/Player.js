/**
 * Created by Daniel on 2017-09-18.
 */
class Player extends GameObject {

    constructor(name, x, y, width, height, collisionBox) {
        super(x, y, width, height, collisionBox);
        this.name = name;
    }
}