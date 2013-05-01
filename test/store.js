var expect = require('chai').expect
  , store = require('store')
  , ls = window.localStorage;

describe('store', function() {

  beforeEach(function () {
    store = store.prefix('test');
  });

  afterEach(function() {
    store.clear();
  });

  it ('should set a value', function() {
    store.set('foo', 'bar');
    expect(ls.getItem('testfoo')).to.be.eq('"bar"');
  });

  it ('should get a value', function() {
    store.set('foo', 'bar');
    expect(store.get('foo')).to.be.eq('bar');
  });

  it ('should save a value', function() {
    store.save('bar');
    expect(ls.getItem('test')).to.be.eq('"bar"');
  });

  it ('should unset a value', function() {
    store.set('foo', 'bar');
    store.unset('foo');
    expect(ls.getItem('foo')).to.not.exist;
  });

  it ('should clear all values', function() {
    store.set('foo1', 'bar1');
    store.set('foo2', 'bar2');
    store.clear();
    expect(store.get('foo1')).to.not.exist;
    expect(store.get('foo2')).to.not.exist;
  });
});
