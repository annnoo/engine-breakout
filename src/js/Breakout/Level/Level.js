'use strict';

//which values to use for level parser
import LevelBrick from './LevelBrick';

const LVL_BRICKS_MIN_X = 15;
const LVL_BRICKS_MIN_Y = 15;
const LVL_CANVAS_WIDTH = 360 - 2 * 15; //canvas.width - leftSpace - rightSpace
const LVL_CANVAS_HEIGHT = 240 - 15 - 50; //canvas.height - topSpace - botSpace
const LVL_BRICK_WIDTH = 15;
const LVL_BRICK_HEIGHT = 8;

/**
 * @author Yannik Ries
 */
class Level {

    /**
     *
     * @param {*} identifier An unique identifier for this level
     * @param {string} name Name of the level
     * @param {Array.<LevelBrick>} bricks
     */
    constructor(identifier, name, bricks) {
        this.identifier = identifier;
        this.name = name;
        this.bricks = bricks;
    }

    /**
     *
     * @returns {string} Identifier of this level
     */
    getIdentifier() {
        return this.identifier;
    }

    /**
     *
     * @returns {string} Name of this level
     */
    getName() {
        return this.name;
    }

    /**
     *
     * @returns {Array<LevelBrick>} Array with all LevelBricks of this level
     */
    getBricks() {
        return this.bricks;
    }

    /**
     * Returns an object that follows the standards of the other breakout games.
     *
     * @returns {Object}
     */
    toPortable() {

        let maxWidth = Math.floor(LVL_CANVAS_WIDTH / LVL_BRICK_WIDTH); //relative
        let maxHeight = Math.floor(LVL_CANVAS_HEIGHT / LVL_BRICK_HEIGHT); //relative


        //creates [ [0,0,0,...], [0,0,0,...], ... ] with the maxWidth and maxHeight
        let positions = Array.apply(null, Array(maxHeight)).map(
            () => {
                return Array.apply(null, Array(maxWidth)).map(Number.prototype.valueOf, 0);
            }
        );

        for (let brick of this.bricks) {
            let row = (brick.posY - LVL_BRICKS_MIN_Y) / LVL_BRICK_HEIGHT;
            let col = (brick.posX - LVL_BRICKS_MIN_X) / LVL_BRICK_WIDTH;
            positions[row][col] = brick.lifeCounter;
        }

        return {
            name: this.name,
            positions: positions
        };
    }

    /**
     * Returns a level generated from the given json object. The json object should follow the
     * standards of the other breakout games.
     *
     * @param {*} jsonObject Json object that represents a level
     * @returns {Level} A new generated level
     */
    static from(jsonObject) {
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

        let name = 'Anonymous';

        /** @type {Array.<LevelBrick>} */
        let bricks = [];

        if (jsonObject !== undefined && jsonObject !== null) {
            if (jsonObject.name !== undefined) {
                name = jsonObject.name;
            }
            if (jsonObject.positions !== undefined) {
                let maxWidth = Math.floor(LVL_CANVAS_WIDTH / LVL_BRICK_WIDTH); //relative
                let maxHeight = Math.floor(LVL_CANVAS_HEIGHT / LVL_BRICK_HEIGHT); //relative

                let height = jsonObject.positions.length; //relative
                if (height > maxHeight) {
                    height = maxHeight;
                }

                for (let r = 0; r < height; r++) {
                    //r = row number = relative y
                    let row = jsonObject.positions[r];
                    let width = row.length;
                    if (width > maxWidth) {
                        width = maxWidth;
                    }

                    for (let c = 0; c < width; c++) {
                        //c = column number = relative x
                        let cellValue = row[c]; //cellValue = stone style; 0=invisible
                        if (cellValue <= 0) continue;
                        bricks.push(new LevelBrick(c * LVL_BRICK_WIDTH + LVL_BRICKS_MIN_X, r * LVL_BRICK_HEIGHT + LVL_BRICKS_MIN_Y, cellValue));
                    }
                }
            }
        }

        return new Level(getHashCode(bricks), name, bricks); //TODO: test if hash algorithm works (always unique output?)
    }

}

const getHashCode = (text) => {
    let str = new String(text);

    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

export default Level;
