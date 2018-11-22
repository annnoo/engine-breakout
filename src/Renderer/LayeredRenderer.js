'use strict';

import LayeredCanvas from './Canvas/LayeredCanvas.js';
import RenderLayer from './RenderLayer.js';
import Rectangle, { renderRectangle } from './GraphicObjects/Rectangle.js';
import CanvasBuffer from './Canvas/CanvasBuffer.js';

const DEBUG_LAYER_ID = '__debug';

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
        layerIDs.push(DEBUG_LAYER_ID);

        this.renderTarget = renderTarget;
        this.canvas = new LayeredCanvas(renderTarget, layerIDs);
        this.renderingShouldEnd = false;
        this.lastFrame = performance.now();
        this.dtime = 0;
        this.debugEnabled = false;

        /**
         * @type {Map<*, RenderLayer}
         */
        this.layers = new Map();
        layerIDs.forEach((id) => {
            this.layers.set(id, new RenderLayer(this.canvas.getLayerBuffer(id)));
        });

        this.debugLayer = this.layers.get(DEBUG_LAYER_ID);
        this.setupDebugLayer(this.debugLayer);

    }

    /**
     * @param {RenderLayer} layer
     */
    setupDebugLayer(layer) {
        layer.setState([
            ...layer.state,
            new Rectangle(100, 100, 50, 25)
        ]);

        layer.enabled = true;
    }

    updateDebugLayer(layer) {
        // Do stuff
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
            this.updateDtime();

            this.layers.forEach((layer) => {
                if (layer.enabled) {
                    layer.state.forEach((obj) => {
                        if (layer.clearFlag) {
                            layer.buffer.clear();
                            layer.setClearFlag(false);
                        }
                        if (obj instanceof Rectangle) {
                            renderRectangle(layer.buffer.getContext('2d'), obj);
                        }
                    });
                }
            });

            if (this.debugEnabled) {
                this.updateDebugLayer();
            }

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

    updateDtime() {
        const now = performance.now();
        const dtime = now - this.lastFrame;
        this.lastFrame = now;
        this.dtime = dtime / 10e3;
    }

    enableDebug() {
        this.debugEnabled = true;
        this.layers.get(DEBUG_LAYER_ID).enabled = true;
    }

    disableDebug() {
        this.debugEnabled = false;
        this.layers.get(DEBUG_LAYER_ID).enabled = false;
    }
}

export default LayeredRenderer;
export { DEBUG_LAYER_ID };
