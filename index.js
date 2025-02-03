"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.storage = void 0;
// Default configuration: no obfuscation for keys or values.
var config = {
    obfuscateKeys: false,
    obfuscateValues: false
};
exports.storage = {
    /**
     * Sets the storage configuration.
     * @param {StorageConfig} newConfig - Partial configuration to update.
     */
    setConfig: function (newConfig) {
        config = __assign(__assign({}, config), newConfig);
    },
    /**
     * Retrieves a value from localStorage with strong type safety.
     * @param {string} key - The key identifier of the data to retrieve.
     * @returns {T | null} - The value associated with the key or null if it doesn't exist or has expired.
     */
    get: function (key) {
        if (!key) {
            console.error("❌ Storage Error: Key is missing.");
            return null;
        }
        try {
            // Use obfuscation for keys if enabled.
            var encodedKey = config.obfuscateKeys ? btoa(key) : key;
            var item = window.localStorage.getItem(encodedKey);
            if (!item)
                return null;
            // If values are obfuscated, decode them.
            var decodedItem = config.obfuscateValues ? atob(item) : item;
            var values = JSON.parse(decodedItem);
            // Check expiration, if defined.
            if (values.exp) {
                var now = Date.now();
                if (values.exp < now) {
                    this.remove(key);
                    return null;
                }
            }
            return values.data;
        }
        catch (error) {
            console.error("\u274C Storage Error: Failed to retrieve ".concat(key), error);
            this.remove(key); // Remove corrupted entry
            return null;
        }
    },
    /**
     * Stores a value in localStorage with optional expiration time.
     * @param {string} key - The key identifier of the data.
     * @param {T} value - The value to store.
     * @param {SetOption} setOption - Optional settings (e.g., expiration).
     * @returns {T | null} - The stored value if successful, or null on failure.
     */
    set: function (key, value, setOption) {
        if (!key) {
            console.error("❌ Storage Error: Key is required.");
            return null;
        }
        if (value == null || (Array.isArray(value) && value.length === 0)) {
            if (setOption === null || setOption === void 0 ? void 0 : setOption.nullable) {
                this.remove(key);
            }
            return null;
        }
        var now = Date.now();
        var _value = {
            data: value,
            time: now,
            exp: (setOption === null || setOption === void 0 ? void 0 : setOption.exp) ? now + setOption.exp * 1000 : undefined
        };
        try {
            // Serialize the data.
            var jsonString = JSON.stringify(_value);
            // If values are to be obfuscated, encode them.
            var encodedData = config.obfuscateValues ? btoa(jsonString) : jsonString;
            // Obfuscate the key if needed.
            var encodedKey = config.obfuscateKeys ? btoa(key) : key;
            window.localStorage.setItem(encodedKey, encodedData);
            return value;
        }
        catch (error) {
            console.error("\u274C Storage Error: Failed to store ".concat(key), error);
            return null;
        }
    },
    /**
     * Removes an item from localStorage.
     * @param {string} key - The key of the data to remove.
     */
    remove: function (key) {
        if (!key) {
            console.warn("⚠️ Storage Warning: No key provided for remove().");
            return;
        }
        var encodedKey = config.obfuscateKeys ? btoa(key) : key;
        window.localStorage.removeItem(encodedKey);
    },
    /**
     * Clears all data from localStorage.
     */
    clear: function () {
        window.localStorage.clear();
    }
};
// Handle environments without `localStorage`
if (typeof localStorage === "undefined" || localStorage === null) {
    console.warn("⚠️ Storage Warning: localStorage is not available.");
    exports.storage.get = function (key) {
        console.warn("⚠️ Storage Warning: localStorage is unavailable. Returning key as fallback.");
        return key;
    };
    exports.storage.set = function (key, value, setOption) {
        console.warn("⚠️ Storage Warning: localStorage is unavailable. Simulating set operation.");
        return value;
    };
    exports.storage.remove = function () {
        console.warn("⚠️ Storage Warning: localStorage is unavailable. Remove skipped.");
    };
    exports.storage.clear = function () {
        console.warn("⚠️ Storage Warning: localStorage is unavailable. Clear skipped.");
    };
}
