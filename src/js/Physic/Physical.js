'use strict';

import Renderable from '../Renderer/Renderable';

/**
 * Base class for physical stuff
 *
 * @author Yannik Ries
 */
class Physical extends Renderable {

    constructor() {
        super();
    }

    /**
     * Called every game loop tick
     *
     * @param {number} dtime Time passed since last call [s]
     * @returns {boolean} If the object has a new position after the update
     */
    update(dtime) {
    }

    /**
     * Called to revert the current update
     *
     * @param {number} dtime Time passed since last call [s]
     * @returns {boolean} If the object has a new position after the update
     */
    rollback(dtime) {
    }

}

export default Physical;
