var expect = require('chai').expect
  , store = require('store');

describe('store', function() {

  beforeEach(function () {
    testStore = store.prefix('test');
  });

  afterEach(function() {
    store.clear();
  });

  it ('should set a value', function() {
    testStore.set('foo', 'bar');
    expect(store.get('testfoo')).to.be.eq('bar');
  });

  it ('should get a value', function() {
    testStore.set('foo', 'bar');
    expect(testStore.get('foo')).to.be.eq('bar');
  });

  it ('should save a value', function() {
    testStore.save('bar');
    expect(store.get('test')).to.be.eq('bar');
  });

  it ('null or undefined value should be unserialized as null', function() {
    testStore.set('foo', null);
    testStore.set('bar', undefined);
    expect(testStore.get('foo')).to.not.exist;
    expect(testStore.get('bar')).to.not.exist;
  });

  it ('should unset a value', function() {
    testStore.set('foo', 'bar');
    testStore.unset('foo');
    expect(testStore.get('foo')).to.not.exist;
  });

  it ('should clear all values', function() {
    testStore.set('foo1', 'bar1');
    testStore.set('foo2', 'bar2');
    testStore.clear();
    expect(testStore.get('foo1')).to.not.exist;
    expect(testStore.get('foo2')).to.not.exist;
  });

  it ('should clear all prefixed values', function() {
    store.set('foo1', 'bar1');
    testStore.set('foo2', 'bar2');
    testStore.clear();
    expect(store.get('foo1')).to.be.ok
    expect(testStore.get('foo2')).to.not.exist;
  });

  it ('should clear all values', function() {
    store.set('foo1', 'bar1');
    testStore.set('foo2', 'bar2');
    testStore.clearAll();
    expect(store.get('foo1')).to.not.exist;
    expect(testStore.get('foo2')).to.not.exist;
  });
});
