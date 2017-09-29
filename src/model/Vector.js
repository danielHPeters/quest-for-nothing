class Vector {

    /**
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    static sAdd(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    static sSub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y)
    }

    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    static sMult(vector, scalar) {
        return new Vector(vector.x * scalar, vector.y * scalar);
    }

    div(scalar) {
        this.x /= scalar;
        this.y /= scalar;
    }

    static sDiv(vector, scalar) {
        return new Vector(vector.x / scalar, vector.y / scalar);
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    setMag() {

    }

    normalize() {
        let magnitude = this.mag();
        if (magnitude != 0) {
            div(m);
        }
    }

    limit(max) {

        if (this.mag() > max) {
            this.normalize();
            this.mult(max);
        }
    }

    heading() {

    }

    rotate() {

    }

    lerp() {

    }

    dist() {

    }

    angleBetween() {

    }

    dot() {

    }

    cross() {

    }

    random2D() {

    }

    random3D() {

    }
}
