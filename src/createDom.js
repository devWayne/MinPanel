var ELEMENTS = require('./attributesConfig'),
    elementFactory = require('./elementFactory');

var Extend = require('../lib/extend');

function createDom(mp) {
    createElements(mp);
    domRender(mp);
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
