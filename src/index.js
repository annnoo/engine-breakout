import './css/style.css';
import LayeredRenderer from './js/Renderer/LayeredRenderer';
import Sprite from './js/Renderer/GraphicObjects/Sprite';



let rm = new LayeredRenderer(document.getElementById('canv'),['bg']);
rm.disableDebug();


rm.registerRenderLoop();
let str = 'proxy.duckduckgo.com.jpg';

let sprite = new Sprite(20,20,str);
let sprite2 = new Sprite(100,20,str);
let layer = rm.getLayer('bg');
layer.setState([...layer.state, sprite,sprite2]);
