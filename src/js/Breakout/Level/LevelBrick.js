'use strict'

class LevelBrick {

    constructor(posX, posY, lifeCounter) {


    }

    updateImage() {
        this.image = this._getImageByName();
    }

    disable() {
        this.image = new Image(0, 0);
        this.collidable = false;
    }

    _getImageByName() {
        let name = 'brick';
        if (this.lifeCounter < 1)
            return new Image();
        if (this.lifeCounter > 5) {
            name += '5';
        } else {
            name += this.lifeCounter;
        }

        return this.assetManager.getAssetByName(name);
    }

}

export default LevelBrick;
