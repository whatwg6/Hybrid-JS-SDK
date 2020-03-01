import Adaper from "./Adaper";
import Bridge from "./Bridge";

import EventEmitter from "./EventEmit";

const eventEmit = new EventEmitter();
const adaper = new Adaper(eventEmit);
const bridge = new Bridge(adaper);

const dispatch = (action, args) => bridge.dispatch(action, args);
const listen = (action, args) => bridge.listen(action, args);

const hybrid = {
  dispatch,
  listen
};

export default hybrid;
