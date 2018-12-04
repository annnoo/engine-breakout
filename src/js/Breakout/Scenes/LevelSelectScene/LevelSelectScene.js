import DOMScene from '../../../Engine/Scenes/DOMScene';
import TEMPLATE from './LevelSelectScene.template.html';
import { SceneNames } from '../../App/BreakoutApp';

const TEASER_IMG = '.media-area > img';

import RED_BRICK from '../MainMenuScene/brick_red.png';
import ORANGE_BRICK from '../MainMenuScene/brick_orange.png';
import GREEN_BRICK from '../MainMenuScene/brick_green.png';
import BLUE_BRICK from '../MainMenuScene/brick_blue.png';
import TEASER from '../MainMenuScene/DefaultTeaser.png';

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
     * page = page number to show
     * selectedLevelID = ID of currently selected level
     *
     * @override
     */
    async onBeforeMount(args) {
        /** @type {HTMLElement} */
        const node = super.onBeforeMount(args);

        const levelNames = await this.app.getLevelManager().requestLevelNames();

        // Parse scene args
        this.selectedLevel = args.selectedLevelID;
        this.displayPage = args.page ? args.page : 1;

        // Teaser
        node.querySelector(TEASER_IMG).src = TEASER;

        // Level
        this.args = args;

        this.pageSize = 4;
        this.firstPage = 1;
        this.lastPage = Math.ceil(levelNames.length / this.pageSize);

        const levels = levelNames.slice((this.displayPage - 1) * this.pageSize, (this.displayPage - 1) * this.pageSize + this.pageSize);

        levels.forEach(level => {
            const levelButton = document.createElement('button');
            levelButton.classList = 'level-changer button button-orange';
            levelButton.dataset.levelId = level;
            levelButton.innerHTML = level;

            node.querySelector('.items').appendChild(levelButton);
        });


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

        // Nav buttons
        node.querySelector('#next-page').addEventListener('click', (() => {
            this._switchPage(this.displayPage + 1);
        }).bind(this));

        node.querySelector('#before-page').addEventListener('click', (() => {
            this._switchPage(this.displayPage - 1);
        }).bind(this));

        node.querySelector('#first-page').addEventListener('click', (() => {
            this._switchPage(1);
        }).bind(this));

        node.querySelector('#last-page').addEventListener('click', (() => {
            this._switchPage(this.lastPage);
        }).bind(this));

        if (this.displayPage === this.firstPage) {
           node.querySelector('#first-page').disabled = true;
           node.querySelector('#before-page').disabled = true;
        }

        if (this.displayPage === this.lastPage) {
            node.querySelector('#last-page').disabled = true;
            node.querySelector('#next-page').disabled = true;
         }

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

    async _selectLevel(id) {
        console.log('Making ingame scene load level ' + id);
        const ingameScene = this.app.getSceneManager().registeredScenes[SceneNames.INGAME];
        const levelInstance = await this.app.levelManager.getLevel(id);
        ingameScene.loadLevel(levelInstance);

        console.log('Refreshing view');
        this.app.getSceneManager().activateScene(SceneNames.LEVEL_SELECT, { ...this.args, selectedLevelID: id });
    }

    _switchPage(number) {
        this.app.getSceneManager().activateScene(SceneNames.LEVEL_SELECT, { ...this.args, page: number });
    }

    _backToMainMenu() {
        this.app.getSceneManager().activateScene(SceneNames.MAIN_MENU, { levelID: this.selectedLevel });
    }
}

export default MainMenuScene;
