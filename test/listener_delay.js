
require('../index.js');
var assert = require('assert');

var A = Object.extend({
    x: 1,
    y: 2,
    z: 3
});

var a = new A();

var result = {
    newValueInHandler: -1,
    oldValueInHandler: -1,
    callCount: 0
};
var handlerRegistration = a.$on('x', 100, function(callstack) {
    result.newValueInHandler = callstack[callstack.length - 1][0];
    result.oldValueInHandler = callstack[callstack.length - 1][1];
    result.callCount++;
});

assert.equal(-1, result.newValueInHandler);
assert.equal(-1, result.oldValueInHandler);
assert.equal(0, result.callCount);

a.x = 10;

assert.equal(-1, result.newValueInHandler);
assert.equal(-1, result.oldValueInHandler);

setTimeout(function() {
    assert.equal(10, result.newValueInHandler);
    assert.equal(1, result.oldValueInHandler);
    assert.equal(1, result.callCount);
    
    for(var i = 0; i < 100; i++) {
        a.x = 100 + i;
    }

    assert.equal(10, result.newValueInHandler);
    assert.equal(1, result.oldValueInHandler);

    setTimeout(function() {
        assert.equal(199, result.newValueInHandler);
        assert.equal(198, result.oldValueInHandler);
        assert.equal(2, result.callCount);
    }, 200);
}, 200);
