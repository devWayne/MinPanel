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
