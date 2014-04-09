/**
 * object-inherit
 * 
 * This module registers the "extend" function for all functions (objects).
 * It works for nodejs and for browsers.
 */
(function() {
    'use strict';

    /**
     * A HandlerRegistration is a an object which is used to de-register a listener.
     */
    function HandlerRegistration(listeners, id) {
        
        this.remove = function() {
            delete listeners[id];
        };
        
    }

    /**
     * A HandlerRegistrationCollection is a collection of HandlerRegistration objects
     * and method-compatible to HandlerRegistration objects.
     */
    function HandlerRegistrationCollection(registrations) {
        
        this.remove = function() {
            for(var i = 0; i < registrations.length; i++) {
                registrations[i].remove();
            }
        };
        
    }

    /**
     * The extend function given functions (objects) the ability to inherit all attributes
     * to a new class.
     * 
     * Typical usage:
     * 
     *     var MyClass = Object.extend(..., ...);
     */
    Function.prototype.extend = function(objectProperties, staticProperties) {
        // a reference to the new class's superclass
        var Superclass = this;
        
        // function to define a property with change listeners
        var defineProperty = function(model, property, defaultValue) {
            // get the javascript property descriptor
            var descriptor = Object.getOwnPropertyDescriptor(model, property);
            // local list of listeners
            var listeners = {};
            
            // only define the property if it isn't defined yet with a descriptor
            if(!descriptor) {
                // the closure-function ensures referential integrity
                Object.defineProperty(model, property, (function(defaultValue, model, prop) {
                    
                    // init the variable with the default value
                    var _var = defaultValue;
                    // the descriptor
                    var desc = {
                        enumerable: true,
                        configurable: true,
                        get: function() {
                            return _var;
                        },
                        set: function(value) {
                            var oldValue = _var;
                            
                            // only fire events if the value changed
                            if(value !== _var) {
                                _var = value;
                                
                                for(var id in listeners) {
                                    listeners[id](value, oldValue, model, prop);
                                }
                            }
                        }
                    };
                    
                    // the following meta-data are assigned to the get-method and not to the descriptor,
                    // because the descriptor can't have custom properties since it is generated
                    // each time it is requested
                    
                    // listener counter / unique id for later removal through the HandlerRegistration objects
                    desc.get.counter = 0;
                    // a reference to the listeners
                    desc.get.listeners = listeners;
                    
                    return desc;
                    
                })(defaultValue, model, property));
            }
        };
        
        // The new class (javascript) constructor
        var Class = function(attributes) {
            // all constructors (including the constructors of the superclasses)
            var ctors = [];
            // a reference to the object instance
            var slf = this;
            var superTmp = slf;
            var protoTmp = slf;
            
            // a reference to the Class for each instance
            slf.$class = Class;
            
            // iterate through all superclasses
            while((protoTmp = protoTmp.__proto__) != null) {
                
                // set the $super attribute to reference the direct superclass
                superTmp.$super = {};
                
                // iterate through all methods and properties in the superclass
                for(var prop in protoTmp) {
                    
                    // only functions gets assigned to the $super attribute
                    if(typeof protoTmp[prop] === 'function') {
                        superTmp.$super[prop] = protoTmp[prop];
                        
                        // collect the constructor method
                        if(prop === '$constructor') {
                            ctors.push(superTmp.$super[prop]);
                        }
                    }
                }
                
                // set the last $super instance
                superTmp = superTmp.$super;
            }
            
            // iterate through the super-methods
            superTmp = slf.$super;
            while(!!superTmp) {
                
                // all methods in $super needs to have an anchor for calling super-methods from within the new class
                var anchor = {};
                
                // for all functions ...
                for(var prop in superTmp) {
                    if(typeof superTmp[prop] === 'function') {
                        
                        // assign the anchor with the correct instance reference
                        anchor[prop] = (function(func, name) {
                            
                            return function() {
                                // if the super-function got no method with the requested name:
                                // here is the error-message for it
                                if(!func) {
                                    throw new Error('Superclass has no method ' + name);
                                }
                                func.apply(slf, arguments);
                            };
                            
                        })(superTmp.$super[prop], prop);
                    }
                }
                
                // assign the $anchor attribute to the function-object
                for(var prop in superTmp) {
                    if(typeof superTmp[prop] === 'function') {
                        superTmp[prop].$anchor = anchor;
                    }
                }
                
                // set the next $super to iterate through
                superTmp = superTmp.$super;
            }
            
            // turn the $super attribute to a method
            slf.$super = function(anchor) {
                // take the anchor assigned above, which in turn gets the $super-object
                if(!!anchor && !!anchor.$anchor) {
                    return anchor.$anchor;
                }
                
                return null;
            };
            // bind the $super method always to this instance
            slf.$super = slf.$super.bind(slf);
            
            // define all properties in $defaults
            for(var prop in Class.$defaults) {
                defineProperty(slf, prop, Class.$defaults[prop]);
            }
            
            // bind all methods to always be call with this instance
            for(var prop in slf) {
                if(typeof slf[prop] === 'function') {
                    slf[prop] = slf[prop].bind(slf);
                }
            }
            
            // defines the properties given to the constructor (new-operator) and assign the values
            for(var prop in attributes) {
                defineProperty(slf, prop, attributes[prop]);
                slf[prop] = attributes[prop];
            }
            
            // call the first constructor method
            if(ctors.length > 0) {
                ctors[0].bind(slf).apply();
            }
        };
        
        // proper javascript inheritance
        Class.prototype = Object.create(Superclass.prototype);
        // assign the javascript constructor
        Class.prototype.constructor = Class;
        // define the change listener registration method
        Class.prototype.$on = function(properties, handler) {
            // reference to this instance
            var slf = this;
            // adds the handler to the list of listeners and creates a new HandlerRegistration
            var addListener = function(property) {
                defineProperty(slf, property, slf[property]);
                
                // assuming that there is property descriptor defined from the defineProperty method
                var descriptor = Object.getOwnPropertyDescriptor(slf, property);
                var id = descriptor.get.counter++;
                descriptor.get.listeners[id] = handler;
                
                return new HandlerRegistration(descriptor.get.listeners, id);
            };
            
            // if there are many properties to watch ...
            if(properties instanceof Array) {
                var registrations = [];
                
                for(var i = 0; i < properties.length; i++) {
                    registrations.push(addListener(properties[i]));
                }
                
                // ... instance a new HandlerRegistrationCollection with
                // all the single HandlerRegistration objects created before
                return new HandlerRegistrationCollection(registrations)
            } else {
                return addListener(properties);
            }
        };
        
        // define the $defaults property as class-variable
        Object.defineProperty(Class, '$defaults', { value: {}, enumerable: false, writable: false });
        // assign all defaults from the superclass to the new $defaults variable
        for(var prop in Superclass.$defaults) {
            Class.$defaults[prop] = Superclass.$defaults[prop];
        }
        
        // override functions and defaults
        for(var prop in objectProperties) {
            if(typeof objectProperties[prop] === 'function') {
                Class.prototype[prop] = objectProperties[prop];
            } else {
                Class.$defaults[prop] = objectProperties[prop];
            }
        }
        
        // assign all superclass properties to the new class
        for(var prop in Superclass) {
            Class[prop] = Superclass[prop];
        }
        
        // assign the static properties (overrides static properties from superclass)
        for(var prop in staticProperties) {
            Class[prop] = staticProperties[prop];
        }
        
        return Class;
    };

})();
