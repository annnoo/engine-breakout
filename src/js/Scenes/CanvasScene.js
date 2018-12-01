'use strict';

import DOMScene from './DOMScene';
import CANVAS_SCENE_TEMPLATE from './canvas.template.html';
import LayeredRenderer from '../Renderer/LayeredRenderer';
import GameLoop from '../GameLoop/GameLoop';

/**
 * A Game scene based on a canvas with multiple layers and
 * many Game Objects per layer.
 *
 * @author Christian Danscheid
 */
class CanvasScene extends DOMScene {
    /**
     * @param {Array<*>} layerIDs IDs of layers to generate
     * @param {*} keybindings todo: connect to InputManager
     * @param {*} app todo: connect to app
     */
    constructor(layerIDs = [], keybindings, app) {
        super(CANVAS_SCENE_TEMPLATE, keybindings, app);

        this.layerIDs = layerIDs;
        this.renderer = null;
        this.gameloop = null;
    }

    /**
     * @override
     */
    onBeforeMount() {
        const node = super.onBeforeMount();

        const canvas = node.querySelector('canvas');
        this.renderer = new LayeredRenderer(canvas, this.layerIDs);
        this.gameloop = new GameLoop(this.renderer);

        return node;
    }

    /**
     * @override
     */
    onAfterMount() {
        this.renderer.registerRenderLoop();
        this.gameloop.start(60);
    }

    /**
     * @override
     */
    onBeforeUnmount() {
        this.gameloop.stop();
        this.renderer.unregisterRenderLoop();
    }

    /**
     * @override
     */
    onUpdate(dtime) {
        super.onUpdate(dtime);

        this.state.forEach(layer => {
            layer.forEach(gameObject => {
                gameObject.onUpdate(dtime);
            });
        });
    }
}

export default CanvasScene;
