'use strict';

import CanvasBuffer from './CanvasBuffer.js';

/**
 * A double-buffered canvas. No idea whether we really need this, but
 * it was fun to implement.
 *
 * @author Christian Danscheid
 */
class DoubleBufferedCanvas {
    /**
     * @param {HTMLCanvasElement} display Primary canvas
     */
    constructor(display) {
        this.display = display;
        this.displayContext = this.display.getContext('2d');
        this.buffer = new CanvasBuffer(display.width, display.height);
    }

    /**
     * Get drawing context
     * @param {string} context
     */
    getContext(context) {
        return this.buffer.getContext(context);
    }

    /**
     * Flush the buffer onto the primary canvas
     */
    swapBuffers() {
        this.displayContext.clearRect(0, 0, this.display.width, this.display.height);
        this.displayContext.drawImage(this.buffer.canvas, 0, 0);
        this.buffer.clear();
    }
}

export default DoubleBufferedCanvas;
