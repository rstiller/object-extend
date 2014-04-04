
require('../index.js');
var assert = require('assert');

var A = Object.extend({
    x: 1,
    y: 2
});

var a1 = new A();
var a2 = new A();
var a3 = new A();

assert.equal(1, a1.x);
assert.equal(2, a1.y);
assert.equal(1, a2.x);
assert.equal(2, a2.y);
assert.equal(1, a3.x);
assert.equal(2, a3.y);

a1.x = 5;
a1.y = 6;
a2.x = 7;
a2.y = 8;

assert.equal(5, a1.x);
assert.equal(6, a1.y);
assert.equal(7, a2.x);
assert.equal(8, a2.y);
assert.equal(1, a3.x);
assert.equal(2, a3.y);
