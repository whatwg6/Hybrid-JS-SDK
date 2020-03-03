"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NativeInterface_1 = __importDefault(require("./NativeInterface"));
var util_1 = require("../util");
var Adapter = (function () {
    function Adapter(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    Adapter.prototype.postMessage = function (_a) {
        var id = _a.id, _b = _a.payload, action = _b.action, module = _b.module, params = _b.params;
        var hybridMessage = {
            id: id,
            module: module,
            action: action,
            params: params
        };
        if (global.webkit &&
            global.webkit.messageHandlers &&
            global.webkit.messageHandlers.nativeApp &&
            util_1.isFunction(global.webkit.messageHandlers.nativeApp.postMessage)) {
            global.webkit.messageHandlers.nativeApp.postMessage(hybridMessage);
        }
        else if (global.nativeApp &&
            util_1.isFunction(global.nativeApp.sendToNative)) {
            global.nativeApp.sendToNative(JSON.stringify(hybridMessage));
        }
    };
    Adapter.prototype.connect = function () {
        global.webApp = new NativeInterface_1.default(this.eventEmitter);
    };
    Adapter.prototype.disconnect = function () {
    };
    return Adapter;
}());
exports.default = Adapter;
