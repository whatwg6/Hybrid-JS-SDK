// native inject js into webview
const simulator = require("../build/simulator").default();

// webviwe import hybrid js sdk
const hybrid = require("../build").default;

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
