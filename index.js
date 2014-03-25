(function() {
    'use strict';

    function HandlerRegistration(listeners, id) {
        
        this.remove = function() {
            delete listeners[id];
        };
        
    }

    function HandlerRegistrationCollection(registrations) {
        
        this.remove = function() {
            for(var i = 0; i < registrations.length; i++) {
                registrations[i].remove();
            }
        };
        
    }

    Function.prototype.extend = function(objectProperties, staticProperties) {
        var Superclass = this;
        var defineProperty = function(model, property, defaultValue) {
            var descriptor = Object.getOwnPropertyDescriptor(model, property);
            var listeners = {};
            
            if(!descriptor) {
                Object.defineProperty(model, property, (function(defaultValue, model, prop) {
                    
                    var _var = defaultValue;
                    var desc = {
                        enumerable: true,
                        configurable: true,
                        get: function() {
                            return _var;
                        },
                        set: function(value) {
                            var oldValue = _var;
                            
                            if(value !== _var) {
                                _var = value;
                                
                                for(var id in listeners) {
                                    listeners[id](value, oldValue, model, prop);
                                }
                            }
                        }
                    };
                    desc.get.counter = 0;
                    desc.get.listeners = listeners;
                    
                    return desc;
                    
                })(defaultValue, model, property));
            }
        };
        var Class = function(attributes) {
            var ctors = [];
            var slf = this;
            var superTmp = slf;
            var protoTmp = slf;
            
            slf.$class = Class;
            
            while((protoTmp = protoTmp.__proto__) != null) {
                superTmp.$super = {};
                for(var prop in protoTmp) {
                    if(typeof protoTmp[prop] === 'function') {
                        superTmp.$super[prop] = protoTmp[prop];
                        
                        if(prop === '$constructor') {
                            ctors.push(superTmp.$super[prop]);
                        }
                    }
                }
                superTmp = superTmp.$super;
            }
            
            superTmp = slf.$super;
            while(!!superTmp) {
                var anchor = {};
                for(var prop in superTmp) {
                    if(typeof superTmp[prop] === 'function') {
                        anchor[prop] = (function(func) {
                            
                            return function() {
                                func.apply(slf, arguments);
                            };
                            
                        })(superTmp.$super[prop]);
                    }
                }
                
                for(var prop in superTmp) {
                    if(typeof superTmp[prop] === 'function') {
                        superTmp[prop].$anchor = anchor;
                    }
                }
                
                superTmp = superTmp.$super;
            }
            
            slf.$super = function(anchor) {
                if(!!anchor && !!anchor.$anchor) {
                    return anchor.$anchor;
                }
                
                return null;
            };
            slf.$super = slf.$super.bind(slf);
            
            for(var prop in objectProperties) {
                if(typeof objectProperties[prop] !== 'function') {
                    defineProperty(slf, prop, objectProperties[prop]);
                }
            }
            
            for(var prop in attributes) {
                defineProperty(slf, prop, attributes[prop]);
            }
            
            if(ctors.length > 0) {
                ctors[0].bind(slf).apply();
            }
        };
        
        Class.prototype = Object.create(Superclass.prototype);
        Class.prototype.constructor = Class;
        Class.prototype.$on = function(properties, handler) {
            var slf = this;
            var addListener = function(property) {
                defineProperty(slf, property, slf[property]);
                
                var descriptor = Object.getOwnPropertyDescriptor(slf, property);
                var id = descriptor.get.counter++;
                descriptor.get.listeners[id] = handler;
                
                return new HandlerRegistration(descriptor.listeners, id);
            };
            
            if(properties instanceof Array) {
                var registrations = [];
                
                for(var i = 0; i < properties.length; i++) {
                    registrations.push(addListener(properties[i]));
                }
                
                return new HandlerRegistrationCollection(registrations)
            } else {
                return addListener(properties);
            }
        };
        
        for(var prop in objectProperties) {
            if(typeof objectProperties[prop] === 'function') {
                Class.prototype[prop] = objectProperties[prop];
            }
        }
        
        for(var prop in Superclass) {
            Class[prop] = Superclass[prop];
        }
        
        for(var prop in staticProperties) {
            Class[prop] = staticProperties[prop];
        }
        
        return Class;
    };

})();
