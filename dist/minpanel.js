(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mp=require('./src/mp');

module.exports = mp;
window.mp=mp;

},{"./src/mp":4}],2:[function(require,module,exports){
function elementFactory(option) {
    //Create Tag
    var el = document.createElement(option.tag),

        //Set Style Attribute
        _style = '';
    Object.keys(option.style).forEach(function(v, idx) {
        //_style = _style + v + ':' + option.style[v].toString() + ';';
        elementFactory.css.call(el, v, option.style[v].toString());

    });
    //el.setAttribute("style", _style);

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
            },
	    text:'MP'
        },
	PANNEL_ATTRIBUTE :{
            tag: 'div',
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
	},
	PANNEL_TEXTAREA_ATTRIBUTE:{
	   tag: 'textarea',
	   style:{
	   	"width": "100%",
  		"box-sizing": "border-box",
		"height": "80%",
		"resize": "none",
		"font-size": "1em"
	   }
	},
	PANNEL_BUTTONSDIV_ATTRIBUTE:{
	   tag:'div',
	   style:{
	   	"display":"-webkit-box"
	   }
	},
	PANNEL_BUTTON_ATTRIBUTE:{
	   tag:'button',
	   style:{
	   	"display": "block",
		"-webkit-box-flex": "1"
	   }
	}
}

module.exports=ELEMENTS;

},{}],4:[function(require,module,exports){
ELEMENTS = require('./elementsConfig');
elementFactory = require('./elementFactory');

function mp() {
    var self=this;
    var body = document.getElementsByTagName('body')[0];

    this.TEXTAREA_TEXT="";

    //Create Elment
    this.MP_ELEMENT = elementFactory(ELEMENTS.MP_ATTRIBUTE);
    this.PANNEL_ELEMENT = elementFactory(ELEMENTS.PANNEL_ATTRIBUTE);
    this.PANNEL_TEXTAREA_ELEMENT =elementFactory(ELEMENTS.PANNEL_TEXTAREA_ATTRIBUTE);
    this.PANNEL_BUTTONSDIV_ELEMENT =elementFactory(ELEMENTS.PANNEL_BUTTONSDIV_ATTRIBUTE);
    this.PANNEL_BUTTON_ELEMENT=elementFactory(ELEMENTS.PANNEL_BUTTON_ATTRIBUTE);

    //Dom render
    body.appendChild(this.MP_ELEMENT);
    body.appendChild(this.PANNEL_ELEMENT);
    this.PANNEL_ELEMENT.appendChild(this.PANNEL_TEXTAREA_ELEMENT);
    this.PANNEL_ELEMENT.appendChild(this.PANNEL_BUTTONSDIV_ELEMENT);
    this.PANNEL_BUTTONSDIV_ELEMENT.appendChild(this.PANNEL_BUTTON_ELEMENT);

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

},{"./elementFactory":2,"./elementsConfig":3}]},{},[1]);
