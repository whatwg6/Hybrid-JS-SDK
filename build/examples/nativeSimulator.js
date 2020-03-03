"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var enum_1 = require("./enum");
global.webkit = global.webkit || {};
global.webkit.messageHandlers = global.webkit.messageHandlers || {};
global.webkit.messageHandlers.nativeApp =
    global.webkit.messageHandlers.nativeApp || {};
global.webkit.messageHandlers.nativeApp.postMessage = function (_a) {
    var id = _a.id, module = _a.module, action = _a.action, params = _a.params;
    if (module === enum_1.HybridEvent.BaseModule &&
        action === enum_1.HybridEvent.Action) {
        setTimeout(function () {
            return global.webApp.callBack(id, __assign({ status: "base/openURL success", module: module,
                action: action }, params));
        });
    }
};
setTimeout(function () {
    return global.webApp.dispatch("base/themeChange", { theme: "light" });
});
//# sourceMappingURL=nativeSimulator.js.map