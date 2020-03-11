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

    return this.onDispatch(id);
  }

  private onDispatch(id: string) {
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
              resolve(params);
            }
          } catch (e) {
            reject(e);
          }
        }
      )
    );
  }

  public listen(event: string, handler: Function): Function {
    const wrapHandler = <T>(params: T) => handler(params);

    this.adapter.eventEmitter.on(event, wrapHandler);

    return () => this.unListen(event, wrapHandler);
  }

  private unListen(event: string, handler: Function): void {
    this.adapter.eventEmitter.remove(event, handler);
  }
}

export default Bridge;
