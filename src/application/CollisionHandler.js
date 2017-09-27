/**
 * Created by Daniel on 2017-09-18.
 */
class CollisionHandler {

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

    colCheck(player, object) {

        if(object instanceof Block && !object.solid){

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
                    $
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
