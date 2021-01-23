var storage = typeof localStorage !== "undefined" && localStorage !== null
    ? {
        get: function (key) {
            if (!key) {
                console.error("Key is missing");
                return;
            }
            try {
                var values = JSON.parse(localStorage.getItem(key));
                if (values === null || values === void 0 ? void 0 : values.data) {
                    if (values.expiration) {
                        var now = new Date().getTime();
                        var diff = (now - values.expiration) / 1000;
                        diff /= 60;
                        diff = Math.abs(Math.round(diff));
                        if (diff > 0) {
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
            if (nullable === void 0) { nullable = false; }
            if (key == "undefined")
                return console.error("Key is missing");
            if (value == "undefined")
                return console.error("Value is missing");
            if (!value || value == {} || (Array.isArray(value) && !value.length)) {
                if (nullable)
                    this.remove(key);
                return null;
            }
            try {
                var now = new Date().getTime();
                localStorage.setItem(key, JSON.stringify({
                    data: value,
                    time: now,
                    expiration: expiration ? now + expiration * 1000 : null
                }));
            }
            catch (e) {
                console.error(e);
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
module.exports = storage;
