'use strict';

import LayeredCanvas from './Canvas/LayeredCanvas.js';
import RenderLayer from './RenderLayer.js';
import Rectangle, { renderRectangle } from './GraphicObjects/Rectangle.js';
import CanvasBuffer from './Canvas/CanvasBuffer.js';
import Text, { renderText } from './GraphicObjects/Text.js';
import Sprite, { renderSprite } from './GraphicObjects/Sprite.js';

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

        this.DEBUG_FPS_COUNTER = new Text(10, 10, 'Hallo Welt');

        /**
         * @type {Map<*, RenderLayer}
         */
        this.layers = new Map();
        layerIDs.forEach((id) => {
            this.layers.set(id, new RenderLayer(this.canvas.getLayerBuffer(id)));
        });

        this.debugLayer = this.layers.get(DEBUG_LAYER_ID);
        this._setupDebugLayer(this.debugLayer);

    }

    /**
     * @param {RenderLayer} layer
     */
    _setupDebugLayer(layer) {
        layer.setState([
            ...layer.state,
            this.DEBUG_FPS_COUNTER
        ]);

        layer.enabled = true;
    }

    /**
     * @param {RenderLayer} layer
     */
    _updateDebugLayer(layer) {
        layer.setClearFlag(true);
        this.DEBUG_FPS_COUNTER.text = 'FPS: ' + (1 / this.dtime).toFixed(0);
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
            this._updateDtime();

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
                        else if (obj instanceof Text) {
                            renderText(layer.buffer.getContext('2d'), obj);
                        }
                        else if (obj instanceof Sprite) {
                            renderSprite(layer.buffer.getContext('2d'), obj);
                        }


                    });
                }
            });

            if (this.debugEnabled) {
                this._updateDebugLayer(this.layers.get(DEBUG_LAYER_ID));
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

    _updateDtime() {
        const now = performance.now();
        const dtime = now - this.lastFrame;
        this.lastFrame = now;
        this.dtime = dtime / 1000;
    }

    /**
     * Enable debug layer
     */
    enableDebug() {
        this.debugEnabled = true;
        this.layers.get(DEBUG_LAYER_ID).enabled = true;
    }

    /**
     * Disable debug layer
     */
    disableDebug() {
        this.debugEnabled = false;
        this.layers.get(DEBUG_LAYER_ID).enabled = false;
    }

    /**
     * Resize display canvas
     *
     * @param {number} width Width in px
     * @param {number} height Height in px
     */
    resizeCanvas(width, height) {
        this.canvas.resize(width, height);
    }

    /**
     * Make the canvas fill the entire viewport. Covers everything else.
     */
    fillViewport() {
        this.renderTarget.style.position = 'absolute';
        this.renderTarget.style.left = '0';
        this.renderTarget.style.top = '0';
        this.resizeCanvas(window.innerWidth, window.innerHeight);
    }
}

export default LayeredRenderer;
export { DEBUG_LAYER_ID };
