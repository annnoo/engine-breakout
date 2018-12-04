'use strict';

import CollisionDetector from '../CollisionDetection/CollisionDetector';

class GameLoop {

    /**
     * @param {CanvasScene} scene Scene that has created this instance
     */
    constructor(scene,gridWidth = 7, gridHeight = 7) {
        /** @type {Array<RenderLayer>} */
        this.state = scene.renderer.layers;
        this.scene = scene;
        this.collisionDetector = new CollisionDetector(scene.renderer,gridWidth,gridHeight);
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

        this.collisionDetector.doCollisions(dtime);

        this.state.forEach((layer) => {
            let clear = false;
            layer.state.forEach((gameObject) => {
                if (gameObject.update(dtime) && !clear) {
                    //if gameobject moves
                    clear = true;
                }
            });
            if (clear && !layer.clearFlag) {
                //no need to update the flag with false because the renderer
                //resets(to false) the flag after each clear
                layer.setClearFlag(true);
            }
        });
        this.scene.onUpdate(dtime);
    }
}

export default GameLoop;
