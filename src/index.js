const Adaper = require("./Adaper");
const Bridge = require("./Bridge");

const adaper = new Adaper();
const bridge = new Bridge(adaper);

const dispatch = (action, ...args) =>
  bridge.dispatch(action, ...args);
const listen = (action, ...args) => bridge.listen(action, ...args);

// inject native js
require("../examples/nativeSimulator");

const hybrid = {
  dispatch,
  listen
};

module.exports = hybrid;
