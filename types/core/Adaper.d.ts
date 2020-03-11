import EventEmitter from "./EventEmit";
import type { DispatchMessage } from "./Message";
declare class Adapter {
    readonly eventEmitter: EventEmitter;
    constructor(eventEmitter: EventEmitter);
    postMessage<T>(dispatchMessage: DispatchMessage<T>): void;
    connect(): void;
    disconnect(): void;
}
export default Adapter;
