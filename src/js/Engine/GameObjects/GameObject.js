'use strict';

import Physical from '../CollisionDetection/Physical';
import Vec2 from '../Math/Vec2';
import Area from '../Math/Area';


/**
 * @author Yannik Ries
 */
class GameObject extends Physical {

    /**
     * Creates a new GameObject.
     *
     * @param {number} posX Initial x position
     * @param {number} posY {number} Initial y position
     * @param {Area} area Initial y position
     * @param {boolean} collidable If the object can collide with other collidable objects
     */
    constructor(posX, posY, area, collidable) {
        super();


        this.position = new Vec2(posX, posY);
        this.direction = new Vec2(0, 0);
        this.speed = 0; //pixel per second
        /** @property {Area} */
        this.area = area;

        this.collidable = collidable;
    }

    update(dtime) {
        super.update(dtime);
        return this._update(dtime);
    }

    rollback(dtime) {
        super.rollback(dtime);
        return this._update(dtime, true);
    }

    /**
     * Calculates and updates the position of the object with its direction and speed.
     *
     * @param dtime Time since last call [s]
     * @param invert If the direction should be inverted
     * @private
     */
    _update(dtime, invert = false) {
        if (this.speed === 0) return false;
        let len = this.direction.length();
        let multiplier = this.speed / len;
        let velocity = this.direction.clone().multiply(multiplier * dtime);
        velocity.y = -velocity.y; //because (0, 0) is left top
        if(invert){
            velocity.multiply(-1);
        }
        this.position.addVec(velocity);
        this.area.move(velocity.x, velocity.y);
        return velocity.length()!=0;
    }

    /**
     * Sets the new position of the game object.
     *
     * @param posX New x position
     * @param posY New y position
     */
    setPosition(posX, posY){
        this.area.moveTo(posX, posY);
        this.position.set(posX, posY);
    }

    /**
     * Returns the current position of the game object
     *
     * @returns {Vec2} Current position
     */
    getPosition(){
        return this.position;
    }

    /**
     * Sets the speed of the object.
     *
     * @param {number} speed Pixel per second
     */
    setSpeed(speed) {
        this.speed = speed;
    }

    /**
     * Returns the speed of the object.
     *
     * @returns {number} Pixel per second
     */
    getSpeed() {
        return this.speed;
    }

    /**
     * Returns if the object's speed is >= 0.
     *
     * @returns {boolean} If the object is movable
     */
    isMovable() {
        return this.speed > 0;
    }

    /**
     * Sets the direction of the object.
     *
     * @param {Vec2} direction Direction as Vec2
     */
    setDirection(direction) {
        this.direction = direction;
    }

    /**
     * Returns the direction of the game object.
     *
     * @returns {Vec2} A clone of the direction
     */
    getDirection() {
        return this.direction.clone();
    }

    isCollidable() {
        return this.collidable;
    }

    /**
     * Called whenever this object collides with an other collidable gameobject.
     * Physics handling can be denied if the method returns false.
     *
     * @param gameObject
     * @returns {boolean} If physics sould be ignored in this individual case
     */
    onCollideWith(gameObject) {
        return false;
    }

}

export default GameObject;
