import EventEmit from "./EventEmit";
import { CallbackMessage } from "../../types/Message";

class NativeInterface {
  constructor(readonly eventEmitter: EventEmit) {}

  public dispatch(event: string, params: any = void 0): void {
    this.eventEmitter.emit(event, params);
  }

  public callBack(callbackMessage: CallbackMessage): void {
    const { id } = callbackMessage;
    this.eventEmitter.emit(id, callbackMessage);
  }
}

export default NativeInterface;
