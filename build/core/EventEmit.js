"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _listener;
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmit {
    constructor() {
        _listener.set(this, {});
    }
    on(event, handler) {
        __classPrivateFieldGet(this, _listener)[event] = __classPrivateFieldGet(this, _listener)[event] || [];
        __classPrivateFieldGet(this, _listener)[event].push(handler);
    }
    emit(event, params) {
        if (__classPrivateFieldGet(this, _listener)[event]) {
            __classPrivateFieldGet(this, _listener)[event].forEach(f => f(params));
        }
    }
    remove(event, handler) {
        if (__classPrivateFieldGet(this, _listener)[event]) {
            __classPrivateFieldGet(this, _listener)[event] = __classPrivateFieldGet(this, _listener)[event].filter(f => f !== handler);
        }
    }
}
_listener = new WeakMap();
exports.default = EventEmit;
