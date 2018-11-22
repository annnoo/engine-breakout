'use strict';

class Vec2 {
    /**
     *
     * @param {number} x
     * @param {number} y
     */
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    /**
     * Clones the vector
     * @returns {Vec2} A clone of the Vec2
     */
    clone(){
        return new Vec2(this.x, this.y);
    }

    /**
     * Sets the coordinates of the Vec2 to the given x- and y-values
     * @param {number} x
     * @param {number} y
     * @returns {Vec2} this
     */
    set(x, y){
        this.x = x;
        this.y = y;

        return this;
    }

    /**
     * Sets the coordinates of the Vec2 to the coordinates of the given Vec2
     * @param {number} x
     * @param {number} y
     * @returns {Vec2} this
     */
    setVec(other){
        this.x = other.x;
        this.y = other.y;

        return this;
    }

    /**
     * @param {number} x
     * @param {number} y , default 0
     * @returns {Vec2} this
     */
    add(x, y=0){
        this.x += x;
        this.y += y;

        return this;
    }

    /**
     * Adds another Vec2 to the current Vec2
     * @param {Vec2} other
     * @returns {Vec2} this
     */
    addVec(other){
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    /**
     * Subtracts another Vec2 from the current Vec2
     * @param {Vec2} other
     * @returns {Vec2} this
     */
    subVec(other){
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }

    /**
     * Scales the current Vec2 by the given factor
     * @param {number} factor
     * @returns {Vec2}
     */
    multiply(factor){
        this.x *= factor;
        this.y *= factor;

        return this;
    }

    /**
     * Rotates the Vec2
     * @param {number} angle Angle as radiant
     * @returns {Vec2} this
     */
    rotate(angle){
        this.x = this.x* Math.cos(angle) - this.y * Math.sin(angle);
        this.y = this.x* Math.sin(angle) + this.y * Math.cos(angle);

        return this;
    }


    /**
     * Creates a rotated copy of the Vec2
     * @param {number} angle Angle as radiant
     * @returns {Vec2} A rotated copy of the Vec2
     */
    rotated(angle){
        const vec = this.clone();

        vec.x = vec.x* Math.cos(angle) - vec.y * Math.sin(angle);
        vec.y = vec.x* Math.sin(angle) + vec.y * Math.cos(angle);
        return vec;

    }

    /**
     * Normalizes the Vec2
     * @returns {Vec2} this
     */
    normalize(){
        const len = this.length();

        return len > 0 ? this.multiply(1/len) : this;
    }

    /**
     * Returns a normalized clone of the Vec2
     * @returns {Vec2} A normalized clone of the Vec2
     */
    normalized(){
        const vec = this.clone();
        const len = vec.length();

        return len > 0 ? vec.multiply(1/len) : vec;
    }

    /**
     * @param {Vec2} other
     * @returns {number} the dot-product
     */
    dot(other){
        return this.x * other.x + this.y * other.y;
    }

    /**
     * Returns the length of the Vec2
     * @returns {number} The length of the Vec2
     */
    length(){
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    }

    /**
     *
     * @param {Vec2} other The other Vec2
     * @returns {number} The distance to the other Vec2
     */
    distance(other){
        return(Math.pow(this.x - other.x,2) + Math.pow(this.y - other.y,2));
    }

}

export default Vec2;
