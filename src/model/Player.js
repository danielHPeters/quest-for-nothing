/**
 * Created by Daniel on 2017-09-18.
 */
class Player extends Entity {

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
        this.health = 3;
        this.speed = 3;
        this.running = false;
        this.jumping = false;
        this.grounded = false;
        this.previous = [];
        this.friction = 0.8;
        this.gravity = 0.2;
        this.velX = 0;
        this.velY = 0;
    }

    /**
     *
     * @param direction
     */
    move(map) {

        //this.previous.push(new Vector(this.x, this.y));

        if (this.keyActionsRegister['w'] || this.keyActionsRegister[' ']) {

            if (!this.jumping && this.grounded) {
                this.jumping = true;
                this.grounded = false;
                this.velY = -this.speed*2;
            }
        }

        if (this.keyActionsRegister['a']) {
            if (this.velX > -this.speed) {
                this.velX--;
            }
        }

        if (this.keyActionsRegister['d']) {
            if (this.velX < this.speed) {
                this.velX++;
            }
        }

        this.velX *= this.friction;
        this.velY += this.gravity;

        this.grounded = false;
    }

    goBack() {
        if (this.previous.length != 0) {
            this.x = this.previous[this.previous.length - 1 ].x;
            this.y = this.previous[this.previous.length - 1].y;
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
