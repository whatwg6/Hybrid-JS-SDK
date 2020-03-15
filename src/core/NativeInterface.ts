import EventEmit from "./EventEmitter";

import { StatusString } from "./Status";

class NativeInterface {
  constructor(readonly eventEmitter: EventEmit) {}

  public dispatch<T>(event: string, params?: T) {
    this.eventEmitter.emit(event, params);
  }

  public callBack<T>(callbackMessage: {
    readonly id: string;
    payload: {
      status: StatusString;
      params?: T;
    };
  }) {
    const { id } = callbackMessage;
    this.eventEmitter.emit(id, callbackMessage);
  }
}

export default NativeInterface;
