'use strict';

import './css/style.css';
import BreakoutApp from './js/Breakout/App/BreakoutApp';


let app = new BreakoutApp();
app.start();


let form = document.getElementById('fileForm');
let fileSelect = document.getElementById('fileToUpload');

form.onsubmit = (event) => {
    event.preventDefault();

    let files = fileSelect.files;

    for (let file of files) {
        app.getLevelManager().uploadLevel(file, (success) => {
            alert('File ' + file.name + ' uploaded with success=' + success);
        });
    }
};
