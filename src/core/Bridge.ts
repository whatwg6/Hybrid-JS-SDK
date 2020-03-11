import Adapter from "./Adaper";

import { generateId } from "../util";
import { StatusLevel } from "./Message"
import type { 
  Id,
  CallbackPayload,
  CallbackMessage
} from "./Message";
import type Event from "./Event";

class Bridge {
  constructor(private readonly adapter: Adapter) {
    this.adapter.connect();
  }

  public dispatch<T>(
    event: Event,
    params?: T
  ) {
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

  private onDispatch(id: Id) {
    return new Promise((resolve, reject) =>
      this.adapter.eventEmitter.on(id, <T>(message: CallbackMessage<T>) => {
        try {
          const {
            payload: { status, params }
          } = message;

          if (status === StatusLevel.Failure) {
            throw params;
          } else {
            resolve(params);
          }
        } catch (e) {
          reject(e);
        }
      })
    );
  }

  public listen(event: Event, handler: Function): Function {
    const wrapHandler = <T>(params: T) => handler(params)

    this.adapter.eventEmitter.on(event, wrapHandler);

    return () => this.unListen(event, wrapHandler);
  }

  private unListen(event: Event, handler: Function): void {
    this.adapter.eventEmitter.remove(event, handler);
  }
}

export default Bridge;
