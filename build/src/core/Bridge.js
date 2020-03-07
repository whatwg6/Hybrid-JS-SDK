"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var Bridge = (function () {
    function Bridge(adapter) {
        this.adapter = adapter;
        this.adapter.connect();
    }
    Bridge.prototype.dispatch = function (event, params) {
        if (params === void 0) { params = void 0; }
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
        return new Promise(function (resolve, reject) {
            return _this.adapter.eventEmitter.on(id, function (message) {
                try {
                    var payload = message.payload, status_1 = message.payload.status;
                    if (status_1 === "Failure") {
                        throw payload;
                    }
                    else {
                        resolve(payload);
                    }
                }
                catch (e) {
                    reject(e);
                }
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
