"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Adaper_1 = require("./Adaper");
var Bridge_1 = require("./Bridge");
var adaper = new Adaper_1.default();
var bridge = new Bridge_1.default(adaper);
var dispatch = function (action, args) { return bridge.dispatch(action, args); };
var listen = function (action, args) { return bridge.listen(action, args); };
var hybrid = {
    dispatch: dispatch,
    listen: listen
};
exports.default = hybrid;
