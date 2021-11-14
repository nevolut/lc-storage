
interface SetOption {
  exp?: number; // Expiration time in second
  nullable?: boolean;
}

interface SetValue {
  exp?: number; // Expiration time in second
  data: any;
  time: number;
}

let storage = {
  /**
   * The get method retrieves a value from the storage.
   * @param {string} key  The key identifier of data to get
   * @returns The current value associated with the given key, or null if the given key does not exist in the list associated with the object.
   */
  get(key: string): any {
    if (!key) {
      console.error("Key is missing");
      return null;
    }

    if (!window.localStorage.getItem(key)) return null;

    try {
      const values: SetValue = JSON.parse(window.localStorage.getItem(key));
      // We return data if the exist in the storage object
      if (values?.data) {
        /**
         * Check if the data was stored with an expiration data
         * Return the data if it has not expired or null if it has
         * */
        if (values.exp) {
          const now = new Date().getTime();
          let diff = values.exp - now;
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
   * @param {any} value The value to store
   * @param {SetOption} setOption The options
   * @returns The value if set, or null if not set
   */
  set(key: string, value: any, setOption?: SetOption): any {
    if (!value || value == {} || (Array.isArray(value) && !value.length)) {
      if (setOption?.nullable) this.remove(key);
      else return null;
    }

    const now = new Date().getTime();

    let _value: SetValue = {
      data: value,
      time: now
    };

    if (setOption?.exp) _value.exp = now + setOption.exp * 1000;

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
  remove(key: string): void {
    window.localStorage.removeItem(key);
  },

  /**
   * Removes all key/value pairs, if there are any.
   */
  clear(): void {
    window.localStorage.clear();
  }
};

if (typeof localStorage === "undefined" || localStorage === null) {
  storage = {
    get(key: string): string | string[] | Object | Object[] | null {
      console.warn("localStorage is not defined");
      return key;
    },
    set(key: string, value: any): any {
      console.warn("localStorage is not defined");
      return { key, value };
    },
    remove: (): void => {
      console.warn("localStorage is not defined");
    },
    clear: (): void => {
      console.warn("localStorage is not defined");
    }
  };
}

export default storage;
