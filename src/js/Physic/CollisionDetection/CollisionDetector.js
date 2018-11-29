'use strict';

import LayeredRenderer from '../../Renderer/LayeredRenderer';
import Vec2 from '../../Math/Vec2';

/**
 * Handles collisions of gameobjects
 *
 * @author Yannik Ries
 */
class CollisionDetector {

    /**
     * Creates a new CollisionDetector that works with every GameObject saved in the
     * layeredRenderer.
     *
     * @param {LayeredRenderer} layeredRenderer
     */
    constructor(layeredRenderer) {
        this.layers = layeredRenderer.layers;
    }

    /**
     * Called every game loop tick
     *
     * @param {number} dtime time since last call [s]
     * @param {number} depth Deepness of the recursive calls.
     *      -1 = everything, 0 = the current area, 1 = includes subareas, 2 = includes the subareas of subareas, ...
     * @param {GameObject} gameObject The object that should be checked against all other objects
     */
    handleCollisions(dtime, gameObject, depth) {

        for (let tLayer of this.layers) {
            for (let tGameObject in tLayer.state) {
                checkAllCollisions(tGameObject, this.layers, depth, dtime);
            }
        }
    }

}

const checkAllCollisions = (tGameObject, layers, depth, dtime) => {

    if (!tGameObject.isCollidable()) return;

    tGameObject.collidedWithMovableObject = false;

    for (let oLayer of layers) {
        for (let oGameObject in oLayer) {
            if (tGameObject == oGameObject) continue; //gameobjects cannot collide with themself
            if (!oGameObject.isCollidable()) continue; //both gameobjects must be collidable
            let success = checkCollision(tGameObject, oGameObject, depth, dtime);
        }
    }

};

const checkCollision = (tGameObject, oGameObject, depth, dtime) => {

    if (tGameObject.preferesCircleCollider() && oGameObject.preferesCircleCollider()) {
        return checkCircleCollision(tGameObject, oGameObject, dtime);
    } else {
        return checkBoxCollision(tGameObject, oGameObject, depth, dtime);
    }
};

const checkCircleCollision = (tGameObject, oGameObject, dtime) => {

    if (tGameObject.area.circleCollidesWith(oGameObject.area)) {

        //check which object is movable => call onCollideWith on the movable object
        let ignorePhysics = false;
        if (tGameObject.isMovable()) {
            ignorePhysics = tGameObject.onCollideWith(oGameObject);
        } else if (oGameObject.isMovable()) {
            ignorePhysics = oGameObject.onCollideWith(tGameObject);
        } else {
            ignorePhysics = tGameObject.onCollideWith(oGameObject);
        }

        if (!ignorePhysics) {
            updateDirections(tGameObject, oGameObject, dtime);
        }

        return true;
    }

    return false;
};

const checkBoxCollision = (tGameObject, oGameObject, depth, dtime) => {

    if (tGameObject.area.boxCollidesWith(oGameObject.area, depth)) {

        //check which object is movable => call onCollideWith on the movable object
        let ignorePhysics = false;
        if (tGameObject.isMovable()) {
            ignorePhysics = tGameObject.onCollideWith(oGameObject);
        } else if (oGameObject.isMovable()) {
            ignorePhysics = oGameObject.onCollideWith(tGameObject);
        } else {
            ignorePhysics = tGameObject.onCollideWith(oGameObject);
        }

        if (!ignorePhysics) {
            updateDirections(tGameObject, oGameObject, dtime);
        }

        return true;
    }

    return false;
};

const updateDirections = (tGameObject, oGameObject, dtime) => {
    //TODO: fix calculation!

    if (tGameObject.isMovable() && oGameObject.isMovable()) {
        if(tGameObject.collidedWithMovableObject) return; //just transfer the energy to one other game object
        tGameObject.collidedWithMovableObject = true;
        updateBothDirections(tGameObject, oGameObject, dtime);
    } else {
        updateMovableDirection(tGameObject, oGameObject, dtime);
    }
};

const getT = (tGO, oGO) => {

    //Ball 1
    let m1 = 1; //masse
    let v1 = tGO.getDirection().clone(); //velocity before collision
    let v_1; //velocity after collision
    let o1 = {
        x: tGO.position.x + tGO.dimensions.width / 2,
        y: tGO.position.y + tGO.dimensions.height / 2
    }; //mittelpunkt
    let x1 = new Vec2(o1.x, o1.y); //mittelpunkt als vec2

    //Ball 2
    let m2 = 1; //masse
    let v2 = oGO.getDirection().clone(); //velocity before collision
    let v_2; //velocity after collision
    let o2 = {
        x: oGO.position.x + oGO.dimensions.width / 2,
        y: oGO.position.y + oGO.dimensions.height / 2
    }; //mittelpunkt
    let x2 = new Vec2(o2.x, o2.y); //mittelpunkt als vec2

    // =================

    let n = x2.clone().subVec(x1);
    n.normalize();

    return n;
};

const updateMovableDirection = (tGameObject, oGameObject, dtime) => {

    let tDir = tGameObject.getDirection();
    let oDir = oGameObject.getDirection();

    if (tGameObject.isMovable()) {
        tGameObject.rollback(dtime);
        tGameObject.setDirection(tDir.reflect(oDir));
    } else if (oGameObject.isMovable()) {
        oGameObject.rollback(dtime);
        oGameObject.setDirection(oDir.reflect(tDir));
    }
};

const updateBothDirections = (tGameObject, oGameObject, dtime) => {

    tGameObject.rollback(dtime);

    let tPos = tGameObject.position.clone();
    let oPos = oGameObject.position.clone();

    let tDir = tGameObject.getDirection().clone();
    let oDir = oGameObject.getDirection().clone();

    //block ok
    let nv2 = tPos.clone().subVec(oPos);
    nv2.normalize();
    nv2.multiply(tDir.dot(nv2));

    //block ok
    let nv1 = tDir.clone().subVec(nv2);

    //block ok
    let nv2b = oPos.clone().subVec(tPos);
    nv2b.normalize();
    nv2b.multiply(oDir.dot(nv2b));

    //block ok
    let nv1b = oDir.clone().subVec(nv2b);

    //block ok
    oGameObject.setDirection(nv2.clone().addVec(nv1b));
    tGameObject.setDirection(nv1.clone().addVec(nv2b));

};

export default CollisionDetector;
