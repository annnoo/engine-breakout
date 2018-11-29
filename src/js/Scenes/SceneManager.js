'use strict';

import DOMScene from './DOMScene';
import CanvasScene from './CanvasScene';

/**
 * The SceneManager holds all displayable scenes
 * and manages which scene will actually displayed
 * in a given container.
 *
 * @author Christian Danscheid
 */
class SceneManager {
    /**
     * @param {HTMLElement} domNode DOM node to bind to
     * @param {Array<DOMScene | CanvasScene>} scenes Array of scenes to register
     */
    constructor(domNode, scenes = []) {
        this.domNode = domNode;
        this.registeredScenes = scenes;
        this.activeScene = null;
    }

    /**
     * Register a scene with this SceneManager.
     *
     * @param {*} id Scene identifier for later use
     * @param {DOMScene | CanvasScene} scene Scene to register
     */
    registerScene(id, scene) {
        this.registeredScenes[id] = scene;
    }

    /**
     * Activate a registered scene.
     *
     * @param {*} sceneId Identifier of next scene
     * @param {object} arguments Arguments to pass to next screen (e.g. scores)
     */
    activateScene(sceneId, arguments = {}) {
        // Safety check!
        if (this.registeredScenes[sceneId]) {
            // If an active scene exists
            if (this.activeSceneDomNode) {
                // Shut down old scene, then remove it from DOM
                arguments = this.registeredScenes[this.activeScene].onBeforeUnmount(arguments);
                this.domNode.removeChild(activeSceneDomNode);
            }

            // Update active scene pointer
            this.activeScene = sceneId;

            // Get DOM node of new scene, add it to DOM
            this.activeSceneDomNode = this.registeredScenes[this.activeScene].onBeforeMount(arguments);
            this.domNode.appendChild(this.activeSceneDomNode);

            //TODO: Update keybindings for InputManager here
            this.registeredScenes[this.activeScene].onAfterMount();
        }
        else {
            window.console.error(
                'NoSuchElementException: Scene with ID ' + sceneId + ' does not exist!'
            );
        }
    }

    /**
     * Stuff to do, when GameLoop ticks.
     *
     * @param {number} dtime Time since last tick
     */
    onUpdate(dtime) {
        this.registeredScenes[this.activeScene].onUpdate(dtime);
    }
}

export default SceneManager;
