import EventEmit from "./EventEmit";
import { CallbackMessage } from "../../types/Message";
import Event from "../../types/Event";
declare class NativeInterface {
    readonly eventEmitter: EventEmit;
    constructor(eventEmitter: EventEmit);
    dispatch(event: Event, params?: any): void;
    callBack(callbackMessage: CallbackMessage): void;
}
export default NativeInterface;
