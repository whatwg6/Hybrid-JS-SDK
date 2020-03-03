// simulate Native injcet js
global.webkit = global.webkit || {};
global.webkit.messageHandlers = global.webkit.messageHandlers || {};
global.webkit.messageHandlers.nativeApp =
  global.webkit.messageHandlers.nativeApp || {};

global.webkit.messageHandlers.nativeApp.postMessage = function({
  id,
  module,
  action,
  params
}) {
  if (module === "base" && action === "openURL") {
    setTimeout(() =>
      global.webApp.callBack(id, {
        status: "base/openURL success",
        module,
        action,
        ...params
      })
    );
  }
};

setTimeout(() =>
  global.webApp.dispatch("base/themeChange", { theme: "light" })
);
