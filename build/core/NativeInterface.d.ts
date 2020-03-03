import EventEmit from "./EventEmit";
import { CallbackMessage } from "../../types/Message";
declare class NativeInterface {
    readonly eventEmitter: EventEmit;
    constructor(eventEmitter: EventEmit);
    dispatch(event: string, params?: any): void;
    callBack(callbackMessage: CallbackMessage): void;
}
export default NativeInterface;
