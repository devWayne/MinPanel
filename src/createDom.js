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

module.exports = createDom;
