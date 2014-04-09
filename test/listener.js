
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
var handlerRegistration = a.$on('x', function(newValue, oldValue, model, property) {
    newValueInHandler = newValue;
    oldValueInHandler = oldValue;
});

assert.equal(-1, newValueInHandler);
assert.equal(-1, oldValueInHandler);

a.x = 10;

assert.equal(10, newValueInHandler);
assert.equal(1, oldValueInHandler);

a.y = 20;

assert.equal(10, newValueInHandler);
assert.equal(1, oldValueInHandler);

handlerRegistration.remove();

a.x = 100;

assert.equal(10, newValueInHandler);
assert.equal(1, oldValueInHandler);

newValueInHandler = -1;
oldValueInHandler = -1;

handlerRegistration = a.$on(['x', 'y'], function(newValue, oldValue, model, property) {
    newValueInHandler = newValue;
    oldValueInHandler = oldValue;
});

assert.equal(-1, newValueInHandler);
assert.equal(-1, oldValueInHandler);

a.x = 10;

assert.equal(10, newValueInHandler);
assert.equal(100, oldValueInHandler);

a.y = 200;

assert.equal(200, newValueInHandler);
assert.equal(20, oldValueInHandler);

handlerRegistration.remove();

a.x = 100;
a.y = 2000;

assert.equal(200, newValueInHandler);
assert.equal(20, oldValueInHandler);
