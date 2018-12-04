'use strict';

/**
 * This is similar to a rectangle with the speciality that an area can consists of multiple subareas
 *
 * @author Yannik Ries
 */
class Area {

    /**
     *
     * @param leftX The x position of the left corners
     * @param topY The y position of the top corners
     * @param width The width of the area
     * @param height The height of the area
     * @param subareas Subareas of the area
     */
    constructor(leftX, topY, width, height, subareas = []) {
        this.leftX = leftX;
        this.topY = topY;
        this.width = width;
        this.height = height;
        this.subareas = subareas;
    }

    getLeftX() {
        return this.leftX;
    }

    getRightX() {
        return this.leftX + this.width;
    }

    getTopY() {
        return this.topY;
    }

    getBottomY() {
        return this.topY + this.height;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    /**
     * Moves the area and its subareas by the given offset.
     *
     * @param offsetX How much to move horizontally
     * @param offsetY How much to move vertically
     */
    move(offsetX, offsetY) {
        this.leftX += offsetX;
        this.topY += offsetY;
        this.subareas.forEach((subarea) => subarea.move(offsetX, offsetY));
    }


    /**
     *
     * @param {number} x New x-Position
     * @param {number} y New y-position
     */
    moveTo(x,y){
        this.move(x-this.leftX, y-this.topY);
    }

    /**
     * Returns if the given point is included by the area. You can limit the amount of
     * recursive calls with the deepness.
     *
     * @param {number} x X of the point
     * @param {number} y Y of the point
     * @param {number} depth Deepness of the recursive calls.
     *      -1 = everything, 0 = the current area, 1 = includes subareas, 2 = includes the subareas of subareas, ...
     * @returns {boolean} If the area includes the point
     */
    contains(x, y, depth) {
        if (x >= this.leftX && y >= this.topY && x <= this.getRightX() && y <= this.getBottomY()) {
            return true;
        }
        if (depth === 0) return false;
        this.subareas.forEach((a) => {
            if (a.contains(x, y, depth - 1)) return true;
        });
        return false;
    }

    /**
     * Returns if the area collides with the given area. You can limit the amount of
     * recursive calls with the deepness in favour of accuracy.
     *
     * @param {Area} area Other area
     * @param {number} depth Deepness of the recursive calls.
     *      -1 = everything, 0 = the current area, 1 = includes subareas, 2 = includes the subareas of subareas, ...
     * @returns {boolean} If the area includes or collides with the given area
     */
    collidesWith(area, depth) {
        if(area===undefined||area===null) return false;

        if (this.leftX < area.getRightX() &&
            this.getRightX() > area.leftX &&
            this.topY < area.getBottomY() &&
            this.getBottomY() > area.topY) {

            return true;
        }
        if (depth === 0) return false;
        //TODO: optimize it? first: this.subareas with area -> then: this.subareas with area.subareas  ???
        this.subareas.forEach((tSubArea) => {
            area.subareas.forEach((oSubArea) => {
                if (tSubArea.collidesWith(oSubArea, depth - 1)) return true;
            });
        });
        return false;
    }

}

export default Area;
