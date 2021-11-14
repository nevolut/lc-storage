# LC-STORAGE

lc-storage is used:

- Read data from the local storage
- Write data to the local storage
- Delete data from the local storage
- Clear the local storage

## Usage

### Installation

```bash
npm i lc-storage --save
```

#### Data

```javascript
const data = [1, 2, 3, 4];
```

#### Import storage from 'lc-storage'

```javascript
import storage from "lc-storage";
```

##### Save to localstorage

```javascript
storage.set("data", data);
```

##### Read to localstorage

```javascript
const myData = storage.get("data");
```

```javascript
console.log(myData);
// [1, 2, 3, 4]
```

##### Delete data to localstorage

```javascript
storage.remove("data");
```

##### Clear localstorage

```javascript
storage.clear();
```

### Set method

- Sets the value of the pair identified by key to value,
- creating a new key/value pair if none existed for key previously.

```javascript
storage.set(key: string, value: any, setOption?: SetOption): any
storage.set(key: string, value: any, { exp?: number, nullable?: boolean }): any
```

* key ```string``` ```required```: The key identifier of data to set
* value ```any``` ```required```:  The value to store
* setOption ```object``` ```optional```: Advance set configuratioon

If the value is set, it will return the ```value```, else it will return ```null```


```typescript
interface SetOption {
  exp?: number; // Expiration time in second
  nullable?: boolean; // If the value can be null. default: false
}
```

```javascript
// Will store [1, 2, 3, 4] in local storage with data as key.
storage.set("data", data, { exp: 60 });
// Before 60 seconds, you can get the data value
// After 60 seconds, if you call storage.get('data'), it will return null

console.log(storage.get('data')) // [1, 2, 3, 4]

setTimeout(() => {
  console.log(storage.get('data')) // null
}, 60 * 1000)

```

### Get method

Retrieves a value from the storage

```javascript
storage.get(key: string): any
```

Returns the current value associated with the given key, or null if the given key does not exist.