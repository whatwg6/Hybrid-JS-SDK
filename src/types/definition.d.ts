import { HybridMessage } from "./Message";
import NativeInterface from "../core/NativeInterface";

declare global {
  namespace NodeJS {
    interface Global {
      webkit?: {
        messageHandlers?: {
          nativeApp?: {
            postMessage?: (params: HybridMessage) => void;
          };
        };
      };
      nativeApp?: {
        sendToNative?: (params: string) => void;
      };
      webApp: NativeInterface | void;
    }
  }
}
