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
