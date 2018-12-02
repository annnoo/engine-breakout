'use strict';

import GameObject from '../GameObjects/GameObject';

/**
 * Handles collisions of gameobjects
 *
 * @author Yannik Ries
 */
class CollisionDetector {


    /**
     * Creates a new CollisionDetector that works with every GameObject saved in the
     * layeredRenderer.
     *
     * @param {LayeredRenderer} layeredRenderer
     */
    constructor(layeredRenderer, gridWidth, gridHeight) {
        this.layers = layeredRenderer.layers;

        this.canvasDimensions = {
            width: layeredRenderer.canvas.display.width,
            height: layeredRenderer.canvas.display.height
        };
        this.ratio = {x: this.canvasDimensions.width / gridWidth, y: this.canvasDimensions.height / gridHeight};

        this.gridHeight = gridHeight;
        this.gridWidth = gridWidth;
        this.spartialGrid = createGrid(gridWidth, gridHeight);

    }

    populateGrid() {
        this.spartialGrid = createGrid(this.gridWidth, this.gridHeight);
        this.layers.forEach((layer) => {

            /** @property {GameObject} */

            layer.state.forEach((element) => {
                if ((element instanceof GameObject)) {
                    let area = element.area;

                    if (area.getRightX() < 0 || area.getLeftX() > this.canvasDimensions.width || area.getTopY() > this.canvasDimensions.height || area.getBottomY() < 0) {
                        return;
                    } else {
                        let minCellX = Math.floor(area.getLeftX() / this.ratio.x);
                        let maxCellX = Math.floor(area.getRightX() / this.ratio.x);

                        let minCellY = Math.floor(area.getTopY() / this.ratio.y);
                        let maxCellY = Math.floor(area.getBottomY() / this.ratio.y);


                        for (let i = minCellX; i <= maxCellX; i++) {

                            if (this.spartialGrid[i] === undefined) {


                                this.spartialGrid[i] = new Array(this.gridHeight);
                            }
                            let row = this.spartialGrid[i];
                            for (let j = minCellY; j <= maxCellY; j++) {
                                if (!row[j]) {
                                    row[j] = [];

                                }
                                row[j].push(element);
                            }
                        }
                    }
                }
            });

        });

    }

    /**
     * Called every game loop tick
     *
     * @param {number} dtime time since last call [s]
     * @param {number} depth Deepness of the recursive calls.
     *      -1 = everything, 0 = the current area, 1 = includes subareas, 2 = includes the subareas of subareas, ...
     * @param {GameObject} gameObject The object that should be checked against all other objects
     */
    handleCollisions(dtime, gameObject, depth) {
        this.layers.forEach((tLayer) => {
            tLayer.state.forEach((tGameObject) => {
                if (tGameObject.isCollidable()) {
                    this.layers.forEach((oLayer) => {
                        oLayer.state.forEach((oGameObject) => {
                            if (oGameObject.isCollidable() && tGameObject != oGameObject) {
                                if (tGameObject.area.collidesWith(oGameObject.area, depth)) {

                                    //check which object is movable => call onCollideWith on the movable object
                                    let ignorePhysics = false;
                                    if (tGameObject.isMovable()) {
                                        ignorePhysics = tGameObject.onCollideWith(oGameObject);
                                    } else if (oGameObject.isMovable()) {
                                        ignorePhysics = oGameObject.onCollideWith(tGameObject);
                                    } else {
                                        ignorePhysics = tGameObject.onCollideWith(oGameObject);
                                    }

                                    if (!ignorePhysics) {
                                        updateDirections(tGameObject, oGameObject, dtime);
                                    }
                                }
                            }
                        });
                    });
                }
            });
        });
    }

    doCollisions(dtime) {
        this.populateGrid();
        this.spartialGrid.forEach((row) => {

            row.forEach((col) => {
                for (let i = 0; i < col.length; i++) {
                    let tGameObject = col[i];

                    for (let j = i + 1; j < col.length; j++) {
                        let oGameObject = col[j];

                        if (col[i].isCollidable() && col[j].isCollidable()) {
                            if (col[i].area.collidesWith(col[j].area, 0)) {
                                let ignorePhysics = false;
                                if (tGameObject.isMovable()) {
                                    ignorePhysics = tGameObject.onCollideWith(oGameObject);
                                } else if (oGameObject.isMovable()) {
                                    ignorePhysics = oGameObject.onCollideWith(tGameObject);
                                } else {
                                    ignorePhysics = tGameObject.onCollideWith(oGameObject);
                                }
                                if (!ignorePhysics) {
                                    updateDirections(tGameObject, oGameObject, dtime);
                                }
                            }
                        }
                    }
                }
            });

        });
    }

}

const createGrid = (gridWidth, gridHeight) => {
    let arr = new Array(gridWidth);
    for (let i = 0; i < gridWidth; i++) {
        arr[i] = new Array(gridHeight);
    }
    return arr;
};
const updateDirections = (tGameObject, oGameObject, dtime) => {
    //TODO: fix calculation!

    let tDir = tGameObject.getDirection();
    let oDir = oGameObject.getDirection();

    if (tGameObject.isMovable()) {
        tGameObject.rollback(dtime);
        tGameObject.setDirection(tDir.reflect(oDir));
    }
    if (oGameObject.isMovable()) {
        oGameObject.rollback(dtime);
        oGameObject.setDirection(oDir.reflect(tDir));
    }
};

export default CollisionDetector;
