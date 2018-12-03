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
        this.highscores = this.getStorageManager().getItem('highscores');
        if (this.highscores === undefined || this.highscores === null) {
            this.highscores = {};
        }
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
    getHighscores(level){
        return this.highscores[level.getIdentifier()];
    }

    /**
     * Returns the greatest highscore and its date of the given level.
     * If obj is the return, use obj.highscore and obj.date (mills)
     *
     * @param level
     * @returns {*}
     */
    getHighscore(level){
        //TODO: test if it works
        let section = this.highscores[level.getIdentifier()];
        if(section===undefined) return undefined;


        let date;
        let highscore = 0;

        for(let d in section){
            if (section[d] > highscore){
                highscore = section[d];
                date = d;
            }
        }
        if(date===undefined) return undefined;

        return {
            date: date,
            highscore: highscore
        };
    }

    _saveHighscoresPersistent(){
        this.app.getStorageManager().setItem('highscores', this.highscores);
        this.app.getStorageManager().savePersistent();
    }

}

export default LevelManager;
