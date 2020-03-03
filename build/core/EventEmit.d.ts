declare class EventEmit {
    private listener;
    on(eventName: string, handler: Function): void;
    emit(eventName: string, params: any): void;
    remove(eventName: string, handler: Function): void;
}
export default EventEmit;
