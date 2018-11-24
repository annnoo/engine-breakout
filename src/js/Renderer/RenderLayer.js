'use strict';

import CanvasBuffer from './Canvas/CanvasBuffer';

/**
 * Layer state.
 *
 * @author Christian Danscheid
 */
class RenderLayer {
    /**
     * @param {CanvasBuffer} layerBuffer
     * @param {array<*>} state
     */
    constructor(layerBuffer, state = []) {
        /** @type {CanvasBuffer} */
        this.buffer = layerBuffer;

        /** @type { array<*> } */
        this.state = state;

        /** @type { boolean } */
        this.clearFlag = false;

        /** @type {boolean} */
        this.enabled = true;
    }

    /**
     * @param {array<*>} newState
     */
    setState(newState) {
        this.state = newState;
    }

    /**
     * @param {boolean} flag
     */
    setClearFlag(flag) {
        this.clearFlag = flag;
    }
}

export default RenderLayer;
