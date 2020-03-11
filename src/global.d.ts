import { DispatchMessage } from "./core/Message";
import NativeInterface from "./core/NativeInterface";

declare global {
  namespace NodeJS {
    interface Global {
      webkit: {
        messageHandlers: {
          nativeApp: {
            postMessage: <T>(params: DispatchMessage<T>) => void;
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
