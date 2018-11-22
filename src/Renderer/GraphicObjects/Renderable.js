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
        this.position = {x: posX, y: posY};
    }
}

export default Renderable;
