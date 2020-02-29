const uuid = require("uuid/v4");

class Bridge {
  constructor(adapter) {
    this.adapter = adapter;
    this.adapter.connect();
  }

  dispatch(event, params) {
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

  listen(event, handler) {
    const wrapHandler = args => handler(args);

    this.adapter.eventEmitter.on(event, wrapHandler);

    return () => this.adapter.eventEmitter.remove(event, wrapHandler);
  }
}

module.exports = Bridge;
