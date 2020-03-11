import EventEmit from "./EventEmit";

import { StatusString } from "./Status";

class NativeInterface {
  constructor(readonly eventEmitter: EventEmit) {}

  public dispatch<T>(event: string, params?: T): void {
    this.eventEmitter.emit(event, params);
  }

  public callBack<T>(callbackMessage: {
    readonly id: string;
    payload: {
      status: StatusString;
      params?: T;
    };
  }): void {
    const { id } = callbackMessage;
    this.eventEmitter.emit(id, callbackMessage);
  }
}

export default NativeInterface;
