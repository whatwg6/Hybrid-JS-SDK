import Adapter from "./Adaper";

import { generateId } from "../util";
import {
  Id,
  StatusLevel,
  CallbackPayload,
  CallbackMessage
} from "./Message";
import Event from "./Event";

class Bridge {
  constructor(private readonly adapter: Adapter) {
    this.adapter.connect();
  }

  public dispatch(
    event: Event,
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

  private onDispatch(id: Id): Promise<CallbackPayload> {
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

  public listen(event: Event, handler: Function): Function {
    const wrapHandler: Function = (args: any) => handler(args);

    this.adapter.eventEmitter.on(event, wrapHandler);

    return () => this.unListen(event, wrapHandler);
  }

  private unListen(event: Event, handler: Function): void {
    this.adapter.eventEmitter.remove(event, handler);
  }
}

export default Bridge;
