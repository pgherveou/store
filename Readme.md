# store

  localstorage component

## Installation

    $ component install pgherveou/store

## API


### require("store")

  get the default instance (without prefix)

### .prefix(_) alias ns

  get a new store with a prefix added to localstorage keys

### .set(key, val)

  set a key, call JSON.stringify to serialize value
  returns 0 when it fails and data.length otherwise
  undefined value are saved as null

### .setItem(key, val)

  set a val, as string


### .get(key)

  get a key call JSON.parse to deserialize value

### .getItem(key)

  get a key, as string

### .save(val)

  save the prefix value
 	shortcut for store.set(store._, val)

### .unset(key) alias del

  unset a key

### .clear() alias reset

  clear all key matching prefix

### .clearAll()

  clear all localstorage

## License

  MIT
