import EventEmitter from "./EventEmit";
import type { DispatchMessage } from "./Message";
declare class Adapter {
    readonly eventEmitter: EventEmitter;
    constructor(eventEmitter: EventEmitter);
    postMessage(dispatchMessage: DispatchMessage): void;
    connect(): void;
    disconnect(): void;
}
export default Adapter;
