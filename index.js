var ls = window.localStorage;

/**
 * test ls
 */

try {
  ls.setItem('store-test', 'test');
  ls.removeItem('store-test');
} catch(e) {
  ls = {
    clear: function () {},
    getItem: function () {},
    removeItem: function () {},
    setItem: function () {}
  };
}

/**
 * Initialize a new store
 *
 * @param {String} [prefix] prefix added to localstorage keys
 * @api private
 */

function Store(_) {
  this._ = _ || '';
}

/**
 * expose new Store instance
 */

module.exports = new Store();

/**
 * create a new store
 * @param {String} prefix
 *
 * @api public
 */

Store.prototype.prefix = function(prefix) {
  return new Store(prefix);
};

/**
 * set a key, call JSON.stringify to serialize value
 * @param {String} key
 * @param {Object} val
 *
 * @api public
 */

Store.prototype.set = function(key, val) {
  if (!val) return;
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
 * clear all keys matching prefix
 *
 * @api public
 */

Store.prototype.clear = function() {
  var prefix = this._
    , keys = Object.keys(ls).filter(function(key) {
    return key.indexOf(prefix) === 0;
  });
  keys.forEach(function(key) {
    ls.removeItem(key);
  });
};


/**
 * clear all values
 *
 * @api public
 */

Store.prototype.clearAll = function() {
  ls.clear();
};
