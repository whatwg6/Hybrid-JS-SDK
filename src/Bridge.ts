import { Promise } from "es6-promise";
import uuid from "uuid/v4";

import Adapter from "./Adaper";

type UnListenFunction = Function;

class Bridge {
  constructor(readonly adapter: Adapter) {
    this.adapter.connect();
  }

  public dispatch(event: string, params: any): Promise<any> {
    const id = uuid();
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
      this.adapter.eventEmitter.on("____messagesEvent", messages => {
        const message = messages[id];

        if (message) {
          resolve(message.payload.params);
        }
        reject({ messages, id });
      })
    );
  }

  public listen(event: string, handler: Function): UnListenFunction {
    const wrapHandler = args => handler(args);

    this.adapter.eventEmitter.on(event, wrapHandler);

    return () => this.adapter.eventEmitter.remove(event, wrapHandler);
  }
}

export default Bridge;
