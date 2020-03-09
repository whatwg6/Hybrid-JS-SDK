import EventEmit from "./EventEmit";

import type { CallbackMessage } from "./Message";
import type Event from "./Event";

class NativeInterface {
  constructor(readonly eventEmitter: EventEmit) {}

  public dispatch(event: Event, params: any = void 0): void {
    this.eventEmitter.emit(event, params);
  }

  public callBack(callbackMessage: CallbackMessage): void {
    const { id } = callbackMessage;
    this.eventEmitter.emit(id, callbackMessage);
  }
}

export default NativeInterface;
