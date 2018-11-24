'use strict';

import GameObject from './GameObject';

/**
 * A rectangle. Obviously.
 *
 * @author Anno
 */
class Sprite extends GameObject {
    /**
     * @param {number} posX
     * @param {number} posY
     * @param {Image} image
     */
    constructor(posX, posY, image) {
        super(posX, posY);

        this.image = image;

        this.dimensions = {
            width: this.image.width,
            height: this.image.height
        };
    }

    draw(context) {
        renderSprite(context, this);
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {Sprite} sprite Rectangle to render
 */
const renderSprite = (ctx, sprite) => {
    ctx.drawImage(sprite.image, sprite.position.x, sprite.position.y);
};

export default Sprite;
