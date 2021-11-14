"use strict";
exports.__esModule = true;
var enc = {
    encode: function (value) {
        return btoa(value);
    },
    decode: function (value) {
        return atob(value);
    }
};
exports["default"] = enc;
