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
        this.speed = 3.6;
        this.running = false;
        this.jumping = false;
        this.grounded = false;
        this.history = [];
        this.friction = 0.8;
        this.gravity = 0.2;
        this.velX = 0;
        this.velY = 0;
    }

    /**
     *
     * @param direction
     */
    move(blocks) {

        //this.previous.push(new Vector(this.x, this.y));

        if (this.keyActionsRegister['w'] || this.keyActionsRegister[' ']) {

            if (!this.jumping && this.grounded) {
                this.jumping = true;
                this.grounded = false;
                this.velY = -this.speed * 2;
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

        blocks.forEach(block => {

            const direction = this.checkCollision(this, block);

            if (direction === "l" || direction === "r") {

                this.velX = 0;
                this.jumping = false;

            } else if (direction === "b") {

                this.grounded = true;
                this.jumping = false;

            } else if (direction === "t") {

                this.velY *= -1;
            }
        });

        if (this.grounded) {

            this.velY = 0;
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    goBack() {
        if (this.previous.length != 0) {
            this.x = this.history[this.history.length - 1].x;
            this.y = this.history[this.history.length - 1].y;
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

    checkCollision(player, object) {

        if (object instanceof Block && !object.solid) {

            return;
        }

        // get the vectors to check against
        let vX = (player.x + (player.width / 2)) - (object.x + (object.width / 2)),
            vY = (player.y + (player.height / 2)) - (object.y + (object.height / 2)),
            // add the half widths and half heights of the objects
            hWidths = (player.width / 2) + (object.width / 2),
            hHeights = (player.height / 2) + (object.height / 2),
            colDir = null;

        // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)

            let oX = hWidths - Math.abs(vX),
                oY = hHeights - Math.abs(vY);
            if (oX >= oY) {

                if (vY > 0) {

                    colDir = "t";
                    player.y += oY;
                } else {

                    colDir = "b";
                    player.y -= oY;
                    player.jumping = false;
                }

            } else {

                if (vX > 0) {

                    colDir = "l";
                    player.x += oX;
                } else {

                    colDir = "r";
                    player.x -= oX;
                }
            }
        }

        return colDir;
    }
}
