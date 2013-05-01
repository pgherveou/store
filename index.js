ls = window.localStorage;

/**
 * Initialize a new store
 *
 * @param {String} [prefix] prefix added to localstorage keys
 * @api public
 */

function Store(_) {
  if (!(this instanceof Store)) return new Store(_);
  this._ = _ || '';
}

/**
 * expose new Store instance
 */

module.exports = Store;

/**
 * set a key, call JSON.stringify to serialize value
 * @param {String} key
 * @param {Object} val
 *
 * @api public
 */

Store.prototype.set = function(key, val) {
  ls.setItem(this._ + key, JSON.stringify(val));
};

/**
 * get a key call JSON.parse to deserialize value
 * @param  {String} [key]
 * @return {Object}
 *
 * @api public
 */

Store.prototype.get = function(key) {
  try {
    return JSON.parse(ls.getItem(this._ + (key || '')));
  } catch (_error) {
    return null;
  }
};

/**
 * save the prefix value
 * shortcut for store.set(store._, val)
 *
 * @param  {Object} val
 * @api public
 */

Store.prototype.save = function(val) {
  return ls.setItem(this._, JSON.stringify(val));
};

/**
 * unset a key
 * @param  {String} key
 *
 * @api public
 */

Store.prototype.unset = function(key) {
  ls.removeItem(this._ + key);
};

/**
 * clear storage
 *
 * @api public
 */

Store.prototype.clear = function() {
  ls.clear();
};
