export declare const enum StatusLevel {
    Success = "Success",
    Failure = "Failure"
}
export declare type StatusString = keyof typeof StatusLevel;
declare type Id = string;
declare type Module = string;
declare type Action = string;
interface CallbackPayload<T> {
    status: StatusString;
    params?: T;
}
interface DispatchPayload<T> {
    module: Module;
    action: Action;
    params?: T;
}
declare type DispatchMessage<T> = {
    readonly id: Id;
    payload: DispatchPayload<T>;
};
declare type CallbackMessage<T> = {
    readonly id: Id;
    payload: CallbackPayload<T>;
};
declare type Message<T> = DispatchMessage<T> | CallbackMessage<T>;
export { Id, Module, Action, DispatchMessage, CallbackMessage, CallbackPayload, DispatchPayload };
export default Message;
