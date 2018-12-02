'use strict';

import AbstractApp from '../../Engine/App/AbstractApp';
import InGameScene from '../Scenes/InGameScene';
import PreGameScene from '../Scenes/PreGameScene';

class BreakoutApp extends AbstractApp {

    constructor() {
        super(document.getElementsByTagName('main')[0]);

        //TODO: register all scenes from SceneNames
        this.getSceneManager().registerScene(SceneNames.PREGAME, new PreGameScene(this));
        this.getSceneManager().registerScene(SceneNames.INGAME, new InGameScene(this));

    }

    /**
     * Starts the whole application including menu, game, ...
     */
    start() {
        //TODO: activate your first visible scene
        this.getSceneManager().activateScene(SceneNames.PREGAME);
    }

}

//TODO: define some scenes
const SceneNames = {
    PREGAME: 'pregame',
    INGAME: 'ingame',
};

export default BreakoutApp;
export {SceneNames};
