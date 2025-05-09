import NativeInterface from "./core/NativeInterface";

declare global {
  namespace NodeJS {
    interface Global {
      nativeBridge: {
        postMessage: <T>(params: {
          readonly id: string;
          payload: {
            module: string;
            action: string;
            params?: T;
          };
        }) => void;
      };
      webApp: NativeInterface;
    }
  }
}
