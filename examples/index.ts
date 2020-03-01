// native inject js into webview
import "./nativeSimulator";

// webviwe import hybrid js sdk
import hybrid from "../src";

// web -> native
hybrid
  .dispatch("base/openURL", { url: "www.goggle.com" })
  .then(console.log)
  .catch(console.error);

hybrid
  .dispatch("base/openURL", { url: "www.twitter.com" })
  .then(console.log)
  .catch(console.error);

// web -> native -> web
const unsubscribe1 = hybrid.listen("base/themeChange", console.log);
const unsubscribe2 = hybrid.listen("base/themeChange", console.log);

unsubscribe2();
