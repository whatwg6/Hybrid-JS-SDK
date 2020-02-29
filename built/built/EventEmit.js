"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmit = /** @class */ (function () {
    function EventEmit() {
        this.listener = {};
    }
    EventEmit.prototype.on = function (eventName, handler) {
        this.listener[eventName] = this.listener[eventName] || [];
        this.listener[eventName].push(handler);
    };
    EventEmit.prototype.emit = function (eventName, params) {
        this.listener[eventName] = this.listener[eventName] || [];
        this.listener[eventName].forEach(function (f) { return f(params); });
    };
    EventEmit.prototype.remove = function (eventName, handler) {
        var listeners = this.listener[eventName];
        if (listeners && listeners.length) {
            var findIndex = listeners.findIndex(function (f) { return f === handler; });
            listeners.splice(findIndex, 1);
        }
    };
    return EventEmit;
}());
exports.default = EventEmit;
