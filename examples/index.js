const hybrid = require("../built").default;

require("./nativeSimulator");

// web -> native
hybrid
  .dispatch("base/openURL", { url: "www.goggle.com" })
  .then(console.log)
  .catch(console.error);

// web -> native -> web
const unsubscribe1 = hybrid.listen("base/themeChange", console.log);
const unsubscribe2 = hybrid.listen("base/themeChange", console.log);

unsubscribe2();
