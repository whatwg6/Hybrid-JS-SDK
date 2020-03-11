import type Event from "./Event";
declare class EventEmit {
    #private;
    on(event: Event, handler: Function): void;
    emit<T>(event: Event, params?: T): void;
    remove(event: Event, handler: Function): void;
}
export default EventEmit;
