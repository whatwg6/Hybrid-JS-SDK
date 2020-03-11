import EventEmitter from "./EventEmit";
import NativeInterface from "./NativeInterface";

class Adapter {
  constructor(readonly eventEmitter: EventEmitter) {}

  public postMessage<T>(message: {
    readonly id: string;
    payload: {
      module: string;
      action: string;
      params?: T;
    };
  }): void {
    const postMessage =
      global?.webkit?.messageHandlers?.nativeApp?.postMessage;

    const sendToNative = global?.nativeApp?.sendToNative;

    if (typeof postMessage === "function") {
      postMessage(message);
    } else if (typeof sendToNative === "function") {
      sendToNative(JSON.stringify(message));
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
