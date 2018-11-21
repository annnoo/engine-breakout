'use strict';

/**
 * Off-screen canvas, useful for pre-rendering or caching stuff.
 *
 * @author Christian Danscheid
 */
class CanvasBuffer {
    /**
     * Create a new buffer.
     *
     * @param {number} width Canvas width
     * @param {number} height Canvas height
     */
    constructor(width, height) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
    }

    /**
     * Get the underlying canvas' context.
     * @param {string} context Context name, e.g. '2d'
     */
    getContext(context) {
        return this.canvas.getContext(context);
    }

    /**
     * Clear the buffer.
     */
    clear() {
        this.canvas.getContext('2d')
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default CanvasBuffer;
