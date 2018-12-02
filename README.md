# Breakout

Here you find the retro classic Arkanoid (BreakOut) as a modern web application.

It is written in plain vanilla HTML5, CSS and JavaScript. In the following chapters the remaining 
technologies that were used are explained.

This project was initiated with regard to the lecture "Projects of business informatics" 
at the [FHDW](https://www.fhdw.de/).

# User manual

## Getting started

Browse to the [release page](https://gitlab.com/seeya-js/breakout/releases), click at the latest version
and download the source code.

To run the game you need a webserver like [Apache](http://httpd.apache.org/docs/2.4/install.html) 
or [nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/).

If you only provide the game locally, we recommend [XAMPP](https://www.apachefriends.org/download.html), which
contains other useful products besides an apache webserver.

Move the downloaded file to the public directory of your webserver (e.g. */htdocs* for Apache) and
extract **here**.

After that, start your webserver (if not already done) and type the following url into your browser.
```
http://localhost:<port>/breakout-<version>
```
The default port for most webservers is 80. You can determine the version by the name of the extracted file.

*Please notice the known bugs and the supported browsers!*

# Developer manual

## Architecture
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
