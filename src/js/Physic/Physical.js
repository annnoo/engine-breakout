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
     */
    update(dtime) {
    }

    /**
     * Called to revert the current update
     *
     * @param {number} dtime Time passed since last call [s]
     */
    rollback(dtime) {
    }

}

export default Physical;
