const storage =
  typeof localStorage !== "undefined" && localStorage !== null
    ? {
        get(key: string): Object {
          if (!key) {
            console.error("Key is missing");
            return;
          }
          try {
            const values = JSON.parse(localStorage.getItem(key));
            if (values?.data) {
              if (values.expiration) {
                const now = new Date().getTime();
                let diff = values.expiration - now;
                if (diff < 0) {
                  this.remove(key);
                  return null;
                }
              }
              return values.data;
            }
          } catch (e) {
            this.remove(key);
          }
          return null;
        },

        set(key, value, expiration: number, nullable: boolean = false) {
          if (key == "undefined") return console.error("Key is missing");
          if (value == "undefined") return console.error("Value is missing");
          if (!value || value == {} || (Array.isArray(value) && !value.length)) {
            if (nullable) this.remove(key);
            return null;
          }

          try {
            const now = new Date().getTime();
            localStorage.setItem(
              key,
              JSON.stringify({
                data: value,
                time: now,
                expiration: expiration ? now + expiration * 1000 : null
              })
            );
          } catch (e) {
            console.error(e);
          }
        },

        remove(key: string) {
          localStorage.removeItem(key);
        },

        clear() {
          localStorage.clear();
        }
      }
    : {
        set: () => {
          console.warn("localStorage is not defined");
        },
        get: () => {
          console.warn("localStorage is not defined");
        },
        remove: () => {
          console.warn("localStorage is not defined");
        }
      };

module.exports = storage;
