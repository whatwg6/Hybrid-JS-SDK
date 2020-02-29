"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NativeInterface = /** @class */ (function () {
    function NativeInterface(_a) {
        var eventEmitter = _a.eventEmitter;
        this.eventEmitter = eventEmitter;
    }
    NativeInterface.prototype.dispatch = function (event, params) {
        this.eventEmitter.emit(event, params);
    };
    NativeInterface.prototype.callBack = function (id, params) {
        var _a;
        this.eventEmitter.emit("____messagesEvent", (_a = {},
            _a[id] = {
                payload: {
                    params: params
                }
            },
            _a));
        // return Promise.resolve();
    };
    return NativeInterface;
}());
exports.default = NativeInterface;
