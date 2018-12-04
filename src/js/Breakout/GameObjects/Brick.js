import Sprite from '../../Engine/GameObjects/Sprite';
import Area from '../../Engine/Math/Area';

class Brick extends Sprite {

    constructor(posX, posY, lifeCounter, assetManager, collidable = true) {
        let image = assetManager.getAssetByName('brick5');
        super(posX, posY, new Area(posX, posY, image.width, image.height), collidable);

        this.assetManager = assetManager;
        this.lifeCounter = lifeCounter;
        this.image = this._getImageByName();

        this.dimensions = {
            width: this.image.width,
            height: this.image.height
        };

    }

    /**
     *
     * @param callback Call im lifecounter <= 0
     */
    setOnBrickBreakHandler(callback){
        this.onBrickBreakHandler = callback;
    }

    updateImage() {
        this.image = this._getImageByName();
    }

    disable() {
        this.image = new Image(0, 0);
        this.visible = false;
        this.collidable = false;

        this.onBrickBreakHandler();
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

    /**
     * Ports the given level brick to the brick game object and returns it.
     *
     * @param {LevelBrick} levelBrick Level brick that should be ported
     * @param {AssetManager} assetManager The asset manager of the app
     * @param {boolean} collidable If the brick is collidable (default=true)
     */
    static from(levelBrick, assetManager, collidable = true){
        return new Brick(levelBrick.posX, levelBrick.posY, levelBrick.lifeCounter, assetManager, collidable);
    }

}

export default Brick;
