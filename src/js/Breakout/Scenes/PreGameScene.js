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
        let btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = 'Click Me :)';
        btn.id = 'myBtn';

        template.content.appendChild(btn);

        super(template, null, null);
        this.app = app;
    }

    onAfterMount() {
        super.onAfterMount();

        //TODO: the dom elements are mounted and now you can add e.g. some event listener
        let btn = document.getElementById('myBtn');
        btn.addEventListener("click", function(e) {
            window.console.log("clicked");
            this.app.getSceneManager().activateScene(SceneNames.INGAME);
        }.bind(this), false);
    }

}

export default PreGameScene;
