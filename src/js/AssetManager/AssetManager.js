const AM_WAITING = 0x00;
const AM_DOWNLOADING = 0x01;
const AM_SUCCESS = 0x02;
const AM_FAILED = 0x03;


/**
 * @type {AssetManager} SELF
 */
let SELF;

const createObjectFromType = (type) => {
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
};

/**
 * @author Yannik Ries
 */
class AssetManager {

    constructor() {
        if (SELF !== undefined) {

            window.console.error('The class AssetManager is a singleton. You can not create more than one object');
        } else {
            SELF = this;
        }
        this.idCount = 0;
        this.cache = [];
        this.indexNameMap = {};
        this.state = AM_WAITING;
        this.clear(false);
    }

    /**
     * Resets the success and fail count.
     * If it is not a soft reset, it updates the cachePointer to the cache length.
     * So assets that are waiting for a download, will never be downloaded.
     * The method does not clear the idCount and cache!
     *
     */
    clear(soft = true) {
        SELF.successCount = 0;
        SELF.failCount = 0;
        if (!soft) {
            SELF.cachePointer = SELF.cache.length;
        }
    }

    /**
     * Adds an asset to the download queue.
     * You need to trigger the download by yourself.
     *
     * @param path Where to find the asset
     * @param name Unique name for this asset
     * @param The type of the asset (image, audio)
     * @returns {number} An unique id of the asset
     */
    addAsset(path, assetType, name) {
        let id = this.idCount++;
        this.cache[id] = {
            'path': path,
            'assetType': assetType,
            'state': AM_WAITING
        };
        if(name!==undefined&&name!==null){
            this.indexNameMap[name] = id;
        }
        return id;
    }

    /**
     * Adds an image asset to the download queue.
     * You need to trigger the download by yourself.
     *
     * @param path Where to find the image asset
     * @returns {number} An unique id of the image asset
     */
    addImage(path, identifier) {
        return this.addAsset(path, identifier, 'image');
    }

    /**
     * Adds an audio asset to the download queue.
     * You need to trigger the download by yourself.
     *
     * @param path Where to find the audio asset
     * @returns {number} An unique id of the audio asset
     */
    addAudio(path, identifier) {
        return this.addAsset(path, identifier, 'audio');
    }

    /**
     * Clears the success and fail count.
     * Downloads the latest assets of the download queue.
     *
     * @see reset
     *
     * @param callback Call after all downloads are finished.
     * Call with a boolean parameter that represents the whole success
     */
    downloadAll(callback) {
        if (SELF.state === AM_DOWNLOADING) {
            window.setTimeout(SELF.downloadAll, 1200, callback);
            return;
        }
        SELF.state = AM_DOWNLOADING;

        SELF.clear(true);
        SELF.currentDownloads = SELF.cache.length - SELF.cachePointer;

        for (let i = SELF.cachePointer; i < SELF.cachePointer + SELF.currentDownloads; i++) {
            let cacheEntry = SELF.cache[i];

            let asset = createObjectFromType(cacheEntry.assetType);

            asset.addEventListener(asset.loadEventName, () => {
                cacheEntry.state = AM_SUCCESS;
                SELF.successCount++;
                SELF._onDownloadsFinished(callback);
            });
            asset.addEventListener(asset.errorEventName, () => {
                cacheEntry.state = AM_FAILED;
                SELF.failCount++;
                SELF._onDownloadsFinished(callback);
            });
            SELF.cache[i].state = AM_DOWNLOADING;
            SELF.cache[i].asset = asset;
            asset.src = SELF.cache[i].path;
        }
    }

    _onDownloadsFinished(callback) {
        if (SELF.state === AM_WAITING) return;
        if (SELF.successCount + SELF.failCount == SELF.currentDownloads) {
            SELF.state = AM_WAITING;

            SELF.cachePointer += SELF.currentDownloads;

            SELF.currentDownloads = 0;
            let success = SELF.failCount == 0;
            callback(success);
            SELF.state = success ? AM_SUCCESS : AM_FAILED;
        }
    }

    /**
     * Returns the asset of the given id.
     * Please check the state with getAssetState to ensure that it is available.
     *
     * @see getAssetState
     *
     * @param id
     * @returns {*} Asset
     */
    getAsset(id) {
        return this.cache[id].asset;
    }


    /**
     * Returns the asset of the given name.
     * Please check the state with getAssetState to ensure that it is available.
     *
     * @see getAssetState
     *
     * @param {*} name
     * @returns {*} Asset
     */
    getAssetByName(name) {
        return this.cache[this.indexNameMap[name]].asset;
    }

    /**
     * Returns the state of the asset.
     * AM_FAILED, AM_SUCCESS, AM_DOWNLOADING or AM_WAITING
     *
     * @param id
     * @returns {*} State of the asset.
     */
    getAssetState(id) {
        return this.cache[id].state;
    }

}

export default AssetManager;

export {AM_FAILED, AM_SUCCESS, AM_DOWNLOADING, AM_WAITING, SELF};
