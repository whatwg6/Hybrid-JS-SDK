import Adaper from "./core/Adaper";
import Bridge from "./core/Bridge";
import EventEmitter from "./core/EventEmit";

import Event from "./core/Event";

import simulator from "./simulator";

const eventEmit = new EventEmitter();

const adaper = new Adaper(eventEmit);
const bridge = new Bridge(adaper);

const dispatch = (action: Event, args?: any) =>
  bridge.dispatch(action, args);

const listen = (action: Event, args: Function) =>
  bridge.listen(action, args);

const hybrid = {
  dispatch,
  listen
};

export { simulator };
export default hybrid;
