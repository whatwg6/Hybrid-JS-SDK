"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NativeInterface = (function () {
    function NativeInterface(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    NativeInterface.prototype.dispatch = function (event, params) {
        if (params === void 0) { params = void 0; }
        this.eventEmitter.emit(event, params);
    };
    NativeInterface.prototype.callBack = function (callbackMessage) {
        var id = callbackMessage.id;
        this.eventEmitter.emit(id, callbackMessage);
    };
    return NativeInterface;
}());
exports.default = NativeInterface;
