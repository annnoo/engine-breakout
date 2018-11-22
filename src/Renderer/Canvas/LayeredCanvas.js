'use strict';

import CanvasBuffer from './CanvasBuffer.js';
import DoubleBufferedCanvas from './DoubleBufferedCanvas.js';

/**
 * A double-buffered canvas with multiple named layers.
 *
 * @author Christian Danscheid
 */
class LayeredCanvas extends DoubleBufferedCanvas {
    /**
     * @param {HTMLCanvasElement} display Main Canvas
     * @param {Array<*>} layerIDs Names of layers to generate
     */
    constructor(display, layerIDs) {
        super(display);

        /**
         * @type {Map<*, CanvasBuffer>} Name->CanvasBuffer mapping
         */
        this.layers = new Map();

        layerIDs.forEach((id) => {
            this.layers.set(id, new CanvasBuffer(display.width, display.height));
        });
    }

    /**
     * Get a named layer of the canvas.
     *
     * @param {*} layerId ID of the layer to switch to
     */
    getLayerBuffer(layerId) {
        return this.layers.get(layerId);
    }

    /**
     * @override
     */
    swapBuffers() {
        const bufferCtx = this.buffer.getContext('2d');

        this.layers.forEach((layerBuffer, _) => {
            bufferCtx.drawImage(layerBuffer.canvas, 0, 0);
        });

        super.swapBuffers();
    }
}

export default LayeredCanvas;
