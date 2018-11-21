const AM_DOWNLOADING = 0x01;
const AM_WAITING = 0x02;
const AM_FAILED = 0x03;
const AM_SUCCESS = 0x04;

/**
 * @author Yannik Ries
 */
class AssetManager {

    constructor() {
        this.idCount = 0;
        this.cache = [];
        this.cachePointer = 0;
        this.reset();
    }

    /**
     * Resets the success and fail count.
     * Does not clear the idCount and cache!
     */
    reset() {
        this.successCount = 0;
        this.failCount = 0;
    }

    /**
     * Adds an asset to the download queue.
     * You need to trigger the download by yourself.
     *
     * @param path Where to find the asset
     * @param The type of the asset (image, audio)
     * @returns {number} An unique id of the asset
     */
    addAsset(path, assetType) {
        let id = this.idCount++;
        this.cache[id] = {
            'path': path,
            'assetType': assetType,
            'state': AM_WAITING
        };
        return id;
    }

    /**
     * Adds an image asset to the download queue.
     * You need to trigger the download by yourself.
     *
     * @param path Where to find the image asset
     * @returns {number} An unique id of the image asset
     */
    addImage(path) {
        return this.addAsset(path, 'image');
    }

    /**
     * Adds an audio asset to the download queue.
     * You need to trigger the download by yourself.
     *
     * @param path Where to find the audio asset
     * @returns {number} An unique id of the audio asset
     */
    addAudio(path) {
        return this.addAsset(path, 'audio');
    }

    /**
     * Downloads the latest assets of the download queue.
     *
     * @param callback Call after all downloads are finished.
     * Call with a boolean parameter that represents the whole success
     */
    downloadAll(callback) {

        for (let i = this.cachePointer; i < this.cache.length - this.cachePointer; i++) {

            let cacheEntry = this.cache[i];
            let asset = this.createObjectFromType(cacheEntry.assetType);

            asset.addEventListener(asset.loadEventName, () => {
                this.successCount++;
                window.console.log('load');
                if(this.successCount+this.failCount==this.cache.length-this.cachePointer){
                    cacheEntry.stack = AM_SUCCESS;
                    callback(this.failCount==0);
                    this.reset();
                }
            });
            asset.addEventListener(asset.errorEventName, () => {
                this.failCount++;
                window.console.error('Could not load asset '+asset.src);

                if(this.successCount+this.failCount==this.cache.length-this.cachePointer){
                    cacheEntry.stack = AM_FAILED;
                    callback(this.failCount==0);
                    this.reset();
                }
            });
            this.cache[i].state = AM_DOWNLOADING;
            this.cache[i].asset = asset;
            asset.src = this.cache[i].path;
        }

        this.cachePointer = this.cache.length;
    }

    createObjectFromType(type){
        window.console.log(type);
        let asset;
        switch (type) {
        case 'image':
            asset = new Image();
            asset.loadEventName = 'load';
            asset.errorEventName = 'error';
            break;
        case 'audio':
            asset = new Audio();
            asset.loadEventName = 'canplay';
            asset.errorEventName = 'error';
            break;
        }
        return asset;
    }

    /**
     * Returns the cache entry of the given id.
     *
     * @param id
     * @returns {*} Cache entry with downloaded asset
     */
    getAsset(id){
        return this.cache[id];
    }

}

export default AssetManager;

export {AM_FAILED, AM_SUCCESS, AM_DOWNLOADING, AM_WAITING};
