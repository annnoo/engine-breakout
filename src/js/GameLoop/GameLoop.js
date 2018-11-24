'use strict';

import LayeredRenderer from '../Renderer/LayeredRenderer';
import RenderLayer from '../Renderer/RenderLayer';

class GameLoop {
    /**
     * @param {LayeredRenderer} renderer Renderer to share state with
     */
    constructor(renderer) {
        /** @type {Array<RenderLayer>} */
        this.state = renderer.layers;
    }

    /**
     * Start game loop.
     *
     * @param {number} targetTPS Targeted ticks per second
     */
    start(targetTPS) {
        this.targetFPS = targetTPS;
        this.lastTick = performance.now();

        this.intervalID = window.setInterval(() => {
            const now = performance.now();
            this.dtime = (now - this.lastTick) / 1000;
            this.lastTick = now;
            this._tick(this.dtime);
        }, 1 / this.targetFPS);
    }

    /**
     * Stop game loop
     */
    stop() {
        window.clearInterval(this.intervalID);
    }

    /**
     * @param {number} dtime time since last call [s]
     */
    _tick(dtime) {
        this.state.forEach((layer) =>
            layer.state.forEach((gameObject) =>
                gameObject.update(dtime)
            )
        );
    }
}

export default GameLoop;
