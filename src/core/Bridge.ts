import Adapter from "./Adaper";

import { generateId } from "../util";

type UnListenFunction = Function;

class Bridge {
  constructor(private readonly adapter: Adapter) {
    this.adapter.connect();
  }

  public dispatch(event: string, params: any): Promise<any> {
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
        (messages: { [key: string]: any }) => {
          const message = messages[id];

          if (message) {
            resolve(message.payload.params);
          }
          reject({ messages, id });
        }
      )
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
