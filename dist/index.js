!function(){"use strict";function r(r,e,t){this.remove=function(){delete r[t],delete e[t]}}function e(r){this.remove=function(){for(var e=0;e<r.length;e++)r[e].remove()}}Function.prototype.extend=function(t,n){var o=this,u=function(r,e,t){var n=Object.getOwnPropertyDescriptor(r,e),o={},u={};n||Object.defineProperty(r,e,function(r,e,t){var n=r,f={enumerable:!0,configurable:!0,get:function(){return n},set:function(r){var f=n;if(r!==n){n=r;for(var i in o)o[i](r,f,e,t,u[i])}}};return f.get.counter=0,f.get.listeners=o,f.get.handlers=u,f}(t,r,e))},f=function(r){var e=[],t=this,n=t,o=t;for(t.$class=f;null!=(o=o.__proto__);){n.$super={};for(var i in o)"function"==typeof o[i]&&(n.$super[i]=o[i],"$constructor"===i&&e.push(n.$super[i]));n=n.$super}for(n=t.$super;n;){var a={};for(var i in n)"function"==typeof n[i]&&(a[i]=function(r,e){return function(){if(!r)throw new Error("Superclass has no method "+e);r.apply(t,arguments)}}(n.$super[i],i));for(var i in n)"function"==typeof n[i]&&(n[i].$anchor=a);n=n.$super}t.$super=function(r){return r&&r.$anchor?r.$anchor:null},t.$super=t.$super.bind(t);for(var i in f.$defaults)u(t,i,f.$defaults[i]);for(var i in t)"function"==typeof t[i]&&(t[i]=t[i].bind(t));for(var i in r)u(t,i,r[i]),t[i]=r[i];e.length>0&&e[0].bind(t).apply()};f.prototype=Object.create(o.prototype),f.prototype.constructor=f,f.prototype.$on=function(t,n){var o=this,f=function(e){u(o,e,o[e]);var t=Object.getOwnPropertyDescriptor(o,e),f=t.get.counter++;t.get.listeners[f]=n;var i=new r(t.get.listeners,t.get.handlers,f);return t.get.handlers[f]=i,i};if(t instanceof Array){for(var i=[],a=0;a<t.length;a++)i.push(f(t[a]));return new e(i)}return f(t)},Object.defineProperty(f,"$defaults",{value:{},enumerable:!1,writable:!1});for(var i in o.$defaults)f.$defaults[i]=o.$defaults[i];for(var i in t)"function"==typeof t[i]?f.prototype[i]=t[i]:f.$defaults[i]=t[i];for(var i in o)f[i]=o[i];for(var i in n)f[i]=n[i];return f}}();