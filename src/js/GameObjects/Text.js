'use strict';

import GameObject from './GameObject';

class Text extends GameObject {
    constructor(posX, posY, text) {
        super(posX, posY);
        this.text = text;
    }

    draw(context) {
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
