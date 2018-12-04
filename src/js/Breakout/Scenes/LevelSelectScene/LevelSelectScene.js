import DOMScene from '../../../Engine/Scenes/DOMScene';
import TEMPLATE from './LevelSelectScene.template.html';
import { SceneNames } from '../../App/BreakoutApp';

const TEASER_IMG = '.media-area > img';

import RED_BRICK from '../MainMenuScene/brick_red.png';
import ORANGE_BRICK from '../MainMenuScene/brick_orange.png';
import GREEN_BRICK from '../MainMenuScene/brick_green.png';
import BLUE_BRICK from '../MainMenuScene/brick_blue.png';

class MainMenuScene extends DOMScene {
    /**
    * @param {AbstractApp} app
    */
    constructor(app) {
        super(TEMPLATE, null, app);
    }

    /**
     * Args:
     * imgURI = URI of img to show
     * selectedLevelID = ID of currently selected level
     *
     * @override
     */
    onBeforeMount(args) {
        /** @type {HTMLElement} */
        const node = super.onBeforeMount(args);

        // Parse scene args
        this.selectedLevel = args.selectedLevelID;

        // Back button
        node.querySelector('#back-button').addEventListener('click', this._backToMainMenu.bind(this));

        // Level buttons
        node.querySelectorAll('.level-changer').forEach(element => {
            const levelId = element.dataset.levelId;
            element.addEventListener('click', (() => this._selectLevel(levelId)).bind(this));

            // Make the button of the selected level red
            if (levelId === this.selectedLevel) {
                element.classList.replace('button-orange', 'button-red');
            }
        });

        // Teaser image
        node.querySelector(TEASER_IMG).src = (args.imgURI) ? args.imgURI : 'http://placehold.it/1920x1080';

        node.querySelectorAll('.button').forEach(element => {
            element.style.borderImageSlice = '2';
            element.style.borderImageWidth = '10px';
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

    _selectLevel(id) {
        this.app.getSceneManager().activateScene(SceneNames.LEVEL_SELECT, { selectedLevelID: id });
    }

    _backToMainMenu() {
        this.app.getSceneManager().activateScene(SceneNames.MAIN_MENU, { levelID: this.selectedLevel });
    }
}

export default MainMenuScene;
