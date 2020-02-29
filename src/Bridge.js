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
    const listeners = this.adapter.listeners;

    if (!listeners[event]) {
      listeners[event] = [];
    }

    listeners[event].push(handler);

    return () => {
      listeners[event].splice(
        listeners[event].findIndex(listen => listen === handler),
        1
      );
    };
  }
}

module.exports = Bridge;
