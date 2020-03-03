import EventEmitter from "./EventEmit";
import NativeInterface from "./NativeInterface";

import { Message } from "../types/Message";
import { isFunction } from "../util";

class Adapter {
  constructor(readonly eventEmitter: EventEmitter) {}

  public postMessage({
    id,
    payload: { action, module, params }
  }: Message): void {
    const hybridMessage = {
      id,
      module,
      action,
      params
    };

    if (
      global.webkit &&
      global.webkit.messageHandlers &&
      global.webkit.messageHandlers.nativeApp &&
      isFunction(global.webkit.messageHandlers.nativeApp.postMessage)
    ) {
      global.webkit.messageHandlers.nativeApp.postMessage(
        hybridMessage
      );
    } else if (
      global.nativeApp &&
      isFunction(global.nativeApp.sendToNative)
    ) {
      global.nativeApp.sendToNative(JSON.stringify(hybridMessage));
    }
  }

  public connect(): void {
    global.webApp = new NativeInterface(this.eventEmitter);
  }

  public disconnect(): void {
    global.webApp = void 0;
  }
}

export default Adapter;
