'use strict';

/**
 * @author Yannik Ries
 */
class Level {

    constructor(name, bricks) {
        //TODO: implement it
        this.name = name;
        this.bricks = bricks;
    }

    /**
     *
     * @returns {string} Identifier of this level
     */
    getIdentifier() {
        //TODO: could be the hash of json string (level)
        return '';
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

        if (obj !== undefined && obj !== null) {
            if (obj.name !== undefined) {
                name = obj.name;
            }
            if (obj.positions !== undefined) {
            }
        }
        //TODO:
    }

}

export default Level;
