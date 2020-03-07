export declare const enum StatusLevel {
    Success = "Success",
    Failure = "Failure"
}
export declare type StatusString = keyof typeof StatusLevel;
declare type Id = string;
declare type Module = string;
declare type Action = string;
declare type CallbackPayload = {
    status: StatusString;
    params?: any;
};
declare type DispatchPayload = {
    module: Module;
    action: Action;
    params?: any;
};
declare type DispatchMessage = {
    readonly id: Id;
    payload: DispatchPayload;
};
declare type CallbackMessage = {
    readonly id: Id;
    payload: CallbackPayload;
};
declare type Message = DispatchMessage | CallbackMessage;
export { Id, Module, Action, DispatchMessage, CallbackMessage, CallbackPayload, DispatchPayload };
export default Message;
