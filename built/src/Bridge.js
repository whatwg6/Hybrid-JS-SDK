var uuid = require("uuid/v4");
var Bridge = /** @class */ (function () {
    function Bridge(adapter) {
        this.adapter = adapter;
        this.adapter.connect();
    }
    Bridge.prototype.dispatch = function (event, params) {
        var _this = this;
        var id = uuid();
        var _a = event.split("/"), module = _a[0], action = _a[1];
        this.adapter.postMessage({
            id: id,
            payload: {
                action: action,
                module: module,
                params: params
            }
        });
        return new Promise(function (resolve, reject) {
            return _this.adapter.eventEmitter.on("____messagesEvent", function (messages) {
                var message = messages[id];
                if (message) {
                    resolve(message.payload.params);
                }
                reject({ messages: messages, id: id });
            });
        });
    };
    Bridge.prototype.listen = function (event, handler) {
        var _this = this;
        var wrapHandler = function (args) { return handler(args); };
        this.adapter.eventEmitter.on(event, wrapHandler);
        return function () { return _this.adapter.eventEmitter.remove(event, wrapHandler); };
    };
    return Bridge;
}());
module.exports = Bridge;
