var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Adaper = require("./Adaper");
var Bridge = require("./Bridge");
var adaper = new Adaper();
var bridge = new Bridge(adaper);
var dispatch = function (action) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return bridge.dispatch.apply(bridge, __spreadArrays([action], args));
};
var listen = function (action) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return bridge.listen.apply(bridge, __spreadArrays([action], args));
};
// inject native js
require("../examples/nativeSimulator");
var hybrid = {
    dispatch: dispatch,
    listen: listen
};
module.exports = hybrid;
