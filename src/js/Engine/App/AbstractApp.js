'use strict';

import AssetManager from '../AssetManager/AssetManager';
import InputManager from '../InputManager/InputManager';
import SceneManager from '../Scenes/SceneManager';
import AudioManager from '../Audio/AudioManager';
import StorageManager from '../StorageManager/StorageManager';

class AbstractApp {

    /**
     *
     * @param {HTMLElement} domNode DOM node to bind to
     */
    constructor(domNode) {
        this.assetManager = new AssetManager();
        this.inputManager = new InputManager();
        this.audioManager = new AudioManager();
        this.storageManager = new StorageManager();
        this.sceneManager = new SceneManager(domNode);
    }

    /**
     *
     * @returns {AssetManager}
     */
    getAssetManager() {
        return this.assetManager;
    }

    /**
     *
     * @returns {InputManager}
     */
    getInputManager() {
        return this.inputManager;
    }

    /**
     *
     * @returns {AudioManager}
     */
    getAudioManager() {
        return this.audioManager;
    }

    /**
     *
     * @returns {StorageManager}
     */
    getStorageManager() {
        return this.storageManager;
    }

    /**
     *
     * @returns {SceneManager}
     */
    getSceneManager() {
        return this.sceneManager;
    }

}

export default AbstractApp;
