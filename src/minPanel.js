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
