!function(){"use strict";function r(r,t){this.remove=function(){delete r[t]}}function t(r){this.remove=function(){for(var t=0;t<r.length;t++)r[t].remove()}}Function.prototype.extend=function(e,n){var o=this,u=function(r,t,e){var n=Object.getOwnPropertyDescriptor(r,t),o={};n||Object.defineProperty(r,t,function(r,t,e){var n=r,u={enumerable:!0,configurable:!0,get:function(){return n},set:function(r){var u=n;if(r!==n){n=r;for(var f in o)o[f](r,u,t,e)}}};return u.get.counter=0,u.get.listeners=o,u}(e,r,t))},f=function(r){var t=[],e=this,n=e,o=e;for(e.$class=f;null!=(o=o.__proto__);){n.$super={};for(var i in o)"function"==typeof o[i]&&(n.$super[i]=o[i],"$constructor"===i&&t.push(n.$super[i]));n=n.$super}for(n=e.$super;n;){var a={};for(var i in n)"function"==typeof n[i]&&(a[i]=function(r,t){return function(){if(!r)throw new Error("Superclass has no method "+t);r.apply(e,arguments)}}(n.$super[i],i));for(var i in n)"function"==typeof n[i]&&(n[i].$anchor=a);n=n.$super}e.$super=function(r){return r&&r.$anchor?r.$anchor:null},e.$super=e.$super.bind(e);for(var i in f.$defaults)u(e,i,f.$defaults[i]);for(var i in e)"function"==typeof e[i]&&(e[i]=e[i].bind(e));for(var i in r)u(e,i,r[i]),e[i]=r[i];t.length>0&&t[0].bind(e).apply()};f.prototype=Object.create(o.prototype),f.prototype.constructor=f,f.prototype.$on=function(e,n){var o=this,f=function(t){u(o,t,o[t]);var e=Object.getOwnPropertyDescriptor(o,t),f=e.get.counter++;return e.get.listeners[f]=n,new r(e.listeners,f)};if(e instanceof Array){for(var i=[],a=0;a<e.length;a++)i.push(f(e[a]));return new t(i)}return f(e)},Object.defineProperty(f,"$defaults",{value:{},enumerable:!1,writable:!1});for(var i in o.$defaults)f.$defaults[i]=o.$defaults[i];for(var i in e)"function"==typeof e[i]?f.prototype[i]=e[i]:f.$defaults[i]=e[i];for(var i in o)f[i]=o[i];for(var i in n)f[i]=n[i];return f}}();