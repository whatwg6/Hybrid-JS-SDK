import EventEmit from "./EventEmit";
import type { CallbackMessage } from "./Message";
import type Event from "./Event";
declare class NativeInterface {
    readonly eventEmitter: EventEmit;
    constructor(eventEmitter: EventEmit);
    dispatch<T>(event: Event, params?: T): void;
    callBack<T>(callbackMessage: CallbackMessage<T>): void;
}
export default NativeInterface;
