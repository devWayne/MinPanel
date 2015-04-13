/*var MP_ELEMENT='<div style="border-radius: 5px;padding: 5px;background-color: #000;right: 5%;position: fixed;top: 5%;opacity: 0.2;color: #fff;">MP</div>';


function mpCreate() {
    var el = document.createElement('div');
    el.setAttribute("style", "border-radius: 5px;padding: 5px;background-color: #000;right: 5%;position: fixed;top: 5%;opacity: 0.2;color: #fff;");
    el.innerHTML = "MP";
    return el;
}

function pannelCreate() {
    var el = document.createElement('textarea');
    el.setAttribute("style", "border-radius: 5px;padding: 5px;background-color: #000;width: 80%;height: 80%;position: fixed;top: 5%;opacity: 0.2;color: #fff;");
    return el;
}
*/
var MP_ATTRIBUTE= {
    tag: 'div',
    style: {
        "border-radius": "5px",
        "padding": "5px",
        "background-color": "#000",
        "right": "5%",
        "position": "fixed",
        "top": "5%",
        "opacity": "0.2",
        "color": "#fff"
    }
},
   PANNEL_ATTRIBUTE = {
    tag: 'textarea',
    style: {
        "border-radius": "5px",
        "padding": "5px",
        "background-color": "#000",
        "width": "80%",
        "height": "80%",
        "position": "fixed",
        "top": "5%",
        "opacity": "0.2",
        "color": "#fff"
    }
}

function elementFactory(option) {
    var el = document.createElement(option.tag),
        _style = '';
    Object.keys(option.style).forEach(function(v, idx) {
        _style = _style + v + ':' + option.style[v].toString() + ';';
    });
    el.setAttribute("style", _style);
    return el;
}

function mp() {
    var body = document.getElementsByTagName('body')[0],
        MP_ELEMENT = elementFactory(MP_ATTRIBUTE),
        PANNEL_ELEMENT = elementFactory(PANNEL_ATTRIBUTE);
    body.appendChild(MP_ELEMENT);
    body.appendChild(PANNEL_ELEMENT);
    MP_ELEMENT.addEventListener('click', function(e) {
        e.preventDefault();
        //PANNEL_ELEMENT
        alert(1);
    }, false);


}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mp;
} else {
    window.vm = mp;
}
