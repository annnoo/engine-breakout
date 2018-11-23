import Vec2 from '../../Math/Vec2';

'use strict';

/**
 * Base class for renderable stuff
 *
 * @author Christian Danscheid
 */
class Renderable {
    /**
     * @param {number} posX
     * @param {number} posY
     */
    constructor(posX, posY) {
        this.position = new Vec2(posX,posY);
    }

    /**
     * Called every game loop tick
     *
     * @param {number} dtime Time passed since last call [s]
     */
    update(dtime) {
    }
}

export default Renderable;
