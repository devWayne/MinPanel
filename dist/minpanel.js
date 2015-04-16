(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mp=require('./lib/mp');

module.exports = mp;
window.mp=mp;

},{"./lib/mp":4}],2:[function(require,module,exports){
function elementFactory(option) {
    var el = document.createElement(option.tag),
        _style = '';
    Object.keys(option.style).forEach(function(v, idx) {
        _style = _style + v + ':' + option.style[v].toString() + ';';
    });
    el.setAttribute("style", _style);
    return el;
}

module.exports=elementFactory;

},{}],3:[function(require,module,exports){
var ELEMENTS = {
	MP_ATTRIBUTE :{
            tag: 'div',
            style: {
                "border-radius": "5px",
                "padding": "5px",
                "background-color": "#000",
                "right": "5%",
                "position": "fixed",
                "top": "5%",
                "opacity": "0.2",
                "color": "#fff"
            }
        },
	PANNEL_ATTRIBUTE :{
            tag: 'textarea',
            style: {
                "border-radius": "5px",
                "padding": "5px",
                "background-color": "#000",
                "width": "80%",
                "height": "80%",
                "position": "fixed",
                "top": "5%",
                "opacity": "0.2",
                "color": "#fff"
            }
        }
}

module.exports=ELEMENTS;

},{}],4:[function(require,module,exports){
ELEMENTS = require('./elementsConfig');
elementFactory = require('./elementFactory');

function mp() {
    var body = document.getElementsByTagName('body')[0],
        MP_ELEMENT = elementFactory(ELEMENTS.MP_ATTRIBUTE),
        PANNEL_ELEMENT = elementFactory(ELEMENTS.PANNEL_ATTRIBUTE);
    body.appendChild(MP_ELEMENT);
    body.appendChild(PANNEL_ELEMENT);
    MP_ELEMENT.addEventListener('click', function(e) {
        e.preventDefault();
        //PANNEL_ELEMENT
        alert(1);
    }, false);
}


module.exports = mp;

},{"./elementFactory":2,"./elementsConfig":3}]},{},[1]);
