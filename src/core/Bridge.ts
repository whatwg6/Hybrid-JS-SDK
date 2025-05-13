import Adapter from "./Adaper";

import { generateId } from "../util";
import { StatusLevel, StatusString } from "./Status";

class Bridge {
  constructor(private readonly adapter: Adapter) {
    this.adapter.connect();
  }

  public dispatch<T>(event: string, params?: T) {
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

    return this.onCallback(id);
  }

  private onCallback(id: string) {
    return new Promise((resolve, reject) =>
      this.adapter.eventEmitter.on(
        id,
        <T>(message: {
          readonly id: string;
          payload: {
            status: StatusString;
            params?: T;
          };
          
        }) => {
          try {
            const {
              payload: { status, params }
            } = message;

            if (status === StatusLevel.Failure) {
              throw params;
            } else {
              resolve(message);
            }
          } catch (e) {
            reject(e);
          }
        }
      )
    );
  }

  private onDispatch(event: string, handler: Function) {
    this.adapter.eventEmitter.on(event, handler);
  }

  public listen(event: string, handler: Function) {
    const wrapHandler = <T>(params: T) => handler(params);

    this.onDispatch(event, wrapHandler);

    return () => this.unListen(event, wrapHandler);
  }

  private unListen(event: string, handler: Function) {
    this.adapter.eventEmitter.remove(event, handler);
  }
}

export default Bridge;
