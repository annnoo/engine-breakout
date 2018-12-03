'use strict';

import CanvasScene from '../../Engine/Scenes/CanvasScene';
import Rectangle from '../../Engine/GameObjects/Rectangle';
import Text from '../../Engine/GameObjects/Text';
import Vec2 from '../../Engine/Math/Vec2';

class TestInGameScene extends CanvasScene {

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

        let borderLeft = new Rectangle(0, 15, 10, htmlCanvas.height - 15 - 15);
        let borderTop = new Rectangle(15, 0, htmlCanvas.width - 15 - 15, 10);
        let borderRight = new Rectangle(htmlCanvas.width - 10, 15, 10, htmlCanvas.height - 15 - 15);
        let borderBot = new Rectangle(15, htmlCanvas.height - 10, htmlCanvas.width - 15 - 15, 10);

        this.text = new Text(50, 50, '☯');

        borderLeft.setDirection(new Vec2(0, 1));
        borderTop.setDirection(new Vec2(1, 0));
        borderRight.setDirection(new Vec2(0, -1));
        borderBot.setDirection(new Vec2(-1, 0));
        this.text.setDirection(new Vec2(1, 1));

        this.text.setSpeed(40);

        this.text.collidable = true;

        this.text.name = 'text';
        borderLeft.name = 'borderLeft';
        borderTop.name = 'borderTop';
        borderRight.name = 'borderRight';
        borderBot.name = 'borderBot';

        this.getLayer(LayerNames.NEVER).setState([
            borderLeft,
            borderTop,
            borderRight,
            borderBot
        ]);

        this.getLayer(LayerNames.OFTEN).setState([
            this.text
        ]);

    }

    onUpdate(dtime) {
        super.onUpdate(dtime);
        if (this.counter % 600 === 0) {
            this.counter = 100;
            window.console.log('reset counter');
        }
        this.text.setSpeed(this.counter += 1);
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

export default TestInGameScene;
