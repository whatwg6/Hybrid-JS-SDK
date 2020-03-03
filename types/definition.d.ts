import { DispatchMessage } from "./Message";
import NativeInterface from "../src/core/NativeInterface";

declare global {
  namespace NodeJS {
    interface Global {
      webkit?: {
        messageHandlers?: {
          nativeApp?: {
            postMessage?: (params: DispatchMessage) => void;
          };
        };
      };
      nativeApp?: {
        sendToNative?: (params: string) => void;
      };
      webApp: NativeInterface;
    }
  }
}
