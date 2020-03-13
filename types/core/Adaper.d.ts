import EventEmitter from "./EventEmitter";
declare class Adapter {
    readonly eventEmitter: EventEmitter;
    constructor(eventEmitter: EventEmitter);
    postMessage<T>(message: {
        readonly id: string;
        payload: {
            module: string;
            action: string;
            params?: T;
        };
    }): void;
    connect(): void;
    disconnect(): void;
}
export default Adapter;
