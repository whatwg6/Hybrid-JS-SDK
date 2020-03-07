import { DispatchMessage } from "./core/Message";
import NativeInterface from "./core/NativeInterface";

declare global {
  namespace NodeJS {
    interface Global {
      webkit: {
        messageHandlers: {
          nativeApp: {
            postMessage: (params: DispatchMessage) => void;
          };
        };
      };
      nativeApp: {
        sendToNative: (params: string) => void;
      };
      webApp: NativeInterface;
    }
  }
}
