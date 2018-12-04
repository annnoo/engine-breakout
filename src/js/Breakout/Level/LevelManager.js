'use strict';

import Level from './Level';

/**
 * @author Yannik Ries
 */
class LevelManager {

    /**
     *
     * @param {AbstractApp} app
     */
    constructor(app) {
        //TODO: implement it
        this.app = app;

        //format:
        /*
        {
            "hash of json-level 1": {
                "1543791822555": 200,
                "1543791870426": 800
            },
            "hash of json-level 2": {
                "1543791886111": 100
            }
        }
         */
        this.highscores = this.app.getStorageManager().getItem('highscores');
        if (this.highscores === undefined || this.highscores === null) {
            this.highscores = {};
        }

        this.levels = new Map();
    }

    /**
     * Invokes the given callback with an array of all level names as parameter.
     * [ "level1.json", "level2.json" ]
     *
     * @param callback Callback that is called when the response is ready
     */
    requestLevelNames(callback) {
        let req = new XMLHttpRequest();
        req.responseType = 'json';
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    callback(req.response);
                } else {
                    window.console.error('An error occurred after requesting the level names. Status=' + req.status);
                    callback([]);
                }
            }
        };
        req.open('GET', './levels/getlevelnames.php', true);
        req.send();
    }

    /**
     * Invokes the given callback with the level as parameter if is exists.
     * If the given levelFileName is known, the method returns the cached object.
     *
     * @param levelFileName Level file name (an entry of requestLevelNames)
     * @param callback Callback that is called when the response is ready
     */
    getLevel(levelFileName, callback) {
        if (this.levels.has(levelFileName)) {
            callback(this.levels.get(levelFileName));
            return;
        }
        this._requestLevel(levelFileName, callback);
    }

    /**
     * Invokes the given callback with the level as parameter if is exists.
     *
     * @param levelFileName Level file name (an entry of requestLevelNames)
     * @param callback Callback that is called when the response is ready
     */
    _requestLevel(levelFileName, callback) {
        let req = new XMLHttpRequest();
        req.responseType = 'json';
        req.onreadystatechange = () => { //TODO: bind this ?
            if (req.readyState === 4) {
                if (req.status === 200) {
                    let level = Level.from(req.response);
                    this.levels.set(levelFileName, level);
                    callback(level);
                } else {
                    window.console.error('An error occurred after requesting a level. Status=' + req.status + ' levelFileName=' + levelFileName);
                    callback();
                }
            }
        };
        req.open('GET', './levels/' + levelFileName, true);
        req.send();
    }

    /**
     * Uploads a given file into the levels directory.
     * Invokes the given callback with the success boolean as parameter.
     *
     * @param {File} file The file of a html input tag
     * @param callback Callback that is called when the response is ready
     */
    uploadLevel(file, callback) {
        if (file.type !== 'application/json') {
            callback(false);
            return;
        }

        let formData = new FormData();
        formData.append('fileToUpload', file);

        let req = new XMLHttpRequest();
        req.responseType = 'text';
        req.onreadystatechange = () => { //TODO: bind this ?
            if (req.readyState === 4) {
                if (req.status === 200) {
                    //returns success value (0/1)
                    callback(req.response);
                } else {
                    window.console.error('An error occurred after uploading a level. Status=' + req.status + ' fileName=' + file.name);
                    callback(false);
                }
            }
        };
        req.open('POST', './levels/uploadlevel.php', true);
        req.send(formData);
    }

    /**
     * Checks if the given score is a highscore in this level and saves it if this is the case.
     *
     * @param {Level} level
     * @param {number} date Date as milliseconds
     * @param {number} score The score
     * @returns {boolean} If it is a highscore
     */
    saveIfHighscore(level, date, score) {
        //TODO: test if it works
        let identifier = level.getIdentifier();
        let section = this.highscores[identifier];
        if (section === undefined) {
            section = {};
            section[date] = score;
            this.highscores[identifier] = section;
            this._saveHighscoresPersistent();
            return true;
        }

        let max = 0;
        for (let i of Object.values(section)) {
            if (i > max) max = i;
        }

        if (score > max) {
            section[date] = score;
            this._saveHighscoresPersistent();
            return true;
        }

        return false;
    }

    /**
     * Returns all highscores of the given level
     *
     * @param level
     * @returns {*}
     */
    getHighscores(level) {
        return this.highscores[level.getIdentifier()];
    }

    /**
     * Returns the greatest highscore and its date of the given level.
     * If obj is the return, use obj.highscore and obj.date (mills)
     *
     * @param level
     * @returns {*}
     */
    getHighscore(level) {
        //TODO: test if it works
        let section = this.highscores[level.getIdentifier()];
        if (section === undefined) return undefined;


        let date;
        let highscore = 0;

        for (let d in section) {
            if (section[d] > highscore) {
                highscore = section[d];
                date = d;
            }
        }
        if (date === undefined) return undefined;

        return {
            date: date,
            highscore: highscore
        };
    }

    _saveHighscoresPersistent() {
        this.app.getStorageManager().setItem('highscores', this.highscores);
        this.app.getStorageManager().savePersistent();
    }

}

export default LevelManager;
