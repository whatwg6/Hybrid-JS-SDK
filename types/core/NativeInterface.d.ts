import EventEmit from "./EventEmit";
import { CallbackMessage } from "./Message";
import Event from "./Event";
declare class NativeInterface {
    readonly eventEmitter: EventEmit;
    constructor(eventEmitter: EventEmit);
    dispatch(event: Event, params?: any): void;
    callBack(callbackMessage: CallbackMessage): void;
}
export default NativeInterface;
