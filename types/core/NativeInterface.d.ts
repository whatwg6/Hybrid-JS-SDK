import EventEmit from "./EventEmitter";
import { StatusString } from "./Status";
declare class NativeInterface {
    readonly eventEmitter: EventEmit;
    constructor(eventEmitter: EventEmit);
    dispatch<T>(event: string, params?: T): void;
    callBack<T>(callbackMessage: {
        readonly id: string;
        payload: {
            status: StatusString;
            params?: T;
        };
    }): void;
}
export default NativeInterface;
