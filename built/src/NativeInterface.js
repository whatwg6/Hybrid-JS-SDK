var NativeInterface = /** @class */ (function () {
    function NativeInterface(_a) {
        var eventEmitter = _a.eventEmitter;
        this.eventEmitter = eventEmitter;
    }
    NativeInterface.prototype.dispatch = function (event, params) {
        this.eventEmitter.emit(event, params);
        // return new Promise((resolve, reject) => {
        //   const id = uuid();
        //   const eventListeners = this.listeners[event];
        //   if (eventListeners && eventListeners.length) {
        //     eventListeners.forEach(listener => {
        //       listener(params);
        //       resolve();
        //     });
        //   } else {
        //     reject({
        //       id,
        //       status: `web unregister ${event}`
        //     });
        //   }
        // });
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
module.exports = NativeInterface;
