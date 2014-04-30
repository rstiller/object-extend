# object-inherit

A small javascript inheritance framework.

[![Build Status](https://travis-ci.org/rstiller/object-inherit.svg?branch=master)](https://travis-ci.org/rstiller/object-inherit)

**dependencies:**
- Javascript 1.8.5
- window.setTimeout: https://developer.mozilla.org/en-US/docs/DOM/window.setTimeout
- Object.create: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
- Object.defineProperty: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
- Object.getOwnPropertyDescriptor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor

**browser compatibility:**
- Firefox 4
- Chrome 5
- Safari 5.1
- Opera 12
- Internet Explorer 9

## usage

#### basic inheritance

```javascript
require('object-inherit');

/**
 * basic inheritance
 */
var BaseModel = Object.extend({
    
    // define a property with its initial value
    title: '',
    
    // called after a new instance was created
    $constructor: function() {
    },
    
    // define a simple method
    toString: function() {
        return 'BaseModel: ' + this.title;
    }
    
});

var Article = BaseModel.extend({
    
    // call the constructor of the superclass
    $constructor: function ctor() {
        this.$super(ctor).$constructor();
    },
    
    toString: function() {
        return 'Article: ' + this.title;
    }
    
});

var article = new Article({
    title: 'object-inherit'
});

// prints "Article: object-inherit"
console.log(article.toString());
```

#### default values

```javascript
require('object-inherit');

// define x, y with zero, one as default value
var A = Object.extend({
    x: 0,
    y: 1
});

var B = A.extend({
    y: 2,
    z: 3
});

// new instances
var a = new A();
var b = new B();

// output: 0 1
console.log(a.x, a.y);

// output: 0 2 3
console.log(b.x, b.y, b.z);

a = new A({ x: 4 });
b = new B({ x: 5, z: 6 });

// output: 4 1
console.log(a.x, a.y);

// output: 5 2 6
console.log(b.x, b.y, b.z);
```

#### super methods

```javascript
require('object-inherit');

// define a simple toString method
var A = Object.extend({
    
    toString: function() {
        return 'Class A';
    },
    
    toSource: function() {
        return 'Source A';
    }
    
});

var B = A.extend({
    
    // overrides the toString method; notice the function name 'toStr' - its needed as anchor
    toString: function toStr() {
        return 'Class B: ' + this.$super(toStr).toString();
    }
    
    
});

var C = B.extend({
    
    // overrides the toSource method from class A
    toSource: function toSrc() {
        return 'Source C: ' + this.$super(toSrc).toSource();
    }
    
    
});

var b = new B();
var c = new C();

// output: Class B: Class A
console.log(b.toString());

// output: Source C: Source A
console.log(c.toSource());
```

#### static methods and class reference

```javascript
require('object-inherit');

// define object method first, class methods second
var A = Object.extend({}, {
    
    // a class property
    TYPE: 'A',
    
    toString: function() {
        var Class = this;
        return Class.TYPE;
    }
    
});

var B = A.extend({
    
    toString: function() {
        var Class = this.$class;
        return 'object-instance for Class: ' + Class.TYPE;
    }
    
}, {
    
    TYPE: 'B'
    
});

// output: A
console.log(A.toString());

// output: B
console.log(B.toString());

var b = new B();

// output: object-instance for Class: B
console.log(b.toString());
```

#### listen to property changes

```javascript
require('object-inherit');

var A = Object.extend({
    
    x: 0,
    y: 1
    
});

var a = new A();

// listen to multiple properties
var handlerRegistration = a.$on(['x', 'y'], function(newValue, oldValue, model, property, handlerRegistration) {
    console.log('changed property', property, 'in', model, 'from', oldValue, 'to', newValue);
});

// output: changed property x in [object Object] from 0 to 2
a.x = 2;

// output: changed property y in [object Object] from 1 to 3
a.y = 3;

// disable the listener
handlerRegistration.remove();

// no output here
a.x = 4;

handlerRegistration = a.$on('x', function(value) {
    console.log('x has changed to', value);
});

// output: x has changed to 5
a.x = 5;
```

```javascript
require('object-inherit');

var A = Object.extend({
    
    x: 0,
    y: 1
    
});

var a = new A();

// listen to any changes
var handlerRegistration = a.$on('$*', function(newValue, oldValue, model, property, handlerRegistration) {
    console.log('changed property', property, 'in', model, 'from', oldValue, 'to', newValue);
});

// output: changed property x in [object Object] from 0 to 2
a.x = 2;

// output: changed property y in [object Object] from 1 to 3
a.y = 3;

// disable the listener
handlerRegistration.remove();

// no output here
a.x = 4;
```

If you want to disable the listener for each property and only want to listen to changes of many properties at once
you can use the `$set` property.

```javascript
handler = function(newValues, oldValues, model, handlerRegistration) {}

$on('$set', handler)
```

```javascript
require('object-inherit');

var A = Object.extend({
    
    x: 0,
    y: 1
    
});

var a = new A();

// listen to changes of many properties
var $setRegistration = a.$on('$set', function(newValues, oldValues, model, handlerRegistration) {
    console.log('many properties changed:', newValues);
});

// no output here
a.x = 2;

var regularRegistration = a.$on('x', function(newValue, oldValue, model, property, handlerRegistration) {
    console.log('changed property', property, 'in', model, 'from', oldValue, 'to', newValue);
});

// output: changed property x in [object Object] from 2 to 3
a.x = 3;

// output: many properties changed: { x: 4 }
a.$set({
    x: 4
});
```

#### listen to property changes with delay

```javascript
require('object-inherit');

var A = Object.extend({
    
    x: 0,
    y: 1
    
});

var a = new A();

// listen to property changes with delay of 200 ms
var handlerRegistration = a.$on(['x', 'y'], 200, function(callHistory) {
    var last = callHistory[callHistory.length - 1];
    console.log('latest call', last[3], 'in', last[2], 'from', last[1], 'to', last[0]);
});

// no output here
for(var i = 0; i < 100; i++) {
    a.x = i;
}

// 200 ms later:
// output: changed property x in [object Object] from 98 to 99
```

#### listen to custom events

```javascript
require('object-inherit');

var A = Object.extend({
});

var a = new A();

// listen to an event
// custom events need to start with an exclamation point ('!')
// the event-object needs to have at least a type property
var registration = a.$on('!MyCustomEvent', function(event, model, registration) {
    console.log('event', event.type, 'caught in', model, 'with payload', event.payload);
});

var event = {
    type: '!MyCustomEvent',
    payload: 'Test Payload'
};

// console output: event !MyCustomEvent caught in [Object object] with payload Test Payload
a.$emit(event);

// de-register the listener
registration.remove();
```

## using nodejs

```text
npm install object-inherit --save
```

## using bower

```text
bower install object-inherit --save
```
