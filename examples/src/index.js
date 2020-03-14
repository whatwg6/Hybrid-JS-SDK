import simulator from "../../build/simulator";
import { log } from "./util";

log("native inject js into webview");
simulator();

log("web page import hybrid js sdk");
import hybrid from "../../build";

log(
  'web -> native: hybrid.dispatch("answer/writeAnswer", { id: 123456789 })'
);
hybrid
  .dispatch("answer/writeAnswer", { id: 123456789 })
  .then(console.log)
  .catch(console.error);

log('hybrid.dispatch("base/openURL", { url: "www.twitter.com" });');
hybrid
  .dispatch("base/openURL", { url: "www.twitter.com" })
  .then(console.log)
  .catch(console.error);

log(
  'web -> native -> web: hybrid.listen("base/networkChange", console.log)'
);
const unsubscribe1 = hybrid.listen("base/networkChange", console.log);
const unsubscribe2 = hybrid.listen("base/networkChange", console.log);
unsubscribe2();
