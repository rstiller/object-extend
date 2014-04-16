
require('../index.js');
var assert = require('assert');

var A = Object.extend({
});

var a = new A();

var eventInHandler = null;
var modelInHandler = null;
var registration = a.$on('!event', function(event, model, registration) {
    eventInHandler = event;
    modelInHandler = model;
});

assert.equal(null, eventInHandler);
assert.equal(null, modelInHandler);

a.x = 0;
a.$set({
    x: 1,
    y: 2
});

assert.equal(null, eventInHandler);
assert.equal(null, modelInHandler);

var event = {
    type: '!event',
    payload: {
        a: 'x',
        b: 'y',
        c: 'z'
    }
};

a.$emit(event);

assert.deepEqual(event, eventInHandler);
assert.equal(a, modelInHandler);

eventInHandler = null;
modelInHandler = null;

assert.equal(null, eventInHandler);
assert.equal(null, modelInHandler);

event = {
    type: '!otherEvent',
    payload: {
        a: 'x',
        b: 'y',
        c: 'z'
    }
};

a.$emit(event);

assert.equal(null, eventInHandler);
assert.equal(null, modelInHandler);

event = {
    type: '!event',
    payload: {
        a: 'x',
        b: 'y',
        c: 'z'
    }
};

registration.remove();
a.$emit(event);

assert.equal(null, eventInHandler);
assert.equal(null, modelInHandler);
