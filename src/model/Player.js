/**
 * Created by Daniel on 2017-09-18.
 */
class Player extends GameObject {

    /**
     *
     * @param name
     * @param x
     * @param y
     * @param width
     * @param height
     * @param collisionBox
     */
    constructor(name, x, y, width, height, collisionBox) {
        super(x, y, width, height, collisionBox);
        this.name = name;
        this.speed = 10;
        this.speedIncrease = 10;
        this.running = false;
    }

    /**
     *
     * @param direction
     */
    move(direction) {

        let moveDistance = this.running ? (this.speed + this.speedIncrease) : this.speed;

        switch (direction) {
            case DirectionsEnum.UP():
                this.y += this.speed;
                break;
            case DirectionsEnum.DOWN():
                this.y -= this.speed;
                break;
            case DirectionsEnum.LEFT():
                this.x += this.speed;
                break;
            case DirectionsEnum.RIGHT():
                this.x -= this.speed;
                break;
            default:
                return;
        }
    }

    toggleRun() {
        this.running = !this.running
    }

    jump() {

    }
}