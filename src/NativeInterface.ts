class NativeInterface {
  readonly eventEmitter;

  constructor({ eventEmitter }) {
    this.eventEmitter = eventEmitter;
  }

  public dispatch(event: string, params: any): void {
    this.eventEmitter.emit(event, params);
  }

  public callBack(id: string, params: any): void {
    this.eventEmitter.emit("____messagesEvent", {
      [id]: {
        payload: {
          params
        }
      }
    });
  }
}

export default NativeInterface;
