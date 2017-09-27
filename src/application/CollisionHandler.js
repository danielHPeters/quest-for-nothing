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

    colCheck(shapeA, shapeB) {
        // get the vectors to check against
        var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
            vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
            // add the half widths and half heights of the objects
            hWidths = (shapeA.width / 2) + (shapeB.width / 2),
            hHeights = (shapeA.height / 2) + (shapeB.height / 2),
            colDir = null;

        // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)
            var oX = hWidths - Math.abs(vX),
                oY = hHeights - Math.abs(vY);
            if (oX >= oY) {

                if (vY > 0) {

                    colDir = "t";
                    shapeA.y += oY;
                } else {

                    colDir = "b";
                    shapeA.y -= oY;
                    $
                    shapeA.jumping = false;
                }

            } else {

                if (vX > 0) {

                    colDir = "l";
                    shapeA.x += oX;
                } else {

                    colDir = "r";
                    shapeA.x -= oX;
                }
            }
        }

        return colDir;
    }

}
