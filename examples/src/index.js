// native inject js into webview
import simulator from "../../build/simulator";

simulator();

// webviwe import hybrid js sdk
import hybrid from "../../build";

// web -> native
hybrid
  .dispatch("answer/writeAnswer", { id: 123456789 })
  .then(console.log)
  .catch(console.error);

hybrid
  .dispatch("base/openURL", { url: "www.twitter.com" })
  .then(console.log)
  .catch(console.error);

// web -> native -> web
const unsubscribe1 = hybrid.listen("base/networkChange", console.log);
const unsubscribe2 = hybrid.listen("base/networkChange", console.log);

unsubscribe2();
