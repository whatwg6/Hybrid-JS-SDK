class NativeInterface {
  constructor({ eventEmitter }) {
    this.eventEmitter = eventEmitter;
  }

  dispatch(event, params) {
    this.eventEmitter.emit(event, params);
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
