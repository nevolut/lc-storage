interface SetOption {
  exp?: number; // Expiration time in seconds
  nullable?: boolean; // Allow setting null values
}

interface SetValue<T> {
  exp?: number; // Expiration time in milliseconds
  data: T;
  time: number;
}

const storage = {
  /**
   * Retrieves a value from localStorage with strong type safety.
   * @param {string} key - The key identifier of the data to retrieve.
   * @returns {T | null} - The value associated with the key or null if it doesn't exist or has expired.
   */
  get<T>(key: string): T | null {
    if (!key) {
      console.error("❌ Storage Error: Key is missing.");
      return null;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return null;

      const values: SetValue<T> = JSON.parse(item);

      // ✅ Check expiration
      if (values.exp) {
        const now = Date.now();
        if (values.exp < now) {
          this.remove(key);
          return null;
        }
      }

      return values.data;
    } catch (error) {
      console.error(`❌ Storage Error: Failed to retrieve ${key}`, error);
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
  set<T>(key: string, value: T, setOption?: SetOption): T | null {
    if (!key) {
      console.error("❌ Storage Error: Key is required.");
      return null;
    }

    if (value == null || (Array.isArray(value) && value.length === 0)) {
      if (setOption?.nullable) {
        this.remove(key);
      }
      return null;
    }

    const now = Date.now();

    const _value: SetValue<T> = {
      data: value,
      time: now,
      exp: setOption?.exp ? now + setOption.exp * 1000 : undefined
    };

    try {
      window.localStorage.setItem(key, JSON.stringify(_value));
      return value;
    } catch (error) {
      console.error(`❌ Storage Error: Failed to store ${key}`, error);
      return null;
    }
  },

  /**
   * Removes an item from localStorage.
   * @param {string} key - The key of the data to remove.
   */
  remove(key: string): void {
    if (!key) {
      console.warn("⚠️ Storage Warning: No key provided for remove().");
      return;
    }
    window.localStorage.removeItem(key);
  },

  /**
   * Clears all data from localStorage.
   */
  clear(): void {
    window.localStorage.clear();
  }
};

// ✅ Handle environments without `localStorage`
if (typeof localStorage === "undefined" || localStorage === null) {
  console.warn("⚠️ Storage Warning: localStorage is not available.");

  storage.get = <T>(key: string): T | null => {
    console.warn(
      "⚠️ Storage Warning: localStorage is unavailable. Returning key as fallback."
    );
    return key as unknown as T;
  };

  storage.set = <T>(key: string, value: T, setOption?: SetOption): T | null => {
    console.warn(
      "⚠️ Storage Warning: localStorage is unavailable. Simulating set operation."
    );
    return value;
  };

  storage.remove = (): void => {
    console.warn(
      "⚠️ Storage Warning: localStorage is unavailable. Remove skipped."
    );
  };

  storage.clear = (): void => {
    console.warn(
      "⚠️ Storage Warning: localStorage is unavailable. Clear skipped."
    );
  };
}

export default storage;
