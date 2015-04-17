var Event = {
    on: function (name, lister) {
        if (!name) {
            return;
        }
        if (!this._events_) {
            this._events_ = {};
        }
        var events = this._events_;
        if (!events[name]) {
            events[name] = [];
        }
        events[name].push(lister);

    },
    emit: function (name) {
        var events = this._events_;
        if (!name || !events || !events[name]) {
            return;
        }
        var queue = events[name];
        var length = queue.length;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < length; i++) {
            queue[i].apply(this, args);
        }

    }

};

module.exports = Event;

