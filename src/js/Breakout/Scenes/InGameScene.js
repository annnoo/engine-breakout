'use strict';

import CanvasScene from '../../Engine/Scenes/CanvasScene';
import Rectangle from '../../Engine/GameObjects/Rectangle';
import Text from '../../Engine/GameObjects/Text';
import Vec2 from '../../Engine/Math/Vec2';
import Ball from '../GameObjects/Ball';
import Paddle from '../GameObjects/Paddle';
import Brick from '../GameObjects/Brick';

class InGameScene extends CanvasScene {

    /**
     *
     * @param {AbstractApp} app
     */
    constructor(app) {
        //how often it has to be re-rendered
        //often: ball
        //rare: brick
        //never: background
        super(Object.values(LayerNames), getKeybindings(), app);
        this.counter = 0;
    }

    onAfterMount() {
        super.onAfterMount();

        let htmlCanvas = this.renderer.canvas.display;

        htmlCanvas.requestPointerLock = htmlCanvas.requestPointerLock ||
            htmlCanvas.mozRequestPointerLock;

        htmlCanvas.requestPointerLock();

        let ballImg = this.app.getAssetManager().getAssetByName('ball');
        let ball = new Ball(htmlCanvas.width / 2, htmlCanvas.height - 60, ballImg);
        ball.setSpeed(30);
        ball.setDirection(new Vec2(0, -1));

        this.renderer.enableDebug(true);

        let im = this.app.getInputManager();
        let padImg = this.app.getAssetManager().getAssetByName('pad');
        let pad = new Paddle(htmlCanvas.width / 2, htmlCanvas.height - 13, padImg, true, im);
        let bricks = [];
        let rows = 18;
        for (let i = 1; i < 16; i++) {
            for (let j = 1; j < rows; j++) {
                bricks.push(new Brick(15 * i, 9 * j, 5, this.app.getAssetManager()));
            }
        }

        ball.setSpeed(100);
        ball.setDirection(new Vec2(0, -1));

        this.getLayer(LayerNames.RARE).setState(bricks);
        this.getLayer(LayerNames.OFTEN).setState([
            ball, pad
        ]);

    }

    onUpdate(dtime) {
        super.onUpdate(dtime);

        if (this.counter % 1000 === 0) {
            this.counter = 100;
            window.console.log('reset counter');
        }
    }

    /**
     * Returns the layer by the given name. Please use LayerNames.XXX
     *
     * @param {string} name The layer's name
     * @returns {*}
     */
    getLayer(name) {
        return this.renderer.getLayer(name);
    }

}

const LayerNames = {
    OFTEN: 'often',
    RARE: 'rare',
    NEVER: 'never'
};

const getKeybindings = () => {
    //TODO: define some keybindings
    return null;
};

export default InGameScene;
