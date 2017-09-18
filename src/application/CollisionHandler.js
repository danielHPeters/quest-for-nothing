/**
 * Created by Daniel on 2017-09-18.
 */
class CollisionHandler {

    constructor() {

    }

    /**
     *
     * @param rect1
     * @param rect2
     * @param callback
     */
    handleCollision(rect1, rect2, callback) {

        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {

            callback();
        }
    }
}