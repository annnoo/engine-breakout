# breakout

A breakout browser game written in javascript

## Development
### Architecture
#### SceneManager
Use a `SceneManager` to manage scenes. The SceneManager will take of updating GameObjects in the currently active scene, but its `onUpdate(dtime)` method must be called from within the Game Loop.

Register scenes with `sceneManager.registerScene(id, scene)`. Switch between scenes by calling `sceneManager.activateScene(id)`. To pass arguments to the next scene, call `sceneManager.activateScene(id, { arg1: 'val1' })`.

#### Scenes
There are two types of scenes: DOM-Scenes and Canvas-Scenes. DOM-Scenes consist of arbitrary HTML and CSS, maybe even JS (untested). Canvas Scenes only have a `<canvas>` with a `LayeredRenderer` instance. Canvas Scenes use a LayeredRenderer and GameLoop.

##### Creating a Canvas-Scene
```js
const layers = ['bg', 'fg'];
const keybindings = null; // TODO
const app = null; // Put your AbstractApplication instance here

class MyScene extends CanvasScene {
    constructor(custom, layers, keybindings, app) {
        super(layers, keybindings, app);
        this.custom = custom;
    }

    onAfterMount() {
        const bg = this.renderer.getLayer('bg');
        const obj = new SampleGameObject(10, 20, this.app, custom);

        bg.state.push(obj);
    }
}

const myScene = new MyScene();

sceneManager.registerScene('my-scene', myScene);
```

##### Creating a Canvas-Scene
```html
<template>
    <h1>Main Menu</h1>
    <button class="start-game">Play</button>
</template>
```
```js
import TEMPLATE from './my-scene.template.html';

const keybindings = null; // TODO
const app = null; // Put your AbstractApplication instance here

class MyHtmlScene extends DOMScene {
    constructor(custom, keybindings, app) {
        super(TEMPLATE, keybindings, app);
        this.custom = custom;
    }

    onBeforeMount(args) {
        const node = super.onBeforeMount(args);

        node.getElementsByClassName('start-game')[0].addEventListener('click', this._onStartButtonClicked);

        return node;
    }

    _onStartButtonClicked() {
        this.app.activateScene('in-game', { arg1: 42 });
    }
}

const myHtmlScene = new MyHtmlScene();

sceneManager.registerScene('my-html-scene', myHtmlScene);
```

##### Accessing state
Only Canvas-Scenes have state (two dimensional array of layers and game objects). Access it using `scene.renderer.getLayer(id).state`.

##### Lifecycle
1. onBeforeMount(arguments): Called when the scene gets activated and right before the scene's DOM node is mounted into the document. Receives an object with arguments passed by the last scene or the SceneManager. Must return the DOM node to mount.

2. onAfterMount(): Called right after the scene's DOM node has been mounted.

3. onUpdate(dtime): Called when the scene is active and the SceneManager's onUpdate method has been called. Should not be called manually.

4. onBeforeUnmount(arguments): Called when another gets activated and right before this scene's DOM node gets unmounted from the document. Receives arguments object for the next scene and can be used to modify these. Must return arguments.

### Getting Started

#### Requirements

* node.js
* npm

Local installation of the dependencies
```
npm install
```

Global Installation of eslint for easy cli use
```
npm install -g eslint
```

#### Check your code

You can use
```
eslint ./src/**
```
or the npm script
```
npm run eslint
```

#### Building

To build the project, just type
```
npx webpack
```
or use the following npm script
```
npm run build
```

It creates ./dist/main.js file using the ./src/index.js file
