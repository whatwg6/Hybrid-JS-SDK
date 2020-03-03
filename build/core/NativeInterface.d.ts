import EventEmit from "./EventEmit";
declare class NativeInterface {
    readonly eventEmitter: EventEmit;
    constructor(eventEmitter: EventEmit);
    dispatch(event: string, params: any): void;
    callBack(id: string, params: any): void;
}
export default NativeInterface;
