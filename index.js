"use strict";
exports.__esModule = true;
var storage = {
  /**
   * The get method retrieves a value from the storage.
   * @param {string} key  The key identifier of data to get
   * @returns The current value associated with the given key, or null if the given key does not exist in the list associated with the object.
   */
  get: function (key) {
    if (!key) {
      console.error("Key is missing");
      return null;
    }
    var item = window.localStorage.getItem(key);
    try {
      if (!item) return null;
      var values = JSON.parse(item);
      // We return data if the exist in the storage object
      if (values === null || values === void 0 ? void 0 : values.data) {
        /**
         * Check if the data was stored with an expiration data
         * Return the data if it has not expired or null if it has
         * */
        if (values.exp) {
          var now = new Date().getTime();
          var diff = values.exp - now;
          if (diff < 0) {
            this.remove(key);
            return null;
          }
        }
        return values.data;
      }
    } catch (e) {
      // On error we will remove the key from the storage
      // And return null
      this.remove(key);
    }
    return null;
  },
  /**
   * Sets the value of the pair identified by key to value,
   * creating a new key/value pair if none existed for key previously.
   * @param {string} key The key identifier of data to set
   * @param {unknown} value The value to store
   * @param {SetOption} setOption The options
   * @returns The value if set, or null if not set
   */
  set: function (key, value, setOption) {
    if (!value || value == {} || (Array.isArray(value) && !value.length)) {
      if (
        setOption === null || setOption === void 0 ? void 0 : setOption.nullable
      )
        this.remove(key);
      else return null;
    }
    var now = new Date().getTime();
    var _value = {
      data: value,
      time: now
    };
    if (setOption === null || setOption === void 0 ? void 0 : setOption.exp)
      _value.exp = now + setOption.exp * 1000;
    try {
      window.localStorage.setItem(key, JSON.stringify(_value));
      return value;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  /**
   * Removes the key/value pair with the given key,
   * if a key/value pair with the given key exists.
   * @param {key} string The key identifier of data to remove
   * @returns {boolean} {value} if the data was removed
   */
  remove: function (key) {
    window.localStorage.removeItem(key);
  },
  /**
   * Removes all key/value pairs, if there are any.
   */
  clear: function () {
    window.localStorage.clear();
  }
};
if (typeof localStorage === "undefined" || localStorage === null) {
  storage.get = function (key) {
    console.warn("localStorage is not defined");
    return key;
  };
  storage.set = function (key, value, setOption) {
    console.warn("localStorage is not defined");
    return { key: key, value: value, setOption: setOption };
  };
  storage.remove = function () {
    console.warn("localStorage is not defined");
  };
  storage.clear = function () {
    console.warn("localStorage is not defined");
  };
}
exports["default"] = storage;
