"use strict";
exports.__esModule = true;
var enc = {
    encode: function (data) {
        return btoa(data);
    },
    decode: function (data) {
        return atob(data);
    }
};
exports["default"] = enc;
