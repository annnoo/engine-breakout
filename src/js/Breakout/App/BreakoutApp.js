'use strict';

import AbstractApp from '../../Engine/App/AbstractApp';
import InGameScene from '../Scenes/InGameScene/InGameScene';
import PreGameScene from '../Scenes/PreGameScene';
import BallImg from '../../../img/cropped_filter/ball2.png';
import PadImage from '../../../img/cropped_filter/paddle_m2_cropped_long.png';
import BrickImg1 from '../../../img/cropped_filter/brick1_cropped.png';
import BrickImg2 from '../../../img/cropped_filter/brick2_cropped.png';
import BrickImg3 from '../../../img/cropped_filter/brick3_cropped.png';
import BrickImg4 from '../../../img/cropped_filter/brick4_cropped.png';
import BrickImg5 from '../../../img/cropped_filter/brick4_str-e1_cropped.png';
import TestInGameScene from '../Scenes/TestInGameScene';

import MainMenuScene from '../Scenes/MainMenuScene/MainMenuScene';
import LevelSelectScene from '../Scenes/LevelSelectScene/LevelSelectScene';
import LevelManager from '../Level/LevelManager';

class BreakoutApp extends AbstractApp {

    constructor() {
        super(document.getElementsByTagName('main')[0]);

        this.levelManager = new LevelManager(this);
    }

    /**
     *
     * @returns {LevelManager}
     */
    getLevelManager(){
        return this.levelManager;
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

            //TODO: register all scenes from SceneNames
            //load scenes only now, because of possible asset dependencies in constructor
            this.getSceneManager().registerScene(SceneNames.PREGAME, new PreGameScene(this));
            this.getSceneManager().registerScene(SceneNames.TESTGAME, new TestInGameScene(this));

            this.getSceneManager().registerScene(SceneNames.MAIN_MENU, new MainMenuScene(this));
            this.getSceneManager().registerScene(SceneNames.LEVEL_SELECT, new LevelSelectScene(this));
            this.getSceneManager().registerScene(SceneNames.INGAME, new InGameScene(this));

            //TODO: activate your first visible scene
            this.getSceneManager().activateScene(SceneNames.MAIN_MENU);
        });
    }

}

//TODO: define some scenes
const SceneNames = {
    MAIN_MENU: 'MAIN_MENU',
    LEVEL_SELECT: 'LEVEL_SELECTOR',
    PREGAME: 'pregame',
    INGAME: 'ingame',
    TESTGAME: 'testgame'
};

export default BreakoutApp;
export {SceneNames};
