import EventEmitter from "./EventEmit";
import NativeInterface from "./NativeInterface";

import { DispatchMessage } from "./Message";

import { isFunction } from "../util";

class Adapter {
  constructor(readonly eventEmitter: EventEmitter) {}

  public postMessage(dispatchMessage: DispatchMessage): void {
    const postMessage =
      global?.webkit?.messageHandlers?.nativeApp?.postMessage;
    const sendToNative = global?.nativeApp?.sendToNative;

    if (isFunction(postMessage)) {
      global.webkit.messageHandlers.nativeApp.postMessage(
        dispatchMessage
      );
    } else if (isFunction(sendToNative)) {
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
