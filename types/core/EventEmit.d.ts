import Event from "./Event";
declare class EventEmit {
    private listener;
    on(event: Event, handler: Function): void;
    emit(event: Event, params?: any): void;
    remove(event: Event, handler: Function): void;
}
export default EventEmit;
