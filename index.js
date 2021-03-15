"use strict";
exports.__esModule = true;
var storage = typeof localStorage !== "undefined" && localStorage !== null
    ? {
        get: function (key) {
            if (!key) {
                console.error("Key is missing");
                return null;
            }
            try {
                var values = JSON.parse(localStorage.getItem(key) || "");
                if (values === null || values === void 0 ? void 0 : values.data) {
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
                this.remove(key);
            }
            return null;
        },
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
        remove: function (key) {
            localStorage.removeItem(key);
        },
        clear: function () {
            localStorage.clear();
        }
    }
    : {
        set: function () {
            console.warn("localStorage is not defined");
        },
        get: function () {
            console.warn("localStorage is not defined");
        },
        remove: function () {
            console.warn("localStorage is not defined");
        }
    };
exports["default"] = storage;
