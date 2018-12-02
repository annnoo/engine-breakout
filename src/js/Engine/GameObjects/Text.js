'use strict';

import GameObject from './GameObject';
import Area from '../Math/Area';

class Text extends GameObject {
    constructor(posX, posY, text) {
        super(posX, posY, new Area(posX, posY-20, 20, 20), false); //TODO use: new Area(0, 0, 0, 0)
        this.text = text;
    }

    update(dtime) {
        return super.update(dtime);
    }

    draw(context) {
        super.draw(context);
        renderText(context, this);
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Text} text
 */
const renderText = (ctx, text) => {
    ctx.fillText(text.text, text.position.x, text.position.y);
};

export default Text;
