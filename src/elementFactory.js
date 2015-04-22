var utils=require('./dom');

function elementFactory(option) {
    //Create Tag
    var el = document.createElement(option.tag),

        //Set Style Attribute
        _style = '';
    Object.keys(option.style).forEach(function(v, idx) {
        //_style = _style + v + ':' + option.style[v].toString() + ';';
        utils.css.call(el, v, option.style[v].toString());

    });

    //Set innerHTML
    option.text ? el.innerHTML = option.text : el.innerHTML = '';
    return el;
}


module.exports = elementFactory;
