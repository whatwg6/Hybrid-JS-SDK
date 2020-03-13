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
        __classPrivateFieldGet(this, _listener).set(event, [
            ...(_a = __classPrivateFieldGet(this, _listener).get(event)) !== null && _a !== void 0 ? _a : [],
            handler
        ]);
    }
    emit(event, params) {
        var _a;
        (_a = __classPrivateFieldGet(this, _listener).get(event)) === null || _a === void 0 ? void 0 : _a.forEach(f => f(params));
    }
    remove(event, handler) {
        var _a, _b, _c;
        if (__classPrivateFieldGet(this, _listener).has(event)) {
            __classPrivateFieldGet(this, _listener).set(event, (_b = (_a = __classPrivateFieldGet(this, _listener).get(event)) === null || _a === void 0 ? void 0 : _a.filter(f => f !== handler)) !== null && _b !== void 0 ? _b : []);
        }
        if (!((_c = __classPrivateFieldGet(this, _listener).get(event)) === null || _c === void 0 ? void 0 : _c.length)) {
            __classPrivateFieldGet(this, _listener).delete(event);
        }
    }
}
_listener = new WeakMap();
exports.default = EventEmitter;
