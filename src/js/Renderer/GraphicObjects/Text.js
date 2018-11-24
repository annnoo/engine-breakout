import Renderable from "./Renderable";

'use strict';

class Text extends Renderable {
    constructor(posX, posY, text) {
        super(posX, posY);
        this.text = text;
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
export { renderText };
