function elementFactory(option) {
    var el = document.createElement(option.tag),
        _style = '';
    Object.keys(option.style).forEach(function(v, idx) {
        _style = _style + v + ':' + option.style[v].toString() + ';';
    });
    el.setAttribute("style", _style);
    return el;
}

module.exports=elementFactory;
