var event = require('../lib/event');

var dom = require('../lib/dom-handle');

function bindEvent(mp) {


    //open or close the pannel
    mp.min.addEventListener('click', function(e) {
        getComputedStyle(mp.node).display == 'block' ? dom.css.call(mp.node, 'display', 'none') : dom.css.call(mp.node, 'display', 'block');
    });

    function customBtnCheck(btnType) {
        return /btn\d/.test(btnType);
    }

    for (key in mp.el.btn) {
        (function(btnType) {
            if(customBtnCheck(btnType))dom.css.call(mp.el.btn[btnType], 'color', '#ccc');
            mp.el.btn[btnType].addEventListener('click', function(e) {
		    if(customBtnCheck(btnType))event.emit(btnType);
		    else if(btnType=='btn_back')history.go(-1);
		    else if(btnType=='btn_forward')history.go(1);
		    else if(btnType=='btn_refresh')location.reload();
            }, false)

        })(key)
    }
}

module.exports = bindEvent;
