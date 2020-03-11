import EventEmitter from "./EventEmit";
import NativeInterface from "./NativeInterface";

import type { DispatchMessage } from "./Message";

class Adapter {
  constructor(readonly eventEmitter: EventEmitter) {}

  public postMessage<T>(dispatchMessage: DispatchMessage<T>): void {
    const postMessage =
      global?.webkit?.messageHandlers?.nativeApp?.postMessage;
      
    const sendToNative = global?.nativeApp?.sendToNative;

    if (typeof postMessage === "function") {
      global.webkit.messageHandlers.nativeApp.postMessage(
        dispatchMessage
      );
    } else if (typeof sendToNative === "function") {
      global.nativeApp.sendToNative(JSON.stringify(dispatchMessage));
    } else {
      throw Error("Adapter postMessage error");
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
