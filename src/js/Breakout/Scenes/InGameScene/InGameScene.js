'use strict';

import CanvasScene from '../../../Engine/Scenes/CanvasScene';
import Rectangle from '../../../Engine/GameObjects/Rectangle';
import Text from '../../../Engine/GameObjects/Text';
import Vec2 from '../../../Engine/Math/Vec2';
import Ball from '../../GameObjects/Ball';
import Paddle from '../../GameObjects/Paddle';
import Brick from '../../GameObjects/Brick';
import {SceneNames} from '../../App/BreakoutApp';
import Sprite from '../../../Engine/GameObjects/Sprite';

const CANVAS_WIDTH = 360; //canvas.width
const CANVAS_HEIGHT = 240; //canvas.height
const WALL_WIDTH = 5;
const PADDLE_WIDTH = 48;
const PADDLE_HEIGHT = 8;
const PADDLE_BOT_SPACE = 5;
const BALL_WIDTH = 7;
const BALL_HEIGHT = 7;
const BALL_PADDLE_SPACE = 20;


let KEYS_REGISTERED = false;

class InGameScene extends CanvasScene {

    /**
     *
     * @param {AbstractApp} app
     */
    constructor(app) {
        //how often it has to be re-rendered
        //often: ball
        //rare: brick
        //never: background
        super(Object.values(LayerNames), getKeybindings(), app);

        let inputManager = this.app.getInputManager();

        let paddleImg = this.app.getAssetManager().getAssetByName('pad');
        this.paddle = new Paddle(CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, CANVAS_HEIGHT - PADDLE_HEIGHT - PADDLE_BOT_SPACE, paddleImg, true, inputManager);
        this.paddle.setMinX(WALL_WIDTH);
        this.paddle.setMaxX(CANVAS_WIDTH-WALL_WIDTH);

        let ballImg = this.app.getAssetManager().getAssetByName('ball');
        this.ball = new Ball(CANVAS_WIDTH / 2 - BALL_WIDTH / 2, this.paddle.getPosition().y - BALL_PADDLE_SPACE, ballImg);

        let wT = new Rectangle(0, 0, CANVAS_WIDTH - WALL_WIDTH, WALL_WIDTH);
        let wR = new Rectangle(CANVAS_WIDTH - WALL_WIDTH, 0, WALL_WIDTH, CANVAS_HEIGHT - WALL_WIDTH);
        // let wB = new Rectangle(WALL_WIDTH, CANVAS_HEIGHT - WALL_WIDTH, CANVAS_WIDTH - WALL_WIDTH, WALL_WIDTH);
        let wL = new Rectangle(0, WALL_WIDTH, WALL_WIDTH, CANVAS_HEIGHT - WALL_WIDTH);

        wT.setDirection(new Vec2(1, 0));
        wR.setDirection(new Vec2(0, -1));
        // wB.setDirection(new Vec2(1, 0)); // dont need this or you will never die
        wL.setDirection(new Vec2(0, -1));
        wT.visible = false;
        wR.visible = false;
        // wB.visible = false; // dont need this or you will never die
        wL.visible = false;

        this.walls = [
            wT,
            wR,
            // wB, // dont need this or you will never die
            wL
        ];

        let bgImg = this.app.getAssetManager().getAssetByName('bg');
        this.background = new Sprite(0, 0, bgImg, false);

        this.infoText = new Text(100, 10, ''); //TODO: change pos and font!

        this.currentLevel = undefined;
    }

    onAfterMount() {
        super.onAfterMount();

        if(this.reloadLevelOnMounted){
            // this.reloadLevelOnMounted = false;

            this.getLayer(LayerNames.OFTEN).setState([
                this.background,
                ...this.bricks,
                this.infoText,
                this.ball,
                this.paddle,
                ...this.walls
            ]);
        }

        this.renderer.enableDebug(true);

        //register keyalias
        if (!KEYS_REGISTERED) {
            KEYS_REGISTERED = true;

            let inputManager = this.app.getInputManager();
            for (let alias in this.keybindings) {
                inputManager.addKey(alias, this.keybindings[alias]);
            }
        }

        this.infoText.setText('Press ENTER to start');
    }

    onBeforeUnmount(args) {
        return super.onBeforeUnmount(args);
    }

    _onBrickBreak(brick){
        //TODO: test if is is called correctly
        this.brickCounter--;
        if(this.brickCounter<=0){
            //no bricks => won
            this._onGameWon();
        }
    }

    _onGameWon(){
        this.infoText.setText('You won!');
        this.infoText.visible = true;
        alert('Well done, you win!');
        const img = this.renderer.canvas.display.toDataURL();
        this.unloadLevel();
        this.app.getSceneManager().activateScene(SceneNames.MAIN_MENU, { imgURI: img });
    }

    _onGameLost(){
        this.infoText.setText('You lost!');
        this.infoText.visible = true;
        this.gameloop.stop();
        alert('You lose!');
        const img = this.renderer.canvas.display.toDataURL();
        this.unloadLevel();
        this.app.getSceneManager().activateScene(SceneNames.MAIN_MENU, { imgURI: img });
    }

    onUpdate(dtime) {
        super.onUpdate(dtime);

        if (this.ball.position.y + BALL_HEIGHT >= this.paddle.position.y + PADDLE_HEIGHT) {
            //ball on ground => lost
            this._onGameLost();
            return;
        }
        let htmlCanvas = this.renderer.canvas.display;

        htmlCanvas.addEventListener('dblclick', () => {
            htmlCanvas.requestPointerLock();
        });
        htmlCanvas.requestPointerLock();
        //check keys
        let inputManager = this.app.getInputManager();
        if (inputManager.keyPressed(KeyNames.START)) {

            this.infoText.visible = false;
            this.ball.setSpeed(100);

            //TODO: pointer lock does not work!!
            //TODO: see here https://codepen.io/MSEdgeDev/pen/zqYBbb
            //synchronize mouse with paddle
            this.app.getInputManager().mouseMovement.set(0, 0);

            //htmlCanvas.requestPointerLock = htmlCanvas.requestPointerLock || htmlCanvas.mozRequestPointerLock;

            //pointer lock when click in canvas


            // htmlCanvas.requestPointerLock = htmlCanvas.requestPointerLock || htmlCanvas.mozRequestPointerLock;
            // htmlCanvas.requestPointerLock();
            // this.paddle.setSpeed(1); //ignores the speed, it just checks if speed == 0 => no update



        }else if(inputManager.keyPressed(KeyNames.PAUSE)){

            let canvasImgSrc = this.renderer.canvas.display.toDataURL(); //current image of canvas as src attribute
            this.app.getSceneManager().activateScene(SceneNames.MAIN_MENU, {
                imgURI: canvasImgSrc
            });

        }else if(inputManager.keyPressed(KeyNames.TOGGLE_DEBUG)){

            if(this.renderer.debugEnabled){
                this.renderer.disableDebug();
            }else{
                this.renderer.enableDebug();
            }

        }

        this.getLayer(LayerNames.OFTEN).setClearFlag(true);
    }

    /**
     * Loads the given level into the Scene. This does not mean that the game begins.
     * It just removes the old state and creates a new paddle, ball and bricks.
     * The ball's speed is 0.
     *
     * @param {Level} level The level to load
     */
    loadLevel(level){

        this.ball.setSpeed(0);
        this.ball.setDirection(new Vec2(0, -1));

        this.paddle.setSpeed(1);

        this.brickCounter = 0;

        let assetManager = this.app.getAssetManager();
        this.bricks = [];
        for(let levelBrick of level.getBricks()){
            if(levelBrick.lifeCounter>0){
                this.brickCounter++;
            }
            let brick = Brick.from(levelBrick, assetManager);
            //TODO: test of it works with the bind!
            brick.setOnBrickBreakHandler(this._onBrickBreak.bind(this, brick));
            this.bricks.push(brick);
        }

        this.reloadLevelOnMounted = true;
        this.currentLevel = level;
    }

    unloadLevel() {
        let paddleImg = this.app.getAssetManager().getAssetByName('pad');
        this.paddle = new Paddle(CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2, CANVAS_HEIGHT - PADDLE_HEIGHT - PADDLE_BOT_SPACE, paddleImg, true, this.app.getInputManager());
        this.paddle.setMinX(WALL_WIDTH);
        this.paddle.setMaxX(CANVAS_WIDTH-WALL_WIDTH);

        let ballImg = this.app.getAssetManager().getAssetByName('ball');
        this.ball = new Ball(CANVAS_WIDTH / 2 - BALL_WIDTH / 2, this.paddle.getPosition().y - BALL_PADDLE_SPACE, ballImg);

        this.currentLevel = null;
    }

    /**
     *
     * @returns {boolean} If any level is loaded
     */
    isAnyLevelLoaded() {
        return this.currentLevel !== undefined && this.currentLevel !== null;
    }

    /**
     *
     * @returns {Level} Current level
     */
    getLoadedLevel() {
        return this.currentLevel;
    }

    /**
     * Returns the layer by the given name. Please use LayerNames.XXX
     *
     * @param {string} name The layer's name
     * @returns {*}
     */
    getLayer(name) {
        return this.renderer.getLayer(name);
    }

}

const LayerNames = {
    OFTEN: 'often',
    RARE: 'rare',
    NEVER: 'never'
};

const KeyNames = {
    //TODO: define some keynames
    START: 'start',
    PAUSE: 'pause',
    TOGGLE_DEBUG: 'toggleDebug'
};

const getKeybindings = () => {
    //TODO: define some keybindings
    let bindings = {};
    bindings[KeyNames.START] = 13; //ENTER
    bindings[KeyNames.PAUSE] = 27; //ESC
    bindings[KeyNames.TOGGLE_DEBUG] = 68; //D

    return bindings;
};

export default InGameScene;
