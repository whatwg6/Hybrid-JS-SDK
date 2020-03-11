import Adaper from "./core/Adaper";
import Bridge from "./core/Bridge";
import EventEmitter from "./core/EventEmit";

import Event from "./core/Event";

import simulator from "./simulator";
simulator();
const eventEmit = new EventEmitter();

const adaper = new Adaper(eventEmit);
const bridge = new Bridge(adaper);

const dispatch = <T>(action: Event, args?: T) =>
  bridge.dispatch(action, args);

const listen = (action: Event, callBack: Function) =>
  bridge.listen(action, callBack);

const hybrid = {
  dispatch,
  listen
};

export { simulator };
export default hybrid;
