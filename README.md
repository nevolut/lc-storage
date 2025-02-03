# **LC-STORAGE** 🗄️

`lc-storage` is a lightweight and type-safe utility for interacting with **localStorage** in modern JavaScript & TypeScript applications.

## **🚀 Features**
✔ **Read** data from `localStorage`
✔ **Write** data to `localStorage`
✔ **Delete** specific keys from `localStorage`
✔ **Clear all** data from `localStorage`
✔ **Supports automatic expiration (`exp`)**
✔ **Type-safe retrieval (`get<T>()`)**

---

## **📦 Installation**
Install via npm:
```sh
npm i lc-storage --save
```

## 🛠 Usage

#### 📌 Import storage

```ts
import storage from "lc-storage";
```

#### 🔥 Storing and Retrieving Data

###### ✅ Save Data to localStorage

```ts
const data = [1, 2, 3, 4];
storage.set("data", data);
```

###### ✅ Retrieve Data from localStorage

```ts
const myData = storage.get("data");
console.log(myData); // [1, 2, 3, 4]
```

###### ✅ Delete Data from localStorage

```ts
storage.remove("data");
```

###### ✅ Clear All Data from localStorage

```ts
storage.clear();
```

### 📌 Advanced Usage

💾 ```set()``` Method – Store Data with Expiration & Nullable Options

The set() method allows you to store data in localStorage with optional settings.

###### 📌 Method Signature

```ts
storage.set<T>(key: string, value: T, setOption?: SetOption): T | null;
```

Parameter	Type	Required	Description
key	string	✅	Unique identifier for the stored data.
value	T (generic)	✅	The value to be stored (objects, arrays, primitives).
setOption	SetOption	❌	Configuration for expiration & nullability.

###### 📌 SetOption Interface

```ts
interface SetOption {
  exp?: number;  // Expiration time in seconds
  nullable?: boolean; // If true, allows setting null values (default: false)
}
```

###### ✅ Example: Store Data with Expiration

```ts
// Store data with a 60-second expiration
storage.set("sessionData", { user: "JohnDoe" }, { exp: 60 });

// Before 60 seconds, you can retrieve the value:
console.log(storage.get("sessionData")); // { user: "JohnDoe" }

// After 60 seconds, the value automatically expires and returns `null`
setTimeout(() => {
  console.log(storage.get("sessionData")); // null
}, 60 * 1000);
```

📌 ```get<T>()``` Method – Retrieve Data with Type Safety

The ```get()``` method allows type-safe retrieval of stored values.

###### 📌 Method Signature

```ts
storage.get<T>(key: string): T | null;
```

Parameter	Type	Required	Description
key	string	✅	The key identifier of the stored data.

Returns T (the stored value) or null if the key does not exist.

###### ✅ Example: Retrieve Data with Type Safety

```ts
// Store user info
storage.set("user", { name: "Alice", age: 25 });

// Retrieve with correct type
const user = storage.get<{ name: string; age: number }>("user");

console.log(user?.name); // "Alice"
console.log(user?.age);  // 25
```

📌 ```remove()``` Method – Delete a Key

The ```remove()``` method deletes a specific key-value pair from localStorage.

###### ✅ Example
```ts
storage.remove("user"); // Removes "user" from storage
console.log(storage.get("user")); // null
```
📌 ```clear()``` Method – Clear All Data

The ```clear()``` method removes all stored data from localStorage.

###### ✅ Example

```ts
storage.clear(); // Clears everything from localStorage
```

## ⚠️ Edge Case Handling

| Scenario                              | Behavior                              |
----------------------------------------|----------------------------------------
| Key does not exist in get()           |	Returns null                          |
| Expired data                          | Automatically removed & returns null  |
| Setting null without nullable: true   |	Prevents storage                      |
| Browser without localStorage support  |	Logs warnings, but prevents crashes   |


## 📌 Summary Table

| Method                         | Description                |	Example         |
|--------------------------------|----------------------------|-----------------|
| storage.set<T>(key, value, options?) | Stores data with optional expiration	| storage.set("token", "abc123", { exp: 3600 }) |
| storage.get<T>(key) |	Retrieves data (type-safe) |	const user = storage.get<{ name: string }>("user") |
| storage.remove(key) |	Deletes a specific key	| storage.remove("user")
storage.clear() |	Clears all stored data	| storage.clear() |


## 🔥 Why Use lc-storage?

✔ Supports exp (expiration time) to automatically remove stale data
✔ Type-safe with generics for better TypeScript support
✔ Safer handling of missing or expired data
✔ Prevents crashes if localStorage is unavailable
✔ Small & fast – No dependencies!

## 🚀 Future Enhancements

Would you like to see:
	•	🔒 Encryption support for storing sensitive data?
	•	📂 Support for sessionStorage?
	•	📌 Automatic data sync with IndexedDB for large storage?

📌 Contributions are welcome! If you find a bug or have an idea for improvement, feel free to open a pull request or issue. 🚀😊

## 📜 License

This project is licensed under the MIT License.
