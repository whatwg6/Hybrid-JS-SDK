var hybrid = require("../built").default;
require("./nativeSimulator");
// web -> native
hybrid
    .dispatch("base/openURL", { url: "www.goggle.com" })
    .then(console.log)
    .catch(console.error);
// web -> native -> web
var unsubscribe1 = hybrid.listen("base/themeChange", console.log);
var unsubscribe2 = hybrid.listen("base/themeChange", console.log);
unsubscribe2();
