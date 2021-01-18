const storage = {
  get(key, renew = null) {
    if (!key) {
      console.error("Key is missing");
      return;
    }
    try {
      const now = new Date().getTime();
      const values = JSON.parse(localStorage.getItem(key));
      if (values && values.data) {
        if (renew) {
          let diff = (now - values.time) / 1000;
          diff /= 60;
          diff = Math.abs(Math.round(diff));
          if (diff > renew) this.remove(key);
        }
        return values.data;
      }
    } catch (e) {
      this.remove(key);
    }
    return null;
  },

  set(key, value, nullable = true) {
    if (key == "undefined") return console.error("Key is missing");
    if (value == "undefined") return console.error("Value is missing");
    if (!value || value == {} || (Array.isArray(value) && !value.length)) {
      if (nullable) this.remove(key);
      return null;
    }

    try {
      const now = new Date().getTime();
      localStorage.setItem(key, JSON.stringify({ data: value, time: now }));
    } catch (e) {
      console.error(e);
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};

storage.read = storage.get;
storage.write = storage.set;
storage.del = storage.remove;

module.exports = storage;
