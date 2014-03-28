
require('../index.js');
var assert = require('assert');

var A = Object.extend({
    x: 1,
    y: 2
});

var B = A.extend({
    a: 3,
    b: 4
});

var C = B.extend({
    a: 5,
    x: 6
});

var a = new A();
var b = new B();
var c = new C();

assert.equal(1, a.x);
assert.equal(2, a.y);

assert.equal(1, b.x);
assert.equal(2, b.y);
assert.equal(3, b.a);
assert.equal(4, b.b);

assert.equal(6, c.x);
assert.equal(2, c.y);
assert.equal(5, c.a);
assert.equal(4, c.b);

a = new A({ x: 10 });
b = new B({ a: 11, b: 12 });
c = new C({ x: 13, y: 14, a: 15, b: 16 });

assert.equal(10, a.x);
assert.equal(2, a.y);

assert.equal(1, b.x);
assert.equal(2, b.y);
assert.equal(11, b.a);
assert.equal(12, b.b);

assert.equal(13, c.x);
assert.equal(14, c.y);
assert.equal(15, c.a);
assert.equal(16, c.b);
