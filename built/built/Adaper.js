"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmit_1 = require("./EventEmit");
var NativeInterface_1 = require("./NativeInterface");
var Adapter = /** @class */ (function () {
    function Adapter() {
        this.eventEmitter = new EventEmit_1.default();
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
            global.webkit.messageHandlers.nativeApp) {
            global.webkit.messageHandlers.nativeApp.postMessage(hybridMessage);
        }
        else if (global.nativeApp && global.nativeApp.sendToNative) {
            global.nativeApp.sendToNative(JSON.stringify(hybridMessage));
        }
    };
    Adapter.prototype.connect = function () {
        var eventEmitter = this.eventEmitter;
        global.webApp = new NativeInterface_1.default({
            eventEmitter: eventEmitter
        });
    };
    return Adapter;
}());
exports.default = Adapter;
