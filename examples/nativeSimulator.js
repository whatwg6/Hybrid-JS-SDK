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
      webApp.callBack(id, {
        status: "base/openURL success",
        module,
        action
      })
    );
  }
};

setTimeout(() =>
  webApp.dispatch("base/themeChange", { theme: "light" })
);
