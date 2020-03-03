"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Adaper_1 = __importDefault(require("./core/Adaper"));
var Bridge_1 = __importDefault(require("./core/Bridge"));
var EventEmit_1 = __importDefault(require("./core/EventEmit"));
var eventEmit = new EventEmit_1.default();
var adaper = new Adaper_1.default(eventEmit);
var bridge = new Bridge_1.default(adaper);
var dispatch = function (action, args) {
    return bridge.dispatch(action, args);
};
var listen = function (action, args) {
    return bridge.listen(action, args);
};
var hybrid = {
    dispatch: dispatch,
    listen: listen
};
exports.default = hybrid;
//# sourceMappingURL=index.js.map