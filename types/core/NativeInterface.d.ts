import EventEmit from "./EventEmit";
import type { CallbackMessage } from "./Message";
import type Event from "./Event";
declare class NativeInterface {
    readonly eventEmitter: EventEmit;
    constructor(eventEmitter: EventEmit);
    dispatch(event: Event, params?: any): void;
    callBack(callbackMessage: CallbackMessage): void;
}
export default NativeInterface;
