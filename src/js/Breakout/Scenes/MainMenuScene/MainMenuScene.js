import DOMScene from '../../../Engine/Scenes/DOMScene';
import TEMPLATE from './MainMenuScene.template.html';
import { SceneNames } from '../../App/BreakoutApp';

const MAIN_MENU = '#main-menu';
const START_GAME_BUTTON = '#start-game';
const SELECT_LEVEL_BUTTON = '#select-level';
const TEASER_IMG = '.media-area > img';

import DEFAULT_TEASER_IMG from './DefaultTeaser.png';
import RED_BRICK from './brick_red.png';
import ORANGE_BRICK from './brick_orange.png';
import GREEN_BRICK from './brick_green.png';
import BLUE_BRICK from './brick_blue.png';

import LOGO_IMG from './logo.png';

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

        if (!this.app.getSceneManager().registeredScenes[SceneNames.INGAME].isAnyLevelLoaded()) {
            node.querySelector(START_GAME_BUTTON).disabled = true;
        }

        node.querySelectorAll('.button').forEach(element => {
            element.style.borderImageSlice = '2';
            element.style.borderImageWidth = '10px';
        });
        node.querySelectorAll('.logo').forEach(element => {
            element.setAttribute('src',LOGO_IMG);
        });
        node.querySelectorAll('.button-red').forEach(element => {
            element.style.borderImageSource = 'url(' + RED_BRICK + ')';
        });

        node.querySelectorAll('.button-orange').forEach(element => {
            element.style.borderImageSource = 'url(' + ORANGE_BRICK + ')';
        });

        node.querySelectorAll('.button-green').forEach(element => {
            element.style.borderImageSource = 'url(' + GREEN_BRICK + ')';
        });

        node.querySelectorAll('.button-blue').forEach(element => {
            element.style.borderImageSource = 'url(' + BLUE_BRICK + ')';
        });

        return node;
    }

    _startGame() {
        this.app.getSceneManager().activateScene(SceneNames.INGAME, { level: this.levelID });
    }

    _selectLevel() {
        this.app.getSceneManager().activateScene(SceneNames.LEVEL_SELECT, { selectedLevelID: this.selectedLevel });
    }
}

export default MainMenuScene;
