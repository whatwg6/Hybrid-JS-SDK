declare class EventEmit {
    private listener;
    on(event: string, handler: Function): void;
    emit(event: string, params: any): void;
    remove(event: string, handler: Function): void;
}
export default EventEmit;
