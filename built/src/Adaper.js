var EventEmitter = require("./EventEmit");
var NativeInterface = require("./NativeInterface");
var Adapter = /** @class */ (function () {
    function Adapter() {
        this.eventEmitter = new EventEmitter();
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
        global.webApp = new NativeInterface({
            eventEmitter: eventEmitter
        });
    };
    return Adapter;
}());
module.exports = Adapter;
