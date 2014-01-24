var ls;

/**
 * test ls
 * make sur ls exists and
 * workaround `SecurityError: DOM Exception 18`
 */

try {
  ls = window.localStorage;
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
  if (!(this instanceof Store)) return new Store(_);
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

// alias prefix with ns
Store.prototype.ns = Store.prototype.prefix;

/**
 * set a key, call JSON.stringify to serialize value
 * @param {String} key
 * @param {Object} val
 *
 * @return {Number} return val.length or 0 if anything has been thrown
 *
 * @api public
 */

Store.prototype.set = function(key, val) {
  var data;
  try {
    data = JSON.stringify(val || null);
    ls.setItem(this._ + key, data);
    return data.length;
  } catch(e) {
    return 0;
  }
};

/**
 * set a key, value without serializing
 * @param {String} key
 * @param {String} val
 *
 * @return {[Error]} return null or Error if anything has been thrown
 * @api public
 */

Store.prototype.setItem = function(key, val) {
  if (!val) return;
  try {
    ls.setItem(this._ + key, val);
    return null;
  } catch(e) {
    return e;
  }
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
 * get Item as string without deserializing
 * @param  {String} [key]
 * @return {Object}
 *
 * @api public
 */

Store.prototype.getItem = function(key) {
  return ls.getItem(this._ + (key || ''));
};

/**
 * save the prefix value
 * shortcut for store.set('', val)
 *
 * @param  {Object} val
 * @api public
 */

Store.prototype.save = function(val) {
  return this.set('', val);
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

// alias unset with del
Store.prototype.del = Store.prototype.unset;

/**
 * clear all keys matching prefix
 *
 * @api public
 */

Store.prototype.clear = function() {
  var prefix = this._,
      keys = Object.keys(ls).filter(function(key) {
    return key.indexOf(prefix) === 0;
  });
  keys.forEach(function(key) {
    ls.removeItem(key);
  });
};

// alias clear with reset

Store.prototype.reset = Store.prototype.clear;

/**
 * clear all values
 *
 * @api public
 */

Store.prototype.clearAll = function() {
  ls.clear();
};
