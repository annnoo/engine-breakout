'use strict';

import DOMScene from '../../Engine/Scenes/DOMScene';
import {SceneNames} from '../App/BreakoutApp';

//TODO: change this scene or remove it
class PreGameScene extends DOMScene {

    /**
     *
     * @param {AbstractApp} app
     */
    constructor(app) {

        //TODO: create a template element which consists all dom elements of your scene
        const template = document.createElement('template');
        template.content.appendChild(document.createElement('hr'));

        /**
         * @type {HTMLButtonElement}
         */
        let btn1 = document.createElement('button');
        btn1.type = 'button';
        btn1.textContent = 'Run Test Game';
        btn1.id = 'myBtn1';

        template.content.appendChild(btn1);

        /**
         * @type {HTMLButtonElement}
         */
        let btn2 = document.createElement('button');
        btn2.type = 'button';
        btn2.textContent = 'Run Real Game';
        btn2.id = 'myBtn2';

        template.content.appendChild(btn1);
        template.content.appendChild(document.createElement('br'));
        template.content.appendChild(btn2);

        super(template, null, null);
        this.app = app;
    }

    onAfterMount() {
        super.onAfterMount();

        //TODO: the dom elements are mounted and now you can add e.g. some event listener
        let btn1 = document.getElementById('myBtn1');
        btn1.addEventListener("click", function(e) {
            window.console.log("clicked myBtn1");
            this.app.getSceneManager().activateScene(SceneNames.TESTGAME);
        }.bind(this), false);

        let btn2 = document.getElementById('myBtn2');
        btn2.addEventListener("click", function(e) {
            window.console.log("clicked myBtn2");
            this.app.getSceneManager().activateScene(SceneNames.INGAME);
        }.bind(this), false);
    }

}

export default PreGameScene;
