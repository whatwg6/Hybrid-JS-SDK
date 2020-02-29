import EventEmitter from "./EventEmit";
import NativeInterface from "./NativeInterface";

import Message from "../types/Message";

declare global {
  namespace NodeJS {
    interface Global {
      webkit: {
        messageHandlers: {
          nativeApp: {
            postMessage: Function;
          };
        };
      };
      nativeApp: {
        sendToNative: Function;
      };
      webApp: NativeInterface;
    }
  }
}

class Adapter {
  readonly eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

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
      global.webkit.messageHandlers.nativeApp
    ) {
      global.webkit.messageHandlers.nativeApp.postMessage(
        hybridMessage
      );
    } else if (global.nativeApp && global.nativeApp.sendToNative) {
      global.nativeApp.sendToNative(JSON.stringify(hybridMessage));
    }
  }

  public connect(): void {
    const { eventEmitter } = this;

    global.webApp = new NativeInterface({
      eventEmitter
    });
  }
}

export default Adapter;
