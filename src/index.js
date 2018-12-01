import './css/style.css';
import AssetManager from './js/AssetManager/AssetManager';
import LayeredRenderer from './js/Renderer/LayeredRenderer';
import Sprite from './js/GameObjects/Sprite';
import Img1 from './img/cropped_filter/paddle_m2_cropped_long.png';
import BrickImg from './img/cropped_filter/brick1_cropped.png';

import InputManager from './js/InputManager/InputManager';

import GameLoop from './js/GameLoop/GameLoop';
import Vec2 from './js/Math/Vec2';
import Paddle from './js-game/pad';
import Brick from './js-game/Brick';



let am = new AssetManager();
let htmlCanvas = document.getElementById('canvas');


let layerId = 0;
let layeredRenderer = new LayeredRenderer(htmlCanvas, [layerId]);

layeredRenderer.disableDebug();
let layer = layeredRenderer.getLayer(layerId);

am.addAsset(Img1,'image','pad');
am.addAsset(BrickImg,'image','brick');


let im = new InputManager();

am.downloadAll(() => {








    /** @type {HTMLCanvasElement} htmlCanvas */
    let htmlCanvas = document.getElementById('canvas');
    htmlCanvas.addEventListener('click', () => {

        htmlCanvas.requestPointerLock();
    });
    htmlCanvas.requestPointerLock();
    let layerId = 0;
    let layeredRenderer = new LayeredRenderer(htmlCanvas, [layerId]);
    layeredRenderer.disableDebug();
    let layer = layeredRenderer.getLayer(layerId);




    let im = new InputManager();


    layer.setClearFlag(true);
    let pad = new Paddle(300,300,am.getAssetByName('pad'),true,im);
    console.log(am.getAsset(1));
    let brick = new Brick(200,300,am.getAsset(1));

    layeredRenderer.registerRenderLoop();
    layer.setState([...layer.state, pad,brick]);

    // ballGreen.setSpeed(50);






    let gameLoop = new GameLoop(layeredRenderer);
    gameLoop.start(255);



});

