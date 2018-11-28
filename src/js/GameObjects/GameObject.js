'use strict';

import Physical from '../Physic/Physical';
import Vec2 from '../Math/Vec2';

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
    constructor(posX, posY, area, collidable){
        super();
        this.position = new Vec2(posX, posY);
        this.direction = new Vec2(0, 0);
        this.speed = 0; //pixel per second
        this.area = area;
        this.collidable = collidable;
    }

    update(dtime) {
        super.update(dtime);
        if(this.speed===0) return;
        let len = this.direction.length();
        let multiplier = this.speed/len;
        let velocity = this.direction.clone().multiply(multiplier*dtime);
        velocity.y = -velocity.y; //because (0, 0) is left top
        this.position.addVec(velocity);
        this.area.move(velocity.x, velocity.y);
    }

    rollback(dtime) {
        super.rollback(dtime);
        let len = this.direction.length();
        let multiplier = this.speed/len;
        let velocity = this.direction.multiply(multiplier*dtime);
        velocity.y = -velocity.y; //because (0, 0) is left top
        this.position.subVec(velocity);
        this.area.move(-velocity.x, -velocity.y);
    }

    /**
     * Sets the speed of the object.
     *
     * @param {number} speed Pixel per second
     */
    setSpeed(speed){
        this.speed = speed;
    }

    /**
     * Returns the speed of the object.
     *
     * @returns {number} Pixel per second
     */
    getSpeed(){
        return this.speed;
    }

    /**
     * Returns if the object's speed is >= 0.
     *
     * @returns {boolean} If the object is movable
     */
    isMovable(){
        return this.speed>0;
    }

    /**
     * Sets the direction of the object.
     *
     * @param {Vec2} direction Direction as Vec2
     */
    setDirection(direction){
        this.direction = direction;
    }

    /**
     * Returns the direction of the game object.
     *
     * @returns {Vec2} A clone of the direction
     */
    getDirection(){
        return this.direction.clone();
    }

    isCollidable(){
        return this.collidable;
    }

    /**
     * Called whenever this object collides with an other collidable gameobject.
     * Physics handling can be denied if the method returns false.
     *
     * @param gameObject
     * @returns {boolean} If physics sould be ignored in this individual case
     */
    onCollideWith(gameObject){
        return false;
    }

}

export default GameObject;
