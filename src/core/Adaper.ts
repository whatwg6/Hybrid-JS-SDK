import EventEmitter from "./EventEmit";
import NativeInterface from "./NativeInterface";

import { DispatchMessage } from "../../types/Message";
import { isFunction } from "../util";

class Adapter {
  constructor(readonly eventEmitter: EventEmitter) {}

  public postMessage(dispatchMessage: DispatchMessage): void {
    if (
      global.webkit &&
      global.webkit.messageHandlers &&
      global.webkit.messageHandlers.nativeApp &&
      isFunction(global.webkit.messageHandlers.nativeApp.postMessage)
    ) {
      global.webkit.messageHandlers.nativeApp.postMessage(
        dispatchMessage
      );
    } else if (
      global.nativeApp &&
      isFunction(global.nativeApp.sendToNative)
    ) {
      global.nativeApp.sendToNative(JSON.stringify(dispatchMessage));
    }
  }

  public connect(): void {
    global.webApp = new NativeInterface(this.eventEmitter);
  }

  public disconnect(): void {
    // Type 'undefined' is not assignable to type 'NativeInterface'.
    // global.webApp = void 0;
  }
}

export default Adapter;
