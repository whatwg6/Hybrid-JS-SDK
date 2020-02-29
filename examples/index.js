const hybrid = require("../src");

// web -> native
hybrid
  .dispatch("base/openURL", { url: "www.goggle.com" })
  .then(console.log)
  .catch(console.error);

// web -> native -> web
const unsubscribe = hybrid.listen("base/themeChange", console.log);
// unsubscribe();
