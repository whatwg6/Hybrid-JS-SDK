"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
var util_1 = require("../util");
var Bridge = (function () {
    function Bridge(adapter) {
        this.adapter = adapter;
        this.adapter.connect();
    }
    Bridge.prototype.dispatch = function (event, params) {
        var id = util_1.generateId();
        var _a = event.split("/"), module = _a[0], action = _a[1];
        this.adapter.postMessage({
            id: id,
            payload: {
                action: action,
                module: module,
                params: params
            }
        });
        return this.onDispatch(id);
    };
    Bridge.prototype.onDispatch = function (id) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            return _this.adapter.eventEmitter.on(id, function (messages) {
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
        return function () { return _this.unListen(event, wrapHandler); };
    };
    Bridge.prototype.unListen = function (event, handler) {
        this.adapter.eventEmitter.remove(event, handler);
    };
    return Bridge;
}());
exports.default = Bridge;
//# sourceMappingURL=Bridge.js.map