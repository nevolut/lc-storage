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

##### Write to localstorage

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
