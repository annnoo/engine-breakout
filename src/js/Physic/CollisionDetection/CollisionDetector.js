'use strict';

import LayeredRenderer from '../../Renderer/LayeredRenderer';

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
        this.layers.forEach((tLayer) => {
            tLayer.state.forEach((tGameObject) => {
                if (tGameObject.isCollidable()) {
                    this.layers.forEach((oLayer) => {
                        oLayer.state.forEach((oGameObject) => {
                            if (oGameObject.isCollidable() && tGameObject != oGameObject) {
                                if (tGameObject.area.collidesWith(oGameObject.area, depth)) {

                                    //check which object is movable => call onCollideWith on the movable object
                                    let ignorePhysics = false;
                                    if(tGameObject.isMovable()){
                                        ignorePhysics = tGameObject.onCollideWith(oGameObject);
                                    }else if(oGameObject.isMovable()){
                                        ignorePhysics = oGameObject.onCollideWith(tGameObject);
                                    }else{
                                        ignorePhysics = tGameObject.onCollideWith(oGameObject);
                                    }

                                    if (!ignorePhysics) {
                                        updateDirections(tGameObject, oGameObject, dtime);
                                    }
                                }
                            }
                        });
                    });
                }
            });
        });
    }

}

const updateDirections = (tGameObject, oGameObject, dtime) => {
    //TODO: fix calculation!

    let tDir = tGameObject.getDirection();
    let oDir = oGameObject.getDirection();

    if(tGameObject.isMovable()) {
        tGameObject.rollback(dtime);
        tGameObject.setDirection(tDir.reflect(oDir));
    }
    if(oGameObject.isMovable()) {
        oGameObject.rollback(dtime);
        oGameObject.setDirection(oDir.reflect(tDir));
    }
};

export default CollisionDetector;
