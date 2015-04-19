(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mp=require('./src/minPanel');

module.exports = mp;
window.mp=mp;

},{"./src/minPanel":6}],2:[function(require,module,exports){
module.exports = function (source, add) {
    for (var o in add) {
        if (add.hasOwnProperty(o)) {
            source[o] = add[o];
        }
    }
    return source;
};

},{}],3:[function(require,module,exports){
var ELEMENTS = {
	MP_ATTRIBUTE :{
            tag: 'div',
            style: {
                "border-radius": "5px",
                "padding": "5px",
                "background-color": "rgba(0, 0, 0, 0.2)",
                "right": "5%",
                "width": "25px",
		"top": "5%",
                "color": "#fff"
            },
	    text:'MP'
        },
	PANNEL_ATTRIBUTE :{
            tag: 'div',
            style: {
                "border-radius": "5px",
                "padding": "5px",
                "background-color": "rgba(0, 0, 0, 0.2)",
                "width": "80%",
                "height": "80%",
                "position": "fixed",
                "top": "5%",
                "color": "#fff"
            }
	},
	PANNEL_TEXTAREA_ATTRIBUTE:{
	   tag: 'textarea',
	   style:{
	   	"width": "100%",
  		"box-sizing": "border-box",
		"height": "80%",
		"resize": "none",
		"font-size": "1em",
		"color": "#fff",
  		"background-color": "rgba(0, 0, 0, 0.8)"
	   }
	},
	PANNEL_BUTTONSDIV_ATTRIBUTE:{
	   tag:'div',
	   style:{
	   	"display":"-webkit-box",
		"height":"5%"
	   }
	},
	PANNEL_BUTTON_ATTRIBUTE:{
	   tag:'button',
	   style:{
	   	"display": "block",
		"-webkit-box-flex": "1",
		"height": "100%"
	   }
	}
}

module.exports=ELEMENTS;

},{}],4:[function(require,module,exports){
ELEMENTS = require('./attributesConfig');
elementFactory = require('./elementFactory');

function createDom(mp) {
    createElements(mp);
    domRender(mp);
    return mp;
}

//Create Element
function createElements(mp) {
    mp.MP_ELEMENT = elementFactory(ELEMENTS.MP_ATTRIBUTE);
    mp.PANNEL_ELEMENT = elementFactory(ELEMENTS.PANNEL_ATTRIBUTE);
    mp.PANNEL_TEXTAREA_ELEMENT = elementFactory(ELEMENTS.PANNEL_TEXTAREA_ATTRIBUTE);
    mp.PANNEL_BUTTONSDIV_ELEMENT = elementFactory(ELEMENTS.PANNEL_BUTTONSDIV_ATTRIBUTE);
    mp.PANNEL_BUTTON_ELEMENT = elementFactory(ELEMENTS.PANNEL_BUTTON_ATTRIBUTE);
    return mp;
}



//Dom render
function domRender(mp) {
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(mp.MP_ELEMENT);
    body.appendChild(mp.PANNEL_ELEMENT);
    mp.PANNEL_ELEMENT.appendChild(mp.PANNEL_TEXTAREA_ELEMENT);
    mp.PANNEL_ELEMENT.appendChild(mp.PANNEL_BUTTONSDIV_ELEMENT);
    mp.PANNEL_BUTTONSDIV_ELEMENT.appendChild(mp.PANNEL_BUTTON_ELEMENT);
    return mp;
}

module.exports = createDom;

},{"./attributesConfig":3,"./elementFactory":5}],5:[function(require,module,exports){
function elementFactory(option) {
    //Create Tag
    var el = document.createElement(option.tag),

        //Set Style Attribute
        _style = '';
    Object.keys(option.style).forEach(function(v, idx) {
        //_style = _style + v + ':' + option.style[v].toString() + ';';
        elementFactory.css.call(el, v, option.style[v].toString());

    });

    //Set innerHTML
    option.text ? el.innerHTML = option.text : el.innerHTML = '';
    return el;
}

elementFactory.css = function(elem, value) {
    if (arguments.length < 2) {
        var result = this.getComputedStyle(elem, '');
        return result;
    } else {
        if (elem && typeof(value) == 'string') {
            var css = elem + ":" + value;
            return this.style.cssText += css + ';'
        }
    }
}

module.exports = elementFactory;

},{}],6:[function(require,module,exports){
Extend= require('../lib/extend');
createDom= require('./createDom');
function mp() {
    var self=this;

    this.TEXTAREA_TEXT="";
    createDom(this);
    //Event Bind
    this.MP_ELEMENT.addEventListener('click', function(e) {
        e.preventDefault();
	getComputedStyle(self.PANNEL_ELEMENT).display=="none"?elementFactory.css.call(self.PANNEL_ELEMENT,'display','block'):elementFactory.css.call(self.PANNEL_ELEMENT,'display','none');
    }, false);
}

mp.prototype.value=function(key,value){
   var text='watch:';
   text+=key;
   text+='=';
   text+= JSON.stringify(value);
   text+='\n';
   this.TEXTAREA_TEXT+=text;
   this.PANNEL_TEXTAREA_ELEMENT.textContent=this.TEXTAREA_TEXT;
}

mp.prototype.log=function(text){
   var text='log:';
   this.TEXTAREA_TEXT+=text;
   this.PANNEL_TEXTAREA_ELEMENT.textContent=this.TEXTAREA_TEXT;
}


module.exports = mp;

},{"../lib/extend":2,"./createDom":4}]},{},[1]);
