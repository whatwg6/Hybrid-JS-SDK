"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var v4_1 = __importDefault(require("uuid/v4"));
function generateId() {
    return v4_1.default();
}
exports.generateId = generateId;
function isFunction(target) {
    return typeof target === "function";
}
exports.isFunction = isFunction;
//# sourceMappingURL=index.js.map