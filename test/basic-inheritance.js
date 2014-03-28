
require('../index.js');
var assert = require('assert');

var A = Object.extend({});
var B = A.extend({});
var C = A.extend({});
var D = B.extend({});

var a = new A();
var b = new B();
var c = new C();
var d = new D();

assert.ok(a instanceof Object);
assert.ok(a instanceof A);

assert.ok(b instanceof Object);
assert.ok(b instanceof A);
assert.ok(b instanceof B);

assert.ok(c instanceof Object);
assert.ok(c instanceof A);
assert.ok(c instanceof C);

assert.ok(d instanceof Object);
assert.ok(d instanceof A);
assert.ok(d instanceof B);
assert.ok(d instanceof D);
