import { Promise } from "es6-promise";

import Adapter from "./Adaper";

import { generateId } from "./util";

type UnListenFunction = Function;

class Bridge {
  constructor(readonly adapter: Adapter) {
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

    return () => this.adapter.eventEmitter.remove(event, wrapHandler);
  }
}

export default Bridge;
