'use strict';

import GameObject from './GameObject';

/**
 * A rectangle. Obviously.
 *
 * @author Christian Danscheid
 */
class Rectangle extends GameObject {
    /**
     * @param {number} posX
     * @param {number} posY
     * @param {number} width
     * @param {number} height
     */
    constructor(posX, posY, width, height) {
        super(posX, posY);

        this.dimensions = {
            width: width,
            height: height
        };
    }

    draw(context) {
        renderRectangle(context, this);
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {Rectangle} rectangle Rectangle to render
 */
const renderRectangle = (ctx, rectangle) => {
    ctx.strokeRect(
        rectangle.position.x,
        rectangle.position.y,
        rectangle.dimensions.width,
        rectangle.dimensions.height
    );
};

export default Rectangle;
