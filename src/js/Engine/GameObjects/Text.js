'use strict';

import GameObject from './GameObject';
import Area from '../Math/Area';

class Text extends GameObject {

    constructor(posX, posY, text, font = "10px sans-serif") {
        super(posX, posY, new Area(0, 0, 0, 0), false);
        this.text = text;
        this.font = font;
    }

    /**
     * Sets the text to render
     *
     * @param text
     */
    setText(text){
        this.text = text;
    }

    /**
     * Sets the Font.
     *
     * @param {string} font Font like "10px sans-serif"
     */
    setFont(font){

    }

    update(dtime) {
        return super.update(dtime);
    }

    draw(context) {
        super.draw(context);
        if(!this.visible) return;
        renderText(context, this);
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Text} text
 */
const renderText = (ctx, text) => {
    let prevFont = ctx.font;
    ctx.font = text.font;
    ctx.fillText(text.text, text.position.x, text.position.y);
    ctx.font = prevFont;
};

export default Text;
