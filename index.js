"use strict";
exports.__esModule = true;
var storage = {
    /**
     * The get method retrieves a value from the storage.
     * @param {key} string The key identifier of data to get
     * @returns {any} The current value associated with the given key, or null if the given key does not exist in the list associated with the object.
     */
    get: function (key) {
        if (!key) {
            console.error("Key is missing");
            return null;
        }
        try {
            var values = JSON.parse(localStorage.getItem(key) || "");
            // We return data if the exist in the storage object
            if (values === null || values === void 0 ? void 0 : values.data) {
                /**
                 * Check if the data was stored with an expiration data
                 * Return the data if it has not expired or null if it has
                 * */
                if (values.expiration) {
                    var now = new Date().getTime();
                    var diff = values.expiration - now;
                    if (diff < 0) {
                        this.remove(key);
                        return null;
                    }
                }
                return values.data;
            }
        }
        catch (e) {
            // On error we will remove the key from the storage
            // And return null
            this.remove(key);
        }
        return null;
    },
    /**
     * The set method stores a value in the storage.
     * @param {key} string The key identifier of data to set
     * @param {value} any The value to store
     * @param {expiration} number The expiration date of the data
     * @param {nullable} boolean Deternmines if null value can be stored
     * @returns {boolean} {value} if the data was stored
     */
    set: function (key, value, expiration, nullable) {
        if (!value || value == {} || (Array.isArray(value) && !value.length)) {
            if (nullable)
                this.remove(key);
            else
                return null;
        }
        try {
            var now = new Date().getTime();
            localStorage.setItem(key, JSON.stringify({
                data: value,
                time: now,
                expiration: expiration ? now + expiration * 1000 : null
            }));
            return value;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    },
    /**
     * Removes the key/value pair with the given key from the list associated with the object, if a key/value pair with the given key exists.
     * @param {key} string The key identifier of data to remove
     * @returns {boolean} {value} if the data was removed
     */
    remove: function (key) {
        localStorage.removeItem(key);
    },
    /**
     * The clear method removes all key/value pairs from the list associated with the object.
     */
    clear: function () {
        localStorage.clear();
    }
};
if (typeof localStorage === "undefined" || localStorage === null) {
    storage = {
        get: function (key) {
            console.warn("localStorage is not defined");
            return key;
        },
        set: function (key, value, expiration, nullable) {
            console.warn("localStorage is not defined");
            return { key: key, value: value, expiration: expiration, nullable: nullable };
        },
        remove: function () {
            console.warn("localStorage is not defined");
        },
        clear: function () {
            console.warn("localStorage is not defined");
        }
    };
}
exports["default"] = storage;
