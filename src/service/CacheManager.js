import cache from "memory-cache";

// Cache Mangeger
class CacheManager {
    constructor() {
        this.cache = new cache.Cache();
    }

    /**
     * Put Cache Data Object
     * @param {*} key Unique Key For Cache Object Data
     * @param {*} value Cache Data Object
     * @param {*} time Catch Time to Keep in Memory
     * @param {*} timeoutCallback Callback Function After Timeout
     */
    put(key, value, time, timeoutCallback) {
        this.cache.put(key, value, time, timeoutCallback);
    }

    /**
     * Get Cached Data Object
     * @param {*} key Unique Key For Cache Object Data
     */
    get(key) {
        return this.cache.get(key);
    }

    /**
     * Delete Cached Data Object
     * @param {*} key Unique Key For Cache Object Data
     */
    del(key) {
        this.cache.del(key);
    }

    /**
     * Clear All Cached Data Object
     */
    clear() {
        this.cache.clear();
    }

    /**
     * Returns the current number of entries in the cache
     */
    size() {
        return this.cache.size();
    }

    /**
     * Returns the number of entries taking up space in the cache
     */
    memsize() {
        return this.cache.memsize();
    }

    /**
     * Turns on or off debugging
     * @param {*} isDebug is debug value boolean
     */
    debug(isDebug) {
        this.cache.debug(isDebug);
    }

    /**
     * Returns the number of cache hits (only monitored in debug mode)
     */
    hits() {
        return this.cache.hits();
    }

    /**
     * Returns the number of cache misses (only monitored in debug mode)
     */
    misses() {
        return this.cache.misses();
    }

    /**
     * Returns all the cache keys
     */
    keys() {
        return this.cache.keys();
    }
}

export default new CacheManager();
