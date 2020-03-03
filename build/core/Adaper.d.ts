import EventEmitter from "./EventEmit";
import { Message } from "../../types/Message";
declare class Adapter {
    readonly eventEmitter: EventEmitter;
    constructor(eventEmitter: EventEmitter);
    postMessage({ id, payload: { action, module, params } }: Message): void;
    connect(): void;
    disconnect(): void;
}
export default Adapter;
