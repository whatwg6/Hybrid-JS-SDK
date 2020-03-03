import Adapter from "./Adaper";

import { generateId } from "../util";
import {
  StatusLevel,
  CallbackPayload,
  CallbackMessage
} from "../../types/Message";

type UnListenFunction = Function;

class Bridge {
  constructor(private readonly adapter: Adapter) {
    this.adapter.connect();
  }

  public dispatch(
    event: string,
    params: any = void 0
  ): Promise<CallbackPayload> {
    const id = generateId();
    const [module, action] = event.split("/");

    this.adapter.postMessage({
      id,
      payload: {
        action,
        module,
        params
      }
    });

    return this.onDispatch(id);
  }

  private onDispatch(id: string): Promise<CallbackPayload> {
    return new Promise((resolve, reject) =>
      this.adapter.eventEmitter.on(id, (message: CallbackMessage) => {
        try {
          const {
            payload,
            payload: { status }
          } = message;

          if (status === StatusLevel.Failure) {
            throw payload;
          } else {
            resolve(payload);
          }
        } catch (e) {
          reject(e);
        }
      })
    );
  }

  public listen(event: string, handler: Function): UnListenFunction {
    const wrapHandler: Function = (args: any) => handler(args);

    this.adapter.eventEmitter.on(event, wrapHandler);

    return () => this.unListen(event, wrapHandler);
  }

  private unListen(event: string, handler: Function): void {
    this.adapter.eventEmitter.remove(event, handler);
  }
}

export default Bridge;
