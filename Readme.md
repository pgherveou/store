
# store

  localstorage component

## Installation

    $ component install pgherveou/store

## API


### require("store")

	get the default instance (without prefix)

### .prefix(_)

  get a new store with a prefix added to localstorage keys

### .prefix(_)

  get a new store with a prefix added to localstorage keys

### .set(key, val)

  set a key, call JSON.stringify to serialize value

### .get(key)

  get a key call JSON.parse to deserialize value

### .save(val)

  save the prefix value
 	shortcut for store.set(store._, val)

### .unset(key)

  unset a key

### .clear(key)

  clear storage

## License

  MIT
