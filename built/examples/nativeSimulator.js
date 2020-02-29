//simulate the client environment
global.webkit = global.webkit || {};
global.webkit.messageHandlers = global.webkit.messageHandlers || {};
global.webkit.messageHandlers.nativeApp =
    global.webkit.messageHandlers.nativeApp || {};
global.webkit.messageHandlers.nativeApp.postMessage = function (_a) {
    var id = _a.id, module = _a.module, action = _a.action, params = _a.params;
    if (module === "base" && action === "openURL") {
        setTimeout(function () {
            return webApp.callBack(id, {
                status: "base/openURL success",
                module: module,
                action: action
            });
        });
    }
};
setTimeout(function () {
    return webApp.dispatch("base/themeChange", { theme: "light" });
});
