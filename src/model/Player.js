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
        this.lives = 3;
        this.falling = true;
        this.previous = [];
    }

    /**
     *
     * @param direction
     */
    move(direction) {

        this.previous.push(new Vector(this.x, this.y));

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

    checkOutOfBounds(map){
        if (this.x + this.width > map.width) {
            this.x = map.width - this.width;
        }
        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y + this.height > map.height) {
            this.y = map.height - this.height;
        }
        if (this.y < 0) {
            this.y = 0;
        }
    }

    goBack(){
        if(this.previous.length != 0){
            this.x = this.previous[this.previous.length -1].x;
            this.y = this.previous[this.previous.length -1].y;
        }
    }

    getLives() {
        return this.lives;
    }

    /**
     *
     * @param {number} lives
     */
    setLives(lives) {
        this.lives = lives;
    }

    gainLife() {
        this.lives += 1;
    }

    loseLife() {
        this.lives -= 1;
    }

    toggleRun() {
        this.running = !this.running
    }

    jump() {

    }
}