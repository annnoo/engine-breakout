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
                                    let ignorePhysics = tGameObject.onCollideWith(oGameObject);
                                    if (!ignorePhysics) {

                                        //TODO: fix calculation!

                                        let i = tGameObject.getDirection();
                                        let n = oGameObject.getDirection().normalize();

                                        let dot = i.clone().dot(n);

                                        let v = i.subVec(n.multiply(2 * dot));

                                        window.console.log('prev dir=');
                                        window.console.dir(tGameObject.getDirection());

                                        tGameObject.rollback(dtime);
                                        tGameObject.setDirection(v);

                                        window.console.log('now dir=');
                                        window.console.dir(tGameObject.getDirection());
                                        window.console.log('');

                                        i = oGameObject.getDirection();
                                        n = tGameObject.getDirection().normalize();

                                        dot = i.clone().dot(n);

                                        v = i.subVec(n.multiply(2 * dot));
                                        oGameObject.setDirection(v);
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

export default CollisionDetector;
