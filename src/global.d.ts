import NativeInterface from "./core/NativeInterface";

declare global {
  namespace NodeJS {
    interface Global {
      webkit: {
        messageHandlers: {
          nativeApp: {
            postMessage: <T>(params: {
              readonly id: string;
              payload: {
                module: string;
                action: string;
                params?: T;
              };
            }) => void;
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
