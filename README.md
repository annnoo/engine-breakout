# No Man's Brick

Here you find the game "No Man's Brick", a retro classic Arkanoid (BreakOut) as a modern web application.

It is written in plain vanilla HTML5, CSS and JavaScript. In the following chapters the remaining
technologies that were used are explained.

This project was initiated with regard to the lecture "Projects of business informatics"
at the [FHDW](https://www.fhdw.de/).

Date of creation: 19.11.2018

# User manual

## Getting started

Browse to the [release page](https://gitlab.com/seeya-js/breakout/tags)
and download the source code.

To run the game you need a webserver like [Apache](http://httpd.apache.org/docs/2.4/install.html)
or [nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/) and PHP.

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

## Starting a game
1. From the Main Menu, click *[Select Level]*
2. Click the level you'd like to play and wait for it to become highlighted (red)
3. Go back to the Main Menu using the *[&larr; Back to Main Menu]* button
4. Click *[Play game]*
5. Within the game, double-click the game to lock the mouse pointer, the paddle will now be controlled using the mouse
6. Hit *ENTER* to start the game. Break all blocks and don't drop the ball!
7. To exit the level, press *ESC* twice, you will return to the Main Menu

## Add level

To add a level you can simply copy the level file into the following directory in your public
directory of the webserver. Please make sure that the level format is respected. Otherwise
your level will look very empty.

```
breakout-<version>
  |- /dist
    |- /levels
      |- getlevelnames.php
      |- level.json
      |- myLevel.json
      |- customNamedLevel.json
```

### Level format

Levels are json files in which an object is defined that represents the level. The object has a *name* attribute
that specifies the name of the level and a *positions* attribute. The value of this attribute is an 2D array. Each
entry represents a row. The values of a row represent a cell in the game area. Values below or equal 0 are invisible
or non existing bricks. Values above 0  indicate that there is a brick at this point or in this cell.

Each implementation of the breakout game can interpret the cell value individually. In our case it defines the
amount of lives of the stone. Depending on the number of lives a brick has a different colour.

```json
{
    "name": "My Fancy Level 1",
    "positions": [
        [1, 0, 0, 1],
        [0, 2, 2, 0],
        [1, 0, 0, 1]
    ]
}
```

If your game area is 9 cells wide and 10 cells high, this example level will like this.

![Level Example](https://files.tebros.de/unprotected/breakout/level_example.png)

## Browsers compatibility
* Latest Firefox
* Latest Chrome or Chromium
* Internet Explorer, Edge and any other browsers are **NOT SUPPORTED**!

The minimum recommended screen resolution is 1280x768.

## Known bugs
* Locking the mouse pointer requires a double click
* Leaving a level requires two presses of ESC
* When entering the level selector after leaving a level, the just played level will not be highlighted
* The level selection screen flickers when switching pages
* Collision detection sometimes failes at the paddle and always when colliding with left, top and right of a block
* Nach verlorenem Level muss die App neugeladen werden

## Authors

* [Christian Danscheid](https://gitlab.com/webD97) - Christian Danscheid
* [Anno](https://gitlab.com/annnoo) - Anno Kerp
* [Tebros](https://gitlab.com/Tebros) - Yannik Ries


## Assignments and responsibilities

In general, every author has worked on all parts of the project,
be it bug fixing, add functionality to existing classes or general architecture.
In the following the responsibilities for the main parts are listed.

* **Christian Danscheid**
    * Renderer with all underlying components (CanvasBuffer, DoubleBufferedCanvas, LayeredCanvas, LayeredRenderer...)
    * SceneManager with Scene lifecycle
    * DOMScene and CanvasScene
    * GameLoop
    * MainMenuScene and LevelSelectScene (draft and implementation)
    * Level files
* **Anno Kerp**
    * Vector2D
    * InputManager
    * AudioManager
    * Game objects
    * All image files
    * All audio files
* **Yannik Ries**
    * AssetManager
    * CollisionDetection
    * Physics
    * StorageManager
    * AbstractApp
    * LevelManager and Level
    * README

## Used technologies

* [EditorConfig](https://editorconfig.org/) ensures that all developers have a consistent file style (linebreaks, encoding, indentation, etc.)
* [npm](https://www.npmjs.com/) helps to download some of the other technologies
* [ESLint](https://eslint.org/) checks the code for coding standards and outputs warnings
* [webpack](https://webpack.js.org/) bundles and minifies the code and assets
* [git](https://git-scm.com/) helps us to develop with more than a single person on this project
and controls the versions
* [Some webpack loaders](https://webpack.js.org/loaders/) which allow to bundle other files besides .js files

## License
This project is licensed under the MIT license. All images and
audio files were created by the developers of this project and
are licensed with the same license.

* [EditorConfig](https://editorconfig.org/) Creative Commons Attribution 3.0 Unported
* [npm](https://www.npmjs.com/policies/npm-license) Artistic License 2.0
* [ESLint](https://github.com/eslint/eslint/blob/master/LICENSE) MIT
* [webpack](https://github.com/webpack/webpack/blob/master/LICENSE) MIT
* [git](https://git-scm.com/about/free-and-open-source) GNU GPLv2
* [Some webpack loaders](https://webpack.js.org/loaders/)
    * [style-loader](https://github.com/webpack-contrib/style-loader/blob/master/LICENSE) MIT
    * [css-loader](https://github.com/webpack-contrib/css-loader/blob/master/LICENSE) MIT
    * [file-loader](https://github.com/webpack-contrib/file-loader/blob/master/LICENSE) MIT
    * [image-webpack-loader](https://github.com/webpack-contrib/file-loader/blob/master/LICENSE) MIT
    * [dom-element-loader](https://github.com/Makio64/dom-element-loader) MIT


# Developer manual

## Getting Started

### Requirements

Please ensure that the following requirements are installed.

* node.js
* npm

Run npm install to install all dependencies locally.
```
npm install
```

Please install eslint globally.
```
npm install -g eslint
```

Please check if your IDE supports EditorConfig.

### Check your code

You can check your coding style by running
```
eslint ./src/**
```
If you prefer a npm script you are welcome to use
```
npm run eslint
```

### Development build

You can use the following command that webpack builds your project automatically whenever there is a change.
```
npm run dev
```

You can find your build in the */dist* directory.

The entry point of webpack is *./src/index.js*. It bundles
all resources into *./dist/main.js*.

### Productive build

Similar to the development build, you can also use *npm run dev*.
But in some cases you want to build the project by your own.
```
npm webpack
```
or you can also use a npm script
```
npm run build
```

The distribution is equal to the development build.

**Important:** The *.gitignore* file in the */dist* directory
excludes everything but *index.html*. So ensure that your commit
contains the whole content of the */dist* directory!


