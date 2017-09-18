/**
 * Created by Daniel on 2017-09-18.
 */
class Map {

    /**
     *
     * @param x
     * @param y
     * @param width
     * @param height
     * @param platforms
     */
    constructor(x, y, width, height, platforms) {
        this.platforms = platforms;
        this.bounds = new CollisionBounds(x, y, width, height);
    }
}