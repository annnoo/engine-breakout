'use strict'

import AssetManager from '../AssetManager/AssetManager';
import InputManager from '../InputManager/InputManager';
import LayeredRenderer from '../Renderer/LayeredRenderer';
import GameLoop from '../GameLoop/GameLoop';

class AbstractApp {

    /**
     *
     * @param {HTMLCanvasElement} renderTarget Canvas to render to
     * @param width Final width of the canvas
     * @param height Final height of the canvas
     * @param node
     */
    constructor(width, height, node) {
        this.assetManager = new AssetManager();
        this.inputManager = new InputManager();
        this.sceneManager;
    }

    _start(canvasScene) {
        this.gameLoop = new GameLoop(canvasScene.renderer);
        this.gameLoop.start(60);
    }

}

export default AbstractApp;
