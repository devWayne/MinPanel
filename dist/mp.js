(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mp=require('./src/minPanel');

module.exports = mp;
window.mp=mp;

},{"./src/minPanel":12}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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


},{}],4:[function(require,module,exports){
module.exports = function (source, add) {
    for (var o in add) {
        if (add.hasOwnProperty(o)) {
            source[o] = add[o];
        }
    }
    return source;
};

},{}],5:[function(require,module,exports){
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

},{"./lib/createElement":6,"./lib/diff":7,"./lib/render":8}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
	if(vnode.text)el.innerText=vnode.text;
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


},{"./createElement":6}],9:[function(require,module,exports){
var ELEMENTS = {
	MP_ATTRIBUTE :{
            tag: 'div MP',
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

},{}],10:[function(require,module,exports){
var event = require('../lib/event');

var dom = require('../lib/dom-handle');

function bindEvent(mp) {


    //open or close the pannel
    mp.min.addEventListener('click', function(e) {
        getComputedStyle(mp.node).display == 'block' ? dom.css.call(mp.node, 'display', 'none') : dom.css.call(mp.node, 'display', 'block');
    });

    function customBtnCheck(btnType) {
        return /btn\d/.test(btnType);
    }

    for (key in mp.el.btn) {
        (function(btnType) {
            if(customBtnCheck(btnType))dom.css.call(mp.el.btn[btnType], 'color', '#ccc');
            mp.el.btn[btnType].addEventListener('click', function(e) {
		    if(customBtnCheck(btnType))event.emit(btnType);
		    else if(btnType=='btn_back')history.go(-1);
		    else if(btnType=='btn_forward')history.go(1);
		    else if(btnType=='btn_refresh')location.reload();
            }, false)

        })(key)
    }
}

module.exports = bindEvent;

},{"../lib/dom-handle":2,"../lib/event":3}],11:[function(require,module,exports){
var ELEMENTS = require('./attributesConfig');

var KVD = require('kvd');

var Extend = require('../lib/extend');

function createDom(mp) {
     mp.el={};
    var min_vnode=KVD.createElement(ELEMENTS.MP_ATTRIBUTE);
    var pannel_vnode=KVD.createElement(ELEMENTS.PANNEL_ATTRIBUTE,[
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
		  KVD.createElement(ELEMENTS.PANNEL_BTN_BLOCK_ATTRIBUTE,[
			  	KVD.createElement(Extend(ELEMENTS.PANNEL_INPUT_ATTRIBUTE,{tag: 'input'})),
				KVD.createElement(Extend(ELEMENTS.PANNEL_BTN_ATTRIBUTE,{tag: 'button 跳转'}))
			  ]), 


		  KVD.createElement(ELEMENTS.PANNEL_BTN_BLOCK_ATTRIBUTE) 		    
	]);
    var body = document.getElementsByTagName('body')[0];

    //node tree  
    mp.min=KVD.render(min_vnode);
    mp.node=KVD.render(pannel_vnode);

    //render
    body.appendChild(mp.min);
    body.appendChild(mp.node);
    
    //fast way
    mp.el.btn={
    	btn1:mp.node.children[1].children[0],
	btn2:mp.node.children[1].children[1],
	btn3:mp.node.children[1].children[2],
	btn4:mp.node.children[2].children[0],
	btn5:mp.node.children[2].children[1],
	btn6:mp.node.children[2].children[2],
	btn_back:mp.node.children[3].children[0],
	btn_forward:mp.node.children[3].children[1],
	btn_refresh:mp.node.children[3].children[2]
    }

    mp.el.textarea=mp.node.children[0];
    mp.el.href={
	    input:mp.node.children[4].children[0],
	    btn:mp.node.children[4].children[1]

    }
    return mp;
}

module.exports = createDom;

},{"../lib/extend":4,"./attributesConfig":9,"kvd":5}],12:[function(require,module,exports){
Extend = require('../lib/extend');
createDom = require('./createDom');
bindEvent = require('./bindEvent');
Event = require('../lib/event');

dom=require('../lib/dom-handle');

function mp() {
    var self = this;
    this.txtlog = "";
    createDom(this);
    bindEvent(this);
    this.el.href.input.value=location.href;
}

mp.prototype.value = function(key, value) {
    var text = 'watch:';
    text += key;
    text += '=';
    text += JSON.stringify(value);
    text += '\n';
    this.txtlog+= text;
    this.el.textarea.textContent = this.txtlog;
}

mp.prototype.log = function(text) {
    this.txtlog += text;
    this.el.textarea.textContent = this.txtlog;
}

mp.prototype.on =function(type,fn){
	dom.css.call( this.el.btn[type],'color','#000');
	Event.on(type,fn);
}


module.exports = mp;

},{"../lib/dom-handle":2,"../lib/event":3,"../lib/extend":4,"./bindEvent":10,"./createDom":11}]},{},[1]);
