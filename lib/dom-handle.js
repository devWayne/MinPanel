function css(elem, value) {
    if (arguments.length < 2) {
        var result = this.getComputedStyle(elem, '');
        return result;
    } else {
        if (elem && typeof(value) == 'string') {
            var css = elem + ":" + value;
            return this.style.cssText += css + ';'
        }
    }
}

module.exports={css:css}
