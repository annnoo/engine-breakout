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
     * @param {object} args Arguments to pass to next screen (e.g. scores)
     */
    activateScene(sceneId, args = {}) {
        // Safety check!
        if (this.registeredScenes[sceneId]) {
            // If an active scene exists
            if (this.activeSceneDomNode) {
                // Shut down old scene, then remove it from DOM
                args = this.registeredScenes[this.activeScene].onBeforeUnmount(args);

                // This code does not want to work because of DocumentFragment stuff
                // this.domNode.removeChild(this.activeSceneDomNode);
                // Here's a workaround (problem: removes everything from container)
                while (this.domNode.firstChild) {
                    this.domNode.removeChild(this.domNode.firstChild);
                }
            }

            // Update active scene pointer
            this.activeScene = sceneId;

            // Get DOM node of new scene, add it to DOM
            const newNode = this.registeredScenes[this.activeScene].onBeforeMount(args);
            this.domNode.appendChild(newNode);

            // no idea why, but these two will not be identical
            this.activeSceneDomNode = newNode;

            //TODO: Update keybindings for InputManager here
            this.registeredScenes[this.activeScene].onAfterMount();

            if (this.registeredScenes[this.activeScene] instanceof CanvasScene) {
                return this.registeredScenes[this.activeScene].renderer.layers;
            }
            else {
                return null;
            }
        }
        else {
            window.console.error(
                'NoSuchElementException: Scene with ID ' + sceneId + ' does not exist!'
            );
        }
    }

    // onUpdate is just relevant for the CanvasScene.
    // The CanvasScene creates the GameLoop ==> only CanvasScene needs this method
    // /**
    //  * Stuff to do, when GameLoop ticks.
    //  *
    //  * @param {number} dtime Time since last tick
    //  */
    // onUpdate(dtime) {
    //     this.registeredScenes[this.activeScene].onUpdate(dtime);
    // }
}

export default SceneManager;
