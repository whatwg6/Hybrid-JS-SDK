import Adaper from "./core/Adaper";
import Bridge from "./core/Bridge";
import EventEmitter from "./core/EventEmitter";

import simulator from "./simulator";

const eventEmit = new EventEmitter();

const adaper = new Adaper(eventEmit);
const bridge = new Bridge(adaper);

const dispatch = <T>(action: string, args?: T) =>
  bridge.dispatch(action, args);

const listen = (action: string, callBack: Function) =>
  bridge.listen(action, callBack);

const hybrid = {
  dispatch,
  listen
};

export { simulator };
export default hybrid;
