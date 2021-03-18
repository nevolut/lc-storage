const storage =
  typeof localStorage !== "undefined" && localStorage !== null
    ? {
        get(key: string): string | string[] | Object | Object[] | null {
          if (!key) {
            console.error("Key is missing");
            return null;
          }
          try {
            const values = JSON.parse(localStorage.getItem(key) || "");
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

        set(key: string, value: any, expiration?: number, nullable?: boolean): any {
          if (!value || value == {} || (Array.isArray(value) && !value.length)) {
            if (nullable) this.remove(key);
            else return null;
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
            return value;
          } catch (e) {
            console.error(e);
            return null;
          }
        },

        remove(key: string): void {
          localStorage.removeItem(key);
        },

        clear(): void {
          localStorage.clear();
        }
      }
    : {
        set: (): void => {
          console.warn("localStorage is not defined");
        },
        get: (): void => {
          console.warn("localStorage is not defined");
        },
        remove: (): void => {
          console.warn("localStorage is not defined");
        }
      };

export default storage;
