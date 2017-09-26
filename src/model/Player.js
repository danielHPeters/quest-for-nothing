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
        this.speed = 3;
        this.running = false;
        this.lives = 3;
        this.jumping = false;
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

        this.previous.push(new Vector(this.x, this.y));

        if (this.keyActionsRegister['w']) {

            if (!this.jumping) {
                this.jumping = true;
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

        this.x += this.velX;
        this.y += this.velY;

        this.checkOutOfBounds(map);
    }

    checkOutOfBounds(map) {
        if (this.x + this.width > map.width) {
            this.x = map.width - this.width;
        }
        if (this.x < 0) {
            this.x = 0;
        }

        if (this.y + this.height > map.height) {
            this.y = map.height - this.height;
            this.jumping = false;
        }
        if (this.y < 0) {
            this.y = 0;
        }
    }

    goBack() {
        if (this.previous.length != 0) {
            this.x = this.previous[this.previous.length - 1].x;
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