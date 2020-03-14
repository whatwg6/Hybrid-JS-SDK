import EventEmit from "./EventEmitter";

import { StatusString } from "./Status";

class NativeInterface {
  constructor(readonly eventEmitter: EventEmit) {}

  public dispatch<T>(event: string, params?: T) {
    this.eventEmitter.emit(event, params);
    return Promise.resolve(`sended ${event}`);
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
    return Promise.resolve(`handled id: ${id}`);
  }
}

export default NativeInterface;
