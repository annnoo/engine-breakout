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
     */
    constructor(posX, posY, imagesrc) {
        super(posX, posY);

        this.image = new Image();
        this.image.src = imagesrc;

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
    sprite.image.onload = () => {
        ctx.drawImage(sprite.image, sprite.position.x, sprite.position.y);
    };
};

export default Sprite;
