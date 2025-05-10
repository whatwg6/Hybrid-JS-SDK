// import simulator from "../../build/simulator";
import { log } from "./util";

// log("native inject js into webview");
// simulator();

// log("web page import hybrid js sdk");
import hybrid from "../../build";

const unsubscribe = hybrid.listen("base/networkChange", log);

const unsubscribe2 = hybrid.listen("base/networkChange", log);
unsubscribe2();

window.hybrid = hybrid;

hybrid
  .dispatch("base/alert", {
    title: "Hello",
  })
  .then(log)
  .catch(log);
