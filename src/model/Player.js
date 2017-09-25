/**
 * Created by Daniel on 2017-09-18.
 */
class Player extends GameObject {

    /**
     *
     * @param {string} name
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {CollisionBounds} collisionBox
     * @param {Material} material
     */
    constructor(name, x, y, width, height, material) {
        super(x, y, width, height, material);
        this.name = name;
        this.speed = 5;
        this.speedIncrease = 5;
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
                this.y -= moveDistance;
                break;
            case DirectionsEnum.DOWN():
                this.y += moveDistance;
                break;
            case DirectionsEnum.LEFT():
                this.x -= moveDistance;
                break;
            case DirectionsEnum.RIGHT():
                this.x += moveDistance;
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