"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./nativeSimulator");
var src_1 = __importDefault(require("../src"));
src_1.default
    .dispatch("base/openURL", { url: "www.goggle.com" })
    .then(console.log)
    .catch(console.error);
src_1.default
    .dispatch("base/openURL", { url: "www.twitter.com" })
    .then(console.log)
    .catch(console.error);
var unsubscribe1 = src_1.default.listen("base/themeChange", console.log);
var unsubscribe2 = src_1.default.listen("base/themeChange", console.log);
unsubscribe2();
//# sourceMappingURL=index.js.map