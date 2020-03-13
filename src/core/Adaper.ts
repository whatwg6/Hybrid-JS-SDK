import EventEmitter from "./EventEmitter";
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
  }) {
    const postMessage =
      global?.webkit?.messageHandlers?.nativeApp?.postMessage;

    const sendToNative = global?.nativeApp?.sendToNative;

    if (typeof postMessage === "function") {
      postMessage(message);
    } else if (typeof sendToNative === "function") {
      sendToNative(JSON.stringify(message));
    } else {
      console.error(
        "Adapter: can not find postMessage or sendToNative"
      );
    }
  }

  public connect() {
    global.webApp = new NativeInterface(this.eventEmitter);
  }

  public disconnect() {
    // Type 'undefined' is not assignable to type 'NativeInterface'.
    // global.webApp = void 0;
  }
}

export default Adapter;
