import EventEmit from "./EventEmit";

import type { CallbackMessage } from "./Message";
import type Event from "./Event";

class NativeInterface {
  constructor(readonly eventEmitter: EventEmit) {}

  public dispatch<T>(event: Event, params?: T): void {
    this.eventEmitter.emit(event, params);
  }

  public callBack<T>(callbackMessage: CallbackMessage<T>): void {
    const { id } = callbackMessage;
    this.eventEmitter.emit(id, callbackMessage);
  }
}

export default NativeInterface;
