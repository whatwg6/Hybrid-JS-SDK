class NativeInterface {
  readonly eventEmitter;

  constructor({ eventEmitter }) {
    this.eventEmitter = eventEmitter;
  }

  public dispatch(event, params): void {
    this.eventEmitter.emit(event, params);
  }

  public callBack(id, params): void {
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

export default NativeInterface;
