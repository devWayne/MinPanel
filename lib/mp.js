ELEMENTS = require('./elementsConfig');
elementFactory = require('./elementFactory');

function mp() {
    var body = document.getElementsByTagName('body')[0],
        MP_ELEMENT = elementFactory(ELEMENTS.MP_ATTRIBUTE),
        PANNEL_ELEMENT = elementFactory(ELEMENTS.PANNEL_ATTRIBUTE);
    body.appendChild(MP_ELEMENT);
    body.appendChild(PANNEL_ELEMENT);
    MP_ELEMENT.addEventListener('click', function(e) {
        e.preventDefault();
        //PANNEL_ELEMENT
        alert(1);
    }, false);
}


module.exports = mp;
