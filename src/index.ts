import Adaper from "./Adaper";
import Bridge from "./Bridge";

import EventEmitter from "./EventEmit";

const eventEmit = new EventEmitter();

const adaper = new Adaper(eventEmit);
const bridge = new Bridge(adaper);

const dispatch = (action: string, args?: any) =>
  bridge.dispatch(action, args);

const listen = (action: string, args: Function) =>
  bridge.listen(action, args);

const hybrid = {
  dispatch,
  listen
};

export default hybrid;