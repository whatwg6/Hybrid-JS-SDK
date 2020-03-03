"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NativeInterface = (function () {
    function NativeInterface(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    NativeInterface.prototype.dispatch = function (event, params) {
        this.eventEmitter.emit(event, params);
    };
    NativeInterface.prototype.callBack = function (id, params) {
        var _a;
        this.eventEmitter.emit(id, (_a = {},
            _a[id] = {
                payload: {
                    params: params
                }
            },
            _a));
    };
    return NativeInterface;
}());
exports.default = NativeInterface;
