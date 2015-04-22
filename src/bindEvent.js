var utils=require('./dom');
var event =require('../lib/event');

function bindEvent(mp){

   mp.MP_ELEMENT.addEventListener('click', function(e) {
        e.preventDefault();
	getComputedStyle(mp.PANNEL_ELEMENT).display=="none"?utils.css.call(mp.PANNEL_ELEMENT,'display','block'):utils.css.call(mp.PANNEL_ELEMENT,'display','none');
    }, false);

   mp.PANNEL_BTN_EVENT_ELEMENTS_LIST[0].addEventListener('click', function(e) {
   	event.emit('btn1');
   },false);

}

module.exports=bindEvent;
