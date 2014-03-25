# object-extend

A small javascript inheritance framework.

## usage

```javascript
require('object-extend');

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
    title: 'object-extend'
});

// prints "Article: object-extend"
console.log(article.toString());
```

## using nodejs

```text
npm install object-extend --save
```

## using bower

```text
bower install object-extend --save
```
