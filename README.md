# object-inherit

A small javascript inheritance framework.

[![Build Status](https://travis-ci.org/rstiller/object-inherit.svg?branch=master)](https://travis-ci.org/rstiller/object-inherit)

## usage

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

## using nodejs

```text
npm install object-inherit --save
```

## using bower

```text
bower install object-inherit --save
```
