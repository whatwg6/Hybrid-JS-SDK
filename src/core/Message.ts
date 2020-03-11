export const enum StatusLevel {
  Success = "Success",
  Failure = "Failure"
}

export type StatusString = keyof typeof StatusLevel;

type Id = string;

type Module = string;
type Action = string;

interface CallbackPayload<T> {
  status: StatusString;
  params?: T;
}

interface DispatchPayload<T> {
  module: Module;
  action: Action;
  params?: T;
}

type DispatchMessage<T> = {
  readonly id: Id;
  payload: DispatchPayload<T>;
};

type CallbackMessage<T> = {
  readonly id: Id;
  payload: CallbackPayload<T>;
};

type Message<T> = DispatchMessage<T> | CallbackMessage<T>;

export {
  Id,
  Module,
  Action,
  DispatchMessage,
  CallbackMessage,
  CallbackPayload,
  DispatchPayload
};
export default Message;
