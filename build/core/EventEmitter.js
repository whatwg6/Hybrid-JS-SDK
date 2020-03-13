"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _listener;
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitter {
    constructor() {
        _listener.set(this, new Map());
    }
    on(event, handler) {
        var _a;
        if (!__classPrivateFieldGet(this, _listener).has(event)) {
            __classPrivateFieldGet(this, _listener).set(event, new Set());
        }
        (_a = __classPrivateFieldGet(this, _listener).get(event)) === null || _a === void 0 ? void 0 : _a.add(handler);
    }
    emit(event, params) {
        var _a;
        (_a = __classPrivateFieldGet(this, _listener).get(event)) === null || _a === void 0 ? void 0 : _a.forEach(f => f(params));
    }
    remove(event, handler) {
        var _a, _b;
        if (__classPrivateFieldGet(this, _listener).has(event)) {
            (_a = __classPrivateFieldGet(this, _listener).get(event)) === null || _a === void 0 ? void 0 : _a.delete(handler);
        }
        if (!((_b = __classPrivateFieldGet(this, _listener).get(event)) === null || _b === void 0 ? void 0 : _b.size)) {
            __classPrivateFieldGet(this, _listener).delete(event);
        }
    }
}
_listener = new WeakMap();
exports.default = EventEmitter;
