
require('../index.js');
var assert = require('assert');

var A = Object.extend({
    
    counter: 0,
    
    increment: function() {
        this.counter++;
    }
    
});

var B = A.extend();

var a = new A();

assert.equal(0, a.counter);
a.increment();

var b = new B();

assert.equal(0, b.counter);
b.increment();
assert.equal(1, b.counter);

var C = B.extend({
    
    increment: function inc() {
        this.$super(inc).increment();
        this.$super(inc).increment();
    }
    
});

var c = new C();

assert.equal(0, c.counter);
c.increment();
assert.equal(2, c.counter);

var D = A.extend({
    
    $constructor: function ctor() {
        this.$super(ctor).$constructor();
    }
    
});

try {
    new D();
    assert.fail();
} catch(e) {
    assert.equal('Superclass has no method $constructor', e.message);
}
