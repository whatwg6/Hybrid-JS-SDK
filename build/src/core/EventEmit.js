"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmit = (function () {
    function EventEmit() {
        this.listener = {};
    }
    EventEmit.prototype.on = function (event, handler) {
        this.listener[event] = this.listener[event] || [];
        this.listener[event].push(handler);
    };
    EventEmit.prototype.emit = function (event, params) {
        if (this.listener[event]) {
            this.listener[event].forEach(function (f) { return f(params); });
        }
    };
    EventEmit.prototype.remove = function (event, handler) {
        if (this.listener[event]) {
            this.listener[event] = this.listener[event].filter(function (f) { return f !== handler; });
        }
    };
    return EventEmit;
}());
exports.default = EventEmit;
