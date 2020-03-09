"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleBaseAction_1 = __importDefault(require("./handleBaseAction"));
const handleAnswerAction_1 = __importDefault(require("./handleAnswerAction"));
const handleCallBack_1 = __importDefault(require("./handleCallBack"));
function simulator() {
    var _a, _b, _c;
    global.webkit = (_a = global.webkit) !== null && _a !== void 0 ? _a : {};
    global.webkit.messageHandlers = (_b = global.webkit.messageHandlers) !== null && _b !== void 0 ? _b : {};
    global.webkit.messageHandlers.nativeApp = (_c = global.webkit.messageHandlers.nativeApp) !== null && _c !== void 0 ? _c : {};
    global.webkit.messageHandlers.nativeApp.postMessage = function ({ id, payload: { module, action, params } }) {
        switch (module) {
            case "base": {
                handleBaseAction_1.default(id, action);
                break;
            }
            case "answer": {
                handleAnswerAction_1.default(id, action);
                break;
            }
        }
    };
    handleCallBack_1.default();
}
exports.default = simulator;
