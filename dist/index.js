!function(){"use strict";function r(r,n){this.remove=function(){delete r[n]}}function n(r){this.remove=function(){for(var n=0;n<r.length;n++)r[n].remove()}}Function.prototype.extend=function(t,e){var o=this,u=function(r,n,t){var e=Object.getOwnPropertyDescriptor(r,n),o={};e||Object.defineProperty(r,n,function(r,n,t){var e=r,u={enumerable:!0,configurable:!0,get:function(){return e},set:function(r){var u=e;if(r!==e){e=r;for(var i in o)o[i](r,u,n,t)}}};return u.get.counter=0,u.get.listeners=o,u}(t,r,n))},i=function(r){var n=[],e=this,o=e,f=e;for(e.$class=i;null!=(f=f.__proto__);){o.$super={};for(var c in f)"function"==typeof f[c]&&(o.$super[c]=f[c],"$constructor"===c&&n.push(o.$super[c]));o=o.$super}for(o=e.$super;o;){var p={};for(var c in o)"function"==typeof o[c]&&(p[c]=function(r){return function(){r.apply(e,arguments)}}(o.$super[c]));for(var c in o)"function"==typeof o[c]&&(o[c].$anchor=p);o=o.$super}e.$super=function(r){return r&&r.$anchor?r.$anchor:null},e.$super=e.$super.bind(e);for(var c in t)"function"!=typeof t[c]&&u(e,c,t[c]);for(var c in r)u(e,c,r[c]);n.length>0&&n[0].bind(e).apply()};i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.prototype.$on=function(t,e){var o=this,i=function(n){u(o,n,o[n]);var t=Object.getOwnPropertyDescriptor(o,n),i=t.get.counter++;return t.get.listeners[i]=e,new r(t.listeners,i)};if(t instanceof Array){for(var f=[],c=0;c<t.length;c++)f.push(i(t[c]));return new n(f)}return i(t)};for(var f in t)"function"==typeof t[f]&&(i.prototype[f]=t[f]);for(var f in o)i[f]=o[f];for(var f in e)i[f]=e[f];return i}}();