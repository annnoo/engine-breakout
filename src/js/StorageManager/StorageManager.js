const IDENTIFIER = '791e711e86c27409b573e9d8ecc91dda';
const persistentStorage = window.localStorage;
const fluentStorage = window.sessionStorage;

/**
 * @author Yannik Ries
 */
class StorageManager {

    constructor() {
        this.fluentCache = {};
        this.persistentCache = {};
    }

    /**
     * Removes all saved persistent data (cache and storage).
     */
    clearPersistent() {
        this.clear(persistentStorage);
        this.persistentCache = {};
    }

    /**
     * Removes all saved fluent data (cache and storage).
     */
    clearFluent() {
        this.clear(fluentStorage);
        this.fluentCache = {};
    }

    /**
     *  Removes all saved data from the given storage
     *
     * @param {Storage} storage
     */
    clear(storage) {
        storage.removeItem(IDENTIFIER);
    }

    /**
     * Calls both methods to clear the fluent and persistent cache.
     *
     * @see clearPersistent
     * @see clearFluent
     */
    clearAll() {
        this.clearPersistent();
        this.clearFluent();
    }

    /**
     * Overrides the stored data in the persistent storage with the current persistent cache.
     */
    savePersistent() {
        this.save(persistentStorage, this.persistentCache);
    }

    /**
     * Overrides the stored data in the fluent storage with the current fluent cache.
     */
    saveFluent() {
        this.save(fluentStorage, this.fluentCache);
    }

    /**
     * Overrides the stored data in the given storage with the given value.
     *
     * @param {Storage} storage
     * @param {*} value The value to save
     */
    save(storage, value) {
        storage.setItem(IDENTIFIER, JSON.stringify(value));
    }

    /**
     * Calls both methods to save the fluent and persistent cache.
     *
     * @see saveFluent
     * @see savePersistent
     */
    saveAll() {
        this.saveFluent();
        this.savePersistent();
    }

    /**
     * Loads the stored persistent data into the persistent cache.
     */
    loadPersistent(){
        this.persistentCache = this.load(persistentStorage);
    }

    /**
     * Loads the stored fluent data into the fluent cache.
     */
    loadFluent(){
        this.fluentCache = this.load(fluentStorage);
    }

    /**
     * Returns the stored object.
     *
     * @param storage
     * @returns {any} Stored object
     */
    load(storage){
        let objString = storage.getItem(IDENTIFIER);
        return JSON.parse(objString===null?'{}':objString);
    }

    /**
     * Calls both methods to load the fluent and persistent data into the caches.
     *
     * @see loadFluent
     * @see loadPersistent
     */
    loadAll(){
        this.loadPersistent();
        this.loadFluent();
    }

    /**
     * Adds a key-value pair to the storage cache. Please call a "save" method to
     * store your data correctly.
     *
     * @param {string} key The key/identifier of the given value
     * @param {*} value Can be any object that will be added to the cache
     * @param {boolean} persistent If the data should saved persistent or just during the opened tab
     */
    setItem(key, value, persistent = true) {
        if (persistent) {
            this.persistentCache[key] = value;
        } else {
            this.fluentCache[key] = value;
        }
    }

    /**
     *
     * Returns the value of the given key.
     *
     * @param key The key of the key-value pair
     * @param {boolean} persistent If the requested value is stored persistent or not
     * @returns {*} The value of the key-value pair
     */
    getItem(key, persistent = true) {
        if (persistent) {
            return this.persistentCache[key];
        }
        return this.fluentCache[key];
    }

}

export default StorageManager;
