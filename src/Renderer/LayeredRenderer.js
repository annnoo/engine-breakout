'use strict';

import LayeredCanvas from './Canvas/LayeredCanvas.js';

/**
 * Does important stuff, really important stuff. It's true.
 * All other Renderers are fake.
 *
 * @author Christian Danscheid
 */
class LayeredRenderer {
    /**
     * @param {HTMLCanvasElement} renderTarget Canvas to render to
     * @param {Array<string>} layerIDs Array of layer IDs
     */
    constructor(renderTarget, layerIDs) {
        this.canvas = new LayeredCanvas(renderTarget, layerIDs);
    }

    /**
     * Register the rendering loop with the browser
     */
    registerRenderLoop() {
        window.requestAnimationFrame(() => {
            this.canvas.swapBuffers();
            this.registerRenderLoop();
        });
    }
}

export default LayeredRenderer;
