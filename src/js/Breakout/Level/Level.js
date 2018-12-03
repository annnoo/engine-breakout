'use strict';

//which values to use for level parser
let BRICKS_MIN_X = 15;
let BRICKS_MIN_Y = 15;
let CANVAS_WIDTH = 360 - 2 * 15; //canvas.width - leftSpace - rightSpace
let CANVAS_HEIGHT = 240 - 15 - 50; //canvas.height - topSpace - botSpace
let BRICK_WIDTH = 15;
let BRICK_HEIGHT = 8;

/**
 * @author Yannik Ries
 */
class Level {

    constructor(identifier, name, bricks) {
        //TODO: implement it
        this.identifier = identifier;
        this.name = name;
        this.bricks = bricks;
    }

    /**
     *
     * @returns {string} Identifier of this level
     */
    getIdentifier() {
        //TODO: could be the hash of json string (level)
        return this.identifier;
    }

    /**
     *
     * @param {string} jsonText Json string that represents a level
     * @returns {Level} A new generated level
     */
    static from(jsonText) {
        /* jsonText format:
        x: horizontal
        y: vertical
        0: no brick
        >0: stone with color and hardness

        {
            "name": "myFancyLevel",
            "positions": [
                [0,0,1,1],
                [1,1,0,5]
            ]
        }
         */

        let obj = JSON.parse(jsonText);
        let name = 'Anonymous';
        let bricks = {};
        let identifier = getHashCode(name);

        if (obj !== undefined && obj !== null) {
            if (obj.name !== undefined) {
                name = obj.name;
            }
            if (obj.positions !== undefined) {
                let maxWidth = CANVAS_WIDTH / BRICK_WIDTH; //relative
                let maxHeight = CANVAS_HEIGHT / BRICK_HEIGHT; //relative

                let height = obj.positions.length; //relative
                if (height > maxHeight) {
                    height = maxHeight;
                }

                for (let r = 0; r < height; r++) {
                    let row = obj.positions[row];
                    let width = row.length;
                    if (width > maxWidth) {
                        width = maxWidth;
                    }

                    for (let b = 0; b < width; b++) {
                        let brickNr = obj.positions[row][b];
                        //TODO: wip!
                    }
                }

                identifier = getHashCode(jsonText);
            }
        }
        //TODO:
    }

}

const getHashCode = (text) => {
    let hash = 0, i, chr;
    if (text.length === 0) return hash;
    for (let i = 0; i < text.length; i++) {
        chr = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

export default Level;
