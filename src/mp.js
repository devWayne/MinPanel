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
