const uuid = require("uuid/v4");

class NativeInterface {
  constructor({ eventEmitter, listeners }) {
    this.eventEmitter = eventEmitter;
    this.listeners = listeners;
  }

  dispatch(event, params) {
    const eventListeners = this.listeners[event];

    if (eventListeners && eventListeners.length) {
      eventListeners.forEach(listener => {
        listener(params);
      });
    }
    // return new Promise((resolve, reject) => {
    //   const id = uuid();
    //   const eventListeners = this.listeners[event];

    //   if (eventListeners && eventListeners.length) {
    //     eventListeners.forEach(listener => {
    //       listener(params);
    //       resolve();
    //     });
    //   } else {
    //     reject({
    //       id,
    //       status: `web unregister ${event}`
    //     });
    //   }
    // });
  }

  callBack(id, params) {
    this.eventEmitter.emit("____messagesEvent", {
      [id]: {
        payload: {
          params
        }
      }
    });
    // return Promise.resolve();
  }
}

module.exports = NativeInterface;
