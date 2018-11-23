import './css/style.css';
import LayeredRenderer from './js/Renderer/LayeredRenderer';
import Sprite from './js/Renderer/GraphicObjects/Sprite';
import Rectangle from './js/Renderer/GraphicObjects/Rectangle';







let rm = new LayeredRenderer(document.getElementById('canvas'), ['bg']);
rm.disableDebug();


rm.registerRenderLoop();
let str = 'proxy.duckduckgo.com.jpg';


let rect = new Rectangle(10,10,100,100);
let sprite = new Sprite(20, 20, str,16,16);
let layer = rm.getLayer('bg');
layer.setState([...layer.state, sprite,]);

setInterval(() => {
    layer.setClearFlag(true);


    sprite.position.add(0,1);
    
}, 100);



