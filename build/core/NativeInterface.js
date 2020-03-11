"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NativeInterface {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    dispatch(event, params) {
        this.eventEmitter.emit(event, params);
    }
    callBack(callbackMessage) {
        const { id } = callbackMessage;
        this.eventEmitter.emit(id, callbackMessage);
    }
}
exports.default = NativeInterface;
