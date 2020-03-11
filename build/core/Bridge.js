"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
class Bridge {
    constructor(adapter) {
        this.adapter = adapter;
        this.adapter.connect();
    }
    dispatch(event, params) {
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
                const { payload: { status, params } } = message;
                if (status === "Failure") {
                    throw params;
                }
                else {
                    resolve(params);
                }
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    listen(event, handler) {
        const wrapHandler = (params) => handler(params);
        this.adapter.eventEmitter.on(event, wrapHandler);
        return () => this.unListen(event, wrapHandler);
    }
    unListen(event, handler) {
        this.adapter.eventEmitter.remove(event, handler);
    }
}
exports.default = Bridge;
