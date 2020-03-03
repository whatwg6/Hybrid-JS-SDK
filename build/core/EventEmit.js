"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmit = (function () {
    function EventEmit() {
        this.listener = {};
    }
    EventEmit.prototype.on = function (eventName, handler) {
        this.listener[eventName] = this.listener[eventName] || [];
        this.listener[eventName].push(handler);
    };
    EventEmit.prototype.emit = function (eventName, params) {
        if (this.listener[eventName]) {
            this.listener[eventName].forEach(function (f) { return f(params); });
        }
    };
    EventEmit.prototype.remove = function (eventName, handler) {
        if (this.listener[eventName]) {
            this.listener[eventName] = this.listener[eventName].filter(function (f) { return f !== handler; });
        }
    };
    return EventEmit;
}());
exports.default = EventEmit;
