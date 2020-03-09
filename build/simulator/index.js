"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleBaseAction_1 = __importDefault(require("./handleBaseAction"));
const handleAnswerAction_1 = __importDefault(require("./handleAnswerAction"));
const handleCallBack_1 = __importDefault(require("./handleCallBack"));
function simulator() {
    global.webkit = global.webkit || {};
    global.webkit.messageHandlers = global.webkit.messageHandlers || {};
    global.webkit.messageHandlers.nativeApp =
        global.webkit.messageHandlers.nativeApp || {};
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
