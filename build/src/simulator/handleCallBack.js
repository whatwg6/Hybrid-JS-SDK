"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleCallBack() {
    setTimeout(function () {
        return global.webApp.dispatch("base/networkChange", {
            currentNetwork: "4G"
        });
    });
    setTimeout(function () {
        return global.webApp.dispatch("base/networkChange", {
            currentNetwork: "3G"
        });
    }, 2 * 1000);
}
exports.default = handleCallBack;
