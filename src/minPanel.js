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
