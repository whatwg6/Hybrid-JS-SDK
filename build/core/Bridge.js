"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
class Bridge {
    constructor(adapter) {
        this.adapter = adapter;
        this.adapter.connect();
    }
    dispatch(event, params = void 0) {
        const id = util_1.generateId();
        const [module, action] = event.split("/");
        this.adapter.postMessage({
            id,
            payload: {
                action,
                module,
                params
            }
        });
        return this.onDispatch(id);
    }
    onDispatch(id) {
        return new Promise((resolve, reject) => this.adapter.eventEmitter.on(id, (message) => {
            try {
                const { payload, payload: { status } } = message;
                if (status === "Failure") {
                    throw payload;
                }
                else {
                    resolve(payload);
                }
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    listen(event, handler) {
        const wrapHandler = (args) => handler(args);
        this.adapter.eventEmitter.on(event, wrapHandler);
        return () => this.unListen(event, wrapHandler);
    }
    unListen(event, handler) {
        this.adapter.eventEmitter.remove(event, handler);
    }
}
exports.default = Bridge;
