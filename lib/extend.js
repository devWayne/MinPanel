module.exports = function (source, add) {
    for (var o in add) {
        if (add.hasOwnProperty(o)) {
            source[o] = add[o];
        }
    }
    return source;
};
