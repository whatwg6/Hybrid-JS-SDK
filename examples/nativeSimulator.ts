import { HybridEvent } from "./enum";

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
  if (
    module === HybridEvent.BaseModule &&
    action === HybridEvent.Action
  ) {
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
