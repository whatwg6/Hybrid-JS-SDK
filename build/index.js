"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Adaper_1 = __importDefault(require("./core/Adaper"));
const Bridge_1 = __importDefault(require("./core/Bridge"));
const EventEmit_1 = __importDefault(require("./core/EventEmit"));
const simulator_1 = __importDefault(require("./simulator"));
exports.simulator = simulator_1.default;
const eventEmit = new EventEmit_1.default();
const adaper = new Adaper_1.default(eventEmit);
const bridge = new Bridge_1.default(adaper);
const dispatch = (action, args) => bridge.dispatch(action, args);
const listen = (action, args) => bridge.listen(action, args);
const hybrid = {
    dispatch,
    listen
};
exports.default = hybrid;
