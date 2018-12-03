'use strict';

import AbstractApp from '../../Engine/App/AbstractApp';
import InGameScene from '../Scenes/InGameScene';
import PreGameScene from '../Scenes/PreGameScene';
import BallImg from '../../../img/cropped_filter/ball2.png';
import PadImage from '../../../img/cropped_filter/paddle_m2_cropped_long.png';
import BrickImg1 from '../../../img/cropped_filter/brick1_cropped.png';
import BrickImg2 from '../../../img/cropped_filter/brick2_cropped.png';
import BrickImg3 from '../../../img/cropped_filter/brick3_cropped.png';
import BrickImg4 from '../../../img/cropped_filter/brick4_cropped.png';
import BrickImg5 from '../../../img/cropped_filter/brick4_str-e1_cropped.png';
import TestInGameScene from '../Scenes/TestInGameScene';

class BreakoutApp extends AbstractApp {

    constructor() {
        super(document.getElementsByTagName('main')[0]);

        //TODO: register all scenes from SceneNames
        this.getSceneManager().registerScene(SceneNames.PREGAME, new PreGameScene(this));
        this.getSceneManager().registerScene(SceneNames.TESTGAME, new TestInGameScene(this));
        this.getSceneManager().registerScene(SceneNames.INGAME, new InGameScene(this));

    }

    /**
     * Starts the whole application including menu, game, ...
     */
    start() {
        //TODO: download all assets

        this.getAssetManager().addAsset(BallImg, 'image', 'ball');
        this.getAssetManager().addAsset(PadImage, 'image', 'pad');
        this.getAssetManager().addAsset(BrickImg1, 'image', 'brick1');
        this.getAssetManager().addAsset(BrickImg2, 'image', 'brick2');
        this.getAssetManager().addAsset(BrickImg3, 'image', 'brick3');
        this.getAssetManager().addAsset(BrickImg4, 'image', 'brick4');
        this.getAssetManager().addAsset(BrickImg5, 'image', 'brick5');

        this.getAssetManager().downloadAll.bind(this)(() => {
            //TODO: activate your first visible scene
            this.getSceneManager().activateScene(SceneNames.PREGAME);
        });
    }

}

//TODO: define some scenes
const SceneNames = {
    PREGAME: 'pregame',
    INGAME: 'ingame',
    TESTGAME: 'testgame'
};

export default BreakoutApp;
export {SceneNames};
