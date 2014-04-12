
require('../index.js');
var assert = require('assert');

var A = Object.extend({
    x: 1,
    y: 2,
    z: 3
});

var a = new A();

var newValueInHandler = -1;
var oldValueInHandler = -1;
var propertyInHandler = '';

var handlerRegistration = a.$on('$*', function(newValue, oldValue, model, property) {
    newValueInHandler = newValue;
    oldValueInHandler = oldValue;
    propertyInHandler = property;
});

assert.equal(-1, newValueInHandler);
assert.equal(-1, oldValueInHandler);
assert.equal('', propertyInHandler);

a.x = 10;

assert.equal(10, newValueInHandler);
assert.equal(1, oldValueInHandler);
assert.equal('x', propertyInHandler);

a.y = 20;

assert.equal(20, newValueInHandler);
assert.equal(2, oldValueInHandler);
assert.equal('y', propertyInHandler);

handlerRegistration.remove();

a.y = 200;

assert.equal(20, newValueInHandler);
assert.equal(2, oldValueInHandler);
assert.equal('y', propertyInHandler);

newValuesInHandler = null;
oldValuesInHandler = null;

handlerRegistration = a.$on('$set', function(newValues, oldValues, model) {
    newValuesInHandler = newValues;
    oldValuesInHandler = oldValues;
});

assert.equal(null, newValuesInHandler);
assert.equal(null, oldValuesInHandler);

a.x = 10;

assert.equal(null, newValuesInHandler);
assert.equal(null, oldValuesInHandler);

a.y = 20;

assert.equal(null, newValuesInHandler);
assert.equal(null, oldValuesInHandler);

a.$set({
    x: 100,
    y: 200
});

assert.equal(100, newValuesInHandler.x);
assert.equal(10, oldValuesInHandler.x);
assert.equal(200, newValuesInHandler.y);
assert.equal(20, oldValuesInHandler.y);

handlerRegistration.remove();

a.$set({
    x: 1000,
    y: 2000
});

assert.equal(1000, a.x);
assert.equal(100, newValuesInHandler.x);
assert.equal(10, oldValuesInHandler.x);
assert.equal(2000, a.y);
assert.equal(200, newValuesInHandler.y);
assert.equal(20, oldValuesInHandler.y);

newValuesInHandler = null;
oldValuesInHandler = null;
newValueInHandler = -1;
oldValueInHandler = -1;
propertyInHandler = '';

var propertyHandlerRegistration = a.$on('$*', function(newValue, oldValue, model, property) {
    newValueInHandler = newValue;
    oldValueInHandler = oldValue;
    propertyInHandler = property;
});

var setRegistration = a.$on('$set', function(newValues, oldValues, model) {
    newValuesInHandler = newValues;
    oldValuesInHandler = oldValues;
});

assert.equal(-1, newValueInHandler);
assert.equal(-1, oldValueInHandler);
assert.equal('', propertyInHandler);
assert.equal(null, newValuesInHandler);
assert.equal(null, oldValuesInHandler);

a.$set({
    x: 100,
    y: 200
});

assert.equal(-1, newValueInHandler);
assert.equal(-1, oldValueInHandler);
assert.equal('', propertyInHandler);
assert.equal(100, a.x);
assert.equal(100, newValuesInHandler.x);
assert.equal(1000, oldValuesInHandler.x);
assert.equal(200, a.y);
assert.equal(200, newValuesInHandler.y);
assert.equal(2000, oldValuesInHandler.y);

a.x = 10000;

assert.equal(10000, newValueInHandler);
assert.equal(100, oldValueInHandler);
assert.equal('x', propertyInHandler);
assert.equal(10000, a.x);
assert.equal(100, newValuesInHandler.x);
assert.equal(1000, oldValuesInHandler.x);
assert.equal(200, a.y);
assert.equal(200, newValuesInHandler.y);
assert.equal(2000, oldValuesInHandler.y);
