ELEMENTS = require('./attributesConfig');
elementFactory = require('./elementFactory');

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
    mp.PANNEL_BUTTONSDIV_ELEMENT = elementFactory(ELEMENTS.PANNEL_BUTTONSDIV_ATTRIBUTE);
    mp.PANNEL_BUTTON_ELEMENT = elementFactory(ELEMENTS.PANNEL_BUTTON_ATTRIBUTE);
    return mp;
}



//Dom render
function domRender(mp) {
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(mp.MP_ELEMENT);
    body.appendChild(mp.PANNEL_ELEMENT);
    mp.PANNEL_ELEMENT.appendChild(mp.PANNEL_TEXTAREA_ELEMENT);
    mp.PANNEL_ELEMENT.appendChild(mp.PANNEL_BUTTONSDIV_ELEMENT);
    mp.PANNEL_BUTTONSDIV_ELEMENT.appendChild(mp.PANNEL_BUTTON_ELEMENT);
    return mp;
}

module.exports = createDom;
