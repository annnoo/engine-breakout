import './css/style.css';
import SceneManager from './js/Scenes/SceneManager';
import CanvasScene from './js/Scenes/CanvasScene';
import DOMScene from './js/Scenes/DOMScene';

const sceneManager = new SceneManager(document.getElementsByTagName('main')[0]);
sceneManager.registerScene(0, new CanvasScene());
sceneManager.registerScene(1, new class extends DOMScene {
    constructor() {
        const template = document.createElement('template');
        template.content.appendChild(document.createElement('hr'));
        super(template, null, null);
    }
});

sceneManager.activateScene(0);

window.setTimeout(() => {
    sceneManager.activateScene(1);
    window.setTimeout(() => sceneManager.activateScene(0), 2000);
}, 2000);
