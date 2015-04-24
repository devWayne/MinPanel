(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mp=require('./src/minPanel');

module.exports = mp;
window.mp=mp;

},{"./src/minPanel":13}],2:[function(require,module,exports){
var Event = {
    on: function (name, lister) {
        if (!name) {
            return;
        }
        if (!this._events_) {
            this._events_ = {};
        }
        var events = this._events_;
        if (!events[name]) {
            events[name] = [];
        }
        events[name].push(lister);

    },
    emit: function (name) {
        var events = this._events_;
        if (!name || !events || !events[name]) {
            return;
        }
        var queue = events[name];
        var length = queue.length;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < length; i++) {
            queue[i].apply(this, args);
        }

    }

};

module.exports = Event;


},{}],3:[function(require,module,exports){
module.exports = function (source, add) {
    for (var o in add) {
        if (add.hasOwnProperty(o)) {
            source[o] = add[o];
        }
    }
    return source;
};

},{}],4:[function(require,module,exports){
var diff = require('./lib/diff');

var createElement = require('./lib/createElement');

var render = require('./lib/render');

var KVD = {
    diff: diff,
    render: render,
    createElement:createElement
}

window.KVD = KVD;

module.exports = KVD;

},{"./lib/createElement":5,"./lib/diff":6,"./lib/render":7}],5:[function(require,module,exports){
var REGX_ClassId = /\.|#/;
var REGX_SplitClasId = /(\.|#)\w+/g;
var REGX_GetProperties = /\(.+\)/;
var REGX_SplitProperties = /\w+="[\w:,]+"/g;

function createElement(option, children) {
    var tag = option.tag
    var vnode = {};
    var tagName, classId;
    tagName = tagName = tag.split(" ")[0].split(REGX_ClassId)[0];
    
    vnode['tagName'] = tagName;
    vnode['text']=tag.split(" ")[1]||'';

    classId = tag.match(REGX_SplitClasId);

    var properties = {};
    for (key in option) {
        if (key != 'tag') {
            properties[key] = option[key];
        }
    }
    //var properties = tag.match(REGX_GetProperties)[0].match(REGX_SplitProperties);
    vnode['propertyList'] = properties;
    var part, type, classList;

    if (classId!=null) {
        classId.forEach(function(v, idx) {
            part = v;
            type = part.charAt(0);
            if (type === '.') {
                classList = classList || [];
                classList.push(part.substring(1));
            } else if (type === '#') {
                vnode['id'] = part.substring(1);
            }
        });

        vnode['classList'] = classList;
    }

    vnode.children=children
    return vnode;
}

module.exports = createElement;

},{}],6:[function(require,module,exports){
function diff(a, b) {

    var diff;

    for (key in b) {
        if (!(key in a)) {
            diff = diff || {};
            diff[key] = b[key];
     	}
    }

    return diff;
}


module.exports = diff;

},{}],7:[function(require,module,exports){
var vnode=require('./createElement');

function renderNode(vnode){
	var el=document.createElement(vnode.tagName);
	for (key in vnode.propertyList){
		var part=vnode.propertyList[key];
		if(typeof part=="string")el.setAttribute(key,part);
		else if(typeof part =="object"){
			var partStr=JSON.stringify(part);
			partStr=partStr.substring(1,partStr.length-1).replace(/"/g,"").replace(/,(?=[\w-])/g,";");			       el.setAttribute(key,partStr);
		}
	}
	el.innerText=vnode.text;
	return el;

}

function render(vnode,container) {
	
    var node = renderNode(vnode);

    var children =vnode.children;
    if (children && children.length > 0) {
        for (var i = 0; i < children.length; i++) {
            var child = children[i]
            node.appendChild(render(child));
        }
    }
    return node;

}

function fix(str){
	return str.match(/[\w:,]+/)[0];	
}

module.exports = render;


},{"./createElement":5}],8:[function(require,module,exports){
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
	PANNEL_BTN_BLOCK_ATTRIBUTE:{
	   tag:'div',
	   style:{
	   	"display":"-webkit-box",
		"height":"5%"
	   }
	},
	PANNEL_BTN_ATTRIBUTE:{
	   tag:'button',
	   style:{
	   	"display": "block",
		"-webkit-box-flex": "1",
		"height": "100%"
	   }
	},
	PANNEL_INPUT_ATTRIBUTE:{
	   tag:'input',
	   style:{
	   	"display": "block",
		"-webkit-box-flex": "3",
		"height": "100%",
		"border":"0"
	   }
	}

}

module.exports=ELEMENTS;

},{}],9:[function(require,module,exports){
var utils=require('./dom');
var event =require('../lib/event');

function bindEvent(mp){
/*
   mp.MP_ELEMENT.addEventListener('click', function(e) {
        e.preventDefault();
	getComputedStyle(mp.PANNEL_ELEMENT).display=="none"?utils.css.call(mp.PANNEL_ELEMENT,'display','block'):utils.css.call(mp.PANNEL_ELEMENT,'display','none');
    }, false);

   mp.PANNEL_BTN_EVENT_ELEMENTS_LIST[0].addEventListener('click', function(e) {
   	event.emit('btn1');
   },false);
*/
}

module.exports=bindEvent;

},{"../lib/event":2,"./dom":11}],10:[function(require,module,exports){
var ELEMENTS = require('./attributesConfig'),
    elementFactory = require('./elementFactory');

var KVD = require('kvd');

var Extend = require('../lib/extend');

function createDom(mp) {
    //createElements(mp);
    //domRender(mp);
    var vnode=KVD.createElement(ELEMENTS.PANNEL_ATTRIBUTE,[
		  KVD.createElement(ELEMENTS.PANNEL_TEXTAREA_ATTRIBUTE),  
		  KVD.createElement(ELEMENTS.PANNEL_BTN_BLOCK_ATTRIBUTE,[
			  	KVD.createElement(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE,{tag: 'button BTN1'})),
			  	KVD.createElement(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE,{tag: 'button BTN2'})),
			  	KVD.createElement(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE,{tag: 'button BTN3'}))					  ]), 
		  KVD.createElement(ELEMENTS.PANNEL_BTN_BLOCK_ATTRIBUTE,[
			  	KVD.createElement(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE,{tag: 'button BTN4'})),
			  	KVD.createElement(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE,{tag: 'button BTN5'})),
			  	KVD.createElement(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE,{tag: 'button BTN6'}))	
			  ]), 
		  KVD.createElement(ELEMENTS.PANNEL_BTN_BLOCK_ATTRIBUTE,[
			  	KVD.createElement(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE,{tag: 'button 返回'})),
				KVD.createElement(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE,{tag: 'button 前进'})),
				KVD.createElement(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE,{tag: 'button 刷新'}))

			  ]), 

		  KVD.createElement(ELEMENTS.PANNEL_BTN_BLOCK_ATTRIBUTE) 		    
	]);
    mp.node=vnode;
    var body = document.getElementsByTagName('body')[0];
	body.appendChild(KVD.render(vnode));
    return mp;
}

//Create Element
function createElements(mp) {
    mp.MP_ELEMENT = elementFactory(ELEMENTS.MP_ATTRIBUTE);
    mp.PANNEL_ELEMENT = elementFactory(ELEMENTS.PANNEL_ATTRIBUTE);
    mp.PANNEL_TEXTAREA_ELEMENT = elementFactory(ELEMENTS.PANNEL_TEXTAREA_ATTRIBUTE);
    mp.PANNEL_BTN_EVENT_BLOCK_ELEMENT = elementFactory(ELEMENTS.PANNEL_BTN_BLOCK_ATTRIBUTE);
    mp.PANNEL_BTN_FUNC1_BLOCK_ELEMENT = elementFactory(ELEMENTS.PANNEL_BTN_BLOCK_ATTRIBUTE);
    mp.PANNEL_BTN_FUNC2_BLOCK_ELEMENT = elementFactory(ELEMENTS.PANNEL_BTN_BLOCK_ATTRIBUTE);
    mp.PANNEL_HREF_BLOCK_ELEMENT = elementFactory(ELEMENTS.PANNEL_BTN_BLOCK_ATTRIBUTE);

    // mp.PANNEL_BUTTON_ELEMENT = elementFactory(ELEMENTS.PANNEL_BUTTON_ATTRIBUTE);
    mp.PANNEL_BTN_EVENT_ELEMENTS_LIST = [];
    [{
        text: 'BTN1'
    }, {
        text: 'BTN2'
    }, {
        text: 'BTN3'
    }].forEach(function(v, idx) {
        mp.PANNEL_BTN_EVENT_ELEMENTS_LIST[idx] = elementFactory(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE, v));
    });
    mp.PANNEL_BTN_FUNC1_ELEMENTS_LIST = [];

    [{
        text: 'BTN4'
    }, {
        text: 'BTN5'
    }, {
        text: 'BTN6'
    }].forEach(function(v, idx) {
        mp.PANNEL_BTN_FUNC1_ELEMENTS_LIST[idx] = elementFactory(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE, v));
    });
    mp.PANNEL_BTN_FUNC2_ELEMENTS_LIST = [];

    [{
        text: '返回'
    }, {
        text: '前进'
    }, {
        text: '刷新'
    }].forEach(function(v, idx) {
        mp.PANNEL_BTN_FUNC2_ELEMENTS_LIST[idx] = elementFactory(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE, v));
    });

    mp.PANNEL_HREF_INPUT_ELEMENT = elementFactory(ELEMENTS.PANNEL_INPUT_ATTRIBUTE);
    mp.PANNEL_HREF_BTN_ELEMENT = elementFactory(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE, {
        text: '跳转'
    }));
    return mp;
}



//Dom render
function domRender(mp) {
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(mp.MP_ELEMENT);
    body.appendChild(mp.PANNEL_ELEMENT);
    mp.PANNEL_ELEMENT.appendChild(mp.PANNEL_TEXTAREA_ELEMENT);
    mp.PANNEL_ELEMENT.appendChild(mp.PANNEL_BTN_EVENT_BLOCK_ELEMENT);
    mp.PANNEL_ELEMENT.appendChild(mp.PANNEL_BTN_FUNC1_BLOCK_ELEMENT);
    mp.PANNEL_ELEMENT.appendChild(mp.PANNEL_BTN_FUNC2_BLOCK_ELEMENT);

    //mp.PANNEL_BUTTONSDIV_ELEMENT.appendChild(mp.PANNEL_BUTTON_ELEMENT);
    mp.PANNEL_BTN_EVENT_ELEMENTS_LIST.forEach(function(v, idx) {
        mp.PANNEL_BTN_EVENT_BLOCK_ELEMENT.appendChild(v);
    });
    mp.PANNEL_BTN_FUNC1_ELEMENTS_LIST.forEach(function(v, idx) {
        mp.PANNEL_BTN_FUNC1_BLOCK_ELEMENT.appendChild(v);
    });
    mp.PANNEL_BTN_FUNC2_ELEMENTS_LIST.forEach(function(v, idx) {
        mp.PANNEL_BTN_FUNC2_BLOCK_ELEMENT.appendChild(v);
    });

    mp.PANNEL_ELEMENT.appendChild(mp.PANNEL_HREF_BLOCK_ELEMENT);
    mp.PANNEL_HREF_BLOCK_ELEMENT.appendChild(mp.PANNEL_HREF_INPUT_ELEMENT);
    mp.PANNEL_HREF_BLOCK_ELEMENT.appendChild(mp.PANNEL_HREF_BTN_ELEMENT);

    return mp;
}

module.exports = createDom;

},{"../lib/extend":3,"./attributesConfig":8,"./elementFactory":12,"kvd":4}],11:[function(require,module,exports){
function css(elem, value) {
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

module.exports={css:css}

},{}],12:[function(require,module,exports){
var utils=require('./dom');

function elementFactory(option) {
    //Create Tag
    var el = document.createElement(option.tag),

        //Set Style Attribute
        _style = '';
    Object.keys(option.style).forEach(function(v, idx) {
        //_style = _style + v + ':' + option.style[v].toString() + ';';
        utils.css.call(el, v, option.style[v].toString());

    });

    //Set innerHTML
    option.text ? el.innerHTML = option.text : el.innerHTML = '';
    return el;
}


module.exports = elementFactory;

},{"./dom":11}],13:[function(require,module,exports){
Extend = require('../lib/extend');
createDom = require('./createDom');
bindEvent = require('./bindEvent');
Event = require('../lib/event');

function mp() {
    var self = this;
    this.TEXTAREA_TEXT = "";
    createDom(this);
    bindEvent(this);
    this.PANNEL_HREF_INPUT_ELEMENT.value=location.href;
}

mp.prototype.value = function(key, value) {
    var text = 'watch:';
    text += key;
    text += '=';
    text += JSON.stringify(value);
    text += '\n';
    this.TEXTAREA_TEXT += text;
    this.PANNEL_TEXTAREA_ELEMENT.textContent = this.TEXTAREA_TEXT;
}

mp.prototype.log = function(text) {
    this.TEXTAREA_TEXT += text;
    this.PANNEL_TEXTAREA_ELEMENT.textContent = this.TEXTAREA_TEXT;
}

mp.prototype.on =function(type,fn){
	
	Event.on(type,fn);
}


module.exports = mp;

},{"../lib/event":2,"../lib/extend":3,"./bindEvent":9,"./createDom":10}]},{},[1]);
