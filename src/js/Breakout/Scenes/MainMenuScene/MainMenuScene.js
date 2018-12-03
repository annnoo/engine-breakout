import DOMScene from '../../../Engine/Scenes/DOMScene';
import TEMPLATE from './MainMenuScene.template.html';
import { SceneNames } from '../../App/BreakoutApp';

const START_GAME_BUTTON = '#start-game';
const SELECT_LEVEL_BUTTON = '#select-level';
const TEASER_IMG = '.media-area > img';

import DEFAULT_TEASER_IMG from './DefaultTeaser.png';

class MainMenuScene extends DOMScene {
    /**
    * @param {AbstractApp} app
    */
    constructor(app) {
        super(TEMPLATE, null, app);
    }

    /**
     * Args:
     * imgURI = URI for image to show in menu
     * levelID = ID of level to play when clicking 'play'
     *
     * @override
     */
    onBeforeMount(args) {
        /** @type {HTMLElement} */
        const node = super.onBeforeMount(args);

        node.querySelector(START_GAME_BUTTON).addEventListener('click', this._startGame.bind(this));
        node.querySelector(SELECT_LEVEL_BUTTON).addEventListener('click', this._selectLevel.bind(this));
        node.querySelector(TEASER_IMG).src = (args.imgURI) ? args.imgURI : DEFAULT_TEASER_IMG;

        this.selectedLevel = args.levelID;

        return node;
    }

    _startGame() {
        this.app.getSceneManager().activateScene(SceneNames.INGAME, { level: this.levelID });
    }

    _selectLevel() {
        this.app.getSceneManager().activateScene(SceneNames.LEVEL_SELECT);
    }
}

export default MainMenuScene;
