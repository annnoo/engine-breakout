import './css/style.css';
import Audio1 from './assets/audio/audio_1.wav';
// import Audio2 from './assets/audio/audio_2.mp3';
import Img1 from './assets/img/img_1.png';
import Img2 from './assets/img/img_2.png';
import AssetManager, {AM_FAILED} from './js/AssetManager/AssetManager';

let am = new AssetManager();

let id_img1 = am.addImage(Img1);
let id_img2 = am.addImage(Img2);

window.console.log('img1 state: '+am.getAssetState(id_img1));
window.console.log('img2 state: '+am.getAssetState(id_img2));
am.downloadAll(() => {

    // alert('Callback called #1!');

    window.console.log('img1 state in callback: '+am.getAssetState(id_img1));
    window.console.log('img2 state in callback: '+am.getAssetState(id_img1));

    document.body.appendChild(am.getAsset(id_img1));

    window.console.log('Callback1 finished!');
    window.console.log('=================================');
    alert('Callback 1 Ended');
});


window.console.log('img1 state after downloadAll: '+am.getAssetState(id_img1));
window.console.log('img2 state after downloadAll: '+am.getAssetState(id_img2));

let download2 = () => {

    window.console.log(' --------- download2 -----');

    // let id_aud1 = am.addAudio(Audio2);
    let id_aud2 = am.addAudio(Audio1);

    am.downloadAll(() => {
        // alert('Callback called #2!');

        // document.body.appendChild(am.getAsset(id_aud1).asset);

        let a2 = am.getAsset(id_aud2);
        document.body.appendChild(a2);
        a2.play();

        let p = document.createElement('p');
        p.innerText = 'Music by Benjamin TISSOT: https://www.bensound.com/royalty-free-music';
        document.body.appendChild(p);

        window.console.log('Callback1: ');
        window.console.dir(am);

        alert("Callback 2 Ended");
    });

};

download2();
