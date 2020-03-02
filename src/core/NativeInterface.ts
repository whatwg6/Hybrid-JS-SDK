import EventEmit from "./EventEmit";

class NativeInterface {
  constructor(readonly eventEmitter: EventEmit) {}

  public dispatch(event: string, params: any): void {
    this.eventEmitter.emit(event, params);
  }

  public callBack(id: string, params: any): void {
    this.eventEmitter.emit(id, {
      [id]: {
        payload: {
          params
        }
      }
    });
  }
}

export default NativeInterface;
