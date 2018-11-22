'use strict';

import LayeredCanvas from './Canvas/LayeredCanvas.js';
import RenderLayer from './RenderLayer.js';
import Rectangle, { renderRectangle } from './GraphicObjects/Rectangle.js';

/**
 * Does important stuff, really important stuff. It's true.
 * All other Renderers are fake.
 *
 * @author Christian Danscheid
 */
class LayeredRenderer {
    /**
     * @param {HTMLCanvasElement} renderTarget Canvas to render to
     * @param {Array<*>} layerIDs Array of layer IDs
     */
    constructor(renderTarget, layerIDs) {
        this.canvas = new LayeredCanvas(renderTarget, layerIDs);
        this.renderingShouldEnd = false;

        /**
         * @type {Map<*, RenderLayer}
         */
        this.layers = new Map();
        layerIDs.forEach((id) => {
            this.layers.set(id, new RenderLayer(this.canvas.getLayerBuffer(id)));
        });
    }

    /**
     * Get layer by ID.
     *
     * @param {*} id
     */
    getLayer(id) {
        return this.layers.get(id);
    }

    /**
     * Register the rendering loop with the browser
     */
    registerRenderLoop() {
        window.requestAnimationFrame(() => {
            // Todo: Do the actual drawing
            this.layers.forEach((layer) => {
                layer.state.forEach((obj) => {
                    if (obj instanceof Rectangle) {
                        if (layer.clearFlag) {
                            console.log("will clear");
                            layer.buffer.clear();
                        }
                        renderRectangle(layer.buffer.getContext('2d'), obj);
                    }
                });
            });

            this.canvas.swapBuffers();

            if (!this.renderingShouldEnd) {
                this.registerRenderLoop();
            }
        });
    }

    /**
     * Stop the rendering loop.
     */
    unregisterRenderLoop() {
        this.renderingShouldEnd = true;
    }
}

export default LayeredRenderer;
